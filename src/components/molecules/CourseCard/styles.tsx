import { StyleSheet } from 'react-native';
import { Colors, fontTypes } from '@constants';
import { scale } from '@utils';

const styles = StyleSheet.create({
  container: {
    borderRadius: scale(16),
    backgroundColor: Colors.WHITE,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: scale(160),
    backgroundColor: Colors.NEUTRAL_30,
  },
  overlayRow: {
    position: 'absolute',
    top: scale(12),
    left: scale(12),
    right: scale(12),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  categoryBadge: {
    paddingHorizontal: scale(12),
    paddingVertical: scale(8),
    borderRadius: scale(999),
    backgroundColor: Colors.WARNING_MAIN,
  },
  favoriteButton: {
    width: scale(32),
    height: scale(32),
    borderRadius: scale(16),
    backgroundColor: Colors.WHITE,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: Colors.NEUTRAL_30,
  },
  title: {
    flex: 1,
  },
  rating: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale(8),
    borderRadius: scale(999),
    paddingHorizontal: scale(12),
    paddingVertical: scale(8),
    backgroundColor: Colors.SUCCESS_SURFACE,
  },
  ratingText: {
    color: Colors.SUCCESS_HOVER,
  },
  author: {
    flex: 1,
    ...fontTypes.body2SemiBold,
    color: Colors.PRIMARY_MAIN,
  },
  metaChip: {
    paddingHorizontal: scale(12),
    paddingVertical: scale(8),
    borderRadius: scale(999),
    backgroundColor: Colors.NEUTRAL_20,
  },
});

export default styles;
