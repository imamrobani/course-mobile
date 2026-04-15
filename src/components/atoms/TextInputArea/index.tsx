import React, { forwardRef } from 'react';
import { TextInputProps, TextInput as TextInputRN } from 'react-native';
import { scale } from '@utils';
import Text from '../Text';
import View from '../View';
import styles from './styles';

interface InputTextProps extends TextInputProps {
  label?: string;
  desc?: string;
}

const TextInputArea = forwardRef<TextInputRN, InputTextProps>(
  ({ label, desc, ...props }, ref) => {
    return (
      <View gap={scale(8)}>
        {label && (
          <Text type="body2Regular" color="NEUTRAL_70">
            {label}
          </Text>
        )}
        <View style={styles.container}>
          <TextInputRN
            ref={ref}
            style={styles.inputContainer}
            multiline={true}
            {...props}
          />
        </View>
        {desc && (
          <Text type="captionRegular" color="NEUTRAL_70">
            {desc}
          </Text>
        )}
      </View>
    );
  },
);

export default TextInputArea;
