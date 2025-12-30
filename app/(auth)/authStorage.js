import * as SecureStore from 'expo-secure-store';

const TOKEN_KEY = 'auth_token';
const USER_DETAILS = "User_Details"

export const saveToken = async (token) => {
  await SecureStore.setItemAsync(TOKEN_KEY, token);
};

export const getToken = async () => {
  return SecureStore.getItemAsync(TOKEN_KEY);
};

export const removeToken = async () => {
  await SecureStore.deleteItemAsync(TOKEN_KEY);
};

export const saveUserDeatails = async (data) => {
  return SecureStore.setItemAsync(USER_DETAILS, JSON.stringify(data));
}

export const getUserDetails = async () => {
  return SecureStore.getItemAsync(USER_DETAILS);
};