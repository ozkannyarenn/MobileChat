import React, { useEffect, useContext } from "react";
import { Navigation } from "./navigation/navigation";
import {Auth, LogOut} from './app/auth';
import { Provider, AuthContext } from './app/provider';

import axios from 'axios';
axios.defaults.headers["Host"] = "localhost:63848";

const App = ()=>{
  const {state, dispatch} = useContext(AuthContext);
  useEffect(() => {
    const fetchAuth = async () => {
      let tokeng =  await Auth();
      dispatch({ type: 'RESTORE_TOKEN', token: tokeng });
    };
    fetchAuth();
    
  }, []);
  return (
    <Navigation isUser={state.userToken} />
  )
}

export default function Context() {
  return (
    <Provider>
     <App/>
    </Provider>
  );
}
