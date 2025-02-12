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
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center px-4">
      
      <h1 className="font-serif text-2xl font-bold mb-4 text-slate-200">
        Search Moon Phase & Weather ⛅︎
      </h1>
      <form onSubmit={handleSubmit} className="bg-gray-800 p-6 rounded-lg shadow-md w-full max-w-md">
        <label className="block mb-4">
          <span className="text-gray-300">
            Date:
          </span>   
            <input 
              type="date" 
              name="date" 
              value={searchData.date} 
              onChange={handleChange} required 
              className="mt-1 w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:outline-none"/>

        </label>
        <label className="block mb-4">
          <span className="text-gray-300">
            Location:
          </span>
              <input 
                type="text" 
                name="location" 
                value={searchData.location} 
                onChange={handleChange} required 
                className="mt-1 w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:outline-none"/>
        </label>

        <button 
        type="submit" 
        disabled={loading}
        className="w-full bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded-lg transition duration-300"
        >Search
        </button>
      </form>
      
      {loading && <p className="text-gray-500 mt-4 animate-pulse">Loading...</p>}
      {error && <p className="text-red-500 mt-4"> {error}</p>}
      {result ? (
        <div className="bg-gray-800 p-6 mt-6 rounded-2xl shoadow-lg w-full max-w-md">
          <h3 className="text-xl font-bold mb-4">Search Results</h3>
          
            <p><strong>Location:</strong> {result.location}</p>
            <p><strong>Date:</strong> {result.date}</p>
            <p><strong>Moon Phase:</strong> {result.moonPhase}</p>
          
            
          {result.weather ? (
            <ul className="mt-4 bg-gray-700 p-4 rounded-lg">
              <li className="flex items-center space-x-2">
                <img 
                src={`http://openweathermap.org/img/wn/${result.weather.weather[0].icon}.png`} alt={result.weather.weather[0].main} /> <strong>Weather:</strong> {result.weather.weather[0].main}</li>
              <li><strong>Temperature:</strong> {Math.trunc(((result.weather as any).main.temp - 273.15) * (9 / 5) + 32)}°F</li>
              <li><strong>Humidity:</strong> {result.weather.main.humidity}%</li>
              <li><strong>Wind Speed:</strong> {result.weather.wind.speed} m/s</li>
            </ul>
          ) : (
            <p className="text-gray-500 mt-2">
              No weather data available.
            </p>
          )}
        </div>
      ) : (
        <p className="text-gray-500 mt-2">
          No results found.
        </p>
      )}
    </div>
  );
};

export default SearchForm;
