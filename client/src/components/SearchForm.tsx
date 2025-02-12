import React, { useState } from 'react';
import fetchSearchResults from '../api/searchAPI';
import type { SearchRequest } from '../interfaces/SearchRequest';
import type { SearchResult } from '../interfaces/SearchResult';


const SearchForm = () => {
  const [searchData, setSearchData] = useState<SearchRequest>({
    date: '',
    location: '',
  });
  const [result, setResult] = useState<SearchResult | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchData({ ...searchData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const searchResult = await fetchSearchResults(searchData);
      if (searchResult) {
        setResult(searchResult);
      } else {
        setError('Failed to retrieve search results.');
      }
    } catch (error) {
      setError('An unexpected error occurred.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Search Moon Phase & Weather</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Date:
          <input type="date" name="date" value={searchData.date} onChange={handleChange} required />
        </label>
        <label>
          Location:
          <input type="text" name="location" value={searchData.location} onChange={handleChange} required />
        </label>
        <button type="submit" disabled={loading}>Search</button>
      </form>
      
      <div>
        <h2>Results:</h2>
      </div>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {result ? (
        <div style={{ display: 'flex', alignItems: 'start' }}>
          <ul style={{ listStyleType: 'none', padding: '10px', marginLeft: '20px'}}>
            <li><img height='175px' src={`../assests/${result.moonPhase}.webp`} alt={result.moonPhase} /></li>
            <li><strong>Location:</strong> {result.location}</li>
            <li><strong>Date:</strong> {result.date}</li>
            <li><strong>Moon Phase:</strong> {result.moonPhase}</li>
          </ul>
          {result.weather ? (
            <ul style={{ listStyleType: 'none', padding: '10px', marginLeft: '20px'}}>
              <img height='175px' src={`http://openweathermap.org/img/wn/${result.weather.weather[0].icon}.png`} alt={result.weather.weather[0].main} />
              <li><strong>Weather:</strong> {result.weather.weather[0].main}</li>
              <li><strong>Temperature:</strong> {Math.trunc(((result.weather.main.temp)-273.15)*(9/5)+32)}°F</li>
              <li><strong>Humidity:</strong> {result.weather.main.humidity}%</li>
              <li><strong>Wind Speed:</strong> {result.weather.wind.speed} m/s</li>
            </ul>
          ) : (
            <p>No weather data available.</p>
          )}
        </div>
      ) : (
        <p>No results found.</p>
      )}
    </div>
  );
};

export default SearchForm;
