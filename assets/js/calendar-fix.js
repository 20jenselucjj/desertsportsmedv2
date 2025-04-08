// Desert Sports Med - Calendar Scrolling Fix for Mobile

document.addEventListener('DOMContentLoaded', function() {
    // Apply fixes after Cal.com has loaded
    setTimeout(fixCalendarScrolling, 2500);
    
    // Also apply fixes when window is resized (in case of orientation change)
    window.addEventListener('resize', fixCalendarScrolling);
});

function fixCalendarScrolling() {
    // Find all Cal.com calendar containers
    const calContainers = document.querySelectorAll('[id^="cal-"]');
    
    calContainers.forEach(container => {
        // Find any iframes inside the container
        const iframes = container.querySelectorAll('iframe');
        
        iframes.forEach(iframe => {
            // Ensure iframe is scrollable
            iframe.style.overflow = 'auto';
            iframe.style.webkitOverflowScrolling = 'touch';
            iframe.style.touchAction = 'auto';
            
            // Try to access iframe content if from same origin
            try {
                if (iframe.contentDocument) {
                    const iframeBody = iframe.contentDocument.body;
                    if (iframeBody) {
                        iframeBody.style.overflow = 'auto';
                        iframeBody.style.webkitOverflowScrolling = 'touch';
                        iframeBody.style.touchAction = 'auto';
                    }
                }
            } catch (e) {
                // Cross-origin iframe, can't access content directly
                console.log('Could not access iframe content due to cross-origin policy');
            }
        });
        
        // Find any divs with overflow:hidden
        const hiddenDivs = container.querySelectorAll('div[style*="overflow:hidden"]');
        hiddenDivs.forEach(div => {
            div.style.overflow = 'auto';
            div.style.webkitOverflowScrolling = 'touch';
            div.style.touchAction = 'auto';
        });
    });
    
    // Also fix the calendar containers
    const embedContainers = document.querySelectorAll('.cal-embed-container, .calendar-container');
    embedContainers.forEach(container => {
        container.style.overflow = 'visible';
        container.style.height = 'auto';
        
        // Ensure minimum height based on screen size
        if (window.innerWidth <= 576) {
            container.style.minHeight = '600px';
        } else {
            container.style.minHeight = '650px';
        }
    });
}
