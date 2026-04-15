import React from 'react';
import { Pressable, ScrollView } from 'react-native';
import Animated, {
  FadeInUp,
  FadeOutUp,
  LinearTransition,
} from 'react-native-reanimated';
import { DropdownItem } from '@type/models/common';
import styles from './styles';
import Text from '../Text';

interface DropdownProps {
  data: DropdownItem[];
  value?: string;
  isShow?: boolean;
  onSelect?: (value: string) => void;
}

const Dropdown: React.FC<DropdownProps> = ({
  data,
  value,
  isShow = false,
  onSelect,
}) => {
  if (!isShow) {
    return null;
  }

  return (
    <Animated.View
      entering={FadeInUp.springify()}
      exiting={FadeOutUp.springify()}
      layout={LinearTransition.springify()}
      style={styles.container}>
      <ScrollView nestedScrollEnabled contentContainerStyle={styles.scroll}>
        {data.map((item) => (
          <Pressable key={item.label} onPress={() => onSelect?.(item.key)}>
            <Text type={item.key === value ? 'body2SemiBold' : 'body2Regular'}>
              {item.label}
            </Text>
          </Pressable>
        ))}
      </ScrollView>
    </Animated.View>
  );
};

export default Dropdown;
