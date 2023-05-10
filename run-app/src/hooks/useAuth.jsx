import { useContext } from "react";
import AuthContext from "../context/AuthContext";

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be inside an AuthProvider with a value");
  }
  /*
      you can add more drived state here
      const isLoggedIn  = context.status ==== 'signIn'
      return ({ ...context, isloggedIn})
    */
  return context;
};
