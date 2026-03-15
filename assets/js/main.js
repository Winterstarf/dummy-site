// 1. Visitor's time display
function updateTime() {
    const now = new Date();
    const timeStr = now.toLocaleTimeString('en-GB', { hour12: false });
    document.getElementById('sys-time').textContent = timeStr;
}
setInterval(updateTime, 1000);
updateTime(); 

// 2. User Agent
document.getElementById('sys-agent').textContent = navigator.userAgent;

// 3. World Divergence
function updateDivergence() {
    const divergence = (Math.random() * 2).toFixed(6);
    const divElement = document.getElementById('sys-divergence');
    const statusElement = document.getElementById('sys-lore-status');
        
    divElement.textContent = divergence + "%";
        
    if (divergence === "1.048596") {
        statusElement.textContent = "STEINS GATE [SAFE]";
        statusElement.style.color = "#00ff00";
    } else if (divergence > 1.048596) {
        statusElement.textContent = "BETA FIELD [CONVERGENT]";
        statusElement.style.color = "var(--text-main)";
    } else {
        statusElement.textContent = "ALPHA FIELD [CONVERGENT]";
        statusElement.style.color = "var(--text-main)";
    }
}
updateDivergence();

// 4. Flicker system
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

// 5. Footer domain grabber
function updateFooterSlug() {
    const hostname = window.location.hostname || "localhost";
    const domainFirstPart = hostname.split('.')[0].toLowerCase();
    const footerElement = document.getElementById('sys-footer-slug');
    
    if (footerElement) {
        footerElement.innerHTML = `&copy; purga.pw | ${domainFirstPart} `;
    }
}
updateFooterSlug();

// 6. IP & Country display
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

// 7. Latency display
async function updatePing() {
    const pingElement = document.getElementById('sys-ping');
    const startTime = performance.now();
    
    try {
        await fetch(window.location.href, { 
            method: 'HEAD', 
            cache: 'no-cache',
            mode: 'no-cors' 
        });
        
        const endTime = performance.now();
        const ping = Math.round(endTime - startTime);
        
        pingElement.textContent = ping + "ms";

    if (ping < 30) {
        pingElement.style.color = "#00ffff";
    } else if (ping < 60) {
        pingElement.style.color = "#00ff00";
    } else if (ping < 100) {
        pingElement.style.color = "#adff2f";
    } else if (ping < 140) {
        pingElement.style.color = "#ffff00";
    } else if (ping < 180) {
        pingElement.style.color = "#ff9900";
    } else if (ping < 230) {
        pingElement.style.color = "#ff4500";
    } else {
        pingElement.style.color = "#ff0000";
    }
    } catch (e) {
        pingElement.textContent = "FAILED";
        pingElement.style.color = "#ff4444";
    }
}
setInterval(updatePing, 3000);
updatePing();