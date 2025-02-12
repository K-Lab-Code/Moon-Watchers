import { Request, Response } from 'express';
import { Event } from '../models/event.js';
import * as jwt_decode from 'jwt-decode';
import dotenv from 'dotenv';
dotenv.config();

const apiKey = process.env.API_KEY;
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
    const dataList = [];
    let dataObj!: { moonPhase: string, location: string, date: string, id: number, weather: object | null };
    let response;
    for (let event of events) {
      dataObj = { moonPhase: event.moon_phase, location: event.location, date: event.date, id: event.id, weather: null };
      try {
        //use weather api to get geo location data based on city name
        response = await fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${event.location}&limit=1&appid=${apiKey}`);
        const coordinates = (await response.json())[0];
        //now using lat and long the server calls for weather data from that area
        response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}`);
        const weatherData = (await response.json()).list;
        //for loop searches for the weather from 9:00PM of the day the the client's looking for if it exist
        for (const weather of weatherData) {
          if ((weather.dt_txt.split(' '))[1] === '21:00:00' && (weather.dt_txt.split(' '))[0] === event.date) {
            dataObj.weather = weather;
            break;
          }
        }
        //add this data object to list of data
        dataList.push(dataObj);
      }
      catch {
        //add this data object to list of data
        dataList.push(dataObj);
      }

    }
    res.json(dataList);
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