import { Request, Response } from 'express';
import { Event } from '../models/event.js';
import * as jwt_decode from 'jwt-decode';
interface DecodedToken {
  userId: string;
}

// GET /event
export const getAllEvents = async (req: Request, res: Response) => {
  try {
    const authHeader = req.headers.authorization;
    let userId = 0;
    if (authHeader) {
      // Find the token from the authorization header
      const token = jwt_decode.jwtDecode(authHeader.split(' ')[1]);

      const decodedToken = token as DecodedToken;
      userId = Number(decodedToken.userId);
      if (userId === 0 || isNaN(userId)) {
        throw new Error("No proper userId detected");// might want check database first to be sure!!!
      }
    }
    const events = await Event.findAll({
      attributes: { exclude: ['userId', 'createdAt', 'updatedAt'] },
      where: { userId }
  });//attributes: { exclude: ['password'] }}
    res.json(events);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// POST /event
export const saveEvent = async (req: Request, res: Response) => {
  //placeholder
  try {
    const authHeader = req.headers.authorization;
    let userId = 0;
    if (authHeader) {
      // Find the token from the authorization header
      const token = jwt_decode.jwtDecode(authHeader.split(' ')[1]);

      const decodedToken = token as DecodedToken;
      userId = Number(decodedToken.userId);
      if (userId === 0 || isNaN(userId)) {
        throw new Error("No proper userId detected");// might want check database first to be sure!!!
      }
    }
    const { location, date, moonPhase } = req.body;
    const newEvent = await Event.create({ location, date, moon_phase: moonPhase, userId });
    console.log(newEvent);
    res.json({ message: 'Event Created' });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

// DELETE /event/:id
export const deleteEvent = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const authHeader = req.headers.authorization;
    let userId = 0;
    if (authHeader) {
      // Find the token from the authorization header
      const token = jwt_decode.jwtDecode(authHeader.split(' ')[1]);

      const decodedToken = token as DecodedToken;
      userId = Number(decodedToken.userId);
      if (userId === 0 || isNaN(userId)) {
        throw new Error("No proper userId detected");// might want check database first to be sure!!!
      }
    }
    const event = await Event.findByPk(id);
    if (event && event.userId === userId) {
      await event.destroy();
      res.json({ message: 'Event deleted' });
    } else {
      res.status(404).json({ message: 'No Event under your userfound' });
    }
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};