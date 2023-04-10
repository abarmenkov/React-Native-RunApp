import React, { useEffect } from "react";
import { View, Text, StyleSheet, Image, Pressable } from "react-native";
import { History } from "../components/History";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { ProgressBar, useTheme } from "react-native-paper";
//import { AnimatedCircularProgress } from "react-native-circular-progress";
import { WIDTH, AppStyles } from "../utils/Constants";

export const HomeScreen = ({ navigation, route }) => {
  /*useEffect(() => {
    navigation.setOptions({
      headerTitle: "Home",
    });
  });*/
  const theme = useTheme();

  return (
    <View
      style={{
        ...AppStyles.container,
        backgroundColor: theme.colors.onSecondary,
      }}
    >
      <View style={styles.top}>
        <View style={styles.topProgress}>
          <View style={styles.topProgressInfo}>
            <View style={styles.topProgressInfoText}>
              <View style={styles.topProgressInfoSteps}>
                <Text
                  style={styles.topProgressInfoTodaySteps}
                >{`14000 / `}</Text>
                <Text style={styles.topProgressInfoPlanSteps}>15000 </Text>
                <Text style={styles.topProgressInfoTodaySteps}>steps</Text>
              </View>
              <Text style={styles.topProgressInfoLevel}>Level 5</Text>
            </View>
            <View>
              <ProgressBar
                progress={0.7}
                color="blue"
                style={styles.topProgressBar}
              />
            </View>
          </View>
          <Image
            source={require("../../assets/images/Level-badge.png")}
            style={styles.topProgressImage}
          />
        </View>
        <View style={styles.topToday}>
          <Pressable style={styles.topTodayItem}>
            <View style={styles.topTodayItemLeft}>
              <Image
                source={require("../../assets/images/running-man.png")}
                style={styles.topTodayItemLeftImage}
              />
              <View style={styles.topTodayItemLeftText}>
                <Text style={styles.topTodayItemLeftDate}>26 May</Text>
                <Text style={styles.topTodayItemLeftToday}>Today</Text>
                <Text style={styles.topTodayItemLeftTotalTime}>
                  01 : 09 : 44
                </Text>
              </View>
            </View>
            <View style={styles.topTodayItemRight}>
              <Image
                source={require("../../assets/images/Radius.png")}
                style={styles.topTodayItemRightImage}
              />
            </View>
          </Pressable>
        </View>
        <View style={styles.topMonth}>
          <Pressable style={styles.topMonthItem}>
            <Text style={styles.topMonthItemTitle}>53,524</Text>
            <View style={styles.topMonthItemDescription}>
              <Image
                source={require("../../assets/images/steps.png")}
                style={styles.topMonthItemImage}
              />
              <Text style={styles.topMonthItemType}>Steps</Text>
            </View>
          </Pressable>
          <Pressable style={styles.topMonthItem}>
            <Text style={styles.topMonthItemTitle}>1000</Text>
            <View style={styles.topMonthItemDescription}>
              <Image
                source={require("../../assets/images/coin.png")}
                style={styles.topMonthItemImage}
              />
              <Text style={styles.topMonthItemType}>Earned Points</Text>
            </View>
          </Pressable>
        </View>
      </View>
      <View style={styles.bottom}>
        <LinearGradient
          colors={["#83AEFE", "#F14985"]}
          start={{
            x: 0.1,
            y: 0.9,
          }}
          end={{
            x: 0.9,
            y: 0.9,
          }}
          style={styles.shareBlock}
        >
          <View style={styles.leftShareBlock}>
            <View style={styles.leftShareBlockText}>
              <Text style={styles.leftShareBlockHeader}>Share & Get</Text>
              <Text style={styles.leftShareBlockDescription}>
                Get 2x point for every steps, only valid for today
              </Text>
              <Pressable style={styles.leftShareBtn} onPress={() => {}}>
                <MaterialCommunityIcons
                  name="share-variant-outline"
                  size={12}
                  color="#ffffff"
                />
                <Text style={styles.leftShareBtnText}>Share</Text>
              </Pressable>
            </View>
          </View>
          <View style={styles.rightShareBlock}>
            <Image
              source={require("../../assets/images/share-back-img.png")}
              style={styles.shareImage}
            />
          </View>
        </LinearGradient>

        <View style={styles.historyBlock}>
          <View style={styles.historyTitle}>
            <Text style={styles.historyHeader}>History</Text>
            <Text
              style={styles.historyLink}
              onPress={() => {
                navigation.navigate("Achievements");
              }}
            >
              See All
            </Text>
          </View>
          <History
            onLongPress={() => {
              navigation.navigate("Achievements");
            }}
            backgroundColor={theme.colors.onSecondaryContainer}
            itemId={null}
            itemColor={theme.colors.onSecondaryContainer}
            onPress={() => {
              navigation.navigate("Achievements");
            }}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  top: {
    flex: 1,
    alignItems: "center",
    width: WIDTH,
    height: 416,
    backgroundColor: "#7B61FF",
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    padding: 16,
  },
  topProgress: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: 48,
    paddingHorizontal: 16,
  },
  topProgressInfo: {},
  topProgressInfoText: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  topProgressInfoSteps: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  topProgressInfoTodaySteps: {
    color: "#CDCDCD",
    fontSize: 12,
  },
  topProgressInfoPlanSteps: {
    color: "#ffffff",
    fontSize: 14,
    fontWeight: "700",
  },

  topProgressInfoLevel: {
    color: "#FFC932",
    fontSize: 20,
    fontWeight: "700",
  },
  topProgressImage: {
    width: 48,
    height: 48,
    marginLeft: 16,
  },
  topProgressBar: {
    backgroundColor: "lightgray",
    width: 279,
    height: 10,
    borderRadius: 10,
  },
  topToday: {
    marginVertical: 16,
  },
  topTodayItem: {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 20,
    width: WIDTH * 0.9,
    height: 87,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
  },
  topTodayItemLeft: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  topTodayItemLeftImage: {
    width: 48,
    height: 48,
    marginRight: 16,
  },
  topTodayItemLeftText: {},
  topTodayItemLeftDate: {
    color: "#ffffff",
    fontSize: 11,
    fontWeight: "400",
    opacity: 0.5,
  },
  topTodayItemLeftToday: {
    color: "#43C465",
    fontSize: 14,
    fontWeight: "500",
    marginVertical: 4,
  },
  topTodayItemLeftTotalTime: {
    color: "#CDCDCD",
    fontSize: 12,
    fontWeight: "400",
  },
  topTodayItemRight: {
    alignItems: "center",
  },
  topTodayItemRightImage: {
    width: 70,
    height: 70,
  },
  topMonth: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: WIDTH * 0.9,
  },
  topMonthItem: {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 20,
    width: 175,
    height: 125,
    justifyContent: "center",
    alignItems: "center",
  },
  topMonthItemTitle: {
    color: "#ffffff",
    fontSize: 38,
    fontWeight: "400",
  },
  topMonthItemDescription: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 4,
  },
  topMonthItemImage: {
    width: 16,
    height: 16,
    color: "#CDCDCD",
    marginRight: 4,
  },
  topMonthItemType: {
    color: "#CDCDCD",
    fontSize: 12,
    fontWeight: "400",
  },

  shareBlock: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",

    width: WIDTH * 0.9,
    height: 125,
    borderRadius: 16,
    marginVertical: 15,
  },
  leftShareBlock: { paddingLeft: 16, width: 174, height: 89 },
  leftShareBlockText: {},
  leftShareBlockHeader: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "500",
  },
  leftShareBlockDescription: {
    color: "#ffffff",
    fontSize: 12,
    fontWeight: "400",
    marginTop: 4,
  },
  leftShareBtn: {
    width: 65,
    height: 24,
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    backgroundColor: "rgba(47, 60, 80, 0.2)",
    marginTop: 13,
  },
  leftShareBtnText: {
    color: "#ffffff",
    fontSize: 10,
    fontWeight: "400",
  },
  rightShareBlock: { paddingTop: 14 },
  shareImage: { borderRadius: 16 },
  bottom: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
  },
  historyTitle: {
    flexDirection: "row",
    width: WIDTH * 0.9,
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  historyHeader: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "500",
  },
  historyLink: {
    color: "#7B61FF",
    fontSize: 14,
    fontWeight: "400",
  },
  historyBlock: {
    flex: 1,
  },
});
