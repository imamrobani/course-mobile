import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { Text, View } from '@components';
import Header from '@components/molecules/Header';

const EditProfileScreen = () => {
  const navigation = useNavigation();

  return (
    <View flex={1} backgroundColor="WHITE">
      <Header label="Edit Profile" onBack={() => navigation.goBack()} />

      <View flex={1} padding={24} justifyContent="center" alignItems="center">
        <Text type="body1Regular" color="NEUTRAL_70" center>
          Coming soon
        </Text>
      </View>
    </View>
  );
};

export default EditProfileScreen;
