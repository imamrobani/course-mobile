import { StyleSheet } from 'react-native';
import { Colors, fontTypes } from '@constants';
import { deviceWidth, scale } from '@utils';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingTop: scale(16),
    justifyContent: 'space-around',
    backgroundColor: 'white',
  },
  contentContainer: {
    alignItems: 'center',
    gap: scale(4),
    paddingHorizontal: scale(16),
  },
  indicator: {
    position: 'absolute',
    top: scale(-16),
    height: 1,
    width: deviceWidth / 3,
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 4,
  },
  activeTab: {
    ...fontTypes.captionMedium,
    color: Colors.PRIMARY_MAIN,
  },
  inActiveTab: {
    ...fontTypes.captionRegular,
    color: Colors.NEUTRAL_50,
  },
});

export default styles;
