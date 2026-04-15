import React from 'react';
import { TouchableOpacity, TouchableOpacityProps } from 'react-native';
import { Icons } from '@assets';
import { Colors } from '@constants';
import { scale } from '@utils';
import Text from '../Text';
import styles from './styles';

interface Props extends TouchableOpacityProps {
  label: string;
  bottom?: number;
  right?: number;
  left?: number;
  top?: number;
}

const FloatingButton = ({
  label,
  bottom = scale(28),
  right = scale(16),
  left,
  top,
  ...props
}: Props) => {
  return (
    <TouchableOpacity
      activeOpacity={0.9}
      style={[styles.container, { bottom, right, left, top }]}
      {...props}>
      <Icons.IcAdd stroke={Colors.WHITE} />
      <Text type="buttonSemiBold" color="NEUTRAL_10">
        {label}
      </Text>
    </TouchableOpacity>
  );
};

export default FloatingButton;
