import { StyleSheet } from 'react-native';
import { Colors } from '@constants';
import { scale } from '@utils';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.NEUTRAL_20,
  },
  listContent: {
    padding: scale(16),
    gap: scale(12),
  },
  separator: {
    height: scale(12),
  },
});

export default styles;
