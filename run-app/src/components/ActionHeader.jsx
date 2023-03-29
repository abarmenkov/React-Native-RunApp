import React from "react";
import { Appbar, useTheme } from "react-native-paper";

export const ActionHeader = (props) => {
  const theme = useTheme();
  const { title } = props;
  return (
    <Appbar.Header {...props} style={theme.colors.secondary}>
      <Appbar.Action icon="close" onPress={props.close} />
      <Appbar.Content title={title} style={theme.colors.onPrimary} />
      <Appbar.Action icon="delete" onPress={() => {}} />
      <Appbar.Action icon="content-copy" onPress={() => {}} />
      <Appbar.Action icon="magnify" onPress={() => {}} />
      <Appbar.Action
        icon="dots-vertical"
        onPress={() => {
          console.log(props);
        }}
      />
    </Appbar.Header>
  );
};
