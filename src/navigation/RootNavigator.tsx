import React, { useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { LoginScreen } from '@screens';
import { useAppDispatch, useAppSelector } from '@store/hooks';
import { loadAuth } from '@store/slice/auth/authSlice';
import { RootStackParamList } from '@type/navigation';
import MainTabNavigator from './tab/MainTabNavigator';

const Stack = createStackNavigator<RootStackParamList>();

const RootNavigator = () => {
  const dispatch = useAppDispatch();
  const { token } = useAppSelector((state) => state.auth);

  useEffect(() => {
    dispatch(loadAuth());
  }, [dispatch]);

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {!token ? (
        <Stack.Screen name="Login" component={LoginScreen} />
      ) : (
        <Stack.Group>
          <Stack.Screen name="MainTab" component={MainTabNavigator} />
        </Stack.Group>
      )}
    </Stack.Navigator>
  );
};

export default RootNavigator;
