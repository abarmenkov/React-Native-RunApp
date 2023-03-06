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
    <View style={{ ...styles.container, backgroundColor: theme.colors.onSecondary }}>
      <ImageBackground
        source={require("../../assets/images/getStarted.png")}
        resizeMode="cover"
        style={styles.image}
      >
        <Headline
          style={{ ...styles.headline, color: theme.colors.onBackground }}
        >
          Running App
        </Headline>
        <Caption style={styles.caption}>
          Run and earn with our app. Some text Example will be her
        </Caption>
        <MyButton
          label="Get Started"
          onPress={() => navigation.navigate("RootNavigator")}
          style={{ ...styles.button, backgroundColor: theme.colors.primaryContainer }}
          textStyle={{ ...styles.btnText, color: theme.colors.onBackground }}
          //disabled={!isValid || isSubmitting}
        />
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
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
  },
  btnText: {
    fontStyle: "normal",
    fontWeight: "600",
    fontSize: 18,
  },
});
