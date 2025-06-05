const getBaseUrl = () => {
    // Check if we're running in development
    if (import.meta.env.DEV) {
        return import.meta.env.VITE_API_URL || 'http://localhost:5000';
    }
    
    // Production environment
    return import.meta.env.VITE_API_URL || window.location.origin.replace(':3000', ':5000');
};

export default getBaseUrl;
