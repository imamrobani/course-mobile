import React from 'react';
import { Pressable, StatusBar, StatusBarStyle } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Icons } from '@assets';
import { Text, View } from '@components/atoms';
import { Colors } from '@constants';
import { scale } from '@utils';
import styles from './styles';

interface HeaderProps {
  label?: string;
  onBack?: () => void;
  barStyle?: StatusBarStyle | null;
}

const Header: React.FC<HeaderProps> = ({
  label,
  onBack,
  barStyle = 'dark-content',
}) => {
  const insets = useSafeAreaInsets();
  const paddingTop = insets.top ? insets.top + scale(16) : scale(16);

  return (
    <>
      <StatusBar barStyle={barStyle} backgroundColor={Colors.WHITE} />
      <View style={[styles.container, { paddingTop }]}>
        <Pressable style={styles.iconContainer} onPress={onBack}>
          <Icons.IcArrowLeft width={scale(18)} height={scale(18)} />
        </Pressable>
        <Text type="body1Medium">{label}</Text>
      </View>
    </>
  );
};

export default Header;
