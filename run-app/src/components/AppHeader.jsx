import React from "react";
import { Appbar, Avatar, useTheme, Text } from "react-native-paper";
import { TouchableOpacity, View } from "react-native";
import {
  MaterialCommunityIcons,
  MaterialIcons,
  Ionicons,
} from "@expo/vector-icons";
//import { getFocusedRouteNameFromRoute } from "@react-navigation/native";
import { WIDTH } from "../utils/Constants";

export const AppHeader = ({ options, back, routeName, navigation }) => {
  const theme = useTheme();
  //const routeName = getFocusedRouteNameFromRoute(route) ?? "RunStack";
  /*const title =
    options.headerTitle !== undefined
      ? options.headerTitle
      : options.title !== undefined
      ? options.title
      : route.name;*/

  //console.log(routeName);
  //console.log(route.name);

  return (
    <Appbar.Header
      theme={{
        colors: { primary: theme.colors.primaryContainer },
      }}
      style={{
        backgroundColor: theme.colors.onSecondary,
        justifyContent: "space-between",
        paddingHorizontal: 16,
      }}
    >
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        {routeName === "HomeScreen" ? (
          <>
            <TouchableOpacity
              onPress={() => {
                navigation.openDrawer();
              }}
            >
              <MaterialIcons
                name="menu"
                size={30}
                color={theme.colors.onBackground}
              />
            </TouchableOpacity>
            <Avatar.Image
              size={40}
              source={require("../../assets/images/Avatar.png")}
              style={{ marginHorizontal: 12 }}
            />
            <View>
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: "bold",
                  color: theme.colors.onBackground,
                }}
              >
                Hello!
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: "bold",
                  color: theme.colors.onBackground,
                }}
              >
                UserName
              </Text>
            </View>
          </>
        ) : (
          <>
            <Appbar.Content
              title={routeName}
              titleStyle={{
                fontSize: 18,
                fontWeight: "bold",
                color: theme.colors.onBackground,
                textAlign: "left",
              }}
            />
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Appbar.Action
                icon={require("../../assets/images/direct-notification.png")}
                size={24}
                color={theme.colors.onBackground}
                onPress={() => {}}
              />

              <Appbar.Action
                icon={require("../../assets/images/sms-notification.png")}
                size={24}
                color={theme.colors.onBackground}
                onPress={() => {}}
              />
            </View>
          </>
        )}
      </View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Appbar.Action
          icon={require("../../assets/images/direct-notification.png")}
          size={24}
          color={theme.colors.onBackground}
          onPress={() => {}}
        />

        <Appbar.Action
          icon={require("../../assets/images/sms-notification.png")}
          size={24}
          color={theme.colors.onBackground}
          onPress={() => {}}
        />
      </View>
    </Appbar.Header>
  );
};
