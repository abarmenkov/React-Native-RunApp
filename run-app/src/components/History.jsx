import React from "react";
import {
  View,
  StyleSheet,
  Pressable,
  Text,
  Alert,
  FlatList,
} from "react-native";
import { activityHistory } from "../utils/data";
import { WIDTH } from "../utils/Constants";

export const History = () => {
  const data = [...activityHistory];

  const renderItem = ({ item }) => {
    return (
      <Pressable
        style={({ pressed }) => [
          {
            backgroundColor: pressed ? "#2f353b" : "rgba(47, 60, 80, 0.4)",
          },
          styles.listItem,
        ]}
        onPress={() => Alert.alert("test", `${item.id}`)}
      >
        <View style={styles.listItemGeneralInfo}>
          <Text style={styles.listItemDate}>{item.date}</Text>
          <View style={styles.listItemDistanceCalBlock}>
            <Text style={styles.listItemDistance}>{item.distance} km</Text>
            <Text style={styles.listItemCalories}>{item.calories} kcal</Text>
          </View>
        </View>
        <View style={styles.listItemSteps}>
          <Text style={styles.listItemnumberOfSteps}>
            {item.numberOfSteps} Steps
          </Text>
        </View>
      </Pressable>
    );
  };
  return (
    <FlatList
      contentContainerStyle={{
        backgroundColor: "#28333F",
      }}
      style={{
        backgroundColor: "#28333F",
      }}
      data={data}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      horizontal="false"
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      bounces={false}
    />
  );
};

const styles = StyleSheet.create({
  listItem: {
    borderRadius: 12,
    width: WIDTH * 0.9,
    height: 72,
    borderColor: "rgba(47, 60, 80, 0.4)",
    borderBottomWidth: 1.5,
    borderTopWidth: 1.5,
    borderLeftWidth: 1.5,
    borderRightWidth: 1.5,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    alignItems: "center",
    marginBottom: 12,
  },
  listItemGeneralInfo: {},
  listItemSteps: {},
  listItemnumberOfSteps: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "700",
  },
  listItemDate: {
    color: "#7B61FF",
    fontSize: 14,
    fontWeight: "500",
  },
  listItemDistanceCalBlock: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 4,
  },
  listItemDistance: {
    color: "#CDCDCD",
    fontSize: 12,
    fontWeight: "400",
    marginRight: 19,
  },
  listItemCalories: {
    color: "#CDCDCD",
    fontSize: 12,
    fontWeight: "400",
  },
});
