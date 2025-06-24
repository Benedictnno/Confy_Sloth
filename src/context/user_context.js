import React, { useContext, useEffect, useState } from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import axios from 'axios'
import reducer from "../reducers/user_reducer";
const initialState = {
  User: null,  
};

const UserContext = React.createContext()
export const UserProvider = ({ children }) => {
  const [myUser, setMyUser] =useState(null)
  const { loginWithRedirect,logout,user } = useAuth0()
  const [state, dispatch] = useReducer(reducer, initialState);

  const setUser =async (userData)=>{
    try {
      const res = await axios.post("http://localhost:5000/api/v1/auth/login", {
        ...userData,
      });
    
    } catch (error) {
      console.log(error);
      
    }
  }

  useEffect(()=>{
    setMyUser(user);
  },[user])
  return (
    <UserContext.Provider value={{ loginWithRedirect, logout , myUser , setMyUser}}>
      {children}
    </UserContext.Provider>
  );
}
// make sure use
export const useUserContext = () => {
  return useContext(UserContext)
}
