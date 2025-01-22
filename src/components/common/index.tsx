import * as Notifications from 'expo-notifications';
import * as Geolocation from 'expo-location';
import { Audio } from 'expo-av';

import { Alert, Linking } from 'react-native';


export const getNotification = async () => {
    const { status } = await Notifications.requestPermissionsAsync();

    if (status !== 'granted') {
        console.log('Permission to receive notifications was denied');
        Alert.alert(
            'Permission Denied',
            'You need to enable notification permission for this feature. Please enable it in settings.',
            [
                { text: 'Go to Settings', onPress: () => Linking.openURL('app-settings:') },
                { text: 'Cancel', onPress: () => { } },
            ],
        );
        return false;
    }

    return { isPermission: true };
};

export const getLocation = async () => {
    const { status } = await Geolocation.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
        console.log('Permission to access location was denied');
        Alert.alert(
            'Permission Denied',
            'You need to enable location permission for this feature. Please enable it in settings.',
            [
                { text: 'Go to Settings', onPress: () => Linking.openURL('app-settings:') },
                { text: 'Cancel', onPress: () => { } },
            ],
        );
        return false;
    }

    const { coords } = await Geolocation.getCurrentPositionAsync({});
    return { isPermission: true, latitude: coords.latitude, longitude: coords.longitude };
};

export const getMicrophonePermission = async () => {
    const { status } = await Audio.requestPermissionsAsync();

    if (status !== 'granted') {
        Alert.alert(
            'Permission Denied',
            'You need to enable microphone permission for this feature. Please enable it in settings.',
            [
                { text: 'Go to Settings', onPress: () => Linking.openURL('app-settings:') },
                { text: 'Cancel', onPress: () => { } },
            ],
        );
        return false;
    }

    return { isPermission: true };
};

