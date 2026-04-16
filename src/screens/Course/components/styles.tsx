import { StyleSheet } from 'react-native';
import { Colors } from '@constants';
import { scale } from '@utils';

const styles = StyleSheet.create({
  section: {
    borderRadius: scale(16),
    padding: scale(16),
    backgroundColor: Colors.NEUTRAL_20,
  },
  composer: {
    gap: scale(8),
  },
  composerActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  postButton: {
    borderRadius: scale(12),
  },
  commentItem: {
    borderRadius: scale(12),
    padding: scale(12),
    backgroundColor: Colors.WHITE,
  },
  commentHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  likeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale(8),
    paddingHorizontal: scale(12),
    paddingVertical: scale(8),
    borderRadius: scale(999),
    backgroundColor: Colors.NEUTRAL_20,
  },
});

export default styles;
