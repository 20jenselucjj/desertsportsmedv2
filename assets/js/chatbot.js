// Desert Sports Med - Chatbot JavaScript

// Check if the chatbot has already been initialized to prevent duplicate initialization
if (typeof window.chatbotInitialized === 'undefined') {
    window.chatbotInitialized = true;

    document.addEventListener('DOMContentLoaded', function() {
        initChatbot();

        // Check if the URL contains a parameter to open the chatbot automatically
        const urlParams = new URLSearchParams(window.location.search);
        const openChatbot = urlParams.get('chatbot');

        if (openChatbot === 'open') {
            // Open the chatbot automatically
            const chatbotContainer = document.querySelector('.chatbot-container');
            const chatbotToggle = document.querySelector('.chatbot-toggle');

            if (chatbotContainer && chatbotToggle) {
                chatbotContainer.classList.add('active');
                chatbotToggle.classList.add('active');

                // Set flag to prevent welcome bubble
                sessionStorage.setItem('welcomeBubbleShown', 'true');

                // Remove any existing welcome bubble
                const welcomeBubble = document.querySelector('.welcome-bubble');
                if (welcomeBubble) {
                    welcomeBubble.classList.remove('active');
                    setTimeout(() => {
                        if (welcomeBubble.parentNode) {
                            welcomeBubble.remove();
                        }
                    }, 300);
                }
            }
        } else {
            // Show welcome popup after 1 second if chatbot is not auto-opened
            setTimeout(function() {
                showWelcomePopup();
            }, 1000);
        }
    });
}

