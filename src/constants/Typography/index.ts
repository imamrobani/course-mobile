import { StyleSheet } from 'react-native';
import { scale } from '@utils';
import Fonts from '../Fonts';

export const fontTypes = StyleSheet.create({
  // Heading
  headingS: {
    fontFamily: Fonts.OPEN_SAUCE_ONE_SEMIBOLD,
    fontSize: scale(20),
  },
  headingM: {
    fontFamily: Fonts.OPEN_SAUCE_ONE_SEMIBOLD,
    fontSize: scale(26),
  },
  headingL: {
    fontFamily: Fonts.OPEN_SAUCE_ONE_SEMIBOLD,
    fontSize: scale(35),
  },

  // Subtitle
  subtitle1Regular: {
    fontFamily: Fonts.OPEN_SAUCE_ONE_REGULAR,
    fontSize: scale(18),
  },
  subtitle1Medium: {
    fontFamily: Fonts.OPEN_SAUCE_ONE_MEDIUM,
    fontSize: scale(18),
  },
  subtitle1SemiBold: {
    fontFamily: Fonts.OPEN_SAUCE_ONE_SEMIBOLD,
    fontSize: scale(18),
  },
  subtitle2Regular: {
    fontFamily: Fonts.OPEN_SAUCE_ONE_REGULAR,
    fontSize: scale(16),
  },
  subtitle2Medium: {
    fontFamily: Fonts.OPEN_SAUCE_ONE_MEDIUM,
    fontSize: scale(16),
  },
  subtitle2SemiBold: {
    fontFamily: Fonts.OPEN_SAUCE_ONE_SEMIBOLD,
    fontSize: scale(16),
  },

  // Body
  body1Regular: {
    fontFamily: Fonts.OPEN_SAUCE_ONE_REGULAR,
    fontSize: scale(14),
  },
  body1Medium: {
    fontFamily: Fonts.OPEN_SAUCE_ONE_MEDIUM,
    fontSize: scale(14),
  },
  body1SemiBold: {
    fontFamily: Fonts.OPEN_SAUCE_ONE_SEMIBOLD,
    fontSize: scale(14),
  },
  body2Regular: {
    fontFamily: Fonts.OPEN_SAUCE_ONE_REGULAR,
    fontSize: scale(12),
  },
  body2Medium: {
    fontFamily: Fonts.OPEN_SAUCE_ONE_MEDIUM,
    fontSize: scale(12),
  },
  body2SemiBold: {
    fontFamily: Fonts.OPEN_SAUCE_ONE_SEMIBOLD,
    fontSize: scale(12),
  },

  // Button
  buttonRegular: {
    fontFamily: Fonts.OPEN_SAUCE_ONE_REGULAR,
    fontSize: scale(14),
  },
  buttonMedium: {
    fontFamily: Fonts.OPEN_SAUCE_ONE_MEDIUM,
    fontSize: scale(14),
  },
  buttonSemiBold: {
    fontFamily: Fonts.OPEN_SAUCE_ONE_SEMIBOLD,
    fontSize: scale(14),
  },
  buttonSRegular: {
    fontFamily: Fonts.OPEN_SAUCE_ONE_REGULAR,
    fontSize: scale(12),
  },
  buttonSMedium: {
    fontFamily: Fonts.OPEN_SAUCE_ONE_MEDIUM,
    fontSize: scale(12),
  },
  buttonSSemiBold: {
    fontFamily: Fonts.OPEN_SAUCE_ONE_SEMIBOLD,
    fontSize: scale(12),
  },

  // Caption
  captionRegular: {
    fontFamily: Fonts.OPEN_SAUCE_ONE_REGULAR,
    fontSize: scale(10),
  },
  captionMedium: {
    fontFamily: Fonts.OPEN_SAUCE_ONE_MEDIUM,
    fontSize: scale(10),
  },
  captionSemiBold: {
    fontFamily: Fonts.OPEN_SAUCE_ONE_SEMIBOLD,
    fontSize: scale(10),
  },
  captionSRegular: {
    fontFamily: Fonts.OPEN_SAUCE_ONE_REGULAR,
    fontSize: scale(8),
  },
  captionSMedium: {
    fontFamily: Fonts.OPEN_SAUCE_ONE_MEDIUM,
    fontSize: scale(8),
  },
  captionSSemiBold: {
    fontFamily: Fonts.OPEN_SAUCE_ONE_SEMIBOLD,
    fontSize: scale(8),
  },
});
