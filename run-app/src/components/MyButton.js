import React from "react";
import { Text, Pressable } from "react-native";
//import { useTheme } from "react-native-paper";

const MyButton = ({ label, onPress, style, textStyle, disabled, ...rest }) => {
  //const disabledOpacity = disabled ? 0.2 : 1;
  //const theme = useTheme();
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [style, { opacity: pressed ? 0.5 : 1 }]}
      //activeOpacity={0.7}
      disabled={disabled}
      {...rest}
    >
      <Text style={textStyle}>{label}</Text>
    </Pressable>
  );
};
export default MyButton;
