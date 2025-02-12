import  { useState, useEffect } from 'react';
import SavedEvents from '../components/SavedSearches';

const SavedEventsPage = () => {
  const [token, setToken] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchToken = async () => {
      const userToken = await new Promise<string>((resolve) =>
        setTimeout(() => resolve('user-auth-token'), 500)
      );
      console.log('Token fetched:', userToken); // Debugging
      setToken(userToken);
      setLoading(false);
    };

    fetchToken();
  }, []);

  return (
    <div>
      <h1>My Saved Events</h1>
      {loading ? <p>Loading token...</p> : token ? <SavedEvents /> : <p>No token found.</p>}
    </div>
  );
};

export default SavedEventsPage;