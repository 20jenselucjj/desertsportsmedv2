// Desert Sports Med - Configuration Management
// Master, this handles environment variables and configuration securely

class Config {
    constructor() {
        this.config = {};
        this.loadConfig();
    }

    loadConfig() {
        // Direct configuration for browser environment
        // Master, in production you should use a backend proxy to hide the API key
        this.config = {
            GEMINI_API_KEY: 'AIzaSyA6Tn4Fz8iSDCKQNwOMYVauw1h8opww3OY',
            GEMINI_API_URL: 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent'
        };
        
        console.log('Config: Configuration loaded successfully');
        console.log('Config: API URL set to:', this.config.GEMINI_API_URL);
        console.log('Config: API Key available:', !!this.config.GEMINI_API_KEY);
    }

    get(key) {
        return this.config[key];
    }

    isConfigured() {
        return this.config.GEMINI_API_KEY && this.config.GEMINI_API_KEY.length > 0;
    }

    // Method to safely check if API key is available without exposing it
    hasApiKey() {
        return this.get('GEMINI_API_KEY') && this.get('GEMINI_API_KEY').startsWith('AIza');
    }
}

// Create global config instance
window.appConfig = new Config();

// Export for module usage if needed
if (typeof module !== 'undefined' && module.exports) {
    module.exports = Config;
}