// Desert Sports Med - Background Brightness Fix

document.addEventListener('DOMContentLoaded', function() {
    // Find all elements with inline background-image styles containing linear-gradient
    const elementsWithBgImage = document.querySelectorAll('[style*="linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6))"]');
    
    // Loop through each element and modify its style
    elementsWithBgImage.forEach(function(element) {
        // Get the current style
        const currentStyle = element.getAttribute('style');
        
        // Replace the dark overlay with a lighter one
        const newStyle = currentStyle.replace(
            /linear-gradient\(rgba\(0,\s*0,\s*0,\s*0\.6\),\s*rgba\(0,\s*0,\s*0,\s*0\.6\)\)/g,
            'linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.5))'
        );
        
        // Apply the new style
        element.setAttribute('style', newStyle);
    });
    
    // Also handle other gradient patterns
    const elementsWithOtherGradients = document.querySelectorAll('[style*="linear-gradient(rgba(0, 0, 0,"]');
    
    elementsWithOtherGradients.forEach(function(element) {
        // Get the current style
        const currentStyle = element.getAttribute('style');
        
        // Replace any dark overlay with a lighter one
        const newStyle = currentStyle.replace(
            /linear-gradient\(rgba\(0,\s*0,\s*0,\s*(0\.\d+)\),\s*rgba\(0,\s*0,\s*0,\s*(0\.\d+)\)\)/g,
            function(match, opacity1, opacity2) {
                // Reduce opacity by 0.2 (but not below 0.3)
                const newOpacity1 = Math.max(parseFloat(opacity1) - 0.2, 0.3).toFixed(1);
                const newOpacity2 = Math.max(parseFloat(opacity2) - 0.2, 0.4).toFixed(1);
                return `linear-gradient(rgba(0, 0, 0, ${newOpacity1}), rgba(0, 0, 0, ${newOpacity2}))`;
            }
        );
        
        // Apply the new style
        element.setAttribute('style', newStyle);
    });
    
    // Apply a brightness filter to all background images
    const style = document.createElement('style');
    style.textContent = `
        [style*="background-image"] {
            filter: brightness(1.2);
        }
    `;
    document.head.appendChild(style);
});
