import React, { useState, useReducer, useContext, createContext } from "react";

// Initial state for the state
const initialState = {
  isLoading: false,
  showAlert: false,
  alertText: "",
  alertType: "",
};

const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [state, setState] = useState(initialState);

  return (
    <AppContext.Provider value={{ ...state }}>{children}</AppContext.Provider>
  );
};

// Make a hook to avoid importing useContex and AppContext to every component to have access to value props. Needs to start with "use" to useContext inside.
export const useAppContext = () => {
  return useContext(AppContext);
};

export { AppProvider, initialState };
