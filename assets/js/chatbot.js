// Desert Sports Med - Advanced RAG-based Chatbot with Gemini AI Integration
// Master, this implementation provides comprehensive conversational AI capabilities

// Prevent duplicate initialization
if (typeof window.chatbotInitialized === 'undefined') {
    window.chatbotInitialized = true;

    // Gemini AI Configuration - Now loaded from environment variables
    let GEMINI_API_KEY = '';
    let GEMINI_API_URL = '';
    
    // Wait for config to load before initializing
    function initializeWithConfig() {
        // Simple synchronous initialization since config is now loaded immediately
        if (window.appConfig && window.appConfig.config) {
            GEMINI_API_KEY = window.appConfig.get('GEMINI_API_KEY');
            GEMINI_API_URL = window.appConfig.get('GEMINI_API_URL');
            
            console.log('Chatbot: Configuration loaded successfully');
            console.log('Chatbot: API URL:', GEMINI_API_URL);
            console.log('Chatbot: API Key available:', !!GEMINI_API_KEY);
            
            if (!GEMINI_API_KEY) {
                console.error('Chatbot: GEMINI_API_KEY not found in configuration');
                // Use direct fallback
                GEMINI_API_KEY = 'AIzaSyA6Tn4Fz8iSDCKQNwOMYVauw1h8opww3OY';
                GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent';
                console.log('Chatbot: Using direct API key fallback');
            }
        } else {
            console.warn('Chatbot: Config not available, using direct configuration');
            // Direct configuration as final fallback
            GEMINI_API_KEY = 'AIzaSyA6Tn4Fz8iSDCKQNwOMYVauw1h8opww3OY';
            GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent';
            console.log('Chatbot: Using direct configuration');
        }
    }

    // Conversation context management
    let conversationHistory = [];
    let currentContext = null;
    let userIntent = null;

    document.addEventListener('DOMContentLoaded', function() {
        // Initialize configuration first
        initializeWithConfig();
        
        initChatbot();

        // Check for auto-open parameter
        const urlParams = new URLSearchParams(window.location.search);
        const openChatbot = urlParams.get('chatbot');

        if (openChatbot === 'open') {
            openChatbotAutomatically();
        } else {
            // Show welcome popup after 1 second
            setTimeout(showWelcomePopup, 1000);
        }
    });
}

