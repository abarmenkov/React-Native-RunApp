import React, { useContext, useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Image,
  Alert,
  TextInput,
  SafeAreaView,
  ScrollView,
} from "react-native";
import { color } from "react-native-reanimated";
import ProfileContext from "../context/ProfileContext";
import { WIDTH } from "../utils/Constants";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import formatDate from "../utils/formatDate";
import UploadImage from "../components/UploadImage";


export const ProfileScreen = ({ route, navigation }) => {
  const [profileData, setProfileDAta] = useContext(ProfileContext);
  const [date, setDate] = useState(new Date());

  const onChange = (event, selectedDate) => {
    //const currentDate = selectedDate.toLocaleDateString();
    const currentDate = formatDate(selectedDate);
    setProfileDAta({
      ...profileData,
      birthday: currentDate,
    });
    setDate(selectedDate);
  };

  const showMode = (currentMode) => {
    DateTimePickerAndroid.open({
      value: date,
      onChange,
      mode: currentMode,
      is24Hour: true,
      //display: "spinner",
    });
  };

  const showDatepicker = () => {
    showMode("date");
  };

  const showTimepicker = () => {
    showMode("time");
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <Pressable
          /*onPress={() =>
          Alert.alert("Изменение данных", "Изменить данные?", [
            {
              text: "Cancel",
              style: "cancel",
            },
            { text: "OK", onPress: () => console.log("OK Pressed") },
          ])
        }*/
          onPress={() =>
            navigation.navigate("DataUpdate", {
              field: "name",
              fieldName: "Имя",
              keyboardType: "default",
            })
          }
          style={{
            backgroundColor: "rgba(47, 60, 80, 0.4)",
            width: WIDTH * 0.9,
            height: 50,
            paddingHorizontal: 15,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            alignSelf: "center",
            borderRadius: 20,
            overflow: "hidden",
            marginBottom: 20,
          }}
        >
          <View style={{ width: "45%" }}>
            <Text style={styles.itemTitle}>Имя</Text>
          </View>
          <View style={{ width: "45%" }}>
            <Text style={styles.itemInfo}>{profileData.name}</Text>
          </View>
        </Pressable>
        <Pressable
          onPress={() =>
            navigation.navigate("DataUpdate", {
              field: "surname",
              fieldName: "Фамилия",
              keyboardType: "default",
            })
          }
          style={{
            backgroundColor: "rgba(47, 60, 80, 0.4)",
            width: WIDTH * 0.9,
            height: 50,
            paddingHorizontal: 15,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            alignSelf: "center",
            borderRadius: 20,
            overflow: "hidden",
            marginBottom: 20,
          }}
        >
          <View style={{ width: "45%" }}>
            <Text style={styles.itemTitle}>Фамилия</Text>
          </View>
          <View style={{ width: "45%" }}>
            <Text style={styles.itemInfo}>{profileData.surname}</Text>
          </View>
        </Pressable>
        <Pressable
          onPress={() => {}}
          style={{
            backgroundColor: "rgba(47, 60, 80, 0.4)",
            width: WIDTH * 0.9,
            height: 50,
            paddingHorizontal: 15,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            alignSelf: "center",
            borderRadius: 20,
            overflow: "hidden",
            marginBottom: 20,
          }}
        >
          <View style={{ width: "45%" }}>
            <Text style={styles.itemTitle}>Пол</Text>
          </View>
          <View style={{ width: "45%" }}>
            <Picker
              selectedValue={profileData.gender}
              onValueChange={(itemValue, itemIndex) =>
                setProfileDAta({ ...profileData, gender: itemValue })
              }
              style={{ ...styles.itemInfo }}
              mode={"dropdown"}
              dropdownIconColor={"#ffffff"}
              dropdownIconRippleColor={"green"}
            >
              <Picker.Item label="male" value="male" />
              <Picker.Item label="female" value="female" />
            </Picker>
          </View>
        </Pressable>
        <Pressable
          onPress={() =>
            navigation.navigate("DataUpdate", {
              field: "phone",
              fieldName: "Телефон",
              keyboardType: "phone-pad",
            })
          }
          style={{
            backgroundColor: "rgba(47, 60, 80, 0.4)",
            width: WIDTH * 0.9,
            height: 50,
            paddingHorizontal: 15,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            alignSelf: "center",
            borderRadius: 20,
            overflow: "hidden",
            marginBottom: 20,
          }}
        >
          <View style={{ width: "45%" }}>
            <Text style={styles.itemTitle}>Телефон</Text>
          </View>
          <View style={{ width: "45%" }}>
            <Text style={styles.itemInfo}>{profileData.phone}</Text>
          </View>
        </Pressable>
        <Pressable
          onPress={() =>
            navigation.navigate("DataUpdate", {
              field: "email",
              fieldName: "Email",
              keyboardType: "email-address",
            })
          }
          style={{
            backgroundColor: "rgba(47, 60, 80, 0.4)",
            width: WIDTH * 0.9,
            height: 50,
            paddingHorizontal: 15,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            alignSelf: "center",
            borderRadius: 20,
            marginBottom: 20,
            overflow: "hidden",
          }}
        >
          <View style={{ width: "45%" }}>
            <Text style={styles.itemTitle}>Email</Text>
          </View>
          <View style={{ width: "45%" }}>
            <Text style={styles.itemInfo}>{profileData.email}</Text>
          </View>
        </Pressable>
        <Pressable
          onPress={showDatepicker}
          style={{
            backgroundColor: "rgba(47, 60, 80, 0.4)",
            width: WIDTH * 0.9,
            height: 50,
            paddingHorizontal: 15,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            alignSelf: "center",
            borderRadius: 20,
            marginBottom: 20,
            overflow: "hidden",
          }}
        >
          <View style={{ width: "45%" }}>
            <Text style={styles.itemTitle}>Birthday</Text>
          </View>
          <View style={{ width: "45%" }}>
            <Text style={styles.itemInfo}>{profileData.birthday}</Text>
          </View>
        </Pressable>

        <Pressable
          onPress={() => {}}
          style={{
            backgroundColor: "rgba(47, 60, 80, 0.4)",
            width: WIDTH * 0.9,
            height: 100,
            paddingHorizontal: 15,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            alignSelf: "center",
            borderRadius: 20,
            marginBottom: 20,
            overflow: "hidden",
          }}
        >
          <View style={{ width: "45%" }}>
            <Text style={styles.itemTitle}>Image</Text>
          </View>
          <View style={{ width: "45%" }}>
            <UploadImage />
          </View>
        </Pressable>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#28333F",
    alignItems: "center",
    paddingVertical: 50,
  },
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 25,
    width: WIDTH * 0.85,
  },
  itemTitle: {
    fontSize: 14,
    fontWeight: "400",
    color: "#ffffff",
  },
  itemInfo: {
    fontSize: 16,
    fontWeight: "400",
    color: "#ffffff",
  },
  filterTypesImage: {
    width: 30,
    height: 30,
    borderRadius: 100,
  },
});
