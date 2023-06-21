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
  Alert,
} from "react-native";
import { Headline, Caption, TextInput, useTheme } from "react-native-paper";
// import { openInbox } from "react-native-email-link";
import MyButton from "../components/MyButton";
import { WIDTH, AppStyles } from "../utils/Constants";
import InfoModal from "../components/InfoModal";
import VerificationCodeInput from "../components/VerificationCodeInput";
import MyTextInput from "../components/MyInput";
import { useFormik } from "formik";
import * as Yup from "yup";
import LoadingAnimation from "../components/LoadingAnimation";
import InfoMessage from "../components/InfoMessage";

export const VerifyEmail = ({ route, navigation }) => {
  const theme = useTheme();
  const [num1, setNum1] = useState("");
  const [num2, setNum2] = useState("");
  const [num3, setNum3] = useState("");
  const [num4, setNum4] = useState("");
  const [visible, setVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [modalType, setModalType] = useState("");
  const [emailCheck, setEmailCheck] = useState(true);

  const LoginSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Required field"),
  });

  const {
    handleChange,
    handleSubmit,
    handleBlur,
    values,
    errors,
    touched,
    isValid,
    isSubmitting,
  } = useFormik({
    validationSchema: LoginSchema,
    initialValues: { email: "", type: "checkEmail" },
    onSubmit: (values, { resetForm }) => {
      setIsLoading(true);
      let options = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      };
      fetch("http://192.168.1.4:8080/login", options)
        .then((response) => response.json())
        .then((data) => {
          setTimeout(() => {
            setIsLoading(false);
            if (data.success) {
              setModalMessage("Check your email-box for the code");
              setModalType("success");
            } else {
              setModalMessage(data.message);
              setModalType("error");
            }
            setEmailCheck(!data.success);
            showModal();
            setTimeout(() => hideModal(), 3000);
          }, 2000);
          resetForm();
        })
        .catch((error) => {
          //resetForm();
          console.error(error);
        });
    },
  });

  const showModal = () => {
    setVisible(true);
    setNum1("");
    setNum2("");
    setNum3("");
    setNum4("");
  };
  const hideModal = () => {
    setVisible(false);
    setModalMessage(null);
    setModalType("");
  };
  const verificationCode = "1234";
  const enteredCode = num1 + num2 + num3 + num4;

  const onCodeSubmit = () => {
    if (enteredCode !== verificationCode) {
      setModalMessage("WrongCode");
      setModalType("error");
    } else {
      setModalMessage("Successful verification");
      setModalType("success");
      setEmailCheck(true);
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
      {visible && (
        <InfoModal
          message={modalMessage}
          hideModal={hideModal}
          type={modalType}
        />
      )}
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
        Enter the email associated with your account we’ll send email with code
        to verify
      </Caption>
      <View style={styles.textInputContainer}>
        <MyTextInput
          icon="email"
          placeholder="Enter your email"
          value={values.email}
          autoCapitalize="none"
          //autoFocus={true}
          autoCompleteType="email"
          keyboardType="email-address"
          keyboardAppearance="dark"
          returnKeyType="go"
          returnKeyLabel="go"
          style={{
            ...styles.textInput,
            color: theme.colors.onBackground,
          }}
          viewStyle={{
            ...styles.textInputView,
            backgroundColor: theme.colors.onSecondaryContainer,
          }}
          onChangeText={handleChange("email")}
          onBlur={handleBlur("email")}
          error={errors.email}
          touched={touched.email}
        />

        <InfoMessage
          errorValue={touched.email && errors.email}
          info="Required"
        />
      </View>
      <KeyboardAvoidingView
        style={styles.textGroup}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <VerificationCodeInput
          next={num1Ref}
          value={num1}
          disabled={emailCheck}
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
          disabled={emailCheck}
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
          disabled={emailCheck}
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
          disabled={emailCheck}
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
        onPress={() => handleSubmit()}
        style={{
          ...AppStyles.button,
          backgroundColor: theme.colors.primaryContainer,
          marginVertical: 12,
        }}
        textStyle={{ ...AppStyles.btnText, color: theme.colors.onBackground }}
        disabled={!isValid || isSubmitting || values.email.length < 1}
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
      {isLoading && <LoadingAnimation text="Logging in" />}
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    marginTop: 10,
    marginBottom: 20,
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
    marginBottom: 50,
    fontSize: 60,
  },
  textInputContainer: {
    marginBottom: 16,
    height: 66,
  },
  textInputView: {
    width: WIDTH * 0.8,
    height: 56,
    borderRadius: 12,
  },
});
