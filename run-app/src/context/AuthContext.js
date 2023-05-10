import { createContext } from "react";

const AuthContext = createContext({
  status: "idle",
  userToken: null,
  signIn: () => {},
  signOut: () => {},
});

export default AuthContext;
