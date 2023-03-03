import React, { useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Pressable,
} from "react-native";
import { Headline, Caption, useTheme } from "react-native-paper";
//import Pressable from "react-native/Libraries/Components/Pressable/Pressable";
import MyButton from "../components/MyButton";
import { WIDTH } from "../utils/Constants";

export const StartingScreen = ({ route, navigation }) => {
  const theme = useTheme();
  return (
    <View style={{ ...styles.view, color: theme.colors.surface }}>
      <ImageBackground
        source={require("../../assets/images/getStarted.png")}
        resizeMode="cover"
        style={styles.image}
      >
        <Headline style={styles.headline}>Running App</Headline>
        <Caption style={styles.caption}>
          Run and earn with our app. Some text Example will be her
        </Caption>
        <MyButton
          label="Get Started"
          onPress={() => navigation.navigate("RootNavigator")}
          style={{ ...styles.button }}
          textStyle={styles.btnText}
          //disabled={!isValid || isSubmitting}
        />
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  view: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#28333F",
  },
  image: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    backgroundColor: "#28333F",
  },
  headline: {
    fontStyle: "normal",
    fontWeight: "700",
    fontSize: 30,
    color: "#ffffff",
  },
  caption: {
    color: "#AEA8B3",
    fontStyle: "normal",
    fontWeight: "400",
    fontSize: 14,
    paddingHorizontal: 72,
    paddingVertical: 12,
    textAlign: "center",
  },
  button: {
    marginVertical: 25,
    width: WIDTH * 0.65,
    height: 56,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 12,
    backgroundColor: "#7B61FF",
  },
  btnText: {
    color: "#ffffff",
    fontStyle: "normal",
    fontWeight: "600",
    fontSize: 18,
  },
});
