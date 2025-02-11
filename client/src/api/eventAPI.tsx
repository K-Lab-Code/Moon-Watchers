import { EventData }  from "../interfaces/eventData";

const fetchEvents = async (token: string): Promise<EventData[] | null> => {
    try {
      const response = await fetch('/api/event', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (!response.ok) {
        throw new Error(`Network response was not ok! Status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error fetching events:', error);
      return null;
    }
  };
  
const saveEvent = async (eventData: EventData, token: string): Promise<string | null> => {
    try {
      const response = await fetch('/api/event', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(eventData)
      });
      
      if (!response.ok) {
        throw new Error(`Network response was not ok! Status: ${response.status}`);
      }
      
      return (await response.json()).message;
    } catch (error) {
      console.error('Error saving event:', error);
      return null;
    }
  };
  
const deleteEvent = async (eventId: number, token: string): Promise<string | null> => {
    try {
      const response = await fetch(`/api/event/${eventId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (!response.ok) {
        throw new Error(`Network response was not ok! Status: ${response.status}`);
      }
      
      return (await response.json()).message;
    } catch (error) {
      console.error('Error deleting event:', error);
      return null;
    }
  };

  export { fetchEvents, saveEvent, deleteEvent };