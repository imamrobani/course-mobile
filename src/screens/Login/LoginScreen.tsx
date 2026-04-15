import React from 'react';
import { Alert } from 'react-native';
import { Button, Text, TextInput, View } from '@components';
import { useForm } from '@hooks';
import { useAppDispatch } from '@store/hooks';
import { login } from '@store/slice/auth/authSlice';
import styles from './styles';

const LoginScreen = () => {
  const dispatch = useAppDispatch();
  const [form, setForm] = useForm({
    username: '',
    password: '',
  });
  const [loading, setLoading] = React.useState(false);

  const disabled = form.username === '' || form.password === '';

  const handleLogin = async () => {
    if (!form.username || !form.password) {
      Alert.alert('Error', 'Username and password are required');
      return;
    }

    setLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      await dispatch(login(form.username));
    } catch {
      Alert.alert('Error', 'Failed to login');
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View marginBottom={24}>
        <Text type="headingL" center color="PRIMARY_MAIN">
          Stack Underflow
        </Text>
        <Text type="body1Regular" center color="NEUTRAL_70">
          Where developers mock developers
        </Text>
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          label="Username"
          placeholder="Enter your username"
          value={form.username}
          onChangeText={(text) => setForm({ username: text })}
          autoCapitalize="none"
        />
        <TextInput
          label="Password"
          placeholder="Enter your password"
          isPassword
          value={form.password}
          onChangeText={(text) => setForm({ password: text })}
        />
      </View>

      <Button
        label="Login"
        onPress={handleLogin}
        isLoading={loading}
        disabled={disabled || loading}
      />
    </View>
  );
};

export default LoginScreen;
