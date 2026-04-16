import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { CourseDetailScreen, EditProfileScreen, LoginScreen } from '@screens';
import { useAppSelector } from '@store/hooks';
import { RootStackParamList } from '@type/navigation';
import MainTabNavigator from './tab/MainTabNavigator';

const Stack = createStackNavigator<RootStackParamList>();

const RootNavigator = () => {
  const { status, token } = useAppSelector((state) => state.auth);

  if (status === 'hydrating') {
    return null;
  }

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {!token ? (
        <Stack.Screen name="Login" component={LoginScreen} />
      ) : (
        <Stack.Group>
          <Stack.Screen name="MainTab" component={MainTabNavigator} />
          <Stack.Screen name="CourseDetail" component={CourseDetailScreen} />
          <Stack.Screen name="EditProfile" component={EditProfileScreen} />
        </Stack.Group>
      )}
    </Stack.Navigator>
  );
};

export default RootNavigator;
