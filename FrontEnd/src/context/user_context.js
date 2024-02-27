import React, { useContext, useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";

const UserContext = React.createContext();
export const UserProvider = ({ children }) => {
  const [myUser, setMyUser] = useState(null);
  const { loginWithRedirect, logout, user } = useAuth0();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const Login = () => {
    try {
      const res = axios.post("http://localhost:5000/api/v1/auth/login", {
        email,
        password,
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setMyUser(user);
  }, [user]);
  return (
    <UserContext.Provider
      value={{
        loginWithRedirect,
        logout,
        myUser,
        name,
        setName,
        password,
        setPassword,
        email,
        setEmail,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
// make sure use
export const useUserContext = () => {
  return useContext(UserContext);
};
