import {
  Alert,
  Dimensions,
  PixelRatio,
  Platform,
  ToastAndroid,
} from 'react-native';

export const { width: deviceWidth, height: deviceHeight } =
  Dimensions.get('window');

export const scale = (scaleWidth: number) => {
  const DESIGN_WIDTH = 375;

  return Math.round(
    PixelRatio.roundToNearestPixel(scaleWidth * (deviceWidth / DESIGN_WIDTH)),
  );
};

export const showToastNative = (message: string) => {
  if (Platform.OS === 'ios' || Platform.OS === 'windows') {
    Alert.alert('CourseMobile', message);
  } else {
    ToastAndroid.showWithGravity(
      message,
      ToastAndroid.SHORT,
      ToastAndroid.BOTTOM,
    );
  }
};

export const sanitizeNumberInput = (raw: string) => raw.replace(/[^0-9]/g, '');

export const formatThousands = (raw: string) => {
  const digits = sanitizeNumberInput(raw);
  if (!digits) {
    return '';
  }
  return digits.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
};

export const toNumber = (raw: string) => {
  const digits = sanitizeNumberInput(raw);
  return digits ? parseInt(digits, 10) : 0;
};

export const uriToFile = (uri: string, prefix?: string) => {
  if (!uri) {
    return { name: '', type: '', uri: '' };
  }

  let filename = uri.split('/').pop() || `file-${Date.now()}`;
  if (prefix) {
    filename = `${prefix}-${filename}`;
  }
  const match = /\.(\w+)$/.exec(filename);
  const ext = match ? match[1].toLowerCase() : 'jpeg';
  const type = `image/${ext === 'jpg' ? 'jpeg' : ext}`;

  return {
    name: filename,
    type,
    uri,
  };
};
