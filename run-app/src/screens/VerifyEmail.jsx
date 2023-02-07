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
import {
  Headline,
  Caption,
  TextInput,
  Modal,
  Portal,
  useTheme,
} from "react-native-paper";
// import { openInbox } from "react-native-email-link";

export const VerifyEmail = ({ route, navigation }) => {
  const theme = useTheme();
  const [num1, setNum1] = useState("");
  const [num2, setNum2] = useState("");
  const [num3, setNum3] = useState("");
  const [num4, setNum4] = useState("");
  const [visible, setVisible] = useState(false);
  const [visibleSuccess, setVisibleSuccess] = useState(false);
  const showModalError = () => setVisible(true);
  const showModalSuccess = () => {
    setVisibleSuccess(true);
    setTimeout(() => hideModalSuccess(false), 2000);
  };
  const hideModal = () => setVisible(false);
  const hideModalSuccess = () => setVisibleSuccess(false);
  const num1Ref = useRef();
  const num2Ref = useRef();
  const num3Ref = useRef();
  const num4Ref = useRef();
  const verificationCode = "1234";
  const enteredCode = num1 + num2 + num3 + num4;
  const containerStyle = {
    backgroundColor: theme.colors.secondaryContainer,
    padding: 20,
    marginLeft: 50,
    marginRight: 50,
  };
  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/images/verifyEmail.png")}
        style={styles.image}
      />
      <Headline style={styles.headline}>Verify your email</Headline>
      <Caption style={styles.caption}>
        Enter the email associated with your account we’ll send email with
        password to verify
      </Caption>
      <KeyboardAvoidingView
        style={styles.textGroup}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <TextInput
          ref={num1Ref}
          theme={{ roundness: 12 }}
          style={styles.textInput}
          contentStyle={{ fontSize: 40, fontWeight: "700" }}
          mode="flat"
          value={num1}
          textColor="#ffffff"
          onChangeText={(text) => {
            setNum1(text);
            if (text) num2Ref.current.focus();
          }}
          maxLength={1}
          keyboardType={"numeric"}
        />
        <TextInput
          ref={num2Ref}
          theme={{ roundness: 12 }}
          style={styles.textInput}
          contentStyle={{ fontSize: 40, fontWeight: "700" }}
          mode="flat"
          value={num2}
          textColor="#ffffff"
          onChangeText={(text) => {
            setNum2(text);
            if (text) num3Ref.current.focus();
          }}
          maxLength={1}
          keyboardType={"numeric"}
        />
        <TextInput
          ref={num3Ref}
          theme={{ roundness: 12 }}
          style={styles.textInput}
          contentStyle={{ fontSize: 40, fontWeight: "700" }}
          mode="flat"
          value={num3}
          textColor="#ffffff"
          onChangeText={(text) => {
            setNum3(text);
            if (text) num4Ref.current.focus();
          }}
          maxLength={1}
          keyboardType={"numeric"}
        />
        <TextInput
          ref={num4Ref}
          theme={{ roundness: 12 }}
          style={styles.textInput}
          contentStyle={{ fontSize: 40, fontWeight: "700" }}
          mode="flat"
          value={num4}
          textColor="#ffffff"
          onChangeText={(text) => {
            setNum4(text);
          }}
          onSubmitEditing={() => {
            if (enteredCode !== verificationCode) {
              showModalError();
            } else {
              showModalSuccess();
            }
          }}
          maxLength={1}
          keyboardType={"numeric"}
        />
      </KeyboardAvoidingView>
      <Portal>
        <Modal
          visible={visible}
          onDismiss={hideModal}
          contentContainerStyle={containerStyle}
        >
          <Text>Wrong verification code.</Text>
        </Modal>
      </Portal>
      <Portal>
        <Modal
          visible={visibleSuccess}
          onDismiss={hideModalSuccess}
          contentContainerStyle={containerStyle}
        >
          <Text>Successful verification</Text>
        </Modal>
      </Portal>
      <Pressable
        onPress={() => navigation.navigate("AddAddress")}
        style={styles.button}
      >
        <Text style={{ ...styles.btnText }}>Verify Email</Text>
      </Pressable>
      <Pressable
        onPress={() =>
          Linking.openURL("mailto:ab1975@mail.ru?subject=sendmail&body=details")
        }
        /*onPress={() => openInbox()}*/
        style={{
          ...styles.button,
          borderColor: "#7B61FF",
          borderBottomWidth: 1.5,
          borderTopWidth: 1.5,
          borderLeftWidth: 1.5,
          borderRightWidth: 1.5,
          backgroundColor: "rgba(28, 37, 44, 0.08)",
        }}
      >
        <Text style={{ ...styles.btnText, color: "#7B61FF" }}>
          Open mail app
        </Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#28333F",
    alignItems: "center",
  },
  image: {
    marginTop: 30,
    marginBottom: 30,
  },

  headline: {
    fontStyle: "normal",
    fontWeight: "700",
    fontSize: 21,
    color: "#ffffff",
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
    backgroundColor: "#2F3C50",
    marginHorizontal: 12,
    textAlign: "center",
  },
  button: {
    marginVertical: 12,
    width: 325,
    height: 56,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 12,
    backgroundColor: "#7B61FF",
  },

  btnText: {
    color: "#ffffff",
    fontStyle: "normal",
    fontWeight: "600",
    fontSize: 18,
  },
});