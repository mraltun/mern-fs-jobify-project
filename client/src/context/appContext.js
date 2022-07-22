import React, { useReducer, useContext, createContext } from "react";
// Reducer function
import reducer from "./reducer";

// Initial state for the state
const initialState = {
  isLoading: false,
  showAlert: false,
  alertText: "",
  alertType: "",
};

const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    // Spread the values inside state object
    <AppContext.Provider value={{ ...state }}>{children}</AppContext.Provider>
  );
};

// Make a hook to avoid importing useContext and AppContext to every component to have access to value props. Needs to start with "use" to useContext inside.
export const useAppContext = () => {
  return useContext(AppContext);
};

export { AppProvider, initialState };
