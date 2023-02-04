//import { rows } from "deprecated-react-native-prop-types/DeprecatedTextInputPropTypes";
import React from "react";
import { View, StyleSheet, Image, Text } from "react-native";
import { useTheme } from "react-native-paper";
import { activityHistory } from "../utils/data";
import { History } from "../components/History";
import { WIDTH } from "../utils/Constants";

export const HistoryScreen = ({ route, navigation }) => {
  const theme = useTheme();
  const data = [...activityHistory];
  const totalTime = data.reduce((acc, current) => {
    acc += current.time;
    return acc;
  }, 0);
  const totalDistance = data.reduce((acc, current) => {
    acc += current.distance;
    return acc;
  }, 0);
  const heartBeat =
    data.reduce((acc, current) => {
      acc += current.heartBeat;
      return acc;
    }, 0) / data.length;

  return (
    <View style={styles.container}>
      <View style={styles.totalInfoContainer}>
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
      <View>
        <History />
      </View>
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
  totalInfoContainer: {
    flexDirection: "row",
    width: WIDTH * 0.9,
    height: 96,
    borderRadius: 20,
    backgroundColor: "#2F3C50",
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
