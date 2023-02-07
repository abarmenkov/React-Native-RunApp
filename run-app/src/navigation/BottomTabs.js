import React, { useEffect } from "react";
//import color from "color";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { Portal, FAB, useTheme } from "react-native-paper";
import { useIsFocused } from "@react-navigation/native";
import { HistoryScreen } from "../screens/HistoryScreen";
import { StoreScreen } from "../screens/StoreScreen";
//import { Feed } from "./screens/Feed";
//import { Messages } from "./screens/Messages";
//import { Notifications } from "./screens/Notifications";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";
//import { Alert } from "react-native";
//import { RunApp } from "./screens/RunApp";
import { HomeScreen } from "../screens/HomeScreen";
import { AccountScreen } from "../screens/AccountScreen";

const Tab = createMaterialBottomTabNavigator();

export const BottomTabs = ({ navigation, route }) => {
  const theme = useTheme();
  const routeName = getFocusedRouteNameFromRoute(route) ?? "Home";
  const isFocused = useIsFocused();

  useEffect(() => {
    navigation.setOptions({ title: routeName });
  }, [routeName]);

  /*let icon = "feather";

  switch (routeName) {
    case "Messages":
      icon = "email-plus-outline";
      break;
    case "Notifications":
      icon = "folder-plus";
      break;
    default:
      icon = "feather";
      break;
  }

  const renderFabActions = (routeName) => {
    switch (routeName) {
      case "Messages":
        return Alert.alert("FAB", "Messages");

      case "Notifications":
        return Alert.alert("FAB", "Notifications");

      default:
        return Alert.alert("FAB", `${routeName} is not found`);
    }
  };*/
  return (
    <React.Fragment>
      <Tab.Navigator
        initialRouteName="Home"
        backBehavior="initialRoute"
        shifting={true}
        sceneAnimationEnabled={false}
      >
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            tabBarIcon: "home",
          }}
        />
        <Tab.Screen
          name="History"
          component={HistoryScreen}
          options={{
            tabBarIcon: "trophy",
          }}
        />
        <Tab.Screen
          name="Store"
          component={StoreScreen}
          options={{
            tabBarIcon: "shopping",
          }}
        />
        <Tab.Screen
          name="Profile"
          component={AccountScreen}
          options={{
            tabBarIcon: "account",
          }}
        />
      </Tab.Navigator>
      {/*<Portal>
        <FAB
          visible={isFocused && routeName !== "RunApp"}
          icon={icon}
          style={{
            position: "absolute",
            bottom: 100,
            right: 16,
          }}
          color={theme.colors.surface}
          onPress={() => renderFabActions(routeName)}
        />
      </Portal>*/}
    </React.Fragment>
  );
};
