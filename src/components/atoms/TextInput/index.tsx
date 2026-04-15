import React from 'react';
import {
  Pressable,
  TextInputProps,
  TextInput as TextInputRN,
  TouchableOpacity,
} from 'react-native';
import { SvgProps } from 'react-native-svg';
import { Colors } from '@constants';
import Text from '../Text';
import View from '../View';
import styles from './styles';

type IconRightProp = React.ReactElement | React.ComponentType<SvgProps>;

interface InputTextProps extends TextInputProps {
  label?: string;
  prefix?: string;
  desc?: string;
  isPassword?: boolean;
  iconRight?: IconRightProp;
  onPress?: () => void;
  onTapIconRight?: () => void;
  disabled?: boolean;
  width?: number;
}

type InputTextWithRefProps = InputTextProps & { ref?: React.Ref<TextInputRN> };

const TextInput = ({
  label,
  prefix,
  desc,
  isPassword,
  iconRight,
  onPress,
  onTapIconRight,
  disabled,
  width,
  ref,
  ...props
}: InputTextWithRefProps) => {
  const renderIconRight = () => {
    if (!iconRight) {
      return null;
    }

    return React.isValidElement(iconRight)
      ? iconRight
      : React.createElement(iconRight);
  };

  return (
    <View gap={8}>
      {label && (
        <Text type="body2Regular" color="NEUTRAL_70">
          {label}
        </Text>
      )}
      <TouchableOpacity
        activeOpacity={0.7}
        style={[
          styles.container,
          { backgroundColor: disabled ? Colors.NEUTRAL_20 : Colors.WHITE },
          { width },
        ]}
        disabled={disabled}
        onPress={onPress}>
        {prefix && <Text type="body2Regular">{prefix}</Text>}
        <TextInputRN
          ref={ref}
          style={[styles.inputContainer, { width }]}
          secureTextEntry={isPassword}
          editable={!disabled}
          onPressIn={disabled ? undefined : onPress}
          {...props}
        />
        {iconRight && (
          <Pressable onPress={onTapIconRight}>
            <View style={styles.iconContainer}>{renderIconRight()}</View>
          </Pressable>
        )}
      </TouchableOpacity>
      {desc && (
        <Text type="captionSRegular" color="NEUTRAL_70">
          {desc}
        </Text>
      )}
    </View>
  );
};

export default TextInput;
