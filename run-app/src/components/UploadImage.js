import React, { useState, useEffect, useContext } from "react";
import {
  Image,
  View,
  Platform,
  TouchableOpacity,
  Text,
  StyleSheet,
  Alert,
} from "react-native";
import { Button, Portal, Dialog, RadioButton } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import ProfileContext from "../context/ProfileContext";

export default function UploadImage() {
  const [profileData, setProfileDAta] = useContext(ProfileContext);
  const [image, setImage] = useState(null);
  const [visible, setVisible] = useState(false);
  const [value, setValue] = useState("gallery");
  const showDialog = () => setVisible(true);

  const hideDialog = () => setVisible(false);
  const handleCancel = () => {
    setValue("gallery");
    hideDialog();
  };
  const handleConfirm = () => {
    if (value === "gallery") {
      addImage();
    } else {
      Alert.alert("camera");
    }
    hideDialog();
  };

  const checkForCameraRollPermission = async () => {
    const { status } = await ImagePicker.getMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert(
        "Please grant camera roll permissions inside your system's settings"
      );
    } else {
      console.log("Media Permissions are granted");
    }
  };
  useEffect(() => {
    checkForCameraRollPermission();
  }, []);

  const addImage = async () => {
    let _image = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!_image.cancelled) {
      setProfileDAta({
        ...profileData,
        uri: _image.uri,
      });
      setImage(_image.uri);
    }
  };

  return (
    <View style={imageUploaderStyles.container}>
      {image && (
        <Image source={{ uri: image }} style={{ width: 60, height: 60 }} />
      )}
      <View style={imageUploaderStyles.uploadBtnContainer}>
        <TouchableOpacity
          onPress={showDialog}
          style={imageUploaderStyles.uploadBtn}
        >
          <MaterialCommunityIcons
            name={image ? "image-edit" : "camera-account"}
            size={20}
            color="black"
          />
        </TouchableOpacity>
      </View>
      <Portal>
        <Dialog visible={visible} onDismiss={hideDialog}>
          <Dialog.Title style={{ fontSize: 18 }}>
            Выбрать источник изображения
          </Dialog.Title>
          <Dialog.Content>
            <RadioButton.Group
              onValueChange={(newValue) => setValue(newValue)}
              value={value}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <RadioButton value="gallery" />
                <Text>Галерея</Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <RadioButton value="camera" />
                <Text>Камера</Text>
              </View>
            </RadioButton.Group>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={handleCancel}>Cancel</Button>
            <Button onPress={handleConfirm}>Ok</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
}
{
  /*        <TouchableOpacity
          onPress={addImage}
          style={imageUploaderStyles.uploadBtn}
        >
          <MaterialCommunityIcons
            name={image ? "image-edit" : "camera-account"}
            size={20}
            color="black"
          />
        </TouchableOpacity>*/
}
const imageUploaderStyles = StyleSheet.create({
  container: {
    elevation: 2,
    height: 60,
    width: 60,
    backgroundColor: "#efefef",
    position: "relative",
    borderRadius: 999,
    overflow: "hidden",
  },
  uploadBtnContainer: {
    opacity: 0.4,
    position: "absolute",
    right: 0,
    bottom: 0,
    backgroundColor: "lightgrey",
    width: "100%",
    height: "25%",
  },
  uploadBtn: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
});
