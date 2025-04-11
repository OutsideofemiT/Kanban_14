import { Router, Request, Response } from 'express';
import { User } from '../models/user.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const router = Router(); // 👈 define router BEFORE using it

export const login = async (req: Request, res: Response) => {
  console.log("🟡 Login body received:", req.body);
  const { username, password } = req.body;
  console.log("Login attempt:", { username, password });

  if (!username || !password) {
    return res.status(400).json({ message: "Username and password are required" });
  }

  try {
    const user = await User.findOne({ where: { username } });
    console.log("User found:", user);

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const validPassword = await bcrypt.compare(password, user.password);
    console.log("Password valid:", validPassword);

    if (!validPassword) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { username: user.username, id: user.id },
      process.env.JWT_SECRET!,
      { expiresIn: '2h' }
    );

    console.log("Token generated:", token);

    return res.json({ token });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};


router.post('/login', login);

export default router;
