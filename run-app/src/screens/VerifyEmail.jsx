import React, { useRef, useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Platform,
  Image,
  Pressable,
  KeyboardAvoidingView,
  Linking,
} from "react-native";
import { Headline, Caption, TextInput, useTheme } from "react-native-paper";
// import { openInbox } from "react-native-email-link";
import MyButton from "../components/MyButton";
import { WIDTH, AppStyles } from "../utils/Constants";
import InfoModal from "../components/InfoModal";
import VerificationCodeInput from "../components/VerificationCodeInput";

export const VerifyEmail = ({ route, navigation }) => {
  const theme = useTheme();
  const [num1, setNum1] = useState("");
  const [num2, setNum2] = useState("");
  const [num3, setNum3] = useState("");
  const [num4, setNum4] = useState("");
  const [visible, setVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const showModal = () => {
    setVisible(true);
    setNum1("");
    setNum2("");
    setNum3("");
    setNum4("");
  };
  const hideModal = () => {
    setVisible(false);
    setModalMessage("");
  };
  const verificationCode = "1234";
  const enteredCode = num1 + num2 + num3 + num4;

  const onCodeSubmit = () => {
    if (enteredCode !== verificationCode) {
      setModalMessage("WrongCode");
    } else {
      setModalMessage("Successful verification");
    }
    showModal();
  };

  const num1Ref = useRef();
  const num2Ref = useRef();
  const num3Ref = useRef();
  const num4Ref = useRef();

  return (
    <View
      style={{
        ...AppStyles.container,
        backgroundColor: theme.colors.onSecondary,
      }}
    >
      {visible && <InfoModal message={modalMessage} hideModal={hideModal} />}
      <Image
        source={require("../../assets/images/verifyEmail.png")}
        style={styles.image}
      />
      <Headline
        style={{ ...styles.headline, color: theme.colors.onBackground }}
      >
        Verify your email
      </Headline>
      <Caption style={styles.caption}>
        Enter the email associated with your account we’ll send email with
        password to verify
      </Caption>
      <KeyboardAvoidingView
        style={styles.textGroup}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <VerificationCodeInput
          next={num1Ref}
          value={num1}
          onChangeText={(text) => {
            setNum1(text);
            if (text) num2Ref.current.focus();
          }}
          onSubmit={() => {
            if (num1) num2Ref.current.focus();
          }}
          onKeyPress={({ nativeEvent }) => {
            if (nativeEvent.key === "Backspace") {
              setNum1("");
            }
          }}
        />
        <VerificationCodeInput
          next={num2Ref}
          value={num2}
          onChangeText={(text) => {
            setNum2(text);
            if (text) num3Ref.current.focus();
          }}
          onSubmit={() => {
            if (num2) num3Ref.current.focus();
          }}
          onKeyPress={({ nativeEvent }) => {
            if (nativeEvent.key === "Backspace" && !num2) {
              num1Ref.current.focus();
            }
          }}
        />
        <VerificationCodeInput
          next={num3Ref}
          value={num3}
          onChangeText={(text) => {
            setNum3(text);
            if (text) num4Ref.current.focus();
          }}
          onSubmit={() => {
            if (num3) num4Ref.current.focus();
          }}
          onKeyPress={({ nativeEvent }) => {
            if (nativeEvent.key === "Backspace" && !num3) {
              num2Ref.current.focus();
            }
          }}
        />
        <VerificationCodeInput
          next={num4Ref}
          value={num4}
          onChangeText={(text) => {
            setNum4(text);
          }}
          onSubmit={() => {
            if (enteredCode.length === 4) onCodeSubmit();
          }}
          blurOnSubmit={enteredCode.length === 4}
          onKeyPress={({ nativeEvent }) => {
            if (nativeEvent.key === "Backspace" && !num4) {
              num3Ref.current.focus();
            }
          }}
        />
      </KeyboardAvoidingView>
      <MyButton
        label="Verify Email"
        onPress={() => navigation.navigate("AddAddress")}
        style={{
          ...AppStyles.button,
          backgroundColor: theme.colors.primaryContainer,
          marginVertical: 12,
        }}
        textStyle={{ ...AppStyles.btnText, color: theme.colors.onBackground }}
      />
      <MyButton
        label="Open mail app"
        onPress={() =>
          Linking.openURL("mailto:ab1975@mail.ru?subject=sendmail&body=details")
        }
        style={{
          ...AppStyles.button,
          marginVertical: 12,
          borderColor: theme.colors.primaryContainer,
          borderBottomWidth: 1.5,
          borderTopWidth: 1.5,
          borderLeftWidth: 1.5,
          borderRightWidth: 1.5,
          backgroundColor: "rgba(28, 37, 44, 0.08)",
        }}
        textStyle={{
          ...AppStyles.btnText,
          color: theme.colors.primaryContainer,
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    marginTop: 30,
    marginBottom: 30,
  },

  headline: {
    fontStyle: "normal",
    fontWeight: "700",
    fontSize: 21,
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
  textGroup: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    marginTop: 10,
    marginBottom: 100,
    fontSize: 60,
  },
  textInput: {
    height: 64,
    width: 64,
    borderRadius: 12,
    marginHorizontal: 12,
    textAlign: "center",
  },
});
