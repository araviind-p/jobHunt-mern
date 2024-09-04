import axios from 'axios';
import React, { useEffect } from 'react';
import { FaGoogle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const handleGoogleLogin = () => {
    // Redirect to the backend route that handles Google OAuth
    window.location.href = 'http://127.0.0.1:5000/auth/google';
  };
  const navigate = useNavigate()

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axios.get('https://jobhunt-mern.onrender.com/profile', { withCredentials: true });
        if (response.data) {
          navigate('/dashboard');
        }
      } catch (error) {
        console.log('User is not logged in');
      }
    };

    checkAuth();
  }, [navigate]);
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <button
          onClick={handleGoogleLogin}
          className="flex items-center justify-center w-full px-4 py-2 text-white bg-red-500 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-50 dark:bg-red-600 dark:hover:bg-red-700"
        >
          <FaGoogle className="mr-2" />
          Login with Google
        </button>
      </div>
    </div>
  );
};

export default Login;
