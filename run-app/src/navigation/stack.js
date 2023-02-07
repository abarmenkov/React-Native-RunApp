import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { Header } from "../components/Header";
import { BottomTabs } from "./BottomTabs";
import { HistoryScreen } from "../screens/HistoryScreen";
import { AddAddress } from "../screens/AddAddress";
import { RunAppBottomTabs } from "./RunAppBottomTabs";
//import { CarouselScreen } from "./screens/Carousel";
//import { MyCarousel } from "./screens/MyCarousel";
//import { OnBoard } from "./screens/Onboarding";
//import { Login } from "./screens/Login";
//import { SignUp } from "./screens/SignUp";
//import { VerifyEmail } from "./screens/VerifyEmail";
//import { ActivityHistory } from "./screens/ActivityHistory";
//import { MaterialIcons } from "@expo/vector-icons";
//import { NewAccount } from "./screens/New Account";
//import { RunAppStack } from "./RunAppStack";
//import { HomeScreen } from "../screens/HomeScreen";
// import { getFocusedRouteNameFromRoute } from "@react-navigation/native";

const Stack = createStackNavigator();

export const RunStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="RunStack"
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
      <Stack.Screen
        name="RunStack"
        component={RunAppBottomTabs}
        options={{
          headerShown: false, ///чтобы не было лишнего хедера @react-navigation/bottom-tabs, для "@react-navigation/material-bottom-tabs" можно true
        }}
      />
      <Stack.Screen
        name="History"
        component={HistoryScreen}
        options={{ headerTitle: "ActivityHistory" }}
      />
      <Stack.Screen
        name="AddAddress"
        component={AddAddress}
        options={{ headerTitle: "Address" }}
      />
      {/*<Stack.Screen
        name="RunStack"
        component={RunAppStack}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Carousel"
        component={CarouselScreen}
        options={{ headerTitle: "TinderCarousel" }}
      />
      <Stack.Screen
        name="ParalaxCarousel"
        component={MyCarousel}
        options={{ headerTitle: "ParalaxCarousel" }}
      />
      <Stack.Screen
        name="Onboard"
        component={OnBoard}
        options={{ headerTitle: "Onboard" }}
      />
      <Stack.Screen
        name="Login"
        component={Login}
        options={{ headerTitle: "Login" }}
      />
      <Stack.Screen
        name="SignUp"
        component={SignUp}
        options={{ headerTitle: "SignUp" }}
      />
      <Stack.Screen
        name="VerifyEmail"
        component={VerifyEmail}
        options={{
          headerTitle: "EmailVerification",
          headerBackTitleVisible: false,
          headerBackImage: () => <MaterialIcons name="keyboard-arrow-left" />,
        }}
      />

      <Stack.Screen
        name="ActivityHistory"
        component={ActivityHistory}
        options={{ headerTitle: "History" }}
      />
      <Stack.Screen
        name="NewAccount"
        component={NewAccount}
        options={{ headerTitle: "New Wallet" }}
      />*/}
    </Stack.Navigator>
  );
};
