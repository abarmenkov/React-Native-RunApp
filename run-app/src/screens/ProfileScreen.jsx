import React, { useContext, useState, useRef, useEffect } from "react";
import { View, Text, Pressable, ScrollView } from "react-native";
import { useTheme } from "react-native-paper";
import { color } from "react-native-reanimated";
import ProfileContext from "../context/ProfileContext";
import { WIDTH, AppStyles } from "../utils/Constants";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import formatDate from "../utils/formatDate";
import UploadImage from "../components/UploadImage";
import { saveData, STORAGE_KEY } from "../API/asyncStorageMethods";

export const ProfileScreen = ({ route, navigation }) => {
  const theme = useTheme();
  const [profileData, setProfileDAta] = useContext(ProfileContext);
  const [date, setDate] = useState(new Date());
  const [expanded, setExpanded] = useState(true);

  const handlePress = () => setExpanded(!expanded);

  const onChange = (event, selectedDate) => {
    //const currentDate = selectedDate.toLocaleDateString();
    const currentDate = formatDate(selectedDate);
    setProfileDAta({
      ...profileData,
      birthday: currentDate,
    });
    saveData(STORAGE_KEY, { ...profileData, birthday: currentDate });
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
    <View
      style={{
        ...AppStyles.container,
        backgroundColor: theme.colors.onSecondary,
        paddingVertical: 50,
      }}
    >
      <ScrollView>
        <Pressable
          onPress={() =>
            navigation.navigate("DataUpdate", {
              field: "name",
              fieldName: "Имя",
              keyboardType: "default",
            })
          }
          style={{
            ...AppStyles.profilePressable,
            backgroundColor: theme.colors.onSecondaryContainer,
          }}
        >
          <View style={{ width: "45%" }}>
            <Text
              style={{
                ...AppStyles.itemTitle,
                color: theme.colors.onBackground,
              }}
            >
              Имя
            </Text>
          </View>
          <View style={{ width: "45%" }}>
            <Text
              style={{
                ...AppStyles.itemInfo,
                color: theme.colors.onBackground,
              }}
            >
              {profileData.name}
            </Text>
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
            ...AppStyles.profilePressable,
            backgroundColor: theme.colors.onSecondaryContainer,
          }}
        >
          <View style={{ width: "45%" }}>
            <Text
              style={{
                ...AppStyles.itemTitle,
                color: theme.colors.onBackground,
              }}
            >
              Фамилия
            </Text>
          </View>
          <View style={{ width: "45%" }}>
            <Text
              style={{
                ...AppStyles.itemInfo,
                color: theme.colors.onBackground,
              }}
            >
              {profileData.surname}
            </Text>
          </View>
        </Pressable>
        <Pressable
          onPress={() => {}}
          style={{
            ...AppStyles.profilePressable,
            backgroundColor: theme.colors.onSecondaryContainer,
          }}
        >
          <View style={{ width: "45%" }}>
            <Text
              style={{
                ...AppStyles.itemTitle,
                color: theme.colors.onBackground,
              }}
            >
              Пол
            </Text>
          </View>
          <View style={{ width: "45%" }}>
            <Picker
              selectedValue={profileData.gender}
              onValueChange={(itemValue, itemIndex) => {
                setProfileDAta({ ...profileData, gender: itemValue });
                saveData(STORAGE_KEY, { ...profileData, gender: itemValue });
              }}
              style={{
                ...AppStyles.itemInfo,
                color: theme.colors.onBackground,
              }}
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
            ...AppStyles.profilePressable,
            backgroundColor: theme.colors.onSecondaryContainer,
          }}
        >
          <View style={{ width: "45%" }}>
            <Text
              style={{
                ...AppStyles.itemTitle,
                color: theme.colors.onBackground,
              }}
            >
              Телефон
            </Text>
          </View>
          <View style={{ width: "45%" }}>
            <Text
              style={{
                ...AppStyles.itemInfo,
                color: theme.colors.onBackground,
              }}
            >
              {profileData.phone}
            </Text>
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
            ...AppStyles.profilePressable,
            backgroundColor: theme.colors.onSecondaryContainer,
          }}
        >
          <View style={{ width: "45%" }}>
            <Text
              style={{
                ...AppStyles.itemTitle,
                color: theme.colors.onBackground,
              }}
            >
              Email
            </Text>
          </View>
          <View style={{ width: "45%" }}>
            <Text
              style={{
                ...AppStyles.itemInfo,
                color: theme.colors.onBackground,
              }}
            >
              {profileData.email}
            </Text>
          </View>
        </Pressable>
        <Pressable
          onPress={showDatepicker}
          style={{
            ...AppStyles.profilePressable,
            backgroundColor: theme.colors.onSecondaryContainer,
          }}
        >
          <View style={{ width: "45%" }}>
            <Text
              style={{
                ...AppStyles.itemTitle,
                color: theme.colors.onBackground,
              }}
            >
              Birthday
            </Text>
          </View>
          <View style={{ width: "45%" }}>
            <Text
              style={{
                ...AppStyles.itemInfo,
                color: theme.colors.onBackground,
              }}
            >
              {profileData.birthday}
            </Text>
          </View>
        </Pressable>

        <Pressable
          onPress={() => {}}
          style={{
            ...AppStyles.profilePressable,
            backgroundColor: theme.colors.onSecondaryContainer,
          }}
        >
          <View style={{ width: "45%" }}>
            <Text
              style={{
                ...AppStyles.itemTitle,
                color: theme.colors.onBackground,
              }}
            >
              Image
            </Text>
          </View>
          <View style={{ width: "45%" }}>
            <UploadImage />
          </View>
        </Pressable>
      </ScrollView>
    </View>
  );
};