// Comprehensive Knowledge Base - RAG Data Store
window.knowledgeBase = window.knowledgeBase || {
    // Company Information
    company: {
        name: "Desert Sports Med",
        location: "St. George, UT 84770",
        founded: "2015",
        mission: "To provide the highest quality athletic training services to athletes and teams in St. George, Utah",
        description: "Desert Sports Med is committed to providing quality services to our neighborhoods and their athletic events. We specialize in providing first aid tents, on-field medical coverage, and performance therapy services. Based in St. George, Utah, but available for events and contracts nationwide.",
        approach: "Our approach combines evidence-based athletic training practices with personalized care from certified athletic trainers, ensuring that each athlete receives the attention and expertise they need to achieve their performance goals and stay injury-free.",
        specialties: ["Medical Tents", "On-Field Medical Coverage", "Performance Therapy", "Athletic Training", "Injury Prevention", "Emergency Medical Response"]
    },

    // Contact Information
    contact: {
        phone: "(801) 797-4043",
        email: "desertsportsmed@gmail.com",
        address: "St. George, UT 84770",
        hours: "Monday - Friday: 7:00 AM - 7:00 PM\nSaturday: 8:00 AM - 2:00 PM\nSunday: Closed",
        instagram: "@desertsportsmed",
        socialMedia: {
            instagram: "https://www.instagram.com/desertsportsmed/"
        }
    },

    // Services - Comprehensive Details
    services: {
        medicalTents: {
            name: "Medical Tents",
            description: "Medical Tents serve as centralized treatment facilities at your event - mini field hospitals strategically positioned to serve all participants with the equipment to handle multiple injuries simultaneously.",
            features: [
                "Professional setup with treatment tables, privacy screens, and proper lighting",
                "Certified athletic trainers with specialized training",
                "Essential equipment including AEDs, spine boards, and advanced first aid supplies",
                "Complete medical supplies for taping, wound care, ice therapy, and OTC medications",
                "Emergency planning and coordination with local EMS",
                "Multiple patient capacity with comprehensive equipment",
                "Weather protection for treatments",
                "Privacy for medical assessments"
            ],
            benefits: [
                "Centralized treatment facility",
                "Multiple patient capacity",
                "Comprehensive equipment",
                "Privacy for treatments",
                "Weather protection",
                "Professional medical environment"
            ],
            idealFor: "Large sporting events, tournaments, competitions, festivals with multiple participants"
        },

        onFieldCoverage: {
            name: "On-Field Medical Coverage",
            description: "We provide licensed, certified athletic trainers right on the sidelines. These experts are specifically trained to recognize, assess, and manage athletic injuries on the field and provide the safest course of action for your athletes.",
            features: [
                "Sideline positioning for immediate access to athletes",
                "Portable medical kits with essential supplies",
                "On-site injury assessment and immediate care",
                "Return-to-play decision making by certified professionals",
                "Continuous monitoring throughout events",
                "Direct communication with coaches and officials",
                "Emergency response coordination",
                "Real-time injury documentation"
            ],
            benefits: [
                "Instant injury response",
                "Immediate assessment at injury site",
                "Qualified return-to-play decisions",
                "Continuous monitoring",
                "Reduced injury severity through quick intervention",
                "Zero delay in medical response"
            ],
            idealFor: "Football games, basketball tournaments, soccer matches, high-risk sporting events"
        },

        performanceTherapy: {
            name: "Performance Therapy",
            description: "Performance Therapy is a specialized approach that combines various manual therapy techniques, movement assessments, and corrective exercises to enhance physical performance and accelerate recovery.",
            features: [
                "Manual therapy techniques for injury treatment",
                "Movement pattern analysis and correction",
                "Customized rehabilitation programs",
                "Recovery acceleration strategies",
                "Performance enhancement protocols",
                "Biomechanical assessments",
                "Sport-specific training recommendations",
                "Injury prevention education"
            ],
            benefits: [
                "Enhanced athletic performance",
                "Injury prevention",
                "Faster recovery between training sessions",
                "Improved body awareness and movement quality",
                "Personalized treatment plans",
                "Long-term performance optimization"
            ],
            idealFor: "Individual athletes, teams seeking performance enhancement, injury recovery"
        },

        athleticTraining: {
            name: "Athletic Training",
            description: "Comprehensive athletic training services focusing on injury prevention, treatment, and performance enhancement.",
            features: [
                "Injury prevention programs",
                "Emergency care and first aid",
                "Rehabilitation services",
                "Return-to-play protocols",
                "Movement assessments",
                "Strength and conditioning guidance",
                "Education on injury prevention"
            ]
        }
    },

    // Pricing Information
    pricing: {
        structure: {
            singleEvent: "One-time coverage for individual tournaments or competitions",
            multipleEvents: "Coverage for a series of related events with package discounts",
            seasonalContract: "Ongoing coverage for teams or recurring events throughout a season",
            performanceTherapy: "Individual sessions for athletes seeking specialized treatment"
        },
        factors: [
            "Event size and duration",
            "Number of participants",
            "Specific medical requirements",
            "Location and travel requirements",
            "Equipment and staffing needs",
            "Insurance and liability considerations"
        ],
        medicalTents: "Medical Tent pricing is based on event size, duration, and specific requirements. We offer both single event coverage and seasonal contracts to meet your needs.",
        onFieldCoverage: "On-Field Coverage pricing depends on the number of athletic trainers needed, event duration, and specific requirements. Contact us for a custom quote tailored to your event.",
        performanceTherapy: "Performance Therapy sessions are available on a per-session basis or as part of a package. Current rates are available upon request.",
        insurance: "We work with most major insurance providers for athletic training services. However, coverage varies depending on your specific plan and the services you need. We recommend contacting your insurance provider to verify coverage."
    },

    // Booking Information
    booking: {
        methods: [
            "Online booking system available",
            "Phone: (801) 797-4043",
            "Email: desertsportsmed@gmail.com"
        ],
        services: [
            "Athletic Training Assessment",
            "Sports Performance Consultation",
            "Team Services",
            "Event Coverage",
            "Performance Therapy Sessions"
        ],
        freeConsultation: "Start with a Free Athletic Training Consultation to discuss your athletic needs and see if we're a good fit for you. This is a quick consultation with a certified athletic trainer to understand your goals and how we can help.",
        process: "You can book our services through our website's booking system, by calling (801) 797-4043, or by emailing desertsportsmed@gmail.com. We recommend starting with a free consultation to discuss your specific needs."
    },

    // Staff and Certification
    staff: {
        qualifications: "Our team consists of certified athletic trainers with extensive experience working with athletes at all levels.",
        certification: "All our athletic trainers are certified by the Board of Certification (BOC) and licensed by the state of Utah.",
        expertise: "Certified Athletic Trainers are highly qualified healthcare professionals with specific education, state licensing, and continuing education requirements who can recognize injuries, provide emergency care, make return-to-play decisions, and reduce liability."
    },

    // Sports and Age Groups
    coverage: {
        sports: [
            "Football", "Basketball", "Soccer", "Baseball", "Volleyball", 
            "Track and Field", "Swimming", "Tennis", "Golf", "Combat Sports",
            "Wrestling", "Cross Country", "Softball", "Lacrosse", "Hockey"
        ],
        ageGroups: [
            "Youth sports (ages 6-12)",
            "Middle school athletes (ages 13-14)", 
            "High school athletes (ages 15-18)",
            "College and university athletes",
            "Professional athletes",
            "Adult recreational athletes",
            "Masters level competitors"
        ]
    },

    // FAQ Content
    faq: {
        athleticTrainerVsPhysicalTherapist: "Athletic trainers focus on injury prevention, immediate care, and return-to-play protocols specifically for athletes and sporting events, while physical therapists typically work with a broader range of patients and conditions in clinical settings.",
        whyChooseCertified: "Certified Athletic Trainers reduce liability, provide immediate expert care, make qualified return-to-play decisions, and have specialized training in sports medicine and emergency response.",
        equipmentProvided: "We provide all necessary medical equipment including AEDs, spine boards, first aid supplies, taping materials, ice therapy equipment, and emergency medications.",
        emergencyProtocols: "Our athletic trainers are trained in emergency response protocols, CPR/AED certification, and coordinate directly with local EMS when needed.",
        documentation: "We provide detailed injury reports, treatment documentation, and follow-up recommendations for all incidents."
    },

    // Navigation and Pages
    pages: {
        home: "index.html",
        about: "about.html", 
        medicalTents: "medical-tents.html",
        onFieldCoverage: "on-field-coverage.html",
        performanceTherapy: "performance-therapy.html",
        booking: "book-online.html",
        freeIntro: "free-intro.html",
        pricing: "pricing-request.html",
        terms: "terms-conditions.html"
    }
};

