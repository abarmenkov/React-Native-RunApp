import React, { useRef, useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
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

export const SignUp = ({ route, navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmedPassword, setConfirmedPassword] = useState("");
  const [secureTextEntry, setSecureTestEntry] = useState(true);
  const [checked, setChecked] = useState(false);

  const setSecure = () => {
    setSecureTestEntry(false);
    setTimeout(() => setSecureTestEntry(true), 1000);
  };

  const hasEmailErrors = () => {
    return email.length > 5 && !email.includes("@");
  };

  const hasPasswordErrors = () => {
    return password !== confirmedPassword;
  };

  //const { title } = route.params;
  /*useEffect(() => {
    navigation.setOptions({
      headerTitle: title,
    });
  });*/

  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/images/Logo.png")}
        style={styles.logo}
      />
      <View style={styles.loginForm}>
        <Headline style={styles.headline}>Sign Up</Headline>
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
        />
        <TextInput
          theme={{ roundness: 12 }}
          style={styles.textInput}
          mode="flat"
          value={confirmedPassword}
          textColor="#ffffff"
          placeholder="Confirm Password"
          onChangeText={(text) => setConfirmedPassword(text)}
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
        />
        <HelperText type="error" visible={hasPasswordErrors()}>
          ConfirmedPassword is invalid!
        </HelperText>

        <Pressable
          onPress={() => navigation.navigate("VerifyEmail")}
          style={styles.button}
        >
          <Text style={{ ...styles.btnText }}>Sign Up</Text>
        </Pressable>
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
    height: 56,
    width: 327,
    borderRadius: 12,
    backgroundColor: "#2F3C50",
    marginBottom: 10,
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

  button: {
    marginVertical: 15,
    width: 326,
    height: 56,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 12,
    backgroundColor: "#7B61FF",
  },
});
