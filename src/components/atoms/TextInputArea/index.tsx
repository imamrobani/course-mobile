import React, { forwardRef } from 'react';
import {
  TextInputProps,
  TextInput as TextInputRN,
  TextStyle,
  ViewStyle,
} from 'react-native';
import { scale } from '@utils';
import Text from '../Text';
import View from '../View';
import styles from './styles';

interface InputTextProps extends TextInputProps {
  label?: string;
  desc?: string;
  height?: number;
  containerStyle?: ViewStyle | ViewStyle[];
  inputStyle?: TextStyle | TextStyle[];
}

const TextInputArea = forwardRef<TextInputRN, InputTextProps>(
  (
    { label, desc, height = 120, containerStyle, inputStyle, style, ...props },
    ref,
  ) => {
    const containerStyles = Array.isArray(containerStyle)
      ? containerStyle
      : containerStyle
        ? [containerStyle]
        : [];

    const inputStyles = Array.isArray(inputStyle)
      ? inputStyle
      : inputStyle
        ? [inputStyle]
        : [];

    return (
      <View gap={scale(8)}>
        {label && (
          <Text type="body2Regular" color="NEUTRAL_70">
            {label}
          </Text>
        )}
        <View
          style={[
            styles.container,
            { height: scale(height) },
            ...containerStyles,
          ]}>
          <TextInputRN
            ref={ref}
            style={[
              styles.inputContainer,
              { height: scale(height) },
              ...inputStyles,
              style,
            ]}
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
