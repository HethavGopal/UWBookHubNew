const express = require('express');
const User = require('./user.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const router = express.Router();

const JWT_SECRET = process.env.JWT_SECRET_KEY || 'your-secret-key'; // Fallback secret key

// Create new admin user
router.post("/create-admin", async (req, res) => {
    try {
        const { username, password } = req.body;
        console.log("Creating new admin user:", username);

        // Check if admin already exists
        const existingAdmin = await User.findOne({ username });
        if (existingAdmin) {
            return res.status(400).json({ message: "Username already exists" });
        }

        // Create new admin user
        const admin = new User({
            username,
            password,
            role: 'admin'
        });

        await admin.save();
        console.log("Admin user created successfully:", admin);

        return res.status(201).json({ 
            message: "Admin user created successfully",
            admin: {
                username: admin.username,
                role: admin.role
            }
        });
    } catch (error) {
        console.error("Failed to create admin:", error);
        return res.status(500).json({ 
            message: "Failed to create admin",
            error: error.message
        });
    }
});

// Admin login
router.post("/admin", async (req, res) => {
    try {
        const { username, password } = req.body;
        console.log("Admin login attempt for:", username);
        
        // Find admin user with exact match
        const admin = await User.findOne({ 
            username: username,
            role: 'admin'
        });
        
        console.log("Found admin:", admin);
        
        if (!admin) {
            // Get all users for debugging
            const allUsers = await User.find({});
            return res.status(401).json({ 
                message: "Invalid admin credentials",
                debug: {
                    searchedUsername: username,
                    totalUsers: allUsers.length,
                    existingUsers: allUsers.map(user => ({
                        username: user.username,
                        role: user.role,
                        id: user._id
                    }))
                }
            });
        }

        // Compare password using bcrypt
        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid admin credentials" });
        }
        
        // Generate JWT token
        const token = jwt.sign(
            { id: admin._id, username: admin.username, role: admin.role }, 
            JWT_SECRET,
            { expiresIn: "1h" }
        );

        return res.status(200).json({
            message: "Authentication successful",
            token: token,
            user: {
                username: admin.username,
                role: admin.role
            }
        });
    } catch (error) {
        console.error("Failed to login as admin:", error);
        return res.status(500).json({ message: "Failed to login as admin" });
    }
});

module.exports = router;