import React from "react";
import { Portal, Modal, Text, useTheme } from "react-native-paper";
import { AppStyles } from "../utils/Constants";

const InfoModal = ({ message, hideModal }) => {
  const theme = useTheme();
  return (
    <Portal>
      <Modal
        visible="true"
        onDismiss={() => hideModal()}
        contentContainerStyle={{...AppStyles.infoModal, backgroundColor: theme.colors.onErrorContainer}}
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
