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
    const rawHostname = window.location.hostname || "localhost";
    // Strip surrounding brackets in case IPv6 is formatted as [::1]
    const hostname = rawHostname.replace(/^\[|\]$/g, '');
    const footerElement = document.getElementById('sys-footer-slug');

    // Matches standard IPv4 addresses (0.0.0.0 to 255.255.255.255)
    const ipv4Regex = /^(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}$/;

    // Matches IPv6 addresses (full, compressed '::', and loopback)
    const ipv6Regex = /^(([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:))$/;

    const isIpAddress = ipv4Regex.test(hostname) || ipv6Regex.test(hostname);

    if (footerElement) {
        if (isIpAddress) {
            footerElement.innerHTML = `&copy; purga.pw | no valid hostname (likely a relay)`;
        } else {
            const domainFirstPart = hostname.split('.')[0].toLowerCase();
            footerElement.innerHTML = `&copy; purga.pw | ${domainFirstPart} `;
        }
    }
}
updateFooterSlug();

// IP & Country display
async function fetchIPData() {
    const ipElement = document.getElementById('sys-ip');
    if (!ipElement) return;

    try {
        // GeoJS
        const response = await fetch('https://get.geojs.io/v1/ip/geo.json');
        if (!response.ok) throw new Error('GeoJS network response was not ok');
        const data = await response.json();
            
        ipElement.textContent = `${data.ip} [${data.country_code}]`;
        
    } catch (primaryError) {
        console.warn("Primary IP API failed, trying fallback...", primaryError.message);
        
        try {
            // ipwho.is fallback
            const fallbackResponse = await fetch('https://ipwho.is/');
            if (!fallbackResponse.ok) throw new Error('Fallback network response was not ok');
            const fallbackData = await fallbackResponse.json();
            
            ipElement.textContent = `${fallbackData.ip} [${fallbackData.country_code}]`;
            
        } catch (fallbackError) {
            console.error("All IP Lookups failed (likely blocked by privacy extensions):", fallbackError.message);
            ipElement.textContent = "FAILED [BLOCKED/LOCAL]";
            ipElement.style.color = "#ff4444";
        }
    }
}
document.addEventListener("DOMContentLoaded", fetchIPData);
