import { createContext, useContext, useState, useEffect } from "react";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, signOut, onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/firebase.config";

const AuthContext = createContext();
export const useAuth = () => {
    return useContext(AuthContext);
}

export const AuthProvider = ({children}) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const googleProvider = new GoogleAuthProvider();

    // Register a new user
    const registerUser = async (email, password) => {
        const result = await createUserWithEmailAndPassword(auth, email, password);
        setCurrentUser(result.user);
        return result;
    }

    // Login user
    const loginUser = async (email, password) => {
        const result = await signInWithEmailAndPassword(auth, email, password);
        setCurrentUser(result.user);
        return result;
    }

    // Google sign in
    const googleSignIn = async () => {
        const result = await signInWithPopup(auth, googleProvider);
        setCurrentUser(result.user);
        return result;
    }

    // Logout user
    const logoutUser = async () => {
        await signOut(auth);
        setCurrentUser(null);
    }

    // Manage user state
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setCurrentUser(user);
            setLoading(false);
        });
        return () => unsubscribe();
    }, []);

    const value = {
        currentUser,
        setCurrentUser,
        registerUser,
        loginUser,
        googleSignIn,
        logoutUser,
        loading
    }

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
} 
