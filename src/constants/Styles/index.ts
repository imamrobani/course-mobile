import { StyleSheet, Platform } from 'react-native';

export const shadowTypes = StyleSheet.create({
  shadow_1: {
    shadowColor: '#000',
    shadowOpacity: 0.12,
    shadowRadius: 2,
    shadowOffset: { width: 0, height: 1 },
    ...Platform.select({ android: { elevation: 2 } }),
  },
  shadow_2: {
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    ...Platform.select({ android: { elevation: 6 } }),
  },
  shadow_3: {
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: -4 },
    ...Platform.select({ android: { elevation: 6 } }),
  },
});
