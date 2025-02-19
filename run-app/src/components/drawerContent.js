import React, { useContext, useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import { DrawerItem, DrawerContentScrollView } from "@react-navigation/drawer";
import {
  useTheme,
  Avatar,
  Title,
  Caption,
  Paragraph,
  Drawer,
  Text,
  TouchableRipple,
  Switch,
} from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { PreferencesContext } from "../context/PreferencesContext";
import ProfileContext from "../context/ProfileContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAuth } from "../hooks/useAuth";

export const DrawerContent = (props) => {
  const { navigation } = props;
  const theme = useTheme();
  const { toggleTheme, isThemeDark } = useContext(PreferencesContext);
  const [profileData, setProfileData] = useContext(ProfileContext);
  const [dark, setDark] = useState(isThemeDark);
  const { signOut } = useAuth();

  useEffect(() => {
    const saveTheme = async () => {
      try {
        await AsyncStorage.setItem("@theme", JSON.stringify(dark));
      } catch (e) {
        alert("Failed to save data");
      }
    };
    saveTheme();
  }, [dark]);

  {
    /*source={require("../../assets/images/Avatar.png")}*/
  }
  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.drawerContent}>
        <View style={styles.userInfoSection}>
          <Avatar.Image source={{ uri: profileData.uri }} size={50} />
          <Title style={styles.title}>{profileData.name}</Title>
          <Caption style={styles.caption}>@trensik</Caption>
          <View style={styles.row}>
            <View style={styles.section}>
              <Paragraph style={[styles.paragraph, styles.caption]}>
                202
              </Paragraph>
              <Caption style={styles.caption}>Following</Caption>
            </View>
            <View style={styles.section}>
              <Paragraph style={[styles.paragraph, styles.caption]}>
                159
              </Paragraph>
              <Caption style={styles.caption}>Followers</Caption>
            </View>
          </View>
        </View>
        <Drawer.Section style={styles.drawerSection}>
          <DrawerItem
            icon={({ color, size }) => (
              <MaterialCommunityIcons
                name="account-outline"
                color={color}
                size={size}
              />
            )}
            label="Profile"
            onPress={() => {
              navigation.navigate("Profile");
            }}
          />
          <DrawerItem
            icon={({ color, size }) => (
              <MaterialCommunityIcons name="tune" color={color} size={size} />
            )}
            label="Preferences"
            onPress={() => {}}
          />
        </Drawer.Section>
        <Drawer.Section title="Preferences">
          <TouchableRipple
            onPress={() => {
              toggleTheme();
              setDark(!dark);
            }}
          >
            <View style={styles.preference}>
              <Text>Dark Theme</Text>
              <View>
                <Switch
                  color={theme.colors.primary}
                  value={isThemeDark}
                  onValueChange={() => {
                    toggleTheme();
                    setDark(!dark);
                  }}
                />
              </View>
            </View>
          </TouchableRipple>
          <TouchableRipple onPress={() => {}}>
            <View style={styles.preference}>
              <Text>RTL</Text>
              <View pointerEvents="none">
                <Switch value={false} />
              </View>
            </View>
          </TouchableRipple>
        </Drawer.Section>
        <Drawer.Section style={styles.drawerSection}>
          <DrawerItem
            icon={({ color, size }) => (
              <MaterialCommunityIcons name="logout" color={color} size={size} />
            )}
            label="Log out"
            onPress={() => {
              signOut();
            }}
          />
        </Drawer.Section>
      </View>
    </DrawerContentScrollView>
  );
};

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
  },
  userInfoSection: {
    paddingLeft: 20,
  },
  title: {
    marginTop: 20,
    fontWeight: "bold",
    color: "red",
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
  },
  row: {
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  section: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 15,
  },
  paragraph: {
    fontWeight: "bold",
    marginRight: 3,
  },
  drawerSection: {
    marginTop: 15,
  },
  preference: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
});
