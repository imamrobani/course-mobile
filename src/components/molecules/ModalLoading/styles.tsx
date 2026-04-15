import { StyleSheet } from 'react-native';
import { scale } from '@utils';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.15)',
    gap: scale(16),
  },
});

export default styles;
