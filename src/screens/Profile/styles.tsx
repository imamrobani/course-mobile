import { StyleSheet } from 'react-native';
import { Colors } from '@constants';
import { scale } from '@utils';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    gap: 18,
    backgroundColor: Colors.WHITE,
  },
  avatar: {
    width: scale(88),
    height: scale(88),
    borderRadius: scale(44),
    backgroundColor: Colors.NEUTRAL_30,
  },
  editAvatar: {
    width: scale(96),
    height: scale(96),
    borderRadius: scale(48),
    backgroundColor: Colors.NEUTRAL_30,
  },
  profileCard: {
    backgroundColor: Colors.NEUTRAL_30,
    borderRadius: scale(16),
    padding: scale(16),
    gap: scale(6),
  },
  editContent: {
    padding: scale(16),
    gap: scale(16),
  },
  footer: {
    gap: scale(12),
    paddingTop: scale(8),
  },
  divider: {
    height: 1,
    backgroundColor: Colors.NEUTRAL_30,
  },
  notLoggedIn: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
});

export default styles;
