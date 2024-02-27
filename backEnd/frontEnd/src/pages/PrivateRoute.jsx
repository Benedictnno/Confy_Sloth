import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import { useUserContext } from '../context/user_context';

const PrivateRoute = ({ children }) => {
const {myUser} = useUserContext()
  // user api
  const { user } = useAuth0();
  if (!myUser) {
    return <Navigate to='/' />;
  }
  return children;
};
export default PrivateRoute;