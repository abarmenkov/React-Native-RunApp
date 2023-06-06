import React from "react";
import { Portal, Modal, Text } from "react-native-paper";

const InfoModal = ({ message, hideModal }) => {
  const containerStyle = { backgroundColor: "white", padding: 20 };
  return (
    <Portal>
      <Modal
        visible="true"
        onDismiss={() => hideModal()}
        contentContainerStyle={containerStyle}
      >
        <Text>{message}</Text>
      </Modal>
    </Portal>
  );
};

export default InfoModal;
