import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { Text, PlatformPressable } from '@react-navigation/elements';
import { useLinkBuilder } from '@react-navigation/native';
import { View } from '@components';
import { Colors, shadowTypes } from '@constants';
import { useInset } from '@hooks';
import styles from './styles';

const IconsTab = ({
  routeName,
  focus,
}: {
  routeName: string;
  focus: boolean;
}) => {
  const color = focus ? Colors.PRIMARY_MAIN : Colors.NEUTRAL_50;

  switch (routeName) {
    case 'Home':
      return (
        <Ionicons
          name={focus ? 'home' : 'home-outline'}
          size={24}
          color={color}
        />
      );
    case 'Favorite':
      return (
        <Ionicons
          name={focus ? 'heart' : 'heart-outline'}
          size={24}
          color={color}
        />
      );
    case 'Profile':
      return (
        <Ionicons
          name={focus ? 'person' : 'person-outline'}
          size={24}
          color={color}
        />
      );
    default:
      return <Ionicons name="ellipse" size={24} color={color} />;
  }
};

const BottomTab: React.FC<BottomTabBarProps> = ({
  state,
  descriptors,
  navigation,
}) => {
  const { paddingBottom } = useInset();
  const { buildHref } = useLinkBuilder();

  return (
    <View
      style={[styles.container, shadowTypes.shadow_3]}
      paddingBottom={paddingBottom}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label = options?.title ?? route.name;

        const isFocused = state.index === index;
        const bgIndicator = isFocused ? Colors.PRIMARY_MAIN : 'transparent';

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <PlatformPressable
            key={route.key}
            href={buildHref(route.name, route.params)}
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarButtonTestID}
            pressOpacity={0.9}
            onPress={onPress}
            onLongPress={onLongPress}>
            <View style={styles.contentContainer}>
              <View
                style={[styles.indicator, { backgroundColor: bgIndicator }]}
              />
              <IconsTab routeName={route.name} focus={isFocused} />
              <Text style={isFocused ? styles.activeTab : styles.inActiveTab}>
                {label}
              </Text>
            </View>
          </PlatformPressable>
        );
      })}
    </View>
  );
};

export default BottomTab;
