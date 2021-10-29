import React, { useReducer, useMemo, useEffect, createContext } from "react";

import { reducer } from "./reducer";

const AuthContext = createContext();

const Provider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, {
    isLoading: true,
    isSignout: false,
    userToken: null,
    id:null, // burayada kendi ip adresini yaz
    image:"http://192.168.2.98:63848/api/ApplicationUser/login",
    name: "ad",
    surName: "soyad",
    userName: null,
  });

  const Value = { state, dispatch };

  return <AuthContext.Provider value={Value}>{children}</AuthContext.Provider>;
};

export { Provider, AuthContext };
