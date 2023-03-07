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
import { WIDTH, AppStyles } from "../utils/Constants";

export const StartingScreen = ({ route, navigation }) => {
  const theme = useTheme();
  return (
    <View
      style={{
        ...AppStyles.container,
        backgroundColor: theme.colors.onSecondary,
      }}
    >
      <ImageBackground
        source={require("../../assets/images/getStarted.png")}
        resizeMode="cover"
        style={{ ...styles.image, backgroundColor: theme.colors.onSecondary }}
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
          style={{
            ...AppStyles.button,
            backgroundColor: theme.colors.primaryContainer,
            marginVertical: 25,
          }}
          textStyle={{ ...AppStyles.btnText, color: theme.colors.onBackground }}
          //disabled={!isValid || isSubmitting}
        />
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
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
});
