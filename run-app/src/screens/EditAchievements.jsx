import React, { useContext, useState } from "react";
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

  const activity = {
    id: uid(),
    date: null,
    time: 60,
    numberOfSteps: null,
    distance: null,
    weight: 80,
    calories: null,
    heartBeat: 120,
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
            <TextInput
              style={{
                ...AppStyles.itemInfo,
                width: "100%",
                color: theme.colors.onBackground,
              }}
              onChangeText={(text) => {
                setSteps(text);
              }}
              value={steps}
              keyboardType={"number-pad"}
              //autoFocus={true}
              maxLength={12}
              editable
              //onSubmitEditing={() => onSubmit()}
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
            <TextInput
              style={{
                ...AppStyles.itemInfo,
                width: "100%",
                color: theme.colors.onBackground,
              }}
              onChangeText={(text) => {
                setCalories(text);
              }}
              value={calories}
              keyboardType={"number-pad"}
              //autoFocus={true}
              maxLength={12}
              editable
              //onSubmitEditing={() => onSubmit()}
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
            <TextInput
              style={{
                ...AppStyles.itemInfo,
                width: "100%",
                color: theme.colors.onBackground,
              }}
              onChangeText={(text) => {
                setDistance(text);
              }}
              value={distance}
              keyboardType={"number-pad"}
              //autoFocus={true}
              maxLength={12}
              editable
              //onSubmitEditing={() => onSubmit()}
            />
          </View>
        </Pressable>
      </ScrollView>
      <MyButton
        label="Сохранить"
        onPress={() => MyButtonOnPress()}
        style={{
          ...AppStyles.button,
          backgroundColor: theme.colors.primaryContainer,
          marginVertical: 25,
        }}
        textStyle={{ ...AppStyles.btnText, color: theme.colors.onBackground }}
        disabled={false}
      />
    </View>
  );
};
