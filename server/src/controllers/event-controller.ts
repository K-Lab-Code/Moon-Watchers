import { Request, Response } from 'express';
// GET /event
export const getAllEvents = async (_req: Request, res: Response) => {
    //placeholder
    console.log('placeholder');
    res.send("Placeholder /event GET");
};

// POST /event
export const saveEvent = async (_req: Request, res: Response) => {
    //placeholder
    console.log('placeholder');
    res.send("Placeholder /event POST");
};

// DELETE /event/:id
export const deleteEvent = async (_req: Request, res: Response) => {
    //placeholder
    console.log('placeholder');
    res.send("Placeholder /event/:id DELETE");
};