import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useTheme } from "react-native-paper";

const InfoMessage = ({ errorValue, info }) => {
  const theme = useTheme();
  const message = errorValue ? errorValue : info;
  const infoColor = errorValue ? theme.colors.error : theme.colors.primaryContainer;
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
