import React, { forwardRef } from "react";
import { TextInput as RNTextInput, View, StyleSheet } from "react-native";
import { MaterialCommunityIcons as Icon } from "@expo/vector-icons";
import { useTheme } from "react-native-paper";

const MyTextInput = forwardRef(
  (
    {
      icon,
      error,
      touched,
      viewStyle,
      secureIcon,
      secureIconColor,
      onPressSecureIcon,
      ...otherProps
    },
    ref
  ) => {
    const theme = useTheme();
    const validationColor = !touched
      ? "gray"
      : error
      ? theme.colors.error
      : "green";
    return (
      <View
        style={{
          ...viewStyle,
          flexDirection: "row",
          alignItems: "center",
          borderColor: !touched ? null : error ? theme.colors.error : "green",
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
            ref={ref}
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
);
export default MyTextInput;