// Chatbot knowledge base - trained on website content
// Use window object to prevent redeclaration
window.knowledgeBase = window.knowledgeBase || {
    // Services information
    services: {
        general: "Our services:<br>• <b>Medical Tents</b><br>• <b>On-Field Medical Coverage</b><br>• <b>Performance Therapy</b>",
        medicalTents: "<b>Medical Tents:</b><br>• Professional setup with treatment tables & privacy screens<br>• Certified athletic trainers<br>• Essential emergency equipment (AEDs, spine boards)<br>• Complete medical supplies<br>• Emergency planning with EMS coordination<br>• Detailed documentation",
        onFieldCoverage: "<b>On-Field Medical Coverage:</b><br>• Sideline positioning for immediate access<br>• Portable medical kits<br>• On-site injury assessment<br>• Evidence-based return-to-play decisions<br>• Continuous monitoring throughout events<br>• Field-specific emergency plans",
        performanceTherapy: "<b>Performance Therapy:</b><br>• Manual therapy techniques<br>• Movement pattern correction<br>• Neuromuscular re-education<br>• Recovery strategies<br>• Performance enhancement",
        athleticTraining: "<b>Athletic Training:</b><br>• Injury prevention & treatment<br>• Emergency care<br>• Rehabilitation<br>• Return-to-play protocols",
        injuryPrevention: "<b>Injury Prevention:</b><br>• Risk assessment<br>• Prevention plans<br>• Corrective exercises<br>• Movement training",
        performanceEnhancement: "<b>Performance Enhancement:</b><br>• Biomechanical analysis<br>• Sport-specific training<br>• Strength & conditioning<br>• Recovery strategies"
    },

    // Programs information
    programs: {
        general: "<b>Our services:</b><br>• <b>Medical Tents</b> - Centralized treatment facilities for events<br>• <b>On-Field Coverage</b> - Immediate sideline medical response<br>• <b>Performance Therapy</b> - Specialized treatment for athletes",
        medicalTentBenefits: "<b>Benefits of Medical Tents:</b><br>• Centralized treatment facility<br>• Multiple patient capacity<br>• Comprehensive equipment<br>• Privacy for treatments<br>• Weather protection",
        onFieldBenefits: "<b>Benefits of On-Field Coverage:</b><br>• Instant injury response<br>• Immediate assessment at injury site<br>• Qualified return-to-play decisions<br>• Continuous monitoring<br>• Reduced injury severity",
        performanceTherapyBenefits: "<b>Benefits of Performance Therapy:</b><br>• Enhanced athletic performance<br>• Injury prevention<br>• Faster recovery between sessions<br>• Improved body awareness<br>• Personalized treatment plans",
        assessment: "<b>Assessment includes:</b><br>• Movement analysis<br>• Strength testing<br>• Sport-specific evaluation<br>• Injury risk screening"
    },

    // Contact and location information
    contact: {
        phone: "(801) 797-4043",
        email: "desertsportsmed@gmail.com",
        address: "St. George, UT 84770",
        hours: "Monday - Friday: 7:00 AM - 7:00 PM\nSaturday: 8:00 AM - 2:00 PM\nSunday: Closed"
    },

    // Booking information
    booking: {
        methods: "You can book an appointment in several ways: Visit our <a href='book-online.html' target='_blank'>Book Online</a> page, call us at (801) 797-4043, or email us at <a href='mailto:desertsportsmed@gmail.com'>desertsportsmed@gmail.com</a>.",
        online: "Our online booking system allows you to schedule appointments for various services including Athletic Training Assessment, Sports Performance, Team Services, Event Coverage, and Performance Therapy.",
        freeIntro: "Start with a <a href='free-intro.html' target='_blank'>Free Athletic Training Consultation</a> to discuss your athletic needs and see if we're a good fit for you. This is a quick consultation with a certified athletic trainer to understand your goals and how we can help."
    },

    // Pricing information
    pricing: {
        general: "Our pricing varies depending on the service you need. We offer single event coverage, seasonal contracts, and performance therapy options. Visit our pricing page or contact us directly for a personalized quote based on your specific needs.",
        medicalTents: "Medical Tent pricing is based on event size, duration, and specific requirements. We offer both single event coverage and seasonal contracts to meet your needs.",
        onFieldCoverage: "On-Field Coverage pricing depends on the number of athletic trainers needed, event duration, and specific requirements. Contact us for a custom quote tailored to your event.",
        performanceTherapy: "Performance Therapy sessions are available on a per-session basis or as part of a package. Current rates are available upon request.",
        insurance: "We work with most major insurance providers for athletic training services. However, coverage varies depending on your specific plan and the services you need. We recommend contacting your insurance provider to verify coverage."
    },

    // About information
    about: {
        company: "Desert Sports Med was founded in 2015 with a simple mission: to provide the highest quality athletic training services to athletes and teams in St. George, Utah. What began as a small practice has grown into a comprehensive athletic training center, offering a wide range of services from injury prevention and assessment to performance enhancement and event coverage.",
        approach: "Our approach combines evidence-based athletic training practices with personalized care from certified athletic trainers, ensuring that each athlete receives the attention and expertise they need to achieve their performance goals and stay injury-free.",
        staff: "Our team consists of certified athletic trainers with extensive experience working with athletes at all levels.",
        certification: "All our athletic trainers are certified by the Board of Certification (BOC) and licensed by the state of Utah."
    },

    // FAQ information
    faq: {
        athleticTrainer: "Certified Athletic Trainers are highly qualified healthcare professionals with specific education, state licensing, and continuing education requirements who can recognize injuries, provide emergency care, make return-to-play decisions, and reduce liability.",
        difference: "Athletic trainers focus on injury prevention, immediate care, and return-to-play protocols specifically for athletes and sporting events, while physical therapists typically work with a broader range of patients and conditions.",
        insurance: "We work with most major insurance providers for athletic training services. However, coverage varies depending on your specific plan and the services you need. We recommend contacting your insurance provider to verify coverage.",
        medicalTents: "Medical Tents serve as centralized treatment facilities at your event - mini field hospitals strategically positioned to serve all participants with the equipment to handle multiple injuries simultaneously.",
        onFieldCoverage: "On-field coverage brings certified athletic trainers directly to the action, providing immediate response exactly where injuries occur with zero delay.",
        performanceTherapy: "Performance Therapy is a specialized approach that combines various manual therapy techniques, movement assessments, and corrective exercises to enhance physical performance and accelerate recovery.",
        sportsCovered: "We work with athletes from all sports including but not limited to: football, basketball, soccer, baseball, volleyball, track and field, swimming, tennis, golf, and combat sports.",
        ageGroups: "We work with athletes of all ages, from youth sports to high school, college, professional, and adult recreational athletes.",
        eventServices: "Our event services include medical tents with full equipment and supplies, on-field coverage with certified athletic trainers, emergency planning, and detailed documentation.",
        pricing: "Our pricing structure includes these main options:<br>• <b>Single Event:</b> One-time coverage for individual tournaments or competitions<br>• <b>Multiple Events:</b> Coverage for a series of related events<br>• <b>Seasonal Contract:</b> Ongoing coverage for teams or recurring events<br>• <b>Performance Therapy:</b> Individual sessions for athletes<br><br>For specific rates, please visit our pricing page or contact us directly.",
        bookingProcess: "You can book our services through our website's booking system, by calling (801) 797-4043, or by emailing desertsportsmed@gmail.com. We recommend starting with a free consultation to discuss your specific needs."
    }
};

