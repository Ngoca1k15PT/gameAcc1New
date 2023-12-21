import AsyncStorage from '@react-native-async-storage/async-storage';

export const FirstData = async (key: any, value: any) => {
  try {
    return await AsyncStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.log(error);
  }
};

export const CheckData = async (key: any) => {
  try {
    let data: any = await AsyncStorage.getItem(key);
    return JSON.parse(data);
  } catch (error) {
    return null;
  }
};