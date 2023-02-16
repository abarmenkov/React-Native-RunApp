import React, { useContext, useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Alert,
  TextInput,
  SafeAreaView,
} from "react-native";
import { color } from "react-native-reanimated";
import ProfileContext from "../context/ProfileContext";
import { WIDTH } from "../utils/Constants";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { UpdateDialog } from "../components/UpdateDialog.jsx";

export const UpdateDataScreen = ({ route, navigation }) => {
  const [profileData, setProfileDAta] = useContext(ProfileContext);
  const { field, fieldName, keyboardType } = route.params;

  const [data, setData] = useState(profileData[field]);
  const onConfirm = () => {
    setProfileDAta({ ...profileData, [field]: data });
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
  /*const onSubmit = () => {
    console.log("test");
    return <UpdateDialog onConfirm={onConfirm} visibleState={true} />;
  };*/

  return (
    <View style={styles.container}>
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
          <Text style={styles.itemTitle}>{fieldName}</Text>
        </View>
        <View
          style={{ width: "60%", backgroundColor: "grey", borderRadius: 20 }}
        >
          <TextInput
            style={{
              ...styles.itemInfo,
              width: "100%",
            }}
            onChangeText={(text) => setData(text)}
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
    backgroundColor: "#28333F",
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
    color: "#ffffff",

    textAlign: "left",
  },
  itemInfo: {
    fontSize: 16,
    fontWeight: "600",
    color: "#ffffff",
    textAlign: "center",
  },
});
