import React, { useRef, useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Platform,
  Image,
  Pressable,
  KeyboardAvoidingView,
} from "react-native";
import { Headline, Caption, useTheme } from "react-native-paper";
import { LinearGradient } from "expo-linear-gradient";
import { WIDTH } from "../utils/Constants";

export const AddAddress = ({ route, navigation }) => {
  const theme = useTheme();

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={["#28333F", "#71647E"]}
        start={{
          x: 0.5,
          y: 0.1,
        }}
        end={{
          x: 0.5,
          y: 1,
        }}
        style={styles.box}
      >
        <Image
          source={require("../../assets/images/addAddress.png")}
          style={styles.image}
        />
        <Headline style={styles.headline}>Add your address</Headline>
        <Caption style={styles.caption}>
          Unfortunately we don't know where to deliver your items to you
        </Caption>
        <LinearGradient
          colors={[
            "rgba(28, 37, 44, 0.08)",
            "#43D4FF",
            "rgba(28, 37, 44, 0.08)",
          ]}
          style={styles.button}
        >
          <Pressable
            onPress={() => {}}
            android_ripple={{
              color: "#43D4FF",
              borderless: true,
              //radius: 100,
            }}
            style={styles.buttonPressable}
          >
            <Text style={{ ...styles.btnText }}>Add Address</Text>
          </Pressable>
        </LinearGradient>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  box: {
    flex: 1,
    flexDirection: "column",
    // backgroundColor: "#28333F",
    alignItems: "center",
  },
  image: {
    marginTop: 129,
    marginBottom: 24,
  },

  headline: {
    fontStyle: "normal",
    fontWeight: "700",
    fontSize: 21,
    color: "#ffffff",
  },
  caption: {
    color: "#AEA8B3",
    fontStyle: "normal",
    fontWeight: "400",
    fontSize: 14,
    paddingHorizontal: 42,
    paddingVertical: 10,
    textAlign: "center",
  },
  button: {
    marginTop: 100,
    width: WIDTH * 0.8,
    height: 56,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#7B61FF",
    borderBottomWidth: 1.5,
    borderTopWidth: 1.5,
    borderLeftWidth: 1.5,
    borderRightWidth: 1.5,
    backgroundColor: "rgba(28, 37, 44, 0.08)",
  },
  buttonPressable: {
    width: WIDTH * 0.8,
    height: 56,
    justifyContent: "center",
    alignItems: "center",
  },

  btnText: {
    color: "#7B61FF",
    fontStyle: "normal",
    fontWeight: "600",
    fontSize: 18,
  },
});
