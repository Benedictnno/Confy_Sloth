import React from "react";
import { Route, Navigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
// will remove later

const PrivateRoute = ({ children, ...rest }) => {
  // const {myUser} = useUserContext()
  const { user } = useAuth0();
  if (!user) {
    return <Navigate to={"/"} />;
  }
  return children;
};
export default PrivateRoute;