// Advanced RAG Implementation with Gemini AI
class RAGChatbot {
    constructor() {
        this.conversationHistory = [];
        this.currentContext = null;
        this.userIntent = null;
        this.isTyping = false;
    }

    // Enhanced semantic search through knowledge base
    searchKnowledgeBase(query) {
        const results = [];
        const queryLower = query.toLowerCase();
        
        // Search through all knowledge base sections
        const searchSections = [
            { section: 'services', data: window.knowledgeBase.services },
            { section: 'pricing', data: window.knowledgeBase.pricing },
            { section: 'booking', data: window.knowledgeBase.booking },
            { section: 'contact', data: window.knowledgeBase.contact },
            { section: 'company', data: window.knowledgeBase.company },
            { section: 'staff', data: window.knowledgeBase.staff },
            { section: 'coverage', data: window.knowledgeBase.coverage },
            { section: 'faq', data: window.knowledgeBase.faq }
        ];

        searchSections.forEach(({ section, data }) => {
            const matches = this.findMatches(data, queryLower, section);
            results.push(...matches);
        });

        return results.sort((a, b) => b.relevance - a.relevance);
    }

    // Deep search within data structures
    findMatches(obj, query, section, path = '') {
        const matches = [];
        
        if (typeof obj === 'string') {
            const relevance = this.calculateRelevance(obj, query);
            if (relevance > 0.3) {
                matches.push({
                    content: obj,
                    section,
                    path,
                    relevance
                });
            }
        } else if (Array.isArray(obj)) {
            obj.forEach((item, index) => {
                matches.push(...this.findMatches(item, query, section, `${path}[${index}]`));
            });
        } else if (typeof obj === 'object' && obj !== null) {
            Object.entries(obj).forEach(([key, value]) => {
                const newPath = path ? `${path}.${key}` : key;
                matches.push(...this.findMatches(value, query, section, newPath));
            });
        }

        return matches;
    }

