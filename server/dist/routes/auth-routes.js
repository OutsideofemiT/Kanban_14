"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = void 0;
const express_1 = require("express");
const user_js_1 = require("../models/user.js");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const router = (0, express_1.Router)(); // 👈 define router BEFORE using it
const login = async (req, res) => {
    console.log("🟡 Login body received:", req.body);
    const { username, password } = req.body;
    console.log("Login attempt:", { username, password });
    if (!username || !password) {
        return res.status(400).json({ message: "Username and password are required" });
    }
    try {
        const user = await user_js_1.User.findOne({ where: { username } });
        console.log("User found:", user);
        if (!user) {
            return res.status(401).json({ message: "Invalid credentials" });
        }
        const validPassword = await bcrypt_1.default.compare(password, user.password);
        console.log("Password valid:", validPassword);
        if (!validPassword) {
            return res.status(401).json({ message: "Invalid credentials" });
        }
        const token = jsonwebtoken_1.default.sign({ username: user.username, id: user.id }, process.env.JWT_SECRET, { expiresIn: '2h' });
        console.log("Token generated:", token);
        return res.json({ token });
    }
    catch (err) {
        console.error("Login error:", err);
        res.status(500).json({ message: "Internal server error" });
    }
};
exports.login = login;
router.post('/login', exports.login);
exports.default = router;
