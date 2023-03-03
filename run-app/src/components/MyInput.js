import React, { forwardRef } from "react";
import { TextInput as RNTextInput, View, StyleSheet } from "react-native";
import { MaterialCommunityIcons as Icon } from "@expo/vector-icons";

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
    const validationColor = !touched ? "gray" : error ? "#CD0074" : "gray";
    return (
      <View
        style={{
          ...viewStyle,
          flexDirection: "row",
          alignItems: "center",
          borderColor: !touched ? "#223e4b" : error ? "#FF5A5F" : null,
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
