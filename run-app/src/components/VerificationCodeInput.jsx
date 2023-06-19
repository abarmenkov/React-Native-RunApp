import React from "react";
import { TextInput, useTheme } from "react-native-paper";
import { AppStyles } from "../utils/Constants";

const VerificationCodeInput = ({
  next,
  value,
  onChangeText,
  onSubmit,
  blurOnSubmit = false,
  onKeyPress,
}) => {
  const theme = useTheme();
  return (
    <TextInput
      ref={next}
      theme={{ roundness: 12 }}
      style={{
        ...AppStyles.codeInput,
        backgroundColor: theme.colors.onSecondaryContainer,
      }}
      contentStyle={{ fontSize: 40, fontWeight: "700" }}
      mode="flat"
      value={value}
      textColor={theme.colors.onBackground}
      onChangeText={onChangeText}
      maxLength={1}
      keyboardType={"numeric"}
      underlineColor="transparent"
      activeUnderlineColor="trasparent"
      onSubmitEditing={onSubmit}
      blurOnSubmit={blurOnSubmit}
      //returnKeyType="next"
      onKeyPress={onKeyPress}
    />
  );
};

export default VerificationCodeInput;