// Function to type text with animation
function typeText(element, text, cursor, index, speed) {
    if (index < text.length) {
        // Handle HTML tags (like <strong>)
        if (text[index] === '<') {
            // Find the closing bracket
            const closingIndex = text.indexOf('>', index);
            if (closingIndex !== -1) {
                // Add the entire tag at once
                const tag = text.substring(index, closingIndex + 1);
                element.innerHTML = element.innerHTML.replace(cursor.outerHTML, '') + tag;
                element.appendChild(cursor);
                // Continue typing after the tag
                setTimeout(() => {
                    typeText(element, text, cursor, closingIndex + 1, speed);
                }, 0);
                return;
            }
        }

        // Handle closing tags
        if (text[index] === '<' && text[index + 1] === '/') {
            // Find the closing bracket
            const closingIndex = text.indexOf('>', index);
            if (closingIndex !== -1) {
                // Add the entire closing tag at once
                const tag = text.substring(index, closingIndex + 1);
                element.innerHTML = element.innerHTML.replace(cursor.outerHTML, '') + tag;
                element.appendChild(cursor);
                // Continue typing after the tag
                setTimeout(() => {
                    typeText(element, text, cursor, closingIndex + 1, speed);
                }, 0);
                return;
            }
        }

        // Regular character
        element.innerHTML = element.innerHTML.replace(cursor.outerHTML, '') + text[index];
        element.appendChild(cursor);

        // Random typing speed variation for realistic effect
        const randomSpeed = speed + Math.random() * 50 - 25;

        setTimeout(() => {
            typeText(element, text, cursor, index + 1, speed);
        }, randomSpeed);
    }
}

// Function to show welcome bubble
function showWelcomePopup() {
    // Don't show welcome bubble if chatbot is already open
    const chatbotContainer = document.querySelector('.chatbot-container');
    if (chatbotContainer && chatbotContainer.classList.contains('active')) {
        return;
    }

    // Check if user has already seen the bubble (using sessionStorage to show once per session)
    if (sessionStorage.getItem('welcomeBubbleShown')) {
        return;
    }

    // Create welcome bubble elements
    const welcomeBubble = document.createElement('div');
    welcomeBubble.className = 'welcome-bubble';
    welcomeBubble.innerHTML = `
        <div class="welcome-bubble-icon"><i class="fas fa-comment-dots"></i></div>
        <div class="welcome-bubble-content"></div>
        <button class="welcome-bubble-close"><i class="fas fa-times"></i></button>
    `;

    // Text to type - shorter, more concise message
    const textToType = '<strong>Questions?</strong> Chat with us!';

    // Calculate approximate typing time (average 50ms per character plus buffer)
    const typingTime = textToType.length * 50 + 1000;

    // Add bubble to body
    document.body.appendChild(welcomeBubble);

    // Show bubble with animation
    setTimeout(() => {
        welcomeBubble.classList.add('active');

        // Get the content element for typing animation
        const contentElement = welcomeBubble.querySelector('.welcome-bubble-content');

        // Add typing cursor
        const cursor = document.createElement('span');
        cursor.className = 'typing-cursor';
        contentElement.appendChild(cursor);

        // Start typing animation after bubble appears
        setTimeout(() => {
            typeText(contentElement, textToType, cursor, 0, 50);
        }, 300);
    }, 100);

    // Auto-hide bubble after typing is complete plus 10 seconds for reading
    setTimeout(() => {
        if (welcomeBubble.parentNode) {
            welcomeBubble.classList.remove('active');
            setTimeout(() => {
                if (welcomeBubble.parentNode) {
                    welcomeBubble.remove();
                }
            }, 300);
        }
    }, typingTime + 10000);

    // Close bubble event
    const closeBtn = welcomeBubble.querySelector('.welcome-bubble-close');
    closeBtn.addEventListener('click', (e) => {
        e.stopPropagation(); // Prevent bubble click event
        welcomeBubble.classList.remove('active');
        setTimeout(() => {
            welcomeBubble.remove();
        }, 300);

        // Set flag in sessionStorage
        sessionStorage.setItem('welcomeBubbleShown', 'true');
    });

    // Click on bubble to open chatbot
    welcomeBubble.addEventListener('click', () => {
        welcomeBubble.classList.remove('active');
        setTimeout(() => {
            welcomeBubble.remove();
        }, 300);

        // Open chatbot
        const chatbotContainer = document.querySelector('.chatbot-container');
        const chatbotInput = document.querySelector('.chatbot-input input');
        if (chatbotContainer) {
            chatbotContainer.classList.add('active');
            if (chatbotInput) chatbotInput.focus();

            // Trigger welcome message if it's the first time
            const chatbotMessages = document.querySelector('.chatbot-messages');
            if (chatbotMessages && chatbotMessages.children.length === 0) {
                setTimeout(() => {
                    addBotMessage("👋 How can I help you today?");
                    showOptions([
                        "Athletic training",
                        "Services",
                        "Book appointment",
                        "Pricing",
                        "Location"
                    ]);
                }, 500);
            }
        }

        // Set flag in sessionStorage
        sessionStorage.setItem('welcomeBubbleShown', 'true');
    });
}

