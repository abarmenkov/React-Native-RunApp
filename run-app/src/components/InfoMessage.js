import React from "react";
import { View, Text, StyleSheet } from "react-native";

const InfoMessage = ({ errorValue, info }) => {
  const message = errorValue ? errorValue : info;
  const infoColor = errorValue ? "#FF5A5F" : "gray";
  return (
    <View style={styles.container}>
      <Text style={{ color: infoColor, fontSize: 12 }}>{message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginLeft: 10,
  },
  errorText: {
    color: "red",
  },
});

export default InfoMessage;
