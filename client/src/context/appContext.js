import React, { useReducer, useContext, createContext } from "react";
// Reducer function
import reducer from "./reducer";
// Import action types
import { DISPLAY_ALERT, CLEAR_ALERT } from "./actions";

// Initial states for the state
const initialState = {
  isLoading: false,
  showAlert: false,
  alertText: "",
  alertType: "",
};

const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const displayAlert = () => {
    dispatch({ type: DISPLAY_ALERT });
    clearAlert();
  };

  // Clear the alert text after 2 seconds
  const clearAlert = () => {
    setTimeout(() => {
      dispatch({ type: CLEAR_ALERT });
    }, 2000);
  };

  return (
    // Spread the values inside state object
    <AppContext.Provider value={{ ...state, displayAlert }}>
      {children}
    </AppContext.Provider>
  );
};

// Make a hook to avoid importing useContext and AppContext to every component to have access to value props. Needs to start with "use" to useContext inside.
export const useAppContext = () => {
  return useContext(AppContext);
};

export { AppProvider, initialState };