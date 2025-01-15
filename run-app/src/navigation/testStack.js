import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { ProfileScreen } from "../screens/ProfileScreen";
import { Login } from "../screens/Login";

const Stack = createStackNavigator();

export const TestStack = () => {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
    </Stack.Navigator>
  );
};
