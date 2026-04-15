/* eslint-disable no-console */
import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * Save data to storage
 * @param key Storage key
 * @param value Data to store (string or object)
 */
export const storeDataStorage = async (key: string, value: any) => {
  try {
    const jsonValue = typeof value === 'string' ? value : JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
  } catch (e) {
    console.error('Error saving data to storage:', e);
  }
};

/**
 * Get data from storage
 * @param key Storage key
 */
export const getDataStorage = async <T = unknown>(
  key: string,
): Promise<T | null> => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value === null) {
      return null;
    }

    try {
      return JSON.parse(value) as T;
    } catch {
      return value as unknown as T;
    }
  } catch (e) {
    console.error('Error reading data from storage:', e);
    return null;
  }
};

/**
 * Remove data from storage
 * @param key Storage key
 */
export const removeDataStorage = async (key: string) => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (e) {
    console.error('Error removing data from storage:', e);
  }
};

/**
 * Clear all data from storage
 */
export const clearAllStorage = async () => {
  try {
    await AsyncStorage.clear();
  } catch (e) {
    console.error('Error clearing storage:', e);
  }
};
