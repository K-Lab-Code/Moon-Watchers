export interface EventData {
  id?: number;
  location: string;
  date: string;
<<<<<<< HEAD
=======
  moonPhase: string;
>>>>>>> 84df188f2e75c2f02fcf9d0dbfbdd7371be7517c
  moon_phase: string;
  weather?: {
    weather: { main: string; icon: string }[];
    main: { temp: number; humidity: number };
    wind: { speed: number };
  };
}