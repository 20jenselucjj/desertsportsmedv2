// Desert Sports Med - Chatbot JavaScript

// Check if the chatbot has already been initialized to prevent duplicate initialization
if (typeof window.chatbotInitialized === 'undefined') {
    window.chatbotInitialized = true;

    document.addEventListener('DOMContentLoaded', function() {
        initChatbot();

        // Show welcome popup after 1.5 seconds (reduced from 3 seconds)
        setTimeout(function() {
            showWelcomePopup();
        }, 1500);
    });
}

// Chatbot knowledge base - trained on website content
// Use window object to prevent redeclaration
window.knowledgeBase = window.knowledgeBase || {
    // Services information
    services: {
        general: "Our services:<br>• <b>Athletic Training</b><br>• <b>Sports Performance</b><br>• <b>Team Services</b><br>• <b>Event Coverage</b><br>• <b>Performance Therapy</b> (limited)",
        athleticTraining: "<b>Athletic Training:</b><br>• Injury prevention & treatment<br>• Emergency care<br>• Rehabilitation<br>• Return-to-play protocols",
        sportsPerformance: "<b>Sports Performance:</b><br>• Strength & conditioning<br>• Speed & agility training<br>• Sport-specific skills<br>• Personalized plans",
        teamServices: "<b>Team Services:</b><br>• Sideline coverage<br>• Injury management<br>• Team training programs<br>• Return-to-play protocols",
        eventCoverage: "<b>Event Coverage:</b><br>• On-site athletic trainers<br>• Injury assessment & care<br>• Emergency management<br>• Medical equipment",
        performanceTherapy: "<b>Performance Therapy:</b><br>• Manual therapy<br>• Movement assessment<br>• Corrective exercises<br>• Recovery strategies",
        injuryPrevention: "<b>Injury Prevention:</b><br>• Risk assessment<br>• Prevention plans<br>• Corrective exercises<br>• Movement training",
        performanceEnhancement: "<b>Performance Enhancement:</b><br>• Biomechanical analysis<br>• Sport-specific training<br>• Strength & conditioning<br>• Recovery strategies"
    },

    // Programs information
    programs: {
        general: "<b>Our programs:</b><br>• Injury Prevention<br>• Return to Sport<br>• Performance Optimization<br>• Team Services<br>• Event Coverage",
        returnToSport: "<b>Return to Sport:</b><br>• Injury assessment<br>• Personalized rehab<br>• Sport-specific training<br>• Gradual return to play",
        performanceOptimization: "<b>Performance Optimization:</b><br>• Movement analysis<br>• Personalized training<br>• Sport-specific drills<br>• Performance tracking",
        injuryPrevention: "<b>Injury Prevention:</b><br>• Risk assessment<br>• Prevention plan<br>• Corrective exercises<br>• Technique improvement",
        teamServices: "<b>Team Services:</b><br>• Team athletic training<br>• Injury prevention<br>• Immediate care<br>• Return-to-play management",
        eventCoverage: "<b>Event Coverage:</b><br>• On-site athletic trainers<br>• Medical equipment<br>• Injury management<br>• Emergency protocols",
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
        general: "Our pricing varies depending on the athletic training service you need. We offer individual sessions, team packages, and event coverage options. For detailed pricing information, please contact us directly and we'll provide you with a personalized quote based on your specific needs.",
        insurance: "We work with most major insurance providers for athletic training services. However, coverage varies depending on your specific plan and the services you need. We recommend contacting your insurance provider to verify coverage for athletic training and sports medicine services."
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
        athleticTrainer: "Athletic trainers are healthcare professionals who specialize in preventing, recognizing, and treating injuries related to physical activity. They work with athletes to optimize performance and provide immediate care for injuries.",
        difference: "Athletic trainers focus on injury prevention, immediate care, and return-to-play protocols specifically for athletes, while physical therapists typically work with a broader range of patients and conditions.",
        insurance: "Most major insurance plans cover athletic training services. We recommend contacting your insurance provider to verify coverage for your specific plan.",
        firstVisit: "Your first visit includes a comprehensive assessment of your movement patterns, injury history, and athletic goals. Our athletic trainer will create a personalized plan based on your specific needs.",
        equipment: "No special equipment is needed for your first visit. Just wear comfortable clothing that allows for movement assessment. Athletic attire is ideal.",
        sportsCovered: "We work with athletes from all sports including but not limited to: football, basketball, soccer, baseball, volleyball, track and field, swimming, tennis, golf, and combat sports.",
        ageGroups: "We work with athletes of all ages, from youth sports to high school, college, professional, and adult recreational athletes.",
        teamServices: "Our team services include sideline coverage for games and practices, injury prevention programs, return-to-play protocols, and athletic performance enhancement.",
        eventCoverage: "We provide certified athletic trainers for sporting events, tournaments, and competitions to ensure athlete safety and immediate care for injuries.",
        remoteServices: "Yes, we offer virtual consultations for athletes who cannot visit our facility in person. These sessions are ideal for follow-ups and movement assessments.",
        performanceTherapy: "Performance Therapy combines manual therapy techniques with corrective exercises to enhance physical performance and accelerate recovery. It's available on a limited basis."
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
    // Clear any existing welcome bubble flag to ensure it shows up
    sessionStorage.removeItem('welcomeBubbleShown');

    // For testing purposes, always show the welcome bubble
    // In production, you can uncomment the check below
    /*
    // Check if user has already seen the bubble (using sessionStorage to show once per session)
    if (sessionStorage.getItem('welcomeBubbleShown')) {
        return;
    }
    */

    // Create welcome bubble elements
    const welcomeBubble = document.createElement('div');
    welcomeBubble.className = 'welcome-bubble';
    welcomeBubble.innerHTML = `
        <div class="welcome-bubble-icon"><i class="fas fa-comment-dots"></i></div>
        <div class="welcome-bubble-content"></div>
        <button class="welcome-bubble-close"><i class="fas fa-times"></i></button>
    `;

    // Text to type - define it here so it's available in the entire function scope
    const textToType = '<strong>Hi there!</strong> Have a question about our services?';

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
                    addBotMessage("Hi there! 👋 I'm your Desert Sports Med virtual assistant. Our certified athletic trainers are here to help you prevent injuries and optimize performance. How can I help you today?");
                    showOptions([
                        "Tell me about athletic training",
                        "What services do you offer?",
                        "How can I book an appointment?",
                        "Request pricing information",
                        "Where are you located?"
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
        chatbotContainer.classList.toggle('active');
        if (chatbotContainer.classList.contains('active')) {
            chatbotInput.focus();
            if (chatbotMessages.children.length === 0) {
                // Send welcome message if it's the first time opening
                setTimeout(() => {
                    addBotMessage("Hi there! 👋 I'm your Desert Sports Med virtual assistant. Our certified athletic trainers are here to help you prevent injuries and optimize performance. How can I help you today?");
                    showOptions([
                        "Tell me about athletic training",
                        "What services do you offer?",
                        "How can I book an appointment?",
                        "Request pricing information",
                        "Where are you located?"
                    ]);
                }, 500);
            }
        }
    });

    // Close chatbot
    if (chatbotClose) {
        chatbotClose.addEventListener('click', function() {
            chatbotContainer.classList.remove('active');
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
            addBotMessage("Hello! I'm Desert Sports Med's chatbot. I can answer questions about our services using information from our website. How can I help you today?");
            // Only show initial options for greeting
            showOptions([
                "What services do you offer?",
                "Book a Free Athletic Training Consultation",
                "Request pricing information",
                "Contact information"
            ]);
        }
        else if (message.includes('athletic training')) {
            addBotMessage(window.knowledgeBase.services.athleticTraining);
        }
        else if (message.includes('services') || message.includes('what do you offer')) {
            addBotMessage(window.knowledgeBase.services.general);
            addBotMessage("• <a href='athletic-training.html'>Athletic Training</a><br>• <a href='sports-performance.html'>Sports Performance</a><br>• <a href='team-services.html'>Team Services</a><br>• <a href='event-coverage.html'>Event Coverage</a><br>• <a href='performance-therapy.html'>Performance Therapy</a>");
        }
        else if (message.includes('sports performance')) {
            addBotMessage(window.knowledgeBase.services.sportsPerformance);
        }
        else if (message.includes('team services')) {
            addBotMessage(window.knowledgeBase.services.teamServices);
        }
        else if (message.includes('event coverage')) {
            addBotMessage(window.knowledgeBase.services.eventCoverage);
        }
        else if (message.includes('performance therapy')) {
            addBotMessage(window.knowledgeBase.services.performanceTherapy);
        }
        else if (message.includes('performance') || message.includes('enhancement')) {
            addBotMessage(window.knowledgeBase.services.performanceEnhancement);
        }
        else if (message.includes('programs')) {
            addBotMessage(window.knowledgeBase.programs.general);
            addBotMessage("You can learn more about our athletic training services in the Services dropdown menu on our website.");
        }
        else if (message.includes('return to sport')) {
            addBotMessage(window.knowledgeBase.programs.returnToSport);
        }
        else if (message.includes('performance optimization')) {
            addBotMessage(window.knowledgeBase.programs.performanceOptimization);
        }
        else if (message.includes('injury prevention')) {
            addBotMessage(window.knowledgeBase.programs.injuryPrevention);
        }
        else if (message.includes('book') || message.includes('appointment') || message.includes('schedule') || message.includes('free intro') || message.includes('consultation')) {
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
        else if (message.includes('price') || message.includes('cost') || message.includes('fee') || message.includes('request pricing')) {
            showPricingRequestForm();
        }
        else if (message.includes('insurance')) {
            addBotMessage(window.knowledgeBase.pricing.insurance);
        }
        else if (message.includes('location') || message.includes('address') || message.includes('where')) {
            addBotMessage(`We're located in St. George: <a href="https://maps.google.com/?q=${encodeURIComponent(window.knowledgeBase.contact.address)}" target="_blank">${window.knowledgeBase.contact.address}</a>`);
        }
        else if (message.includes('hours') || message.includes('when are you open')) {
            addBotMessage("Hours: " + window.knowledgeBase.contact.hours.replace(/\n/g, '<br>'));
        }
        else if (message.includes('contact') || message.includes('talk to someone') || message.includes('speak') || message.includes('contact you directly') || message.includes('contact information')) {
            addBotMessage(`Contact us:<br>• Phone: <a href="tel:${window.knowledgeBase.contact.phone}">${window.knowledgeBase.contact.phone}</a><br>• Email: <a href="mailto:${window.knowledgeBase.contact.email}">${window.knowledgeBase.contact.email}</a>`);
            addBotMessage("<a href='free-intro.html' target='_blank'>Book a free consultation</a>");
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
        else {
            addBotMessage("I'm not sure I understand. Could you please choose from one of these options or rephrase your question?");
            // Keep showing options only for the fallback response
            showOptions([
                "What services do you offer?",
                "Book a Free Athletic Training Consultation",
                "Request pricing information",
                "Contact information"
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
                    <input type="checkbox" id="pricing-athletic" value="Athletic Training">
                    <label for="pricing-athletic" style="display:inline;">Athletic Training</label>
                </div>
                <div>
                    <input type="checkbox" id="pricing-sports" value="Sports Performance">
                    <label for="pricing-sports" style="display:inline;">Sports Performance</label>
                </div>
                <div>
                    <input type="checkbox" id="pricing-team" value="Team Services">
                    <label for="pricing-team" style="display:inline;">Team Services</label>
                </div>
                <div>
                    <input type="checkbox" id="pricing-event" value="Event Coverage">
                    <label for="pricing-event" style="display:inline;">Event Coverage</label>
                </div>
                <div>
                    <input type="checkbox" id="pricing-therapy" value="Performance Therapy">
                    <label for="pricing-therapy" style="display:inline;">Performance Therapy</label>
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
            if (document.getElementById('pricing-athletic').checked) services.push('Athletic Training');
            if (document.getElementById('pricing-sports').checked) services.push('Sports Performance');
            if (document.getElementById('pricing-team').checked) services.push('Team Services');
            if (document.getElementById('pricing-event').checked) services.push('Event Coverage');
            if (document.getElementById('pricing-therapy').checked) services.push('Performance Therapy');

            // Process form submission
            addUserMessage(`Requested pricing information for: ${services.join(', ')}`);
            addBotMessage("Thank you for your request! We'll send detailed pricing information to you shortly. A member of our team will contact you within 24 business hours.");
        });
    }


}
