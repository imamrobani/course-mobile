import React from 'react';
import { Text as TextRN, TextProps, StyleSheet, TextStyle } from 'react-native';
import { Colors, Fonts, fontTypes } from '@constants';
import { scale } from '@utils';

export type FontTypeStyle = keyof typeof fontTypes;
export type ColorType = keyof typeof Colors | (string & {});
export type FontFamilyType = keyof typeof Fonts;

interface CustomTextProps extends TextProps {
  type?: FontTypeStyle;
  color?: ColorType;
  fontFamily?: FontFamilyType;
  fontSize?: number;
  fontStyle?: TextStyle['fontStyle'];
  fontWeight?: TextStyle['fontWeight'];
  letterSpacing?: number;
  lineHeight?: number;
  center?: boolean;
  left?: boolean;
  right?: boolean;
  justify?: boolean;
  auto?: boolean;
  textAlign?: TextStyle['textAlign'];
  textDecorationLine?: TextStyle['textDecorationLine'];
  textDecorationStyle?: TextStyle['textDecorationStyle'];
  textShadowColor?: string;
  textShadowOffset?: { width: number; height: number };
  textShadowRadius?: number;
  textTransform?: TextStyle['textTransform'];
}

const Text: React.FC<CustomTextProps> = ({
  type,
  color,
  fontFamily = 'OPEN_SAUCE_ONE_REGULAR',
  fontSize = 14,
  fontStyle,
  fontWeight,
  letterSpacing,
  lineHeight,
  center,
  left,
  right,
  justify,
  auto,
  textDecorationLine,
  textDecorationStyle,
  textShadowColor,
  textShadowOffset,
  textShadowRadius,
  textTransform,
  style,
  children,
  ...props
}) => {
  let textAlign: TextStyle['textAlign'] | undefined;

  if (center) {
    textAlign = 'center';
  }
  if (left) {
    textAlign = 'left';
  }
  if (right) {
    textAlign = 'right';
  }
  if (justify) {
    textAlign = 'justify';
  }
  if (auto) {
    textAlign = 'auto';
  }

  const fontType = type && fontTypes[type];
  const colorStyle = color
    ? { color: Colors[color as keyof typeof Colors] || color }
    : { color: Colors.PRIMARY_MAIN };

  const customStyle = StyleSheet.create({
    text: {
      color,
      fontFamily: Fonts[fontFamily],
      fontSize: scale(fontSize),
      fontStyle,
      fontWeight,
      letterSpacing,
      lineHeight,
      textAlign,
      textDecorationLine,
      textDecorationStyle,
      textShadowColor,
      textShadowOffset,
      textShadowRadius,
      textTransform,
    },
  });

  return (
    <TextRN style={[customStyle.text, fontType, colorStyle, style]} {...props}>
      {children}
    </TextRN>
  );
};

export default Text;
