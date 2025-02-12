import { useEffect, useState } from 'react';
import { fetchEvents, deleteEvent } from '../api/eventAPI';
import { EventData } from '../interfaces/eventData';

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
  
    if (loading) return <p className="text-gray-400 text-lg animate-pulse">Loading events...</p>;
    if (error) return <p className="text-red-500 text-lg font-semibold">{error}</p>;
  
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white">
        <h2 className="text-2xl font-bold text-indigo-500 mb-6">
          Saved Events
        </h2>
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
  