// Visitor time display
function updateTime() {
    const now = new Date();
    const timeStr = now.toLocaleTimeString('en-GB', { hour12: false });
    document.getElementById('sys-time').textContent = timeStr;
}
setInterval(updateTime, 1000);
updateTime(); 

// User Agent
document.getElementById('sys-agent').textContent = navigator.userAgent;

// Flicker system
function triggerFlicker() {
    const header = document.querySelector('.header-link h1');
    if (!header) return;
        
    header.classList.remove('glitch-trigger');
    void header.offsetWidth; // Force reflow
    header.classList.add('glitch-trigger');

    const nextTime = Math.random() * 6000 + 1000;
    setTimeout(triggerFlicker, nextTime);
}
triggerFlicker();

// Footer domain grabber
function updateFooterSlug() {
    const hostname = window.location.hostname || "localhost";
    const domainFirstPart = hostname.split('.')[0].toLowerCase();
    const footerElement = document.getElementById('sys-footer-slug');
    
    if (footerElement) {
        footerElement.innerHTML = `&copy; purga.pw | ${domainFirstPart} `;
    }
}
updateFooterSlug();

// IP & Country display
async function fetchIPData() {
    const ipElement = document.getElementById('sys-ip');
    try {
        const response = await fetch('https://get.geojs.io/v1/ip/geo.json');
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
            
        ipElement.textContent = `${data.ip} [${data.country_code}]`;
    } catch (error) {
        console.error("IP Lookup failed:", error);
        ipElement.textContent = "FAILED [LOCAL?]";
        ipElement.style.color = "#ff4444";
    }
}
fetchIPData();