    // Calculate relevance score for search results
    calculateRelevance(text, query) {
        const textLower = text.toLowerCase();
        const queryWords = query.split(' ').filter(word => word.length > 2);
        
        let score = 0;
        queryWords.forEach(word => {
            if (textLower.includes(word)) {
                score += 1;
                // Bonus for exact phrase matches
                if (textLower.includes(query)) {
                    score += 0.5;
                }
            }
        });

        return score / queryWords.length;
    }

    // Generate context-aware prompt for Gemini AI
    generatePrompt(userMessage, searchResults) {
        const context = searchResults.slice(0, 5).map(result => result.content).join('\n\n');
        
        const systemPrompt = `You are a helpful assistant for Desert Sports Med, a sports medicine company in St. George, Utah. 

COMPANY INFORMATION:
- Location: St. George, UT 84770
- Phone: (801) 797-4043
- Email: desertsportsmed@gmail.com
- Instagram: @desertsportsmed
- Hours: Mon-Fri 7am-7pm, Sat 8am-2pm, Sun Closed

SERVICES:
1. Medical Tents - Centralized treatment facilities for events
2. On-Field Medical Coverage - Sideline athletic trainers
3. Performance Therapy - Specialized treatment for athletes

AVAILABLE PAGES:
- About Us: about.html
- Medical Tents: medical-tents.html
- On-Field Coverage: on-field-coverage.html
- Performance Therapy: performance-therapy.html
- Book Online: book-online.html
- Free Consultation: free-intro.html
- Pricing Request: pricing-request.html

RELEVANT CONTEXT FROM KNOWLEDGE BASE:
${context}

CONVERSATION HISTORY:
${this.conversationHistory.slice(-6).map(msg => `${msg.role}: ${msg.content}`).join('\n')}

RESPONSE GUIDELINES:
- Keep responses concise (2-3 sentences max) while including all essential information
- Use plain text only - NO markdown formatting (**, *, #, etc.)
- NEVER include page links in your response text - quick action buttons will be provided instead
- Be friendly, professional, and conversational
- Provide specific details about services when asked
- Include contact information when relevant
- If you don't have specific information, direct them to contact the clinic
- Focus on answering the question directly without suggesting page visits

USER MESSAGE: ${userMessage}

Please provide a helpful response following these guidelines.`;

        return systemPrompt;
    }

