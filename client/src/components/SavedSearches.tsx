import { useEffect, useState } from 'react';
import { fetchEvents, deleteEvent } from '../api/eventAPI';
import { EventData } from '../interfaces/EventData';
import AuthService from '../utils/auth';

const SavedEvents = () => {
  const [events, setEvents] = useState<EventData[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Get the token from AuthService
  const token = AuthService.getToken();

  useEffect(() => {
    const loadEvents = async () => {
      if (!token) {
        setError('No valid token found.');
        setLoading(false);
        return;
      }

      setLoading(true);
      const fetchedEvents = await fetchEvents(token);
      if (fetchedEvents) {
        setEvents(fetchedEvents);
      } else {
        setError('Failed to load events.');
      }
      setLoading(false);
    };

    loadEvents();
  }, [token]);

  const handleDelete = async (eventId: number) => {
    if (!token) {
      setError('No valid token found.');
      return;
    }

    const responseMessage = await deleteEvent(eventId, token);
    if (responseMessage) {
      setEvents(events?.filter(event => event.id !== eventId) || null);
    } else {
      setError('Failed to delete event.');
    }
  };

  if (loading) return <p>Loading events...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  return (
    <div>
      <h2>Saved Events</h2>
      {events && events.length > 0 ? (
        <div>
          {events.map(event => (
            <div key={event.id} style={{ display: 'flex', alignItems: 'start', marginBottom: '20px' }}>
              <ul style={{ listStyleType: 'none', padding: '10px', marginLeft: '20px'}}>
                <li><img height='175px' src={`../assests/${event.moon_phase}.webp`} alt={event.moon_phase} /></li>
                <li><strong>Location:</strong> {event.location}</li>
                <li><strong>Date:</strong> {event.date}</li>
                <li><strong>Moon Phase:</strong> {event.moon_phase}</li>
              </ul>
              {event.weather ? (
                <ul style={{ listStyleType: 'none', padding: '10px', marginLeft: '20px'}}>
                  <img height='175px' src={`http://openweathermap.org/img/wn/${event.weather.weather[0].icon}.png`} alt={event.weather.weather[0].main} />
                  <li><strong>Weather:</strong> {event.weather.weather[0].main}</li>
                  <li><strong>Temperature:</strong> {Math.trunc(((event.weather.main.temp)-273.15)*(9/5)+32)}°F</li>
                  <li><strong>Humidity:</strong> {event.weather.main.humidity}%</li>
                  <li><strong>Wind Speed:</strong> {event.weather.wind.speed} m/s</li>
                </ul>
              ) : (
                <p>No weather data available.</p>
              )}
              <button onClick={() => handleDelete(event.id!)}>Delete</button>
            </div>
          ))}
        </div>
      ) : (
        <p>No saved events found.</p>
      )}
    </div>
  );
};

export default SavedEvents;