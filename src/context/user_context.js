import React, { useContext, useEffect, useReducer, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import reducer from "../reducers/user_reduser";
import { SET_USER } from "../actions";
const initialState = {
  User: null,
};

const UserContext = React.createContext();
export const UserProvider = ({ children }) => {
  const [user, setMyUser] = useState(null);
  // const { loginWithRedirect, logout, user } = useAuth0();
  const [state, dispatch] = useReducer(reducer, initialState);

  const setUser = async (userData) => {
    try {
      const res = await axios.post("http://localhost:5000/api/v1/auth/login", {
        ...userData,
      });
      dispatch({ type: SET_USER, payload: res.data.user });
    
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
   setMyUser(state.User)
  }, [state.User]);
  return (
    <UserContext.Provider value={{ setUser, ...state ,user}}>
      {children}
    </UserContext.Provider>
  );
};
// make sure use
export const useUserContext = () => {
  return useContext(UserContext);
};
