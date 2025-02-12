import React from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import auth from '../utils/auth';


const Navbar = () => {
  const [loginCheck, setLoginCheck] = useState(false);
  
  useEffect(() => {
    // Only check if logged in on initial mount
    if (auth.loggedIn()) {
      setLoginCheck(true);
    }
  }, []); 



  //TODO: make sure CSS styling interacts correctly with Navbar
  return (
    <nav className="h-screen bg-gradient-to-r from-gray-800 via-indigo-900 to-gray-800 text-white !important"> 
    <div className=".ax-w-7xl mx-auto px-4">
      
      <h1 className=" font-serif text-5xl font-bold text-slate-200 border-8 px-12 py-10 border-slate-500 mb-4 rounded-full text-center">
        Moon Watchers ☾
      
      <h2 className="font-serif text-base text-slate-200 text-center py-4">
        For people who love the moon.
      </h2>
      </h1>
      <ul className="space-y-5">
        <li>
          <Link
            to="/"
            className="px-2 py-1 border-1 rounded-lg hover:bg-indigo-900 hover:text-white transition hover:border-indigo-900"
          >
            Home
          </Link>
        </li>
        <li>
          <Link
            to="/search"
            className="px-2 py-1 border-1 rounded-lg hover:bg-indigo-900 hover:text-white transition hover:border-indigo-900"
          >
            Search
          </Link>
        </li>
        <li>
          <Link
            to="/saved"
            className="px-2 py-1 border-1 rounded-lg hover:bg-indigo-900 hover:text-white transition hover:border-indigo-900"
          >
            Saved
          </Link>
        </li>
        <li>
          <Link
            to="/learnMore"
            className="px-2 py-1 border-1 rounded-lg hover:bg-indigo-900 hover:text-white transition hover:border-indigo-900"
          >
            Learn More
          </Link>
        </li>
      </ul>

      {/* Authent Links */}
      <div className="mt-4 flex justify-left">
        {!loginCheck ? (
          <Link
            to="/login"
            className="px-2 py-1 border-1 rounded-lg hover:bg-indigo-900 hover:text-white transition hover:border-indigo-900"
          >
            Login
          </Link>
        ) : (
          <button
            onClick={() => auth.logout()}
            className="border-2 px-3 py-1 rounded-lg justify-end hover:bg-gray-800 hover:border-indigo-900"
          >
            Logout
          </button>
        )}
      </div>
    </div>
  </nav>
);
};
    

export default Navbar;
  

      





