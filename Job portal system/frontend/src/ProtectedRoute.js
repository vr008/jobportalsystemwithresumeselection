import React, { useEffect, useState } from 'react';
import { Route, Navigate } from 'react-router-dom';
import Dashboard from './pages/Dashboard';



const ProtectedRoute = ({ element }) => {
  const [authenticated, setAuthenticated] = useState(true);

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          // Send a request to the server to validate the token
          const response = await fetch('http://localhost:4000/auth/dashboard', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          if (response.ok) {
            setAuthenticated(true);
          } else {
            setAuthenticated(false);
            console.log('Token validation failed');
          }
        } else {
          setAuthenticated(false);
          console.log('No token found');
        }
      } catch (error) {
        setAuthenticated(false);
        console.error('Error while verifying token:', error);
      }
    };

    checkAuthentication();
  }, []);

  useEffect(() => {
    console.log('isAuthenticated:', authenticated);
  }, [authenticated]);

  return authenticated ? (
    element
  ) : (
    <Navigate to="/login" replace={true} />
  );
};

export default ProtectedRoute;

