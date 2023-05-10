import React, { useState, useMemo, useCallback, useEffect } from "react";
import { StartingStack } from "./src/navigation/startingStack";
import { PreferencesContext } from "./src/context/PreferencesContext";
import { DarkTheme, DefaultTheme } from "@react-navigation/native";
import {
  MD3DarkTheme,
  MD3LightTheme,
  Provider as PaperProvider,
} from "react-native-paper";
import { appDarkColors, appDefaultColors } from "./src/utils/Constants";
import ProfileContext from "./src/context/ProfileContext";
import AchievementsContext from "./src/context/AchievementsContext";
import {
  STORAGE_KEY,
  getData,
  clearStorage,
} from "./src/API/asyncStorageMethods";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { activityHistory, initialState } from "./src/utils/data";
import { AuthProvider } from "./src/providers/AuthProvider";

//import { name as appName } from "./app.json";
//import { AppRegistry } from "react-native";

const CombinedDefaultTheme = {
  ...MD3LightTheme,
  ...DefaultTheme,
  colors: {
    ...MD3LightTheme.colors,
    ...DefaultTheme.colors,
    ...appDefaultColors.colors,
  },
};
const CombinedDarkTheme = {
  ...MD3DarkTheme,
  ...DarkTheme,
  colors: {
    ...MD3DarkTheme.colors,
    ...DarkTheme.colors,
    ...appDarkColors.colors,
  },
};

export default function App() {
  const [isThemeDark, setIsThemeDark] = useState(null);
  const [profileData, setProfileData] = useState(null);
  const [achievementsData, setAchievementsData] = useState(null);
  useEffect(() => {
    //clearStorage();
    getData(STORAGE_KEY, setProfileData, initialState);
  }, []);

  useEffect(() => {
    //clearStorage();
    getData("@achievements", setAchievementsData, activityHistory);
  }, []);

  useEffect(() => {
    const getTheme = async () => {
      const value = await AsyncStorage.getItem("@theme");
      setIsThemeDark(JSON.parse(value));
    };
    getTheme();
  }, []);

  let theme = isThemeDark ? CombinedDarkTheme : CombinedDefaultTheme;

  const toggleTheme = useCallback(() => {
    return setIsThemeDark(!isThemeDark);
  }, [isThemeDark]);

  const preferences = useMemo(
    () => ({
      toggleTheme,
      isThemeDark,
    }),
    [toggleTheme, isThemeDark]
  );
  return (
    <PreferencesContext.Provider value={preferences}>
      <PaperProvider theme={theme}>
        <AuthProvider>
          <ProfileContext.Provider value={[profileData, setProfileData]}>
            <AchievementsContext.Provider
              value={[achievementsData, setAchievementsData]}
            >
              <StartingStack />
            </AchievementsContext.Provider>
          </ProfileContext.Provider>
        </AuthProvider>
      </PaperProvider>
    </PreferencesContext.Provider>
  );
}
