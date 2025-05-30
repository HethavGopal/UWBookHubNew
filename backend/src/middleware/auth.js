// Temporary auth middleware for testing (without Firebase Admin)
// TODO: Install firebase-admin and configure properly for production

const admin = require('firebase-admin');

// Initialize Firebase Admin SDK
if (!admin.apps.length) {
    try {
        // Debug environment variables
        console.log('🔥 Firebase Admin Setup:');
        console.log('Project ID:', process.env.FIREBASE_PROJECT_ID);
        console.log('Client Email:', process.env.FIREBASE_CLIENT_EMAIL);
        console.log('Private Key exists:', !!process.env.FIREBASE_PRIVATE_KEY);
        
        // Parse private key properly (handle escaped newlines)
        const privateKey = process.env.FIREBASE_PRIVATE_KEY
            ? process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n')
            : null;

        if (!process.env.FIREBASE_PROJECT_ID || !process.env.FIREBASE_CLIENT_EMAIL || !privateKey) {
            throw new Error('Missing required Firebase environment variables');
        }

        admin.initializeApp({
            credential: admin.credential.cert({
                projectId: process.env.FIREBASE_PROJECT_ID,
                privateKey: privateKey,
                clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
            }),
            projectId: process.env.FIREBASE_PROJECT_ID,
        });
        console.log('✅ Firebase Admin initialized successfully');
    } catch (error) {
        console.error('❌ Firebase Admin initialization failed:', error.message);
        console.error('🔍 Check your .env file and ensure all Firebase variables are set correctly');
    }
}

const auth = async (req, res, next) => {
    const authHeader = req.headers['authorization'];
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ 
            message: 'No valid authorization header provided',
            error: 'MISSING_AUTH_HEADER'
        });
    }

    const token = authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ 
            message: 'No token provided',
            error: 'MISSING_TOKEN'
        });
    }

    try {
       
        const decodedToken = await admin.auth().verifyIdToken(token);
        
        req.user = {
            uid: decodedToken.uid,                    // Real Firebase UID
            email: decodedToken.email,                // Real user email
            emailVerified: decodedToken.email_verified,
            name: decodedToken.name,
            picture: decodedToken.picture,
            // Add other fields you need from the token
        };
        
        console.log(`✅ User authenticated: ${req.user.email} (${req.user.uid})`);
        next();
        
    } catch (error) {
        console.error('❌ Token verification failed:', error.message);
        
        // Handle different types of errors
        if (error.code === 'auth/id-token-expired') {
            return res.status(401).json({ 
                message: 'Token has expired',
                error: 'TOKEN_EXPIRED'
            });
        } else if (error.code === 'auth/invalid-id-token') {
            return res.status(401).json({ 
                message: 'Invalid token format',
                error: 'INVALID_TOKEN'
            });
        } else {
            return res.status(401).json({ 
                message: 'Token verification failed',
                error: 'VERIFICATION_FAILED'
            });
        }
    }
}

module.exports = auth;
