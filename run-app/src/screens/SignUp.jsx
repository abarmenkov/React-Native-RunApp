import React, { useRef, useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
  Image,
  Alert,
} from "react-native";
import { Button, Headline, Divider, useTheme } from "react-native-paper";
import MyButton from "../components/MyButton";
import MyTextInput from "../components/MyInput";
import InfoMessage from "../components/InfoMessage";
import { WIDTH, AppStyles } from "../utils/Constants";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useAuth } from "../hooks/useAuth";
import LoadingAnimation from "../components/LoadingAnimation";
import InfoModal from "../components/InfoModal";
import { fetchData } from "../API/fetchData";

export const SignUp = ({ route, navigation }) => {
  /*const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmedPassword, setConfirmedPassword] = useState("");*/
  const [checked, setChecked] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [securePasswordEntry, setSecurePasswordEntry] = useState(true);
  const [secureConfirmationEntry, setSecureConfirmationEntry] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const passwordRef = useRef(null);
  const passwordConfirmRef = useRef(null);
  const theme = useTheme();
  const { signIn } = useAuth();
  const [visible, setVisible] = useState(false);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  const LoginSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Required"),
    password: Yup.string()
      .min(6, "Too Short!")
      .max(10, "Too Long!")
      .required("Required"),
    passwordConfirmation: Yup.string()
      .min(6, "Too Short!")
      .max(10, "Too Long!")
      .required("Required")
      .oneOf([Yup.ref("password")], "Passwords must match"),
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
    initialValues: {
      email: "",
      password: "",
      passwordConfirmation: "",
      type: "registration",
    },
    onSubmit: (values, { resetForm }) => {
      setChecked(true);
      setIsLoading(true);
      let options = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      };
      fetchData(
        options,
        setIsLoading,
        checked,
        setChecked,
        setErrorMessage,
        showModal,
        hideModal,
        resetForm,
        signIn
      );

      //Alert.alert(`Email: ${values.email}, Password: ${values.password}`);
    },
  });

  const setSecure = (value) => {
    switch (value) {
      case "password":
        setSecurePasswordEntry(false);
        setTimeout(() => setSecurePasswordEntry(true), 1000);
        break;
      case "confirmation":
        setSecureConfirmationEntry(false);
        setTimeout(() => setSecureConfirmationEntry(true), 1000);
        break;
      default:
        console.log(`${value} is uknown`);
    }
  };

  return (
    <View
      style={{
        ...AppStyles.container,
        backgroundColor: theme.colors.onSecondary,
      }}
    >
      {visible && <InfoModal message={errorMessage} hideModal={hideModal} />}
      <Image
        source={require("../../assets/images/Logo.png")}
        style={styles.logo}
      />
      <View style={styles.loginForm}>
        <Headline
          style={{ ...styles.headline, color: theme.colors.onBackground }}
        >
          Sign Up
        </Headline>
        <View style={styles.textInputContainer}>
          <MyTextInput
            icon="email"
            placeholder="Enter your email"
            value={values.email}
            autoCapitalize="none"
            autoCompleteType="email"
            autoFocus={true}
            keyboardType="email-address"
            keyboardAppearance="dark"
            returnKeyType="next"
            returnKeyLabel="next"
            style={{ ...styles.textInput, color: theme.colors.onBackground }}
            viewStyle={{
              ...styles.textInputView,
              backgroundColor: theme.colors.onSecondaryContainer,
            }}
            onChangeText={handleChange("email")}
            onBlur={handleBlur("email")}
            error={errors.email}
            touched={touched.email}
            onSubmitEditing={() => passwordRef.current?.focus()}
          />

          <InfoMessage
            errorValue={touched.email && errors.email}
            info="Required"
          />
        </View>
        <View style={styles.textInputContainer}>
          <MyTextInput
            ref={passwordRef}
            icon="key"
            value={values.password}
            placeholder="Enter your password"
            secureTextEntry={securePasswordEntry}
            autoCompleteType="password"
            autoCapitalize="none"
            keyboardAppearance="dark"
            returnKeyType="next"
            returnKeyLabel="next"
            style={{ ...styles.textInput, color: theme.colors.onBackground }}
            viewStyle={{
              ...styles.textInputView,
              backgroundColor: theme.colors.onSecondaryContainer,
            }}
            secureIcon="eye"
            onPressSecureIcon={() => setSecure("password")}
            secureIconColor={
              securePasswordEntry ? "gray" : theme.colors.primaryContainer
            }
            onChangeText={handleChange("password")}
            onBlur={handleBlur("password")}
            error={errors.password}
            touched={touched.password}
            onSubmitEditing={() => passwordConfirmRef.current?.focus()}
          />
          <InfoMessage
            errorValue={touched.password && errors.password}
            info="Length 6-10, required"
          />
        </View>
        <View style={styles.textInputContainer}>
          <MyTextInput
            ref={passwordConfirmRef}
            icon="key-plus"
            value={values.passwordConfirmation}
            placeholder="Confirm your password"
            secureTextEntry={secureConfirmationEntry}
            autoCompleteType="password"
            autoCapitalize="none"
            keyboardAppearance="dark"
            returnKeyType="go"
            returnKeyLabel="go"
            style={{ ...styles.textInput, color: theme.colors.onBackground }}
            viewStyle={{
              ...styles.textInputView,
              backgroundColor: theme.colors.onSecondaryContainer,
            }}
            secureIcon="eye"
            onPressSecureIcon={() => setSecure("confirmation")}
            secureIconColor={
              secureConfirmationEntry ? "gray" : theme.colors.primaryContainer
            }
            onChangeText={handleChange("passwordConfirmation")}
            onBlur={handleBlur("passwordConfirmation")}
            error={errors.passwordConfirmation}
            touched={touched.passwordConfirmation}
          />
          <InfoMessage
            errorValue={
              touched.passwordConfirmation && errors.passwordConfirmation
            }
            info="Repeat password, required"
          />
        </View>

        <MyButton
          label="Sign Up"
          onPress={() => {
            handleSubmit();
            //navigation.navigate("VerifyEmail");
          }}
          style={{
            ...AppStyles.button,
            backgroundColor: theme.colors.primaryContainer,
            marginTop: 15,
          }}
          textStyle={{ ...AppStyles.btnText, color: theme.colors.onBackground }}
          disabled={
            !isValid ||
            isSubmitting ||
            (values.email.length < 1 && values.password.length < 1)
          }
        />
      </View>
      <View style={styles.socials}>
        <View style={styles.divider}>
          <Divider style={styles.dividerItem} />
          <Text style={styles.dividerText}>Or continue with</Text>
          <Divider style={styles.dividerItem} />
        </View>
        <View style={styles.socialsBtn}>
          <TouchableOpacity>
            <View
              style={{
                ...styles.socialsBtnItem,
                backgroundColor: theme.colors.onSecondaryContainer,
              }}
            >
              <Image source={require("../../assets/images/Google-logo.png")} />
            </View>
          </TouchableOpacity>
          <TouchableOpacity>
            <View
              style={{
                ...styles.socialsBtnItem,
                backgroundColor: theme.colors.onSecondaryContainer,
              }}
            >
              <Image
                source={require("../../assets/images/Facebook-logo.png")}
              />
            </View>
          </TouchableOpacity>
          <TouchableOpacity>
            <View
              style={{
                ...styles.socialsBtnItem,
                backgroundColor: theme.colors.onSecondaryContainer,
              }}
            >
              <Image source={require("../../assets/images/Twitter-logo.png")} />
            </View>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.BottomView}>
        <Text
          style={{ ...styles.BottomViewtext, color: theme.colors.onBackground }}
        >
          Have Account?
        </Text>
        <Button
          style={styles.btnText}
          type="text"
          textColor={theme.colors.primaryContainer}
          onPress={() => navigation.navigate("Login")}
        >
          Sign in
        </Button>
      </View>
      {isLoading && <LoadingAnimation text="Registration is in process" />}
    </View>
  );
};

const styles = StyleSheet.create({
  logo: {
    marginTop: 14,
    marginBottom: 22,
    width: 100,
    height: 100,
  },
  headline: {
    fontStyle: "normal",
    fontWeight: "700",
    fontSize: 21,
    marginBottom: 16,
  },
  BottomView: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 48,
  },
  BottomViewtext: {
    fontSize: 14,
  },
  loginForm: {
    flexDirection: "column",
    alignItems: "center",
  },
  textInput: {
    fontSize: 16,
  },
  divider: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 12,
  },
  dividerItem: {
    width: 80,
    backgroundColor: "#4B576B",
  },
  dividerText: {
    color: "#4B576B",
    fontSize: 12,
    fontWeight: "400",
  },
  socials: {
    width: WIDTH * 0.8,
    marginBottom: 20,
  },
  socialsBtn: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  socialsBtnItem: {
    width: 98,
    height: 72,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  rememberPassword: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: WIDTH * 0.8,
    alignItems: "center",
  },
  checkBox: {
    flexDirection: "row",
    alignItems: "center",
  },
  checkBoxText: { fontSize: 14 },

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
