import React from 'react';
import {
  DimensionValue,
  View as RNView,
  ViewProps,
  ViewStyle,
  StyleSheet,
} from 'react-native';
import { Colors } from '@constants';
import { ColorType } from '../Text';

interface CustomViewProps extends ViewProps {
  padding?: number;
  paddingTop?: number;
  paddingBottom?: number;
  paddingLeft?: number;
  paddingRight?: number;
  paddingHorizontal?: number;
  paddingVertical?: number;
  margin?: number;
  marginTop?: number;
  marginBottom?: number;
  marginLeft?: number;
  marginRight?: number;
  marginHorizontal?: number;
  marginVertical?: number;
  gap?: number;
  rowGap?: number;
  columnGap?: number;
  flex?: number;
  flexGrow?: number;
  row?: boolean;
  column?: boolean;
  rowReverse?: boolean;
  columnReverse?: boolean;
  flexWrap?: 'wrap' | 'nowrap' | 'wrap-reverse';
  justifyContent?:
    | 'flex-start'
    | 'flex-end'
    | 'center'
    | 'space-between'
    | 'space-around'
    | 'space-evenly';
  alignItems?: 'flex-start' | 'flex-end' | 'center' | 'stretch' | 'baseline';
  alignSelf?: 'auto' | 'flex-start' | 'flex-end' | 'center' | 'stretch';
  width?: DimensionValue;
  height?: DimensionValue;
  minWidth?: DimensionValue;
  minHeight?: DimensionValue;
  maxWidth?: DimensionValue;
  maxHeight?: DimensionValue;
  backgroundColor?: ColorType;
  borderWidth?: number;
  borderColor?: ColorType;
  borderRadius?: number;
  opacity?: number;
  style?: ViewStyle | ViewStyle[];
}

const CustomView = React.forwardRef<RNView, CustomViewProps>(
  (
    {
      padding,
      paddingTop,
      paddingBottom,
      paddingLeft,
      paddingRight,
      paddingHorizontal,
      paddingVertical,
      margin,
      marginTop,
      marginBottom,
      marginLeft,
      marginRight,
      marginHorizontal,
      marginVertical,
      gap,
      rowGap,
      columnGap,
      flex,
      flexGrow,
      row,
      column,
      rowReverse,
      columnReverse,
      flexWrap,
      justifyContent,
      alignItems,
      alignSelf,
      width,
      height,
      minWidth,
      minHeight,
      maxWidth,
      maxHeight,
      backgroundColor,
      borderWidth,
      borderColor,
      borderRadius,
      opacity,
      style,
      children,
      ...props
    },
    ref,
  ) => {
    let flexDirection: ViewStyle['flexDirection'];

    if (row) {
      flexDirection = 'row';
    }
    if (column) {
      flexDirection = 'column';
    }
    if (rowReverse) {
      flexDirection = 'row-reverse';
    }
    if (columnReverse) {
      flexDirection = 'column-reverse';
    }

    const bgColorStyle = backgroundColor
      ? {
          backgroundColor:
            Colors[backgroundColor as keyof typeof Colors] || backgroundColor,
        }
      : {};

    const borderColorStyle = borderColor
      ? {
          borderColor:
            Colors[borderColor as keyof typeof Colors] || borderColor,
        }
      : {};

    const computedStyle: ViewStyle = {
      padding,
      paddingTop,
      paddingBottom,
      paddingLeft,
      paddingRight,
      paddingHorizontal,
      paddingVertical,
      margin,
      marginTop,
      marginBottom,
      marginLeft,
      marginRight,
      marginHorizontal,
      marginVertical,
      gap,
      rowGap,
      columnGap,
      flex,
      flexGrow,
      flexDirection,
      flexWrap,
      justifyContent,
      alignItems,
      alignSelf,
      width,
      height,
      minWidth,
      minHeight,
      maxWidth,
      maxHeight,
      backgroundColor,
      borderWidth,
      borderColor,
      borderRadius,
      opacity,
    };

    const combinedStyle = StyleSheet.flatten([
      computedStyle,
      bgColorStyle,
      borderColorStyle,
      style,
    ]);

    return (
      <RNView ref={ref} style={combinedStyle} {...props}>
        {children}
      </RNView>
    );
  },
);

export default CustomView;
