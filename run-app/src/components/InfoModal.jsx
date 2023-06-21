import React from "react";
import { Portal, Modal, Text, useTheme } from "react-native-paper";
import { AppStyles } from "../utils/Constants";

const InfoModal = ({ message, hideModal, type }) => {
  const theme = useTheme();
  const backgroundColor =
    type === "error" ? theme.colors.onErrorContainer : "white";
  return (
    <Portal>
      <Modal
        visible="true"
        onDismiss={() => hideModal()}
        contentContainerStyle={{
          ...AppStyles.infoModal,
          backgroundColor: backgroundColor,
        }}
      >
        <Text
          style={{
            color: theme.colors.error,
            fontSize: 18,
            fontWeight: "700",
            textAlign: "center",
          }}
        >
          {message}
        </Text>
      </Modal>
    </Portal>
  );
};

export default InfoModal;
