import { useState } from 'react';
import { Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

type UseImagePickerReturn = {
  uri: string | null;
  pickImage: (
    options?: ImagePicker.ImagePickerOptions,
  ) => Promise<string | null>;
  clearImage: () => void;
};

const defaultOptions: ImagePicker.ImagePickerOptions = {
  mediaTypes: ['images', 'livePhotos'],
  aspect: [4, 3],
  quality: 0.3,
};

const useImagePicker = (
  initialOptions?: ImagePicker.ImagePickerOptions,
): UseImagePickerReturn => {
  const [uri, setUri] = useState<string | null>(null);

  const pickImage = async (
    override?: ImagePicker.ImagePickerOptions,
  ): Promise<string | null> => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permissionResult.granted) {
      Alert.alert(
        'Permission required',
        'Permission to access the media library is required.',
      );
      return null;
    }

    const options = { ...defaultOptions, ...initialOptions, ...override };
    const result = await ImagePicker.launchImageLibraryAsync(options);

    if (!result.canceled && result.assets?.length) {
      const nextUri = result.assets[0].uri;
      setUri(nextUri);
      return nextUri;
    }

    return null;
  };

  const clearImage = () => {
    setUri(null);
  };

  return { uri, pickImage, clearImage };
};

export default useImagePicker;
