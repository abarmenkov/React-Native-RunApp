import React, { useState } from "react";
import ProfileContext from "./ProfileContext";

const ProfileContextProvider = ({ children }) => {
  const initialState = {
    name: "Andrey",
    surname: "Barmenkov",
    birthday: null,
    avatar: require("../../assets/images/Avatar.png"),
    gender: "male",
    email: "ab1975@mail.ru",
    phone: '89166505275',
    address: "",
    CCInfo: {
      number: null,
      CVC: null,
      expDate: null,
    },
  };
  const [profileData, setProfileDAta] = useState(initialState);
  return (
    <ProfileContext.Provider value={[profileData, setProfileDAta]}>
      {children}
    </ProfileContext.Provider>
  );
};

export default ProfileContextProvider;
