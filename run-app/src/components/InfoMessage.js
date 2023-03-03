import React from "react";
import { View, Text, StyleSheet } from "react-native";

const InfoMessage = ({ errorValue, info }) => {
  const message = errorValue ? errorValue : info;
  const infoColor = errorValue ? "#CD0074" : "#7B61FF";
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

});

export default InfoMessage;
