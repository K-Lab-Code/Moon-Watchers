export interface EventData {
  id?: number;
  location: string;
  date: string;
  moonPhase: string;
  weather?: {
    weather: { main: string; icon: string }[];
    main: { temp: number; humidity: number };
    wind: { speed: number };
  };
}