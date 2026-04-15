import * as React from 'react';
import { useColorScheme } from 'react-native';
import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
} from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { createURL } from 'expo-linking';
import * as SplashScreen from 'expo-splash-screen';
import { KeyboardProvider } from 'react-native-keyboard-controller';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import Fonts from '@constants/Fonts';
import RootNavigator from '@navigation/RootNavigator';
import { store } from '@store/store';

SplashScreen.preventAutoHideAsync();

const prefix = createURL('/');

const FONT_FAMILY = {
  [Fonts.OPEN_SAUCE_ONE_EXTRA_BOLD]: require('./assets/fonts/OpenSauceOne-ExtraBold.ttf'),
  [Fonts.OPEN_SAUCE_ONE_BOLD]: require('./assets/fonts/OpenSauceOne-Bold.ttf'),
  [Fonts.OPEN_SAUCE_ONE_SEMIBOLD]: require('./assets/fonts/OpenSauceOne-SemiBold.ttf'),
  [Fonts.OPEN_SAUCE_ONE_MEDIUM]: require('./assets/fonts/OpenSauceOne-Medium.ttf'),
  [Fonts.OPEN_SAUCE_ONE_REGULAR]: require('./assets/fonts/OpenSauceOne-Regular.ttf'),
  [Fonts.OPEN_SAUCE_ONE_LIGHT]: require('./assets/fonts/OpenSauceOne-Light.ttf'),
};

export function App() {
  const colorScheme = useColorScheme();

  const theme = colorScheme === 'dark' ? DarkTheme : DefaultTheme;

  const [loaded] = useFonts(FONT_FAMILY);

  if (!loaded) {
    return null;
  }

  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <KeyboardProvider statusBarTranslucent>
          <NavigationContainer
            theme={theme}
            linking={{ prefixes: [prefix] }}
            onReady={() => SplashScreen.hideAsync()}>
            <RootNavigator />
          </NavigationContainer>
        </KeyboardProvider>
      </SafeAreaProvider>
    </Provider>
  );
}
