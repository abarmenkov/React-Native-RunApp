import React from "react";
import { Appbar, Avatar, useTheme } from "react-native-paper";
import { TouchableOpacity } from "react-native";
import {
  MaterialCommunityIcons,
  MaterialIcons,
  Ionicons,
} from "@expo/vector-icons";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";

export const Header = ({ options, back, route, navigation }) => {
  const theme = useTheme();
  //const { options } = scene.descriptor;
  const routeName = getFocusedRouteNameFromRoute(route) ?? "Feed";
  const title =
    options.headerTitle !== undefined
      ? options.headerTitle
      : options.title !== undefined
      ? options.title
      : route.name;

  return (
    <Appbar.Header
      theme={{
        colors: { primary: theme.colors.primaryContainer },
      }}
      style={{ backgroundColor: theme.colors.onSecondary }}
    >
      {back &&
      routeName !== "RunApp" &&
      route.name !== "AddAddress" &&
      route.name !== "ActivityHistory" ? (
        <Appbar.BackAction
          onPress={navigation.goBack}
          color={theme.colors.onBackground}
        />
      ) : !back && routeName !== "RunApp" ? (
        <TouchableOpacity
          onPress={() => {
            navigation.openDrawer();
          }}
        >
          <Avatar.Image
            size={40}
            source={require("../../assets/images/Avatar.png")}
          />
        </TouchableOpacity>
      ) : back &&
        (route.name === "AddAddress" || route.name === "ActivityHistory") ? (
        <TouchableOpacity onPress={navigation.goBack}>
          <MaterialIcons
            name="keyboard-arrow-left"
            size={30}
            color={theme.colors.onBackground}
            style={{ marginRight: 30 }}
          />
        </TouchableOpacity>
      ) : null}
      <Appbar.Content
        title={
          back && routeName !== "RunApp" ? (
            title
          ) : !back && routeName !== "RunApp" ? (
            <MaterialCommunityIcons
              name="twitter"
              size={30}
              color={theme.colors.primary}
            />
          ) : (
            false
          )
        }
        titleStyle={
          back
            ? {
                fontSize: 18,
                fontWeight: "bold",
                color: theme.colors.onBackground,
                textAlign: "left",
              }
            : {
                fontSize: 18,
                fontWeight: "bold",
                color: theme.colors.onBackground,
                textAlign: "center",
              }
        }
      />
      {route.name === "Onboard" && (
        <Appbar.Action
          icon="skip-next-outline"
          size={30}
          color={theme.colors.onBackground}
          onPress={() => {}}
        />
      )}
      {route.name === "AddAddress" && (
        <>
          <Appbar.Action
            icon="bell-badge-outline"
            size={26}
            color={theme.colors.onBackground}
            onPress={() => {}}
          />
          <Appbar.Action
            icon="cellphone-text"
            size={26}
            color={theme.colors.onBackground}
            onPress={() => {}}
          />
        </>
      )}
      {route.name === "ActivityHistory" && (
        <>
          <Appbar.Action
            icon="bell-badge-outline"
            size={26}
            color={theme.colors.onBackground}
            onPress={() => {}}
          />
          <Appbar.Action
            icon="cellphone-text"
            size={26}
            color={theme.colors.onBackground}
            onPress={() => {}}
          />
        </>
      )}
    </Appbar.Header>
  );
};
