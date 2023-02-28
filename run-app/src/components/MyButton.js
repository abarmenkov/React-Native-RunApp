import React from "react";
import { TouchableOpacity, Text, Pressable } from "react-native";

export default function MyButton({ label, onPress, style, textStyle }) {
  return (
    <Pressable onPress={onPress} style={style} activeOpacity={0.7}>
      <Text style={textStyle}>{label}</Text>
    </Pressable>
  );
}
