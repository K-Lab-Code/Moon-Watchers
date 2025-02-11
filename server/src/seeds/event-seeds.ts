import { Event } from '../models/event.js';

export const seedEvent = async () => {
  await Event.bulkCreate([
    { date:'2025-10-28', location:'Layton', moon_phase:"First Quarter", userId:2},
    { date:'2025-5-20', location:'Syracuse', moon_phase:"Waning Crescent", userId:1},
    { date:'2025-11-11', location:'Ogden', moon_phase:"Waning Gibbous", userId:1},
    { date:'2025-6-28', location:'Salt Lake City', moon_phase:"Waxing Crescent", userId:3},
    { date:'2025-4-13', location:'Atlanta', moon_phase:"Full Moon", userId:2},
    { date:'2025-6-7', location:'Billings', moon_phase:"Waxing Gibbous", userId:3},
  ], { individualHooks: true });
};
