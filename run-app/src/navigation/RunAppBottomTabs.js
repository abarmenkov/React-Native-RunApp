import React, { useEffect } from "react";
import { Button } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useTheme } from "react-native-paper";
//import { ActivityHistory } from "./screens/ActivityHistory";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { HomeScreen } from "../screens/HomeScreen";
import { AccountScreen } from "../screens/AccountScreen";
import {
  getFocusedRouteNameFromRoute,
  useIsFocused,
} from "@react-navigation/native";
import { HistoryScreen } from "../screens/HistoryScreen";
import { StoreScreen } from "../screens/StoreScreen";
import { WIDTH } from "../utils/Constants";
import { AppHeader } from "../components/AppHeader";

const Tab = createBottomTabNavigator();

export const RunAppBottomTabs = ({ navigation, route }) => {
  const theme = useTheme();
  const routeName = getFocusedRouteNameFromRoute(route) ?? "HomeScreen";
  const isFocused = useIsFocused();
  useEffect(() => {
    navigation.setOptions({ title: routeName });
  }, [routeName]);

  return (
    <React.Fragment>
      <Tab.Navigator
        initialRouteName="HomeScreen"
        backBehavior="initialRoute"
        shifting={true}
        sceneAnimationEnabled={false}
        screenOptions={({ route }) => ({
          tabBarHideOnKeyboard: true,
          header: ({ options, route, navigation }) => (
            <AppHeader
              options={options}              
              routeName={routeName}
              navigation={navigation}
            />
          ),
          tabBarStyle: {
            display: "flex",
            position: "absolute",
            borderTopWidth: 0,
            bottom: 14,
            width: WIDTH * 0.8,
            left: (WIDTH - WIDTH * 0.8) / 2,
            right: (WIDTH - WIDTH * 0.8) / 2,
            elevation: 5,
            backgroundColor: "#2F3C50",
            borderRadius: 20,
            height: 70,
          },
          tabBarShowLabel: false,
          //headerShown: false,
          tabBarActiveTintColor: "#7B61FF",
        })}
      >
        <Tab.Screen
          name="HomeScreen"
          component={HomeScreen}
          options={{
            headerTitle: "Home",

            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="home" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="Achievements"
          component={HistoryScreen}
          options={{
            //headerTitle: "Achievements1",
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="trophy" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="Shop"
          component={StoreScreen}
          options={{
            //headerTitle: "Shop",
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons
                name="shopping"
                color={color}
                size={size}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Profile"
          component={AccountScreen}
          options={{
            //headerTitle: "Profile",
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons
                name="account"
                color={color}
                size={size}
              />
            ),
          }}
        />
      </Tab.Navigator>
    </React.Fragment>
  );
};
