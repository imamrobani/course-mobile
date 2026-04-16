import { StyleSheet } from 'react-native';
import { Colors } from '@constants';
import { scale } from '@utils';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.WHITE,
  },
  scrollContent: {
    padding: scale(16),
    gap: scale(14),
    paddingBottom: scale(24),
  },
  heroImage: {
    width: '100%',
    height: scale(200),
    borderRadius: scale(16),
    backgroundColor: Colors.NEUTRAL_30,
  },
  metaRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: scale(8),
  },
  badge: {
    borderRadius: scale(999),
    paddingHorizontal: scale(10),
    paddingVertical: scale(4),
    backgroundColor: Colors.NEUTRAL_20,
  },
  favoriteChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale(8),
  },
  card: {
    borderRadius: scale(16),
    padding: scale(14),
    backgroundColor: Colors.NEUTRAL_20,
    gap: scale(8),
  },
});

export default styles;