    // Clean markdown artifacts from response text but preserve links
    cleanMarkdownArtifacts(text) {
        if (!text) return text;
        
        return text
            // Remove markdown bold formatting (**text**)
            .replace(/\*\*(.*?)\*\*/g, '$1')
            // Remove markdown italic formatting (*text*)
            .replace(/\*(.*?)\*/g, '$1')
            // Remove markdown headers (# ## ###)
            .replace(/^#{1,6}\s+/gm, '')
            // Remove markdown code blocks (```text```)
            .replace(/```[\s\S]*?```/g, '')
            // Remove inline code (`text`)
            .replace(/`([^`]+)`/g, '$1')
            // Keep markdown links [text](url) - they will be processed later
            // Clean up extra whitespace
            .replace(/\n\s*\n\s*\n/g, '\n\n')
            .trim();
    }

    // Call Gemini AI API
    async callGeminiAPI(prompt) {
        try {
            // Get API configuration from global config
            const apiKey = window.appConfig ? window.appConfig.get('GEMINI_API_KEY') : null;
            const apiUrl = window.appConfig ? window.appConfig.get('GEMINI_API_URL') : null;
            
            // Check if API key is available
            if (!apiKey || !apiUrl) {
                console.error('Chatbot: API configuration not available');
                return this.getFallbackResponse();
            }

            const response = await fetch(`${apiUrl}?key=${apiKey}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    contents: [{
                        parts: [{
                            text: prompt
                        }]
                    }],
                    generationConfig: {
                        temperature: 0.7,
                        topK: 40,
                        topP: 0.95,
                        maxOutputTokens: 1024,
                    }
                })
            });

            if (!response.ok) {
                throw new Error(`API request failed: ${response.status}`);
            }

            const data = await response.json();
            const rawResponse = data.candidates[0].content.parts[0].text;
            
            // Clean markdown artifacts from the response
            return this.cleanMarkdownArtifacts(rawResponse);
        } catch (error) {
            console.error('Gemini API Error:', error);
            return this.getFallbackResponse();
        }
    }

    // Fallback response when AI is unavailable
    getFallbackResponse() {
        return `I'm here to help with Desert Sports Med information! 

Our services include:
• Medical Tents for events
• On-Field Medical Coverage  
• Performance Therapy

Contact us:
📞 (801) 797-4043
📧 desertsportsmed@gmail.com
📍 St. George, UT

How can I assist you today?`;
    }

    // Process user message with RAG
    async processMessage(userMessage) {
        // Add user message to conversation history
        this.conversationHistory.push({
            role: 'user',
            content: userMessage,
            timestamp: new Date()
        });

        // Search knowledge base for relevant information
        const searchResults = this.searchKnowledgeBase(userMessage);
        
        // Generate AI prompt with context
        const prompt = this.generatePrompt(userMessage, searchResults);
        
        // Get AI response
        const aiResponse = await this.callGeminiAPI(prompt);
        
        // Add AI response to conversation history
        this.conversationHistory.push({
            role: 'assistant', 
            content: aiResponse,
            timestamp: new Date()
        });

        return aiResponse;
    }

    // Detect user intent for better responses
    detectIntent(message) {
        const messageLower = message.toLowerCase();
        
        if (messageLower.includes('book') || messageLower.includes('appointment') || messageLower.includes('schedule')) {
            return 'booking';
        } else if (messageLower.includes('price') || messageLower.includes('cost') || messageLower.includes('pricing')) {
            return 'pricing';
        } else if (messageLower.includes('contact') || messageLower.includes('phone') || messageLower.includes('email')) {
            return 'contact';
        } else if (messageLower.includes('service') || messageLower.includes('medical tent') || messageLower.includes('on-field') || messageLower.includes('therapy')) {
            return 'services';
        } else if (messageLower.includes('about') || messageLower.includes('company') || messageLower.includes('team')) {
            return 'about';
        }
        
        return 'general';
    }

    // Generate contextual follow-up options
    generateFollowUpOptions(intent, message) {
        const options = {
            booking: [
                "Book Free Consultation",
                "View All Services", 
                "Contact Us",
                "Pricing Information"
            ],
            pricing: [
                "Request Custom Quote",
                "Medical Tent Pricing",
                "On-Field Coverage Rates",
                "Performance Therapy Costs"
            ],
            services: [
                "Medical Tents",
                "On-Field Coverage",
                "Performance Therapy", 
                "Book Consultation"
            ],
            contact: [
                "Call Now",
                "Send Email",
                "Visit Instagram",
                "Book Online"
            ],
            general: [
                "Our Services",
                "Book Appointment",
                "Pricing Info",
                "Contact Us"
            ]
        };

        return options[intent] || options.general;
    }
}

// Initialize RAG Chatbot
const ragChatbot = new RAGChatbot();

// Enhanced typing animation
function typeText(element, text, cursor, index = 0, speed = 30) {
    if (index < text.length) {
        if (text[index] === '<') {
            const closingIndex = text.indexOf('>', index);
            if (closingIndex !== -1) {
                const tag = text.substring(index, closingIndex + 1);
                element.innerHTML = element.innerHTML.replace(cursor.outerHTML, '') + tag;
                element.appendChild(cursor);
                setTimeout(() => typeText(element, text, cursor, closingIndex + 1, speed), 0);
                return;
            }
        }

        element.innerHTML = element.innerHTML.replace(cursor.outerHTML, '') + text[index];
        element.appendChild(cursor);

        const randomSpeed = speed + Math.random() * 20 - 10;
        setTimeout(() => typeText(element, text, cursor, index + 1, speed), randomSpeed);
    } else {
        // Remove cursor after typing is complete
        setTimeout(() => {
            if (cursor.parentNode) {
                cursor.remove();
            }
        }, 1000);
    }
}

