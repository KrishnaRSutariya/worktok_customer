// hooks/useAsyncStorage.ts
import AsyncStorage from '@react-native-async-storage/async-storage';

export const useAsyncStorage = (key: string) => {

    // Get the value from AsyncStorage
    const getStoredValue = async () => {
        const value = await AsyncStorage.getItem(key);
        if (value) {
            return JSON.parse(value);
        }
        return false;
    };

    // Save value to AsyncStorage
    const saveValue = async (value: any) => {
        await AsyncStorage.setItem(key, JSON.stringify(value));
    };

    // Remove value from AsyncStorage
    const removeValue = async () => {
        await AsyncStorage.removeItem(key);
    };

    return {
        getStoredValue,
        saveValue,
        removeValue,
    };
};
