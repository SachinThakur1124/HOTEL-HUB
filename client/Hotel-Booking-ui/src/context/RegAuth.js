import { createContext, useEffect, useReducer } from "react";

const INITIAL_STATE = {
  user: JSON.parse(localStorage.getItem("user") || null),
  loading: false,
  error: null,
};

export const RegAuthContext = createContext();

const regAuthReducer = (state, action) => {
  switch (action.type) {
    case "SIGNUP_START":
      return {
        ...state,
        loading: true,
        error: null,
      };
    case "SIGNUP_SUCCESS":
      return {
        ...state,
        user: action.payload,
        loading: false,
        error: null,
      };
    case "SIGNUP_FAILURE":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const RegAuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(regAuthReducer, INITIAL_STATE);

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(state.user));
  }, [state.user]);

  return (
    <RegAuthContext.Provider
      value={{
        user: state.user,
        loading: state.loading,
        error: state.error,
        dispatch,
      }}
    >
      {children}
    </RegAuthContext.Provider>
  );
};
