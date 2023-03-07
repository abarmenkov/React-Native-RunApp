import React, { useContext, useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Alert,
  TextInput,
  SafeAreaView,
  Keyboard,
} from "react-native";
import { color } from "react-native-reanimated";
import ProfileContext from "../context/ProfileContext";
import { WIDTH } from "../utils/Constants";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { UpdateDialog } from "../components/UpdateDialog.jsx";
import { STORAGE_KEY, saveData, getData } from "../API/asyncStorageMethods";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useTheme } from "react-native-paper";

export const UpdateDataScreen = ({ route, navigation }) => {
  const [profileData, setProfileData] = useContext(ProfileContext);
  const { field, fieldName, keyboardType } = route.params;
  const [data, setData] = useState(profileData[field]);
  const theme = useTheme();
  const onConfirm = () => {
    setProfileData({ ...profileData, [field]: data });

    saveData(STORAGE_KEY, { ...profileData, [field]: data });
    navigation.goBack();
  };

  const onSubmit = () => {
    Alert.alert("Изменение данных", "Изменить данные?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      { text: "OK", onPress: () => onConfirm() },
    ]);
  };

  return (
    <View
      style={{ ...styles.container, backgroundColor: theme.colors.onSecondary }}
    >
      <Pressable
        style={{
          backgroundColor: "rgba(47, 60, 80, 0.4)",
          width: WIDTH * 0.9,
          height: 80,
          paddingHorizontal: 15,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          alignSelf: "center",
          borderRadius: 20,
          overflow: "hidden",
          marginTop: 50,
        }}
      >
        <View style={{ width: "35%" }}>
          <Text
            style={{ ...styles.itemTitle, color: theme.colors.onBackground }}
          >
            {fieldName}
          </Text>
        </View>
        <View
          style={{ width: "40%", backgroundColor: "grey", borderRadius: 20 }}
        >
          <TextInput
            style={{
              ...styles.itemInfo,
              width: "100%",
              color: theme.colors.onBackground,
            }}
            onChangeText={(text) => {
              setData(text);
            }}
            value={data}
            keyboardType={keyboardType}
            autoFocus={true}
            maxLength={field === "phone" ? 12 : 20}
            editable
            onSubmitEditing={() => onSubmit()}
          />
        </View>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
  },
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 25,
    width: WIDTH * 0.85,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: "400",
    textAlign: "left",
  },
  itemInfo: {
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
  },
});
