import React from 'react';
import {
  ActivityIndicator,
  TouchableOpacity,
  TouchableOpacityProps,
  ViewStyle,
} from 'react-native';
import { Colors } from '@constants';
import Text, { ColorType, FontTypeStyle } from '../Text';
import styles from './styles';

interface ButtonProps extends TouchableOpacityProps {
  label: string;
  labelColor?: ColorType;
  buttonColor?: ColorType;
  borderColor?: ColorType;
  isLoading?: boolean;
  height?: number;
  width?: number;
  typeText?: FontTypeStyle;
  elevation?: boolean;
  style?: ViewStyle | ViewStyle[];
}

const Button: React.FC<ButtonProps> = ({
  label,
  labelColor = 'NEUTRAL_10',
  buttonColor = 'PRIMARY_MAIN',
  borderColor = 'transparent',
  disabled,
  isLoading,
  height = 48,
  width,
  typeText = 'buttonSemiBold',
  elevation = true,
  style,
  ...props
}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={[
        styles.container,
        elevation && styles.elevation,
        {
          backgroundColor: disabled
            ? Colors.NEUTRAL_50
            : Colors[buttonColor as keyof typeof Colors] || buttonColor,
          borderColor: disabled
            ? Colors.NEUTRAL_50
            : Colors[borderColor as keyof typeof Colors] || borderColor,
          height,
          width,
        },
        style,
      ]}
      disabled={disabled}
      {...props}>
      {isLoading ? (
        <ActivityIndicator color="white" size="small" />
      ) : (
        <Text
          type={typeText}
          color={
            disabled
              ? 'NEUTRAL_70'
              : Colors[labelColor as keyof typeof Colors] || labelColor
          }>
          {label}
        </Text>
      )}
    </TouchableOpacity>
  );
};

export default Button;
