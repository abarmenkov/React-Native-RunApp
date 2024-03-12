import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { Header } from "../components/Header";
import { BottomTabs } from "./BottomTabs";
import { HistoryScreen } from "../screens/HistoryScreen";
import { AddAddress } from "../screens/AddAddress";
import { RunAppBottomTabs } from "./RunAppBottomTabs";
import { UpdateDataScreen } from "../screens/UpdateDataScreen";
import { AddActivityScreen } from "../screens/AddActivity";
import { EditActivityScreen } from "../screens/EditActivity";
import { MaterialIcons } from "@expo/vector-icons";
import { VerifyEmail } from "../screens/VerifyEmail";

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
        options={{
          headerTitle: "ActivityHistory",
        }}
      />
      <Stack.Screen
        name="AddAddress"
        component={AddAddress}
        options={{ headerTitle: "Address" }}
      />
      <Stack.Screen
        name="DataUpdate"
        component={UpdateDataScreen}
        options={{ headerTitle: "Изменение данных" }}
      />
      <Stack.Screen
        name="AddActivity"
        component={AddActivityScreen}
        options={{ headerTitle: "Добавить тренировку" }}
      />
      <Stack.Screen
        name="EditActivity"
        component={EditActivityScreen}
        options={{ headerTitle: "Изменить тренировку" }}
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
    </Stack.Navigator>
  );
};
