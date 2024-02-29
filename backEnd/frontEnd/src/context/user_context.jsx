import React, { useContext, useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";

const UserContext = React.createContext();
const getLocalStorage = () => {
  const value = localStorage.getItem("user");
  if (!value) {
    return null;
  } else return JSON.parse(value);
};
export const UserProvider = ({ children }) => {
  const [myUser, setMyUser] = useState(getLocalStorage());
  // const { loginWithRedirect, logout, user } = useAuth0();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const Login = async () => {
    try {
      const res = await axios.post("http://localhost:5000/api/v1/auth/login", {
        email,
        password,
      });
      console.log(res);
      setMyUser(res.data.tokenUser);
      // localStorage.setItem("user", JSON.stringify(res.data.tokenUser));
    } catch (error) {
      console.log(error);
    }
  };


  const logout = ()=>{
    localStorage.removeItem('user')
  }
  // useEffect(() => {
  //   setMyUser(user);
  // }, [user]);

  useEffect(()=>{
    localStorage.setItem('user',JSON.stringify(myUser))
  },[myUser])
  return (
    <UserContext.Provider
      value={{
        
        logout,
        myUser,
        name,
        setName,
        password,
        setPassword,
        email,
        setEmail,
        Login,
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
