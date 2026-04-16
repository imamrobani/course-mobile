import { StyleSheet } from 'react-native';
import { Colors } from '@constants';
import { scale } from '@utils';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.WHITE,
  },
  header: {
    padding: scale(16),
    gap: scale(8),
  },
  listContent: {
    padding: scale(16),
    gap: scale(12),
  },
  empty: {
    padding: scale(24),
    alignItems: 'center',
    gap: scale(8),
  },
});

export default styles;
