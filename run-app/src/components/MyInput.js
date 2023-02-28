import React from "react";
import { TextInput as RNTextInput, View, StyleSheet } from "react-native";
import { MaterialCommunityIcons as Icon } from "@expo/vector-icons";

export default function MyTextInput({
  icon,
  viewStyle,
  secureIcon,
  secureIconColor,
  onPressSecureIcon,
  ...otherProps
}) {
  const validationColor = "gray";
  return (
    <View
      style={{
        ...viewStyle,
        flexDirection: "row",
        alignItems: "center",
        borderColor: null,
        borderWidth: StyleSheet.hairlineWidth,
      }}
    >
      <View style={{ padding: 8 }}>
        <Icon name={icon} color={validationColor} size={20} />
      </View>
      <View style={{ flex: 1 }}>
        <RNTextInput
          underlineColorAndroid="transparent"
          placeholderTextColor="gray"
          {...otherProps}
        />
      </View>
      {secureIcon && (
        <View style={{ padding: 8 }}>
          <Icon
            name={secureIcon}
            color={secureIconColor}
            size={20}
            onPress={onPressSecureIcon}
          />
        </View>
      )}
    </View>
  );
}
