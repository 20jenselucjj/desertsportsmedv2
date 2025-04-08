// Desert Sports Med - Chatbot Position Fix
// This script ensures consistent positioning of the chatbot across all pages

document.addEventListener('DOMContentLoaded', function() {
    // Wait for the DOM to be fully loaded
    setTimeout(function() {
        // Get the chatbot toggle button
        const chatbotToggle = document.querySelector('.chatbot-toggle');
        const chatbotContainer = document.querySelector('.chatbot-container');
        const welcomeBubble = document.querySelector('.welcome-bubble');

        if (chatbotToggle) {
            // Set the position for desktop
            chatbotToggle.style.bottom = '30px';
        }

        if (chatbotContainer) {
            // Adjust the container position to match
            chatbotContainer.style.bottom = '100px';
        }

        if (welcomeBubble) {
            // Adjust the welcome bubble position
            welcomeBubble.style.bottom = '100px';
        }

        // For mobile devices
        if (window.innerWidth <= 576) {
            if (chatbotToggle) {
                chatbotToggle.style.bottom = '30px';
            }

            if (chatbotContainer) {
                chatbotContainer.style.bottom = '100px';
            }

            if (welcomeBubble) {
                welcomeBubble.style.bottom = '100px';
            }
        }

        // Add window resize listener to maintain positioning on screen size changes
        window.addEventListener('resize', function() {
            if (window.innerWidth <= 576) {
                if (chatbotToggle) chatbotToggle.style.bottom = '30px';
                if (chatbotContainer) chatbotContainer.style.bottom = '100px';
                if (welcomeBubble) welcomeBubble.style.bottom = '100px';
            } else {
                if (chatbotToggle) chatbotToggle.style.bottom = '30px';
                if (chatbotContainer) chatbotContainer.style.bottom = '100px';
                if (welcomeBubble) welcomeBubble.style.bottom = '100px';
            }
        });
    }, 100); // Small delay to ensure elements are loaded
});
