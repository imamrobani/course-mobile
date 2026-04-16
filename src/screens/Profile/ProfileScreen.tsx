import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { Image } from 'expo-image';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Images } from '@assets';
import { Button, Text, View } from '@components';
import { useAppDispatch, useAppSelector } from '@store/hooks';
import { logout } from '@store/slice/auth/authSlice';
import styles from './styles';

const ProfileScreen = () => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  const navigation = useNavigation();

  return (
    <SafeAreaView edges={['top']} style={styles.container}>
      <View alignItems="center" gap={12} marginTop={12}>
        <Image
          source={user?.avatar ? { uri: user.avatar } : Images.dummyUserProfile}
          style={styles.avatar}
          contentFit="cover"
        />
        <View alignItems="center" gap={4}>
          <Text type="headingL" center>
            {user?.name ?? 'Guest'}
          </Text>
          <Text type="body2Regular" center color="NEUTRAL_70">
            {user?.email ?? '-'}
          </Text>
        </View>
      </View>

      <View style={styles.profileCard}>
        <Text type="body2Regular" color="NEUTRAL_70">
          Bio
        </Text>
        <Text type="body1Regular">{user?.bio ?? 'No bio yet'}</Text>
      </View>

      <View gap={12} marginTop={6}>
        <Button
          label="Edit Profile"
          onPress={() => navigation.navigate('EditProfile' as never)}
        />
        <Button
          label="Logout"
          buttonColor="DANGER_MAIN"
          onPress={() => dispatch(logout())}
        />
      </View>
    </SafeAreaView>
  );
};

export default ProfileScreen;
