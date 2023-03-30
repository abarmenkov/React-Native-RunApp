import React from "react";
import { Appbar, useTheme } from "react-native-paper";

export const ActionHeader = ({ title, deleteItem, id, close }) => {
  const theme = useTheme();
  return (
    <Appbar.Header style={theme.colors.secondary}>
      <Appbar.Action icon="close" onPress={close} />
      <Appbar.Content title={title} style={theme.colors.onPrimary} />
      <Appbar.Action icon="delete" onPress={() => deleteItem(id)} />
      <Appbar.Action icon="content-copy" onPress={() => {}} />
      <Appbar.Action icon="magnify" onPress={() => {}} />
      <Appbar.Action
        icon="dots-vertical"
        onPress={() => {
          console.log('props');
        }}
      />
    </Appbar.Header>
  );
};
