import { Request, Response } from 'express';
import dotenv from 'dotenv';
dotenv.config();
// POST /search
const apiKey = process.env.API_KEY;
export const search = async (req: Request, res: Response) => {
    //placeholder
    try {
        //get date and make usre its formated right.
        let [year, month, day] = req.body.date.split('-');
        month = month.padStart(2, '0');
        day = day.padStart(2, '0');
        const date: string = `${year}-${month}-${day}`;
        //create object that we will return to the client
        const data: { location: string, date: string, moonPhase: string, weather: null | object } = { location: req.body.location, date: date, moonPhase: '', weather: null };
        //fetch and the moon data needed for api response.
        let response = await fetch('https://api.viewbits.com/v1/moonphase?startdate=' + date);
        const moonData = await response.json();
        data.moonPhase = moonData[3].phase;
        try {
            //use weather api to get geo location data based on city name
            response = await fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${req.body.location}&limit=1&appid=${apiKey}`);
            const coordinates = (await response.json())[0];
            //now using lat and long the server calls for weather data from that area
            response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}`);
            const weatherData = (await response.json()).list;
            //for loop searches for the weather from 9:00PM of the day the the client's looking for if it exist
            for (const weather of weatherData) {
                if ((weather.dt_txt.split(' '))[1] === '21:00:00' && (weather.dt_txt.split(' '))[0] === date) {
                    data.weather = weather;
                    break;
                }
            }
            //return the data youve collected
            res.json(data);
        }
        catch {
            //if the only thing that failed was the weather or location api calls then the server returns the rest of the data to client.
            data.weather = null;
            res.json(data);
        }
    }
    catch (err) {
        //returns an error if any of the rest of the code has an error.
        res.status(400).send("The ERROR: " + err);
    }
    //res.send("Placeholder /search Post" + req.body.date);
};