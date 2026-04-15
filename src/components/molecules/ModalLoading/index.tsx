import React from 'react';
import { ActivityIndicator, Modal, ModalProps } from 'react-native';
import { Text, View } from '@components/atoms';
import { Colors } from '@constants';
import styles from './styles';

const ModalLoading: React.FC<ModalProps> = ({ visible = false }) => {
  return (
    <View>
      <Modal
        visible={visible}
        animationType="fade"
        transparent={true}
        statusBarTranslucent={true}
        onRequestClose={() => {}} // Prevent closing by back button on Android
      >
        <View style={styles.container}>
          <ActivityIndicator size={'large'} color={Colors.NEUTRAL_70} />
          <Text type="body2Medium" color="NEUTRAL_70">
            Loading ...
          </Text>
        </View>
      </Modal>
    </View>
  );
};

export default ModalLoading;
