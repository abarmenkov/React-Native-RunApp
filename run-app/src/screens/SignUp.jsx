import React, { useRef, useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
  Image,
} from "react-native";
import { Button, Headline, Divider } from "react-native-paper";
import MyButton from "../components/MyButton";
import MyTextInput from "../components/MyInput";
import InfoMessage from "../components/InfoMessage";
import { WIDTH } from "../utils/Constants";
import { useFormik } from "formik";
import * as Yup from "yup";

export const SignUp = ({ route, navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmedPassword, setConfirmedPassword] = useState("");
  const [securePasswordEntry, setSecurePasswordEntry] = useState(true);
  const [secureConfirmationEntry, setSecureConfirmationEntry] = useState(true);
  const [checked, setChecked] = useState(false);

  const passwordRef = useRef(null);
  const passwordConfirmRef = useRef(null);

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
  const { handleChange, handleSubmit, handleBlur, values, errors, touched } =
    useFormik({
      validationSchema: LoginSchema,
      initialValues: { email: "", password: "", passwordConfirmation: "" },
      onSubmit: (values) =>
        alert(`Email: ${values.email}, Password: ${values.password}`),
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
    <View style={styles.container}>
      <Image
        source={require("../../assets/images/Logo.png")}
        style={styles.logo}
      />
      <View style={styles.loginForm}>
        <Headline style={styles.headline}>Sign Up</Headline>
        <View style={styles.textInputContainer}>
          <MyTextInput
            icon="email"
            placeholder="Enter your email"
            autoCapitalize="none"
            autoCompleteType="email"
            keyboardType="email-address"
            keyboardAppearance="dark"
            returnKeyType="next"
            returnKeyLabel="next"
            textColor="#ffffff"
            style={styles.textInput}
            viewStyle={styles.textInputView}
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
            placeholder="Enter your password"
            secureTextEntry={securePasswordEntry}
            autoCompleteType="password"
            autoCapitalize="none"
            keyboardAppearance="dark"
            returnKeyType="go"
            returnKeyLabel="go"
            style={styles.textInput}
            viewStyle={styles.textInputView}
            secureIcon="eye"
            onPressSecureIcon={() => setSecure("password")}
            secureIconColor={securePasswordEntry ? "gray" : "#7B61FF"}
            onChangeText={handleChange("password")}
            onBlur={handleBlur("password")}
            error={errors.password}
            touched={touched.password}
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
            placeholder="Confirm your password"
            secureTextEntry={secureConfirmationEntry}
            autoCompleteType="password"
            autoCapitalize="none"
            keyboardAppearance="dark"
            returnKeyType="go"
            returnKeyLabel="go"
            style={styles.textInput}
            viewStyle={styles.textInputView}
            secureIcon="eye"
            onPressSecureIcon={() => setSecure("confirmation")}
            secureIconColor={secureConfirmationEntry ? "gray" : "#7B61FF"}
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
            navigation.navigate("VerifyEmail");
          }}
          style={styles.button}
          textStyle={styles.btnText}
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
            <View style={styles.socialsBtnItem}>
              <Image source={require("../../assets/images/Google-logo.png")} />
            </View>
          </TouchableOpacity>
          <TouchableOpacity>
            <View style={styles.socialsBtnItem}>
              <Image
                source={require("../../assets/images/Facebook-logo.png")}
              />
            </View>
          </TouchableOpacity>
          <TouchableOpacity>
            <View style={styles.socialsBtnItem}>
              <Image source={require("../../assets/images/Twitter-logo.png")} />
            </View>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.BottomView}>
        <Text style={styles.BottomViewtext}>Have Account?</Text>
        <Button
          style={styles.btnText}
          type="text"
          textColor="#7B61FF"
          onPress={() => navigation.navigate("Login")}
        >
          Sign in
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#28333F",
    alignItems: "center",
    paddingTop: 30,
  },
  logo: {
    marginTop: 14,
    marginBottom: 14,
    width: 100,
    height: 100,
  },
  headline: {
    fontStyle: "normal",
    fontWeight: "700",
    fontSize: 21,
    color: "#ffffff",
    marginBottom: 16,
  },
  caption: {
    color: "#AEA8B3",
    fontStyle: "normal",
    fontWeight: "400",
    fontSize: 14,
    paddingHorizontal: 72,
    textAlign: "center",
  },
  BottomView: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 48,
  },
  BottomViewtext: {
    color: "#ffffff",
    fontSize: 14,
  },
  loginForm: {
    flexDirection: "column",
    alignItems: "center",
  },
  textInput: {
    fontSize: 16,
    color: "#ffffff",
  },
  btnText: {
    fontSize: 18,
    color: "#ffffff",
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
    backgroundColor: "#2F3C50",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    marginTop: 10,
    width: WIDTH * 0.8,
    height: 56,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 12,
    backgroundColor: "#7B61FF",
  },
  textInputContainer: {
    marginBottom: 16,
    height: 66,
  },
  textInputView: {
    width: WIDTH * 0.8,
    height: 56,
    borderRadius: 12,
    backgroundColor: "#2F3C50",
  },
});
