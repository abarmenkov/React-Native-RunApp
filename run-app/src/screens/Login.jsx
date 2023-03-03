import React, { useRef, useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Pressable,
} from "react-native";
import {
  Button,
  Headline,
  Caption,
  TextInput,
  HelperText,
  Checkbox,
  Divider,
} from "react-native-paper";
import MyButton from "../components/MyButton";
import MyTextInput from "../components/MyInput";
import InfoMessage from "../components/InfoMessage";
import { WIDTH } from "../utils/Constants";
import { useFormik } from "formik";
import * as Yup from "yup";

export const Login = ({ route, navigation }) => {
  //const [email, setEmail] = useState("");
  //const [password, setPassword] = useState("");
  const [secureTextEntry, setSecureTestEntry] = useState(true);
  const [checked, setChecked] = useState(false);
  const passwordRef = useRef(null);
  //const myButtonOpacity = !isValid || isSubmitting ? 0.2 : 1;

  const LoginSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Required field"),
    password: Yup.string()
      .min(6, "Too Short!")
      .max(10, "Too Long!")
      .required("Required field"),
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
    initialValues: { email: "", password: "" },
    onSubmit: (values) => {
      if (values.email.length > 0 && values.password.length > 0) {
        setTimeout(() => {
          alert("test");
        }, 1000);
      }
    },
  });

  const setSecure = () => {
    setSecureTestEntry(false);
    setTimeout(() => setSecureTestEntry(true), 1000);
  };

  /*const hasErrors = () => {
    return !email.includes("@");
  };*/

  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/images/Logo.png")}
        style={styles.logo}
      />
      <View style={styles.loginForm}>
        <Headline style={styles.headline}>Log In</Headline>
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
            secureTextEntry={secureTextEntry}
            autoCompleteType="password"
            autoCapitalize="none"
            keyboardAppearance="dark"
            returnKeyType="go"
            returnKeyLabel="go"
            style={styles.textInput}
            viewStyle={styles.textInputView}
            secureIcon="eye"
            onPressSecureIcon={() => setSecure()}
            secureIconColor={secureTextEntry ? "gray" : "#7B61FF"}
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

        {/*<Headline style={styles.headline}>Log In</Headline>
        <TextInput
          theme={{ roundness: 12 }}
          style={styles.textInput}
          mode="flat"
          value={email}
          textColor="#ffffff"
          placeholder="Email"
          placeholderTextColor="gray"
          onChangeText={(text) => setEmail(text)}
          maxLength={15}
        />
        <HelperText type="error" visible={hasErrors()}>
          Email address is invalid!
        </HelperText>
        <TextInput
          theme={{ roundness: 12 }}
          style={styles.textInput}
          mode="flat"
          value={password}
          textColor="#ffffff"
          placeholder="Password"
          onChangeText={(text) => setPassword(text)}
          maxLength={15}
          placeholderTextColor="gray"
          secureTextEntry={secureTextEntry}
          right={
            <TextInput.Icon
              icon="eye"
              onPress={() => setSecure()}
              color={(isTextInputFocused) => "#7B61FF"}
            />
          }
        />*/}
        <View style={styles.rememberPassword}>
          <View style={styles.checkBox}>
            <Checkbox
              status={checked ? "checked" : "unchecked"}
              onPress={() => {
                setChecked(!checked);
              }}
              color="#7B61FF"
              uncheckedColor="#7B61FF"
            />
            <Text style={styles.checkBoxText}>Remember Me</Text>
          </View>

          <Button type="text" textColor="#7B61FF">
            Forgot Password ?
          </Button>
        </View>
        <MyButton
          label="Log in"
          onPress={() => {
            handleSubmit();
          }}
          style={{ ...styles.button }}
          textStyle={styles.btnText}
          disabled={!isValid || isSubmitting}
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
        <Text style={styles.BottomViewtext}>New User?</Text>
        <Button
          style={styles.btnText}
          type="text"
          textColor="#7B61FF"
          onPress={() => navigation.navigate("SignUp")}
        >
          Sign Up
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
    marginBottom: 22,
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
    marginBottom: 12,
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
    width: 327,
    marginBottom: 30,
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
  rememberPassword: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: 327,
    alignItems: "center",
  },
  checkBox: {
    flexDirection: "row",
    alignItems: "center",
  },
  checkBoxText: { fontSize: 14, color: "#ffffff" },
  button: {
    marginVertical: 25,
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
