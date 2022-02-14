import { createContext, useReducer } from 'react';

export const AuthContext = createContext();

const authReducer = (state, action) => {
  switch (action.type) {
    case 'CHANGE_USERNAME':
      return { ...state, username: action.payload };
    case 'AUTHENTICATE_USER':
      return { ...state, authUser: action.payload };
    default:
      return state;
  }
};

export function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(authReducer, {
    username: 'jessjelly',
    authUser: false,
  });

  const changeUser = (username) => {
    dispatch({ type: 'CHANGE_USERNAME', payload: username });
  };

  const authenticateUser = (authUser) => {
    dispatch({ type: 'AUTHENTICATE_USER', payload: authUser });
  };

  return (
    <AuthContext.Provider value={{ ...state, changeUser, authenticateUser }}>
      {children}
    </AuthContext.Provider>
  );
}