// Welcome popup functionality
function showWelcomePopup() {
    const chatbotContainer = document.querySelector('.chatbot-container');
    if (chatbotContainer && chatbotContainer.classList.contains('active')) {
        return;
    }

    if (sessionStorage.getItem('welcomeBubbleShown')) {
        return;
    }

    const welcomeBubble = document.createElement('div');
    welcomeBubble.className = 'welcome-bubble';
    welcomeBubble.innerHTML = `
        <div class="welcome-bubble-icon"><i class="fas fa-comment-dots"></i></div>
        <div class="welcome-bubble-content"></div>
        <button class="welcome-bubble-close"><i class="fas fa-times"></i></button>
    `;

    const textToType = '<strong>Questions?</strong> Chat with our AI assistant!';
    document.body.appendChild(welcomeBubble);

    setTimeout(() => {
        welcomeBubble.classList.add('active');
        const contentElement = welcomeBubble.querySelector('.welcome-bubble-content');
        const cursor = document.createElement('span');
        cursor.className = 'typing-cursor';
        contentElement.appendChild(cursor);

        setTimeout(() => {
            typeText(contentElement, textToType, cursor);
        }, 300);
    }, 100);

    // Auto-hide after 12 seconds
    setTimeout(() => {
        if (welcomeBubble.parentNode) {
            welcomeBubble.classList.remove('active');
            setTimeout(() => welcomeBubble.remove(), 300);
        }
    }, 12000);

    // Event handlers
    welcomeBubble.querySelector('.welcome-bubble-close').addEventListener('click', (e) => {
        e.stopPropagation();
        welcomeBubble.classList.remove('active');
        setTimeout(() => welcomeBubble.remove(), 300);
        sessionStorage.setItem('welcomeBubbleShown', 'true');
    });

    welcomeBubble.addEventListener('click', () => {
        welcomeBubble.classList.remove('active');
        setTimeout(() => welcomeBubble.remove(), 300);
        openChatbotAutomatically();
        sessionStorage.setItem('welcomeBubbleShown', 'true');
    });
}

// Auto-open chatbot functionality
function openChatbotAutomatically() {
    const chatbotContainer = document.querySelector('.chatbot-container');
    const chatbotToggle = document.querySelector('.chatbot-toggle');

    if (chatbotContainer && chatbotToggle) {
        chatbotContainer.classList.add('active');
        chatbotToggle.classList.add('active');

        sessionStorage.setItem('welcomeBubbleShown', 'true');

        const welcomeBubble = document.querySelector('.welcome-bubble');
        if (welcomeBubble) {
            welcomeBubble.classList.remove('active');
            setTimeout(() => {
                if (welcomeBubble.parentNode) {
                    welcomeBubble.remove();
                }
            }, 300);
        }

        // Send welcome message
        setTimeout(() => {
            addBotMessage("👋 Hello! I'm your AI assistant for Desert Sports Med. How can I help you today?");
            showOptions([
                "Our Services",
                "Book Appointment", 
                "Pricing Information",
                "Contact Us",
                "About Our Team"
            ]);
        }, 500);
    }
}

