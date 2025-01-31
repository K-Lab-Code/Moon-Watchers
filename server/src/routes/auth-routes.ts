import { Router, Request, Response } from 'express';
import { User } from '../models/user.js';
import jwt from 'jsonwebtoken'; 
import * as bcrypt from 'bcrypt';


export const login = async (req: Request, res: Response) => {
  // If the user exists and the password is correct a JWT token is returned
  const { username, password } = req.body;

  try {
    // Find the user by username
    const user = await User.findOne({
      where: { username },
    });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Compare the password with bcrypt
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    // Create a JWT token
    const token = jwt.sign({ username: user.username, userId: user.id }, process.env.JWT_SECRET_KEY || '', { expiresIn: '1h' });//username maybe
    // Return the token
    return res.json({ token });
  } catch (error) {
    return res.status(500).json({ message: 'Server error' });
  }
};

const router = Router();

// POST /login - Login a user
router.post('/login', login);

export default router;