function initChatbot() {
    const chatbotToggle = document.querySelector('.chatbot-toggle');
    const chatbotContainer = document.querySelector('.chatbot-container');
    const chatbotClose = document.querySelector('.chatbot-close');
    const chatbotInput = document.querySelector('.chatbot-input input');
    const chatbotSendBtn = document.querySelector('.chatbot-input button');
    const chatbotMessages = document.querySelector('.chatbot-messages');

    if (!chatbotToggle || !chatbotContainer) return;

    // Toggle chatbot visibility
    chatbotToggle.addEventListener('click', function() {
        // Add clicked class for button animation
        chatbotToggle.classList.add('clicked');

        // Remove the clicked class after animation completes
        setTimeout(() => {
            chatbotToggle.classList.remove('clicked');
        }, 500);

        // Toggle chatbot visibility
        chatbotContainer.classList.toggle('active');

        // Toggle active class on the button for icon animation
        chatbotToggle.classList.toggle('active');

        // Remove welcome bubble if it exists
        const welcomeBubble = document.querySelector('.welcome-bubble');
        if (welcomeBubble) {
            welcomeBubble.classList.remove('active');
            setTimeout(() => {
                if (welcomeBubble.parentNode) {
                    welcomeBubble.remove();
                }
            }, 300);

            // Set flag in sessionStorage to prevent it from showing again in this session
            sessionStorage.setItem('welcomeBubbleShown', 'true');
        }

        if (chatbotContainer.classList.contains('active')) {
            // Focus on input after animation completes
            setTimeout(() => {
                chatbotInput.focus();
            }, 500);

            if (chatbotMessages.children.length === 0) {
                // Send welcome message if it's the first time opening
                setTimeout(() => {
                    addBotMessage("👋 How can I help you today?");
                    showOptions([
                        "Athletic training",
                        "Services",
                        "Book appointment",
                        "Pricing",
                        "Location"
                    ]);
                }, 800); // Slightly longer delay for better user experience
            }
        }
    });

    // Close chatbot
    if (chatbotClose) {
        chatbotClose.addEventListener('click', function() {
            // Add a smooth closing animation
            chatbotContainer.style.opacity = '0';
            chatbotContainer.style.transform = 'scale(0.8) translateY(20px)';

            // Remove active class after animation completes
            setTimeout(() => {
                chatbotContainer.classList.remove('active');
                // Reset styles for next opening
                chatbotContainer.style.opacity = '';
                chatbotContainer.style.transform = '';

                // Remove active class from toggle button
                chatbotToggle.classList.remove('active');

                // Remove welcome bubble if it exists
                const welcomeBubble = document.querySelector('.welcome-bubble');
                if (welcomeBubble) {
                    welcomeBubble.classList.remove('active');
                    setTimeout(() => {
                        if (welcomeBubble.parentNode) {
                            welcomeBubble.remove();
                        }
                    }, 300);
                }
            }, 300);
        });
    }

    // Send message on button click
    if (chatbotSendBtn) {
        chatbotSendBtn.addEventListener('click', sendMessage);
    }

    // Send message on Enter key
    if (chatbotInput) {
        chatbotInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                sendMessage();
            }
        });
    }

    // Add document click listener to close chatbot when clicking outside
    document.addEventListener('click', function(e) {
        if (
            chatbotContainer.classList.contains('active') &&
            !chatbotContainer.contains(e.target) &&
            e.target !== chatbotToggle &&
            !chatbotToggle.contains(e.target)
        ) {
            // Add a smooth closing animation
            chatbotContainer.style.opacity = '0';
            chatbotContainer.style.transform = 'scale(0.8) translateY(20px)';

            // Remove active class after animation completes
            setTimeout(() => {
                chatbotContainer.classList.remove('active');
                // Reset styles for next opening
                chatbotContainer.style.opacity = '';
                chatbotContainer.style.transform = '';

                // Remove active class from toggle button
                chatbotToggle.classList.remove('active');

                // Remove welcome bubble if it exists
                const welcomeBubble = document.querySelector('.welcome-bubble');
                if (welcomeBubble) {
                    welcomeBubble.classList.remove('active');
                    setTimeout(() => {
                        if (welcomeBubble.parentNode) {
                            welcomeBubble.remove();
                        }
                    }, 300);
                }
            }, 300);
        }
    });

    // Function to send user message
    function sendMessage() {
        const message = chatbotInput.value.trim();

        if (message === '') return;

        // Add user message to chat
        addUserMessage(message);

        // Clear input
        chatbotInput.value = '';

        // Show typing indicator
        showTypingIndicator();

        // Process the message and respond (with a slight delay to simulate thinking)
        setTimeout(() => {
            processMessage(message);
        }, 1000);
    }

    // Function to add user message to chat
    function addUserMessage(text) {
        const messageElement = document.createElement('div');
        messageElement.className = 'message user';
        messageElement.innerHTML = `<div class="message-content">${text}</div>`;
        chatbotMessages.appendChild(messageElement);
        scrollToBottom();
    }

    // Function to add bot message to chat
    function addBotMessage(text) {
        // Remove typing indicator if it exists
        const typingIndicator = chatbotMessages.querySelector('.typing-indicator');
        if (typingIndicator) {
            typingIndicator.remove();
        }

        const messageElement = document.createElement('div');
        messageElement.className = 'message bot';
        messageElement.innerHTML = `<div class="message-content">${text}</div>`;
        chatbotMessages.appendChild(messageElement);

        // Process any links in the message to make them work
        const links = messageElement.querySelectorAll('a');
        links.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const href = this.getAttribute('href');
                if (href) {
                    window.open(href, '_blank');
                }
            });
        });

        scrollToBottom();
    }

    // Function to show typing indicator
    function showTypingIndicator() {
        const typingElement = document.createElement('div');
        typingElement.className = 'typing-indicator';
        typingElement.innerHTML = `
            <span></span>
            <span></span>
            <span></span>
        `;
        chatbotMessages.appendChild(typingElement);
        scrollToBottom();
    }

    // Function to show clickable options
    function showOptions(options) {
        const optionsContainer = document.createElement('div');
        optionsContainer.className = 'chatbot-options';

        options.forEach(option => {
            const optionElement = document.createElement('div');
            optionElement.className = 'chatbot-option';
            optionElement.textContent = option;
            optionElement.addEventListener('click', function() {
                addUserMessage(option);
                showTypingIndicator();
                setTimeout(() => {
                    processMessage(option);
                }, 1000);
            });
            optionsContainer.appendChild(optionElement);
        });

        const messageElement = document.createElement('div');
        messageElement.className = 'message bot';
        messageElement.appendChild(optionsContainer);
        chatbotMessages.appendChild(messageElement);
        scrollToBottom();
    }

    // Function to scroll chat to bottom
    function scrollToBottom() {
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    }

    // Function to process user message and generate response
    function processMessage(message) {
        message = message.toLowerCase();

        // Check for keywords and respond accordingly
        if (message.includes('hello') || message.includes('hi') || message.includes('hey') || message === '') {
            addBotMessage("Hello! How can I help you today?");
            // Show main service options for greeting
            showOptions([
                "Medical Tents",
                "On-Field Coverage",
                "Performance Therapy",
                "Pricing Information",
                "Book a Consultation"
            ]);
        }
        // Services section
        else if (message.includes('services') || message.includes('what do you offer') || message === 'services') {
            addBotMessage(window.knowledgeBase.services.general);
            showOptions([
                "Tell me about Medical Tents",
                "Tell me about On-Field Coverage",
                "Tell me about Performance Therapy"
            ]);
        }
        else if (message.includes('medical tent') || message.includes('medical tents')) {
            addBotMessage(window.knowledgeBase.faq.medicalTents);
            addBotMessage(window.knowledgeBase.services.medicalTents);
            showOptions([
                "Benefits of Medical Tents",
                "Request Medical Tent Pricing",
                "Book a Medical Tent Consultation"
            ]);
        }
        else if (message.includes('on-field') || message.includes('on field') || message.includes('sideline')) {
            addBotMessage(window.knowledgeBase.faq.onFieldCoverage);
            addBotMessage(window.knowledgeBase.services.onFieldCoverage);
            showOptions([
                "Benefits of On-Field Coverage",
                "Request On-Field Coverage Pricing",
                "Book an On-Field Coverage Consultation"
            ]);
        }
        else if (message.includes('performance therapy')) {
            addBotMessage(window.knowledgeBase.faq.performanceTherapy);
            addBotMessage(window.knowledgeBase.services.performanceTherapy);
            showOptions([
                "Benefits of Performance Therapy",
                "Performance Therapy Pricing",
                "Book a Performance Therapy Session"
            ]);
        }
        // Benefits section
        else if (message.includes('benefits') && message.includes('medical tent')) {
            addBotMessage(window.knowledgeBase.programs.medicalTentBenefits);
        }
        else if (message.includes('benefits') && (message.includes('on-field') || message.includes('on field'))) {
            addBotMessage(window.knowledgeBase.programs.onFieldBenefits);
        }
        else if (message.includes('benefits') && message.includes('performance therapy')) {
            addBotMessage(window.knowledgeBase.programs.performanceTherapyBenefits);
        }
        else if (message.includes('athletic training') || message === 'athletic training') {
            addBotMessage(window.knowledgeBase.services.athleticTraining);
        }
        else if (message.includes('injury prevention')) {
            addBotMessage(window.knowledgeBase.services.injuryPrevention);
        }
        else if (message.includes('performance enhancement')) {
            addBotMessage(window.knowledgeBase.services.performanceEnhancement);
        }
        else if (message.includes('book') || message.includes('appointment') || message.includes('schedule') || message.includes('free intro') || message.includes('consultation') || message === 'book appointment') {
            addBotMessage(window.knowledgeBase.booking.methods);
            addBotMessage("<a href='book-online.html' target='_blank'>Click here to view all booking options</a>");
        }
        else if (message.includes('view all booking') || message.includes('booking options')) {
            addBotMessage("You can view all our booking options and schedule directly on our booking page:");
            addBotMessage("<a href='book-online.html' target='_blank'>Click here to open our booking page</a>");
        }
        else if (message.includes('book a free') || message.includes('free intro') || message.includes('free athletic') || message.includes('free consultation')) {
            addBotMessage(window.knowledgeBase.booking.freeIntro + " <a href='free-intro.html' target='_blank'>Book now</a>");
        }
        else if (message.includes('book an athletic training') || message.includes('athletic training assessment') || message.includes('first appointment')) {
            addBotMessage("Athletic Training Assessment: Our trainer will assess your movement, identify risks, and create a plan.");
            addBotMessage("<a href='book-online.html#athletic-training-content' target='_blank'>Click here to book an Athletic Training Assessment</a>");
        }
        else if (message.includes('book a sports performance') || message.includes('sports performance session')) {
            addBotMessage("Sports Performance: Improve strength, speed, power, and agility.");
            addBotMessage("• Assessment (60 min)<br>• Training (60 min)");
            addBotMessage("<a href='book-online.html#sports-performance-content' target='_blank'>Click here to book a Sports Performance session</a>");
        }
        else if (message.includes('book a team') || message.includes('team services')) {
            addBotMessage("Team Services: Athletic training support for sports teams.");
            addBotMessage("• Team Services Consultation (45 min)");
            addBotMessage("<a href='book-online.html#team-services-content' target='_blank'>Click here to book a Team Services consultation</a>");
        }
        else if (message.includes('book an event') || message.includes('event coverage')) {
            addBotMessage("Event Coverage: Athletic trainers for sporting events.");
            addBotMessage("• Event Coverage Consultation (30 min)");
            addBotMessage("<a href='book-online.html#event-coverage-content' target='_blank'>Click here to book an Event Coverage consultation</a>");
        }
        else if (message.includes('book a performance therapy') || message.includes('performance therapy session')) {
            addBotMessage("Performance Therapy: Optimize function and prevent injuries.");
            addBotMessage("• Performance Therapy Session (60 min)");
            addBotMessage("<a href='book-online.html#performance-therapy-content' target='_blank'>Click here to book a Performance Therapy session</a>");
        }
        // Pricing information
        else if (message.includes('pricing information') || message.includes('price') || message.includes('cost') || message.includes('fee') || message.includes('request pricing') || message === 'pricing') {
            addBotMessage(window.knowledgeBase.faq.pricing);
            addBotMessage("You can visit our <a href='pricing-request.html' target='_blank'>pricing page</a> for more information or contact us directly at <a href='tel:(801) 797-4043'>(801) 797-4043</a> or <a href='mailto:desertsportsmed@gmail.com'>desertsportsmed@gmail.com</a>.");
            // Show pricing options with more descriptive text
            showOptions([
                "Medical Tent Pricing",
                "On-Field Coverage Pricing",
                "Performance Therapy Pricing",
                "Request Custom Quote"
            ]);
        }
        else if (message.includes('medical tent') && (message.includes('pricing') || message.includes('cost'))) {
            addBotMessage(window.knowledgeBase.pricing.medicalTents);
            addBotMessage("Visit our <a href='pricing-request.html' target='_blank'>pricing page</a> or contact us at <a href='tel:(801) 797-4043'>(801) 797-4043</a> for a custom quote.");
            showPricingRequestForm();
        }
        else if ((message.includes('on-field') || message.includes('on field')) && (message.includes('pricing') || message.includes('cost'))) {
            addBotMessage(window.knowledgeBase.pricing.onFieldCoverage);
            addBotMessage("Visit our <a href='pricing-request.html' target='_blank'>pricing page</a> or contact us at <a href='tel:(801) 797-4043'>(801) 797-4043</a> for a custom quote.");
            showPricingRequestForm();
        }
        else if (message.includes('performance therapy') && (message.includes('pricing') || message.includes('cost'))) {
            addBotMessage(window.knowledgeBase.pricing.performanceTherapy);
            addBotMessage("Visit our <a href='pricing-request.html' target='_blank'>pricing page</a> or contact us at <a href='tel:(801) 797-4043'>(801) 797-4043</a> for current rates.");
            showPricingRequestForm();
        }
        else if (message.includes('custom quote') || message.includes('request quote')) {
            addBotMessage("We'd be happy to provide a custom quote for your specific needs.");
            addBotMessage("Visit our <a href='pricing-request.html' target='_blank'>pricing page</a> or contact us directly at <a href='tel:(801) 797-4043'>(801) 797-4043</a> or <a href='mailto:desertsportsmed@gmail.com'>desertsportsmed@gmail.com</a>.");
            showPricingRequestForm();
        }
        else if (message.includes('insurance')) {
            addBotMessage(window.knowledgeBase.pricing.insurance);
        }
        // Contact information
        else if (message.includes('location') || message.includes('address') || message.includes('where') || message === 'location') {
            addBotMessage(`We're located in St. George: <a href="https://maps.google.com/?q=${encodeURIComponent(window.knowledgeBase.contact.address)}" target="_blank">${window.knowledgeBase.contact.address}</a>`);
        }
        else if (message.includes('hours') || message.includes('when are you open')) {
            addBotMessage("Hours: " + window.knowledgeBase.contact.hours.replace(/\n/g, '<br>'));
        }
        else if (message.includes('contact') || message.includes('talk to someone') || message.includes('speak') || message.includes('contact information')) {
            addBotMessage(`Contact us:<br>• Phone: <a href="tel:${window.knowledgeBase.contact.phone}">${window.knowledgeBase.contact.phone}</a><br>• Email: <a href="mailto:${window.knowledgeBase.contact.email}">${window.knowledgeBase.contact.email}</a>`);
            showOptions([
                "Book a Free Consultation",
                "Request Pricing Information",
                "View Services"
            ]);
        }
        else if (message.includes('thank')) {
            addBotMessage("You're welcome! Is there anything else I can help you with today?");
        }
        else if (message.includes('no, that') || message.includes("that's all")) {
            addBotMessage("Great! Feel free to come back if you have any other questions. Have a wonderful day!");
        }
        // FAQ Responses
        else if (message.includes('what is an athletic trainer') || message.includes('who are athletic trainers')) {
            addBotMessage(window.knowledgeBase.faq.athleticTrainer);
        }
        else if (message.includes('different from physical therapy') || message.includes('difference between')) {
            addBotMessage(window.knowledgeBase.faq.difference);
        }
        else if (message.includes('what sports') || message.includes('sports do you work with')) {
            addBotMessage(window.knowledgeBase.faq.sportsCovered);
        }
        else if (message.includes('age groups') || message.includes('ages')) {
            addBotMessage(window.knowledgeBase.faq.ageGroups);
        }
        else if (message.includes('team services include') || message.includes('what does team services')) {
            addBotMessage(window.knowledgeBase.faq.teamServices);
        }
        else if (message.includes('event coverage include') || message.includes('what does event coverage')) {
            addBotMessage(window.knowledgeBase.faq.eventCoverage);
        }
        else if (message.includes('what is performance therapy')) {
            addBotMessage(window.knowledgeBase.faq.performanceTherapy);
        }
        else if (message.includes('first visit') || message.includes('what happens during')) {
            addBotMessage(window.knowledgeBase.faq.firstVisit);
        }
        else if (message.includes('what should i wear') || message.includes('equipment needed')) {
            addBotMessage(window.knowledgeBase.faq.equipment);
        }
        else if (message.includes('remote') || message.includes('virtual') || message.includes('online consultation')) {
            addBotMessage(window.knowledgeBase.faq.remoteServices);
        }
        else if (message.includes('insurance cover') || message.includes('covered by insurance')) {
            addBotMessage(window.knowledgeBase.faq.insurance);
        }
        else if (message.includes('staff') || message.includes('your team') || message.includes('trainers')) {
            addBotMessage(window.knowledgeBase.about.staff);
            addBotMessage(window.knowledgeBase.about.certification);
        }
        else if (message.includes('i have more questions') || message.includes('deeper question')) {
            addBotMessage("For more detailed information about our services, please contact us directly:");
        }
        else if (message.includes('call us')) {
            addBotMessage(`Call us at: <a href="tel:${window.knowledgeBase.contact.phone}">${window.knowledgeBase.contact.phone}</a>`);
        }
        else if (message.includes('email us')) {
            addBotMessage(`Email us at: <a href="mailto:${window.knowledgeBase.contact.email}">${window.knowledgeBase.contact.email}</a>`);
        }
        // Additional booking handlers
        else if (message.includes('book an assessment') || (message.includes('book') && message.includes('assessment') && !message.includes('athletic') && !message.includes('sports'))) {
            addBotMessage("We offer different types of assessments to meet your specific needs:");
            addBotMessage("<a href='book-online.html' target='_blank'>Click here to view all booking options</a>");
        }
        else if (message.includes('book a virtual consultation') || message.includes('virtual consultation')) {
            addBotMessage("Our virtual consultations allow you to meet with our athletic trainers remotely.");
            addBotMessage("<a href='book-online.html' target='_blank'>Click here to book a virtual consultation</a>");
        }
        else if (message.includes('what happens during a virtual consultation')) {
            addBotMessage("During a virtual consultation, our athletic trainer will assess your movement patterns, discuss your goals and concerns, and provide recommendations. You'll need a device with a camera and enough space to perform basic movements.");
        }
        else if (message.includes('what happens during the assessment') || message.includes('assessment include')) {
            addBotMessage("During an Athletic Training Assessment, our certified athletic trainer will:");
            addBotMessage("• Review your health and activity history<br>• Assess your movement patterns<br>• Identify potential injury risks<br>• Create a personalized plan<br>• Provide immediate recommendations");
        }
        // FAQ about certified athletic trainers
        else if (message.includes('certified athletic trainer') || message.includes('why choose certified')) {
            addBotMessage(window.knowledgeBase.faq.athleticTrainer);
            showOptions([
                "Medical Tent Services",
                "On-Field Coverage Services",
                "Book a Consultation"
            ]);
        }
        // Booking process
        else if (message.includes('booking process') || message.includes('how to book')) {
            addBotMessage(window.knowledgeBase.faq.bookingProcess);
            showOptions([
                "Book a Free Consultation",
                "View All Services",
                "Contact Us"
            ]);
        }
        // Fallback response
        else {
            addBotMessage("I'm not sure I understand. How can I help you today?");
            // Show main options for fallback response
            showOptions([
                "Our Services",
                "Pricing Information",
                "Book a Consultation",
                "Contact Us",
                "Why Choose Certified Athletic Trainers?"
            ]);
        }
    }

    // Function to show pricing request form
    function showPricingRequestForm() {
        addBotMessage("I'd be happy to help you request detailed pricing information. Please fill out this quick form:");

        const formHTML = `
        <div class="chatbot-form">
            <h4>Pricing Request Form</h4>
            <div class="chatbot-form-field">
                <label for="pricing-name">Your Name</label>
                <input type="text" id="pricing-name" placeholder="Full Name">
            </div>
            <div class="chatbot-form-field">
                <label for="pricing-email">Email Address</label>
                <input type="email" id="pricing-email" placeholder="email@example.com">
            </div>
            <div class="chatbot-form-field">
                <label for="pricing-phone">Phone Number</label>
                <input type="tel" id="pricing-phone" placeholder="(123) 456-7890">
            </div>
            <div class="chatbot-form-field">
                <label>Services of Interest (select all that apply)</label>
                <div>
                    <input type="checkbox" id="pricing-medical-tents" value="Medical Tents">
                    <label for="pricing-medical-tents" style="display:inline;">Medical Tents</label>
                </div>
                <div>
                    <input type="checkbox" id="pricing-on-field" value="On-Field Coverage">
                    <label for="pricing-on-field" style="display:inline;">On-Field Coverage</label>
                </div>
                <div>
                    <input type="checkbox" id="pricing-therapy" value="Performance Therapy">
                    <label for="pricing-therapy" style="display:inline;">Performance Therapy</label>
                </div>
                <div>
                    <input type="checkbox" id="pricing-single-event" value="Single Event">
                    <label for="pricing-single-event" style="display:inline;">Single Event</label>
                </div>
                <div>
                    <input type="checkbox" id="pricing-multiple-events" value="Multiple Events">
                    <label for="pricing-multiple-events" style="display:inline;">Multiple Events</label>
                </div>
                <div>
                    <input type="checkbox" id="pricing-seasonal" value="Seasonal Contract">
                    <label for="pricing-seasonal" style="display:inline;">Seasonal Contract</label>
                </div>
            </div>
            <button class="chatbot-form-submit" id="pricing-submit">Request Pricing</button>
        </div>
        `;

        const messageElement = document.createElement('div');
        messageElement.className = 'message bot';
        messageElement.innerHTML = `<div class="message-content">${formHTML}</div>`;
        chatbotMessages.appendChild(messageElement);
        scrollToBottom();

        // Add event listener to the submit button
        document.getElementById('pricing-submit').addEventListener('click', function() {
            const name = document.getElementById('pricing-name').value.trim();
            const email = document.getElementById('pricing-email').value.trim();
            const phone = document.getElementById('pricing-phone').value.trim();

            // Validate form
            if (!name || !email || !phone) {
                alert('Please fill out all required fields.');
                return;
            }

            // Get selected services
            const services = [];
            if (document.getElementById('pricing-medical-tents').checked) services.push('Medical Tents');
            if (document.getElementById('pricing-on-field').checked) services.push('On-Field Coverage');
            if (document.getElementById('pricing-therapy').checked) services.push('Performance Therapy');
            if (document.getElementById('pricing-single-event').checked) services.push('Single Event');
            if (document.getElementById('pricing-multiple-events').checked) services.push('Multiple Events');
            if (document.getElementById('pricing-seasonal').checked) services.push('Seasonal Contract');

            // Process form submission
            addUserMessage(`Requested pricing information for: ${services.join(', ')}`);
            addBotMessage("Thank you for your request! We'll send detailed pricing information to you shortly. A member of our team will contact you within 24 business hours.");
            addBotMessage("In the meantime, you can visit our <a href='pricing-request.html' target='_blank'>pricing page</a> for more information or contact us directly at <a href='tel:(801) 797-4043'>(801) 797-4043</a>.");

            // Show follow-up options
            showOptions([
                "View Services",
                "Book a Consultation",
                "Contact Us"
            ]);
        });
    }


}
