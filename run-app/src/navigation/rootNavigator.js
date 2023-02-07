import React from "react";
//import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createStackNavigator } from "@react-navigation/stack";
import { DefaultTheme, DarkTheme } from "@react-navigation/native";
import { useTheme } from "react-native-paper";
import { RunStack } from "./stack";
import DrawerContent from "../components/drawerContent";
import { Login } from "../screens/Login";
import { VerifyEmail } from "../screens/VerifyEmail";
import { SignUp } from "../screens/SignUp";
import { Header } from "../components/Header";

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

export const RootNavigator = () => {
  const isLoggedIn = true;
  const theme = useTheme();
  const navigationTheme = theme.dark ? DarkTheme : DefaultTheme;

  return isLoggedIn ? (
    <Drawer.Navigator
      drawerContent={(props) => <DrawerContent {...props} />}
      screenOptions={{ headerShown: false }}
    >
      <Drawer.Screen name="Home" component={RunStack} />
    </Drawer.Navigator>
  ) : (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{
        headerMode: "screen",
        header: ({ options, back, route, navigation }) => (
          <Header
            options={options}
            back={back}
            route={route}
            navigation={navigation}
          />
        ),
      }}
    >
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="SignUp" component={SignUp} />
      <Stack.Screen name="VerifyEmail" component={VerifyEmail} />
    </Stack.Navigator>
  );
};
