import { useState, FormEvent, ChangeEvent } from "react";
import Auth from '../utils/auth';
import { login } from "../api/authAPI";
import type { UserLogin } from "../interfaces/UserLogin";

const Login = () => {
  const [loginData, setLoginData] = useState<UserLogin>({
    username: '',
    password: ''
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setLoginData({
      ...loginData,
      [name]: value
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const data = await login(loginData);
      Auth.login(data.token);
    } catch (err) {
      console.error('Failed to login', err);
    }
  };

  return (
    <div className='flex justify-center items-center min-h-screen bg-gradient-to-r from-gray-800 via-indigo-900 to-gray-800'>
      <form className='bg-white p-8 rounded-lg shadow-lg max-w-sm w-full' onSubmit={handleSubmit}>
        <h1 className='text-3xl font-bold text-center text-indigo-900 mb-6'>Login</h1>
        <div className='mb-4'></div>
        <label
          className='block text-gray-700 text-sm font-bold mb-2'
          htmlFor='username'
        >Username
        </label>
        
        <input 
        
          type='text'
          name='username'
          value={loginData.username || ''}
          onChange={handleChange}
          className="w-full p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-900"
          placeholder="Enter your username"
        />
        <div className='mb-4'>
      <label
      className='block text-gray-700 text-sm font-bold mb-2'
      htmlFor='password'
      >Password
      </label>
        <input 
          type='password'
          name='password'
          value={loginData.password || ''}
          onChange={handleChange}
          className="w-full p-3 mt-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-900"
          placeholder="Enter your password"
        />
        </div>
        <button 
        type='submit'
        className="w-full py-3 bg-indigo-900 text-white font-semibold rounded-lg hover:bg-indigo-800 focus:outline-none focus:ring-2 focus:ring-indigo-900"
        >Submit Form
        </button>
      </form>
    </div>
    
  )
};

export default Login;

