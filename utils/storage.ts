import AsyncStorage from '@react-native-async-storage/async-storage';
import { STORAGE_KEYS } from '../constants';

// Generic storage functions
export const storeData = async <T>(key: string, value: T): Promise<void> => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
  } catch (error) {
    console.error('Error storing data:', error);
    throw error;
  }
};

export const getData = async <T>(key: string): Promise<T | null> => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (error) {
    console.error('Error retrieving data:', error);
    throw error;
  }
};

export const removeData = async (key: string): Promise<void> => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (error) {
    console.error('Error removing data:', error);
    throw error;
  }
};

export const clearAll = async (): Promise<void> => {
  try {
    await AsyncStorage.clear();
  } catch (error) {
    console.error('Error clearing storage:', error);
    throw error;
  }
};

// Auth storage
export const storeAuthToken = async (token: string): Promise<void> => {
  await storeData(STORAGE_KEYS.AUTH, token);
};

export const getAuthToken = async (): Promise<string | null> => {
  return getData<string>(STORAGE_KEYS.AUTH);
};

export const removeAuthToken = async (): Promise<void> => {
  await removeData(STORAGE_KEYS.AUTH);
};

// User data storage
export const storeUserData = async (userData: any): Promise<void> => {
  await storeData(STORAGE_KEYS.USER_DATA, userData);
};

export const getUserData = async (): Promise<any | null> => {
  return getData(STORAGE_KEYS.USER_DATA);
};

export const removeUserData = async (): Promise<void> => {
  await removeData(STORAGE_KEYS.USER_DATA);
};

// Onboarding storage
export const storeOnboardingComplete = async (): Promise<void> => {
  await storeData(STORAGE_KEYS.ONBOARDING_COMPLETE, true);
};

export const isOnboardingComplete = async (): Promise<boolean> => {
  return (await getData<boolean>(STORAGE_KEYS.ONBOARDING_COMPLETE)) || false;
};

// Theme storage
export const storeTheme = async (isDark: boolean): Promise<void> => {
  await storeData(STORAGE_KEYS.THEME, isDark);
};

export const getTheme = async (): Promise<boolean> => {
  return (await getData<boolean>(STORAGE_KEYS.THEME)) || false;
};

// Notifications storage
export const storeNotificationsEnabled = async (
  enabled: boolean
): Promise<void> => {
  await storeData(STORAGE_KEYS.NOTIFICATIONS_ENABLED, enabled);
};

export const areNotificationsEnabled = async (): Promise<boolean> => {
  return (await getData<boolean>(STORAGE_KEYS.NOTIFICATIONS_ENABLED)) || false;
}; 