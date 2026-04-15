import React from 'react';
import { KeyboardAvoidingView, Platform } from 'react-native';
import { Button, Text, TextInput, View } from '@components';
import { useForm } from '@hooks';
import { useAppDispatch, useAppSelector } from '@store/hooks';
import {
  loginWithEmailPassword,
  setAuthError,
} from '@store/slice/auth/authSlice';
import styles from './styles';

const LoginScreen = () => {
  const dispatch = useAppDispatch();
  const { isAuthenticating, error } = useAppSelector((state) => state.auth);
  const [form, setForm] = useForm({
    email: 'john@example.com', // dummy email
    password: '123456', // dummy password
  });

  const disabled = form.email.trim() === '' || form.password === '';

  const handleLogin = async () => {
    if (!form.email.trim() || !form.password) {
      dispatch(setAuthError('Email dan password wajib diisi'));
      return;
    }

    dispatch(
      loginWithEmailPassword({
        email: form.email.trim(),
        password: form.password,
      }),
    );
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <View marginBottom={24}>
        <Text type="headingL" center color="PRIMARY_MAIN">
          Welcome to Course Mobile
        </Text>
        <Text type="body1Regular" center color="NEUTRAL_70">
          Where developers mock developers
        </Text>
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          label="Email"
          placeholder="john@example.com"
          value={form.email}
          onChangeText={(text) => {
            if (error) {
              dispatch(setAuthError(null));
            }
            setForm({ email: text });
          }}
          autoCapitalize="none"
          keyboardType="email-address"
        />
        <TextInput
          label="Password"
          placeholder="123456"
          isPassword
          value={form.password}
          onChangeText={(text) => {
            if (error) {
              dispatch(setAuthError(null));
            }
            setForm({ password: text });
          }}
        />
      </View>

      {error ? (
        <View marginBottom={12}>
          <Text type="body2Regular" color="DANGER_MAIN" center>
            {error}
          </Text>
        </View>
      ) : null}

      <Button
        label="Login"
        onPress={handleLogin}
        isLoading={isAuthenticating}
        disabled={disabled || isAuthenticating}
      />
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;
