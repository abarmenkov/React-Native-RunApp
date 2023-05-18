import React, {
  createRef,
  useReducer,
  useContext,
  useCallback,
  useEffect,
  useMemo,
  useImperativeHandle,
} from "react";
import AuthContext from "../context/AuthContext";
import { useAuth } from "../hooks/useAuth";
//import { getToken, setToken, removeToken } from './utils-expo.tsx';
//import { getToken, setToken, removeToken } from './utils-async-storage.tsx';
import { getToken, setToken, removeToken } from "./expo-secure-store";

// In case you want to use Auth functions outside React tree
export const AuthRef = createRef();

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, {
    status: "idle",
    userToken: null,
  });

  useEffect(() => {
    const initState = async () => {
      try {
        const userToken = await getToken();
        if (userToken !== null) {
          dispatch({ type: "SIGN_IN", token: userToken });
        } else {
          dispatch({ type: "SIGN_OUT" });
        }
      } catch (e) {
        // catch error here
        // Maybe sign_out user!
      }
    };

    initState();
  }, []);

  useImperativeHandle(AuthRef, () => authActions);

  const authActions = useMemo(
    () => ({
      signIn: async (token, checked) => {
        dispatch({ type: "SIGN_IN", token });
        if (checked) {
          await setToken(token);
        }
      },
      signOut: async () => {
        await removeToken(); // TODO: use Vars
        dispatch({ type: "SIGN_OUT" });
      },
    }),
    []
  );

  return (
    <AuthContext.Provider value={{ ...state, ...authActions }}>
      {children}
    </AuthContext.Provider>
  );
};

const AuthReducer = (prevState, action) => {
  switch (action.type) {
    case "SIGN_IN":
      return {
        ...prevState,
        status: "signIn",
        userToken: action.token,
      };
    case "SIGN_OUT":
      return {
        ...prevState,
        status: "signOut",
        userToken: null,
      };
  }
};
