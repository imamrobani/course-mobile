import { StyleSheet } from 'react-native';
import { Colors } from '@constants';
import { scale } from '@utils';

const styles = StyleSheet.create({
  headerSearch: {
    borderRadius: scale(12),
    borderWidth: 0,
    backgroundColor: Colors.NEUTRAL_30,
  },
  headerChip: {
    paddingHorizontal: scale(12),
    paddingVertical: scale(8),
    borderRadius: scale(40),
    backgroundColor: Colors.NEUTRAL_30,
  },
  headerChipSelected: {
    backgroundColor: Colors.ACCENT_MAIN,
  },
  emptyContainer: {
    padding: scale(24),
    borderRadius: scale(16),
    backgroundColor: Colors.WHITE,
    alignItems: 'center',
    gap: scale(8),
  },
});

export default styles;
