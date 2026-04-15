import { StyleSheet } from 'react-native';
import { Colors } from '@constants';
import { scale } from '@utils';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: scale(16),
    backgroundColor: Colors.WHITE,
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: scale(52),
  },
  title: { flex: 1 },
});

export default styles;
