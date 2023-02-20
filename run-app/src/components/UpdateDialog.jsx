import React, { useState } from "react";
import { View } from "react-native";
import { Button, Portal, Provider, Text, Dialog } from "react-native-paper";

export const UpdateDialog = ({ visibleState, onConfirm }) => {
  const [visible, setVisible] = useState(visibleState);

  const showDialog = () => setVisible(true);

  const hideDialog = () => setVisible(false);
  const handleConfirm = () => {
    onConfirm();
    hideDialog();
  };
  return (
    <Portal>
      <Dialog visible={visible} onDismiss={hideDialog}>
        <Dialog.Title>Изменение данных</Dialog.Title>
        <Dialog.Content>
          <Text variant="bodyMedium">Изменить данные?</Text>
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={hideDialog}>Cancel</Button>
          <Button onPress={handleConfirm}>Ok</Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};
