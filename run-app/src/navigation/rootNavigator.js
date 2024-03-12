import React from "react";
//import { NavigationContainer } from "@react-navigation/native";
import { Text } from "react-native";
import { Button } from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createStackNavigator } from "@react-navigation/stack";
import { DefaultTheme, DarkTheme } from "@react-navigation/native";
import { useTheme } from "react-native-paper";
import { RunStack } from "./stack";
import { DrawerContent } from "../components/drawerContent";
import { Login } from "../screens/Login";
import { VerifyEmail } from "../screens/VerifyEmail";
import { SignUp } from "../screens/SignUp";
import { Header } from "../components/Header";
import { OnBoard } from "../screens/Onboarding";
import { AddAddress } from "../screens/AddAddress";
import { useAuth } from "../hooks/useAuth";

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

export const RootNavigator = ({ navigation }) => {
  const { status, userToken } = useAuth();
  //const isLoggedIn = false;
  //const theme = useTheme();
  //const navigationTheme = theme.dark ? DarkTheme : DefaultTheme;

  return userToken ? (
    <Drawer.Navigator
      drawerContent={(props) => <DrawerContent {...props} />}
      screenOptions={{ headerShown: false }}
    >
      <Drawer.Screen name="HOME" component={RunStack} />
    </Drawer.Navigator>
  ) : (
    <Stack.Navigator
      initialRouteName="OnBoard"
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
        headerTitle: false,
      }}
    >
      <Stack.Screen name="OnBoard" component={OnBoard} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="SignUp" component={SignUp} />
      <Stack.Screen name="VerifyEmail" component={VerifyEmail} />
      <Stack.Screen name="AddAddress" component={AddAddress} />
    </Stack.Navigator>
  );
};
