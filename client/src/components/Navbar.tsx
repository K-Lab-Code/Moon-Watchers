import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import auth from '../utils/auth';

const Navbar = () => {
  const [ loginCheck, setLoginCheck ] = useState(false);

  const checkLogin = () => {
    if(auth.loggedIn()) {
      setLoginCheck(true);
    }
  };

  useEffect(() => {
    console.log(loginCheck);
    checkLogin();
  }, [loginCheck])


  //TODO: make sure CSS styling interacts correctly with Navbar
  return (
    <div className='nav'>
      <h1>Moon Watchers</h1>
        <ul className='nav-list'>
          <li className='nav-item'>
            <button type='button'>
              <Link to='/'>Home</Link>
            </button>
          </li>
          <li className='nav-item'>
            <button type='button'>
              <Link to='/search'>Search</Link>
            </button>
          </li>
          <li className='nav-item'>
            <button type='button'>
              <Link to='/saved'>Saved</Link>
            </button>
          </li>
          <li className='nav-item'>
            <button type='button'>
              <Link to='/learnMore'>Learn More</Link>
            </button>
          </li>
      {
        !loginCheck ? (
          <li className='nav-item'>
            <button type='button'>
              <Link to='/login'>Login</Link>
            </button>
          </li>
        ) : (
          <li className='nav-item'>
            <button type='button' onClick={() => {
              auth.logout();
            }}>Logout</button>
          </li>
        )
      }
      </ul>
    </div>
  )
}

export default Navbar;
