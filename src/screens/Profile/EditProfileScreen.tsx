import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Image } from 'expo-image';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';
import { Images } from '@assets';
import { Button, Text, TextInput, TextInputArea, View } from '@components';
import Header from '@components/molecules/Header';
import { useForm } from '@hooks';
import { useAppDispatch, useAppSelector } from '@store/hooks';
import { updateProfile } from '@store/slice/auth/authSlice';
import styles from './styles';

const EditProfileScreen = () => {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const { user, isUpdatingProfile } = useAppSelector((state) => state.auth);

  const [form, setForm] = useForm({
    name: user?.name ?? '',
    avatar: user?.avatar ?? '',
    bio: user?.bio ?? '',
  });

  const [error, setError] = useState<string | null>(null);

  const avatarSource = form.avatar.trim()
    ? { uri: form.avatar.trim() }
    : Images.dummyUserProfile;

  const isDirty =
    (user?.name ?? '') !== form.name ||
    (user?.avatar ?? '') !== form.avatar ||
    (user?.bio ?? '') !== form.bio;

  const canSave = !isUpdatingProfile && form.name.trim() !== '' && isDirty;

  const handleSave = async () => {
    if (!user) {
      return;
    }

    setError(null);
    try {
      await dispatch(
        updateProfile({
          name: form.name,
          avatar: form.avatar,
          bio: form.bio,
        }),
      ).unwrap();
      navigation.goBack();
    } catch (e) {
      setError(typeof e === 'string' ? e : 'Failed to update profile');
    }
  };

  return (
    <View flex={1} backgroundColor="WHITE">
      <Header label="Edit Profile" onBack={() => navigation.goBack()} />

      {!user ? (
        <View style={styles.notLoggedIn}>
          <Text type="body1SemiBold">You're not logged in</Text>
          <Text type="body2Regular" color="NEUTRAL_70" center>
            Please log in to edit your profile.
          </Text>
        </View>
      ) : (
        <KeyboardAwareScrollView
          bottomOffset={24}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={styles.editContent}>
          <View alignItems="center" marginVertical={8}>
            <Image
              source={avatarSource}
              style={styles.editAvatar}
              contentFit="cover"
            />
          </View>

          <View gap={16}>
            <TextInput
              label="Name"
              placeholder="Your name"
              value={form.name}
              onChangeText={(text) => setForm({ name: text })}
              autoCapitalize="words"
            />

            <TextInput
              label="Avatar URL"
              placeholder="https://..."
              value={form.avatar}
              onChangeText={(text) => setForm({ avatar: text })}
              autoCapitalize="none"
            />

            <TextInputArea
              label="Bio"
              placeholder="Tell us about yourself"
              value={form.bio}
              onChangeText={(text) => setForm({ bio: text })}
              height={96}
            />
          </View>

          {error ? (
            <View>
              <Text type="body2Regular" color="DANGER_MAIN" center>
                {error}
              </Text>
            </View>
          ) : null}

          <View style={styles.footer}>
            <Button
              label="Save Changes"
              onPress={handleSave}
              isLoading={isUpdatingProfile}
              disabled={!canSave}
            />
          </View>
        </KeyboardAwareScrollView>
      )}
    </View>
  );
};

export default EditProfileScreen;
