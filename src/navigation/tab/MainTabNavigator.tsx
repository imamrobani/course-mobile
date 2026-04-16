import React, { useEffect } from 'react';
import {
  BottomTabBarProps,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import { Colors } from '@constants';
import { FavoriteScreen, HomeScreen, ProfileScreen } from '@screens';
import { useAppDispatch, useAppSelector } from '@store/hooks';
import { hydrateFavorites } from '@store/slice/favorites/favoritesSlice';
import { MainTabParamList } from '@type/navigation';
import BottomTab from './BottomTab';

const Tab = createBottomTabNavigator<MainTabParamList>();

const MainTabNavigator = () => {
  const dispatch = useAppDispatch();
  const userId = useAppSelector((state) => state.auth.user?.id);

  useEffect(() => {
    if (!userId) {
      return;
    }

    dispatch(hydrateFavorites({ userId }));
  }, [dispatch, userId]);

  const renderBottomTabBar = (props: BottomTabBarProps) => {
    return <BottomTab {...props} />;
  };

  return (
    <Tab.Navigator
      screenOptions={{
        animation: 'shift',
        headerShown: false,
        sceneStyle: { backgroundColor: Colors.NEUTRAL_20 },
        tabBarStyle: { backgroundColor: Colors.WHITE },
      }}
      tabBar={renderBottomTabBar}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{ title: 'Home' }}
      />
      <Tab.Screen
        name="Favorite"
        component={FavoriteScreen}
        options={{ title: 'Favorite' }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ title: 'Profile' }}
      />
    </Tab.Navigator>
  );
};
export default MainTabNavigator;
