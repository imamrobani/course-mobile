import { StyleSheet } from 'react-native';
import { Colors, fontTypes } from '@constants';
import { scale } from '@utils';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderRadius: 6,
    paddingHorizontal: scale(8),
    borderColor: Colors.NEUTRAL_40,
    paddingVertical: 0,
    height: scale(120),
  },
  inputContainer: {
    flex: 1,
    ...fontTypes.body2Regular,
    color: Colors.PRIMARY_MAIN,
    paddingVertical: scale(8),
    textAlignVertical: 'top',
    height: scale(120),
  },
});

export default styles;
