import React from 'react';
import { Pressable, PressableProps } from 'react-native';
import { SvgProps } from 'react-native-svg';
import { Text } from '@components/atoms';
import styles from './styles';

type IconProp = React.ReactElement | React.ComponentType<SvgProps>;

type Tone = 'default' | 'danger';

interface ActionItemProps extends PressableProps {
  label: string;
  icon: IconProp;
  tone?: Tone;
}

const ActionItem = ({
  label,
  icon,
  tone = 'default',
  ...props
}: ActionItemProps) => {
  const renderIcon = () =>
    React.isValidElement(icon)
      ? React.cloneElement(icon)
      : React.createElement(icon);

  return (
    <Pressable style={styles.container} {...props}>
      {renderIcon()}
      <Text
        type="body2Regular"
        color={tone === 'danger' ? 'DANGER_MAIN' : 'PRIMARY_MAIN'}>
        {label}
      </Text>
    </Pressable>
  );
};

export default ActionItem;
