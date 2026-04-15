import { StyleSheet } from 'react-native';
import { Colors } from '@constants';
import { scale } from '@utils';

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: scale(72),
    left: 0,
    right: 0,
    maxHeight: scale(120),
    paddingVertical: scale(12),
    paddingHorizontal: scale(16),
    backgroundColor: Colors.WHITE,
    borderRadius: 8,
    zIndex: 99,
    shadowColor: Colors.PRIMARY_MAIN,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  scroll: { gap: 12 },
});

export default styles;
