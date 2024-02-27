import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

const ProtectDashBoard = ({ children }) => {
  // user api
  const { user } = useAuth0();
  if (!user) {
    return <Navigate to="/" />;
  }
//   if (user !== "admin") {
//     return <Navigate to="/" />;
//   }
  return children;
};
export default ProtectDashBoard;
