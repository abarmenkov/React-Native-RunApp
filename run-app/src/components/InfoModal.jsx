import React from "react";
import { Portal, Modal, Text, useTheme } from "react-native-paper";
import { AppStyles } from "../utils/Constants";

const InfoModal = ({ message, hideModal, type }) => {
  const theme = useTheme();
  const backgroundColor =
    type === "error"
      ? theme.colors.onErrorContainer
      : theme.colors.onPrimaryContainer;
  const textColor =
    type === "error"
      ? theme.colors.onError
      : theme.colors.onPrimary;
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
            color: textColor,
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
