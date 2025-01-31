import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface JwtPayload {
  username: string;
}

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  //Check if the authorization header is present in request
    const authHeader = req.headers.authorization;

    if (authHeader) {
      // Find the token from the authorization header
      const token = authHeader.split(' ')[1];
  
      // Get the secret key from the environment variables file
      const secretKey = process.env.JWT_SECRET_KEY || '';
  
      // Verify the JWT token
      jwt.verify(token, secretKey, (err, user) => {
        if (err) {
          return res.sendStatus(403); // Send forbidden status if the token is invalid
        }
  
        // Attach the user information to the request object
        req.user = user as JwtPayload;
        return next(); // Call the next middleware function in server
      });
    } else {
      res.sendStatus(401); // Send unauthorized status if no authorization header is present in header
    }
};