// Initialize chatbot interface
function initChatbot() {
    const chatbotToggle = document.querySelector('.chatbot-toggle');
    const chatbotContainer = document.querySelector('.chatbot-container');
    const chatbotClose = document.querySelector('.chatbot-close');
    const chatbotInput = document.querySelector('.chatbot-input input');
    const chatbotSendBtn = document.querySelector('.chatbot-input button');

    if (!chatbotToggle || !chatbotContainer) return;

    // Toggle chatbot
    chatbotToggle.addEventListener('click', function() {
        chatbotToggle.classList.add('clicked');
        setTimeout(() => chatbotToggle.classList.remove('clicked'), 500);

        chatbotContainer.classList.toggle('active');
        chatbotToggle.classList.toggle('active');

        const welcomeBubble = document.querySelector('.welcome-bubble');
        if (welcomeBubble) {
            welcomeBubble.classList.remove('active');
            setTimeout(() => {
                if (welcomeBubble.parentNode) {
                    welcomeBubble.remove();
                }
            }, 300);
            sessionStorage.setItem('welcomeBubbleShown', 'true');
        }

        if (chatbotContainer.classList.contains('active')) {
            setTimeout(() => chatbotInput.focus(), 500);

            const chatbotMessages = document.querySelector('.chatbot-messages');
            if (chatbotMessages.children.length === 0) {
                setTimeout(() => {
                    addBotMessage("👋 Hello! I'm your AI assistant for Desert Sports Med. How can I help you today?");
                    showOptions([
                        "Our Services",
                        "Book Appointment",
                        "Pricing Information", 
                        "Contact Us",
                        "About Our Team"
                    ]);
                }, 800);
            }
        }
    });

    // Close chatbot
    if (chatbotClose) {
        chatbotClose.addEventListener('click', function() {
            chatbotContainer.style.opacity = '0';
            chatbotContainer.style.transform = 'scale(0.8) translateY(20px)';

            setTimeout(() => {
                chatbotContainer.classList.remove('active');
                chatbotContainer.style.opacity = '';
                chatbotContainer.style.transform = '';
                chatbotToggle.classList.remove('active');
            }, 300);
        });
    }

    // Send message handlers
    if (chatbotSendBtn) {
        chatbotSendBtn.addEventListener('click', sendMessage);
    }

    if (chatbotInput) {
        chatbotInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                sendMessage();
            }
        });
    }

    // Close on outside click
    document.addEventListener('click', function(e) {
        // Check if the clicked element is an option button or within an options container
        const isOptionButton = e.target.classList.contains('option-btn') || 
                              e.target.closest('.option-btn') ||
                              e.target.closest('.options-container') ||
                              e.target.closest('.options-message');
        
        if (
            chatbotContainer.classList.contains('active') &&
            !chatbotContainer.contains(e.target) &&
            e.target !== chatbotToggle &&
            !chatbotToggle.contains(e.target) &&
            !isOptionButton
        ) {
            chatbotContainer.style.opacity = '0';
            chatbotContainer.style.transform = 'scale(0.8) translateY(20px)';

            setTimeout(() => {
                chatbotContainer.classList.remove('active');
                chatbotContainer.style.opacity = '';
                chatbotContainer.style.transform = '';
                chatbotToggle.classList.remove('active');
            }, 300);
        }
    });
}

// Enhanced message sending with AI processing
async function sendMessage() {
    const chatbotInput = document.querySelector('.chatbot-input input');
    const message = chatbotInput.value.trim();

    if (message === '' || ragChatbot.isTyping) return;

    // Add user message
    addUserMessage(message);
    chatbotInput.value = '';

    // Show typing indicator
    ragChatbot.isTyping = true;
    showTypingIndicator();

    try {
        // Process message with RAG AI
        const response = await ragChatbot.processMessage(message);
        
        // Remove typing indicator
        removeTypingIndicator();
        
        // Add AI response
        addBotMessage(response);

        // Detect intent and show relevant options
        const intent = ragChatbot.detectIntent(message);
        const options = ragChatbot.generateFollowUpOptions(intent, message);
        
        setTimeout(() => {
            showOptions(options);
        }, 1000);

    } catch (error) {
        console.error('Error processing message:', error);
        removeTypingIndicator();
        addBotMessage("I apologize, but I'm having trouble processing your request right now. Please try again or contact us directly at (801) 797-4043.");
    }

    ragChatbot.isTyping = false;
}

// Show typing indicator
function showTypingIndicator() {
    const chatbotMessages = document.querySelector('.chatbot-messages');
    const typingDiv = document.createElement('div');
    typingDiv.className = 'message bot-message typing-indicator';
    typingDiv.innerHTML = `
        <div class="typing-dots">
            <span></span>
            <span></span>
            <span></span>
        </div>
    `;
    chatbotMessages.appendChild(typingDiv);
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
}

// Remove typing indicator
function removeTypingIndicator() {
    const typingIndicator = document.querySelector('.typing-indicator');
    if (typingIndicator) {
        typingIndicator.remove();
    }
}

// Add user message to chat
function addUserMessage(message) {
    const chatbotMessages = document.querySelector('.chatbot-messages');
    const messageDiv = document.createElement('div');
    messageDiv.className = 'message user-message';
    messageDiv.innerHTML = `<p>${message}</p>`;
    chatbotMessages.appendChild(messageDiv);
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
}

