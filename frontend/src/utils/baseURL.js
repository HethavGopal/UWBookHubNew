const getBaseUrl = () => {
    // Check if we're running in development
    if (import.meta.env.DEV) {
        return import.meta.env.VITE_API_URL || 'http://localhost:5000';
    }
    
    // Production environment - use Railway backend
    return import.meta.env.VITE_API_URL || 'https://uwmarket-production.up.railway.app';
};

export default getBaseUrl;
