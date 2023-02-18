import React, { useState, useEffect, useContext } from "react";
import {
  Image,
  View,
  Platform,
  TouchableOpacity,
  Text,
  StyleSheet,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import ProfileContext from "../context/ProfileContext";

export default function UploadImage() {
  const [profileData, setProfileDAta] = useContext(ProfileContext);
  const [image, setImage] = useState(null);
  const addImage = async () => {
    let _image = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    console.log(JSON.stringify(_image));
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
        <Image source={{ uri: image }} style={{ width: 80, height: 80 }} />
      )}
      <View style={imageUploaderStyles.uploadBtnContainer}>
        <TouchableOpacity
          onPress={addImage}
          style={imageUploaderStyles.uploadBtn}
        >
          <MaterialCommunityIcons
            name={image ? "image-edit" : "camera-account"}
            size={20}
            color="black"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}
const imageUploaderStyles = StyleSheet.create({
  container: {
    elevation: 2,
    height: 80,
    width: 80,
    backgroundColor: "#efefef",
    position: "relative",
    borderRadius: 999,
    overflow: "hidden",
  },
  uploadBtnContainer: {
    opacity: 0.5,
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
