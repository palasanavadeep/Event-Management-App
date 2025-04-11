import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from './context/AuthContext';

function Protected({ adminLevel = false, children }) {
  const navigate = useNavigate();
  const { auth } = useContext(AuthContext);

  useEffect(() => {
    // Redirect to signin if the user is not logged in
    if (!auth.isLoggedIn) {
      navigate('/signin');
      return;
    }

    // Redirect if user is logged in but doesn't have admin access
    if (adminLevel && auth.isLoggedIn && auth.role !== 'ADMIN') {
      console.log('Only Admins can access this page!');
      navigate('/');
    }
  }, [auth.isLoggedIn, auth.role, adminLevel, navigate]);

  // Render the children only if the user is authenticated and has the proper role
  if (!auth.isLoggedIn || (adminLevel && auth.role !== 'ADMIN')) {
    return null; // Optionally, render a loading state or a fallback UI
  }

  return <>{children}</>; // Render the protected content
}

export default Protected;
