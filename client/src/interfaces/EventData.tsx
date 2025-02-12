export interface EventData {
  id?: number;
  location: string;
  date: string;
  moon_phase: string;
  weather?: {
    weather: { main: string; icon: string }[];
    main: { temp: number; humidity: number };
    wind: { speed: number };
  };
}