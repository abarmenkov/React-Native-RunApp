import React, { useContext, useRef, useState } from "react";
import {
  View,
  Text,
  Pressable,
  Alert,
  TextInput,
  ScrollView,
} from "react-native";

import { WIDTH, AppStyles } from "../utils/Constants";
//import AsyncStorage from "@react-native-async-storage/async-storage";
import { useTheme } from "react-native-paper";
import { uid } from "uid";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import formatDate from "../utils/formatDate";
import { saveData, STORAGE_KEY } from "../API/asyncStorageMethods";
import AchievementsContext from "../context/AchievementsContext";
import MyButton from "../components/MyButton";
import MyTextInput from "../components/MyInput";

export const AddActivityScreen = ({ route, navigation }) => {
  const theme = useTheme();
  const [achievementsData, setAchievementsData] =
    useContext(AchievementsContext);

  const [date, setDate] = useState(new Date());
  const [activityDate, setActivityDate] = useState(null);
  const [distance, setDistance] = useState(null);
  const [steps, setSteps] = useState(null);
  const [calories, setCalories] = useState(null);
  const [expanded, setExpanded] = useState(true);

  const stepsRef = useRef(null);
  const caloriesRef = useRef(null);
  const distanceRef = useRef(null);
  const saveButtonActive =
    activityDate && distance && steps && calories ? false : true;

  const MyButtonOnPress = () => {
    setAchievementsData([
      ...achievementsData,
      {
        id: uid(),
        date: activityDate,
        time: 60,
        numberOfSteps: steps,
        distance,
        weight: 80,
        calories,
        heartBeat: 120,
      },
    ]);
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

  const handlePress = () => setExpanded(!expanded);

  const onChange = (event, selectedDate) => {
    //const currentDate = selectedDate.toLocaleDateString();
    const currentDate = formatDate(selectedDate);

    setDate(selectedDate);
    setActivityDate(currentDate);
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
              Date
            </Text>
          </View>
          <View style={{ width: "45%" }}>
            <Text
              style={{
                ...AppStyles.itemInfo,
                color: theme.colors.onBackground,
              }}
            >
              {activityDate}
            </Text>
          </View>
        </Pressable>
        <Pressable
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
              Steps
            </Text>
          </View>
          <View
            style={{
              width: "45%",
              backgroundColor: theme.colors.onSecondaryContainer,
            }}
          >
            <MyTextInput
              style={{
                ...AppStyles.itemInfo,
                width: "100%",
                color: theme.colors.onBackground,
              }}
              viewStyle={{
                fontSize: 16,
                borderColor: "gray",
                backgroundColor: theme.colors.onSecondaryContainer,
                borderRadius: 12,
              }}
              onChangeText={(text) => {
                setSteps(text);
              }}
              placeholder="add steps"
              value={steps}
              keyboardType={"number-pad"}
              keyboardAppearance="dark"
              returnKeyType="next"
              returnKeyLabel="next"
              //autoFocus={true}
              maxLength={5}
              editable
              onSubmitEditing={() => caloriesRef.current?.focus()}
            />
          </View>
        </Pressable>
        <Pressable
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
              Calories
            </Text>
          </View>
          <View
            style={{
              width: "45%",
              backgroundColor: theme.colors.onSecondaryContainer,
            }}
          >
            <MyTextInput
              ref={caloriesRef}
              style={{
                ...AppStyles.itemInfo,
                width: "100%",
                color: theme.colors.onBackground,
              }}
              viewStyle={{
                fontSize: 16,
                borderColor: "gray",
                backgroundColor: theme.colors.onSecondaryContainer,
                borderRadius: 12,
              }}
              onChangeText={(text) => {
                setCalories(text);
              }}
              placeholder="add calories"
              value={calories}
              keyboardType={"number-pad"}
              keyboardAppearance="dark"
              returnKeyType="next"
              returnKeyLabel="next"
              //autoFocus={true}
              maxLength={7}
              editable
              onSubmitEditing={() => distanceRef.current?.focus()}
            />
          </View>
        </Pressable>

        <Pressable
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
              Distance
            </Text>
          </View>
          <View
            style={{
              width: "45%",
              backgroundColor: theme.colors.onSecondaryContainer,
            }}
          >
            <MyTextInput
              ref={distanceRef}
              style={{
                ...AppStyles.itemInfo,
                width: "100%",
                color: theme.colors.onBackground,
              }}
              viewStyle={{
                fontSize: 16,
                borderColor: "gray",
                backgroundColor: theme.colors.onSecondaryContainer,
                borderRadius: 12,
              }}
              onChangeText={(text) => {
                setDistance(text);
              }}
              placeholder="add distance"
              value={distance}
              keyboardType={"number-pad"}
              keyboardAppearance="dark"
              returnKeyType="go"
              returnKeyLabel="go"
              //autoFocus={true}
              maxLength={5}
              editable
            />
          </View>
        </Pressable>
      </ScrollView>
      <MyButton
        label="Save"
        onPress={() => MyButtonOnPress()}
        style={{
          ...AppStyles.button,
          backgroundColor: theme.colors.primaryContainer,
          opacity: !saveButtonActive ? 1 : 0.3,
          marginVertical: 25,
        }}
        textStyle={{ ...AppStyles.btnText, color: theme.colors.onBackground }}
        disabled={saveButtonActive}
      />
    </View>
  );
};
