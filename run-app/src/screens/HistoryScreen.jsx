//import { rows } from "deprecated-react-native-prop-types/DeprecatedTextInputPropTypes";
import React, { useContext, useCallback, useEffect, useState } from "react";
import { View, StyleSheet, Image, Text, Alert } from "react-native";
import { useTheme } from "react-native-paper";
import { activityHistory } from "../utils/data";
import { History } from "../components/History";
import { WIDTH, AppStyles } from "../utils/Constants";
import AchievementsContext from "../context/AchievementsContext";
import { ActionHeader } from "../components/ActionHeader";
import { AppHeader } from "../components/AppHeader";

export const HistoryScreen = ({ route, navigation }) => {
  const theme = useTheme();
  const [achievementsData, setAchievementsData] =
    useContext(AchievementsContext);
  const [actionIsOpen, setActionIsOpen] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState("");
  const [backgroundColor, setBackgroundColor] = useState(
    theme.colors.onSecondaryContainer
  );
  const itemColor = theme.colors.onSecondaryContainer;

  const data = [...achievementsData];

  const openActionHeader = useCallback(
    (id) => {
      setSelectedItemId(id);
      setActionIsOpen(true);
      setBackgroundColor(theme.colors.primaryContainer);
    },
    [actionIsOpen]
  );
  const closeActionHeader = useCallback(() => {
    setActionIsOpen(false);
    setSelectedItemId("");
    setBackgroundColor(theme.colors.onSecondaryContainer);
  }, []);

  const deleteActivity = (id) => {
    const newData = data.filter((item) => item.id !== id);
    closeActionHeader();
    setAchievementsData(newData);
    console.log(newData);
    console.log(`id ${id} deleted successfully`);
  };

  const deleteConfirm = (id) => {
    {
      Alert.alert("Удаление данных", "Удалить тренировку?", [
        {
          text: "Cancel",
          style: "cancel",
        },
        { text: "OK", onPress: () => deleteActivity(id) },
      ]);
    }
  };

  useEffect(() => {
    if (actionIsOpen) {
      navigation.setOptions({
        header: (props) => (
          <ActionHeader
            {...props}
            //title={selectedItemId}
            title={"Изменение данных"}
            close={closeActionHeader}
            deleteItem={deleteConfirm}
            editItem={(id) =>
              navigation.navigate("EditActivity", { itemId: id })
            }
            id={selectedItemId}
          />
        ),
      });
    } else {
      navigation.setOptions({
        header: ({ options, navigation }) => (
          <AppHeader
            options={options}
            routeName={route.name}
            navigation={navigation}
          />
        ),
      });
    }
  }, [actionIsOpen, selectedItemId]);

  const totalTime = data.reduce((acc, current) => {
    acc += current.time;
    return acc;
  }, 0);
  const totalDistance = data.reduce((acc, current) => {
    acc += Number(current.distance);
    return acc;
  }, 0);
  const heartBeat =
    data.length < 1
      ? 0
      : data.reduce((acc, current) => {
          acc += current.heartBeat;
          return acc;
        }, 0) / data.length;

  return (
    <View
      style={{
        ...AppStyles.container,
        backgroundColor: theme.colors.onSecondary,
      }}
    >
      <View
        style={{
          ...styles.totalInfoContainer,
          backgroundColor: theme.colors.onSecondaryContainer,
        }}
      >
        <View style={styles.totalItem}>
          <Image
            source={require("../../assets/images/timer.png")}
            style={styles.image}
          />
          <Text style={styles.totalItemInfo}>
            {(totalTime / 60).toFixed(1)} H
          </Text>
          <Text style={styles.totalItemTitle}>Time</Text>
        </View>

        <View style={styles.totalItem}>
          <Image
            source={require("../../assets/images/routing.png")}
            style={styles.image}
          />
          <Text style={styles.totalItemInfo}>{totalDistance} KM</Text>
          <Text style={styles.totalItemTitle}>Distance</Text>
        </View>

        <View style={styles.totalItem}>
          <Image
            source={require("../../assets/images/heart-circle.png")}
            style={styles.image}
          />
          <Text style={styles.totalItemInfo}>{heartBeat.toFixed()} BPM</Text>
          <Text style={styles.totalItemTitle}>Heart Beat</Text>
        </View>
      </View>
      <View style={{ flex: 1 }}>
        <History
          onLongPress={openActionHeader}
          backgroundColor={backgroundColor}
          itemId={selectedItemId}
          itemColor={itemColor}
          onPress={(item) =>
            navigation.navigate("EditActivity", { itemId: item.id })
          }
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  totalInfoContainer: {
    flexDirection: "row",
    width: WIDTH * 0.9,
    height: 96,
    borderRadius: 20,
    justifyContent: "space-evenly",
    alignItems: "center",
    marginVertical: 32,
  },
  totalItem: {
    flexDirection: "column",
    alignItems: "center",
    width: 114,
  },
  totalItemInfo: {
    fontSize: 18,
    color: "#ffffff",
    fontWeight: "400",
    marginTop: 4,
    marginBottom: 2,
  },
  totalItemTitle: {
    fontSize: 12,
    color: "#CDCDCD",
    fontWeight: "400",
  },
});