// Add bot message to chat
function addBotMessage(message) {
    const chatbotMessages = document.querySelector('.chatbot-messages');
    const messageDiv = document.createElement('div');
    messageDiv.className = 'message bot-message';
    
    // Convert markdown links [text](url) to HTML links
    const processedMessage = message.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="chatbot-link">$1</a>');
    
    messageDiv.innerHTML = `<p>${processedMessage}</p>`;
    chatbotMessages.appendChild(messageDiv);
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
}

// Show option buttons
function showOptions(options) {
    const chatbotMessages = document.querySelector('.chatbot-messages');
    const optionsDiv = document.createElement('div');
    optionsDiv.className = 'message bot-message options-message';
    
    const optionsHTML = options.map(option => 
        `<button class="option-btn" onclick="handleOptionClick('${option}')">${option}</button>`
    ).join('');
    
    optionsDiv.innerHTML = `<div class="options-container">${optionsHTML}</div>`;
    chatbotMessages.appendChild(optionsDiv);
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
}

// Handle option button clicks
async function handleOptionClick(option) {
    // Add user message
    addUserMessage(option);
    
    // Remove options
    const optionsMessage = document.querySelector('.options-message');
    if (optionsMessage) {
        optionsMessage.remove();
    }

    // Handle special action buttons
    if (option === "Call Now") {
        callPhone();
        addBotMessage("Opening your phone app to call us at (801) 797-4043. We're here to help!");
        return;
    }
    
    if (option === "Send Email") {
        sendEmail();
        addBotMessage("Opening your email app to contact us at desertsportsmed@gmail.com. We'll respond quickly!");
        return;
    }
    
    if (option === "Visit Instagram") {
        openInstagram();
        addBotMessage("Opening our Instagram @desertsportsmed in a new tab. Follow us for updates!");
        return;
    }

    // Handle page navigation options
    const pageMapping = {
        "Book Online": "booking",
        "Book Free Consultation": "freeIntro",
        "Book Consultation": "freeIntro",
        "Book Appointment": "booking",
        "Medical Tents": "medicalTents",
        "On-Field Coverage": "onFieldCoverage", 
        "Performance Therapy": "performanceTherapy",
        "Pricing Information": "pricing",
        "Pricing Info": "pricing",
        "Request Custom Quote": "pricing"
    };

    if (pageMapping[option]) {
        navigateToPage(pageMapping[option]);
        return;
    }

    // Show typing indicator for AI processing
    ragChatbot.isTyping = true;
    showTypingIndicator();

    try {
        // Process with AI
        const response = await ragChatbot.processMessage(option);
        
        removeTypingIndicator();
        
        // Add bot response without additional page links (quick action buttons will provide navigation)
        addBotMessage(response);

        // Show contextual follow-up options
        const intent = ragChatbot.detectIntent(option);
        const followUpOptions = ragChatbot.generateFollowUpOptions(intent, option);
        
        setTimeout(() => {
            showOptions(followUpOptions);
        }, 1000);

    } catch (error) {
        console.error('Error processing option:', error);
        removeTypingIndicator();
        addBotMessage("I apologize for the error. Please contact us at (801) 797-4043 for immediate assistance.");
    }

    ragChatbot.isTyping = false;
}

// Navigation helper functions
function navigateToPage(page) {
    const pages = window.knowledgeBase.pages;
    if (pages[page]) {
        window.open(pages[page], '_blank');
        addBotMessage(`Opening ${page} page for you!`);
    }
}

// Contact helper functions
function callPhone() {
    // Use window.location.href for tel: links to avoid page replacement issues
    window.location.href = `tel:${window.knowledgeBase.contact.phone}`;
}

function sendEmail() {
    // Use window.location.href for mailto: links to avoid page replacement issues  
    window.location.href = `mailto:${window.knowledgeBase.contact.email}`;
}

function openInstagram() {
    window.open(window.knowledgeBase.contact.socialMedia.instagram, '_blank');
}

// Make functions globally available
window.handleOptionClick = handleOptionClick;
window.navigateToPage = navigateToPage;
window.callPhone = callPhone;
window.sendEmail = sendEmail;
window.openInstagram = openInstagram;
