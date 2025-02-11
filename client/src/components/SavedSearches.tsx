import { useEffect, useState } from 'react';
import { fetchEvents, deleteEvent } from '../api/eventAPI';
import { EventData } from '../interfaces/EventData';

const SavedEvents = ({ token }: { token: string }) => {
    const [events, setEvents] = useState<EventData[] | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
  
    useEffect(() => {
      const loadEvents = async () => {
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
          <ul>
            {events.map(event => (
              <li key={event.id}>
                <strong>{event.location}</strong> - {event.date} ({event.moonPhase})
                <button onClick={() => handleDelete(event.id!)}>Delete</button>
              </li>
            ))}
          </ul>
        ) : (
          <p>No saved events found.</p>
        )}
      </div>
    );
  };
  
  export default SavedEvents;
  