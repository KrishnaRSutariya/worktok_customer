import { Dimensions, ImageBackground, StyleSheet, TouchableOpacity, View } from 'react-native';
import React from 'react';

import { ActivityIndicator, Text } from 'react-native-paper';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../Layout';
import { useAsyncStorage } from '../../hooks/useAsyncStorage';

const { height } = Dimensions.get('window');

type LandingProps = NativeStackNavigationProp<RootStackParamList, 'Landing'>;

const Landing = ({ navigation }: { navigation: LandingProps }) => {

    const { getStoredValue: getNotification } = useAsyncStorage('notification');
    const { getStoredValue: getLocation } = useAsyncStorage('location');
    const { getStoredValue: getMicrophone } = useAsyncStorage('microphone');
    const { getStoredValue: getUserToken } = useAsyncStorage('userToken');

    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        const getStoredValue = async () => {
            const token = await getUserToken();

            if (token) {
                navigation.navigate('HomeScreen');
            }
            setLoading(false);
        };
        getStoredValue();
    }, [getUserToken, navigation]);

    const navigationPage = async (route: 'Login' | 'Registration') => {
        if (!(await getNotification().then(res => res?.isPermission))) {
            return navigation.navigate('NotificationPermission', { route });
        }

        if (!(await getLocation().then(res => res?.isPermission))) {
            return navigation.navigate('LocationPermission', { route });
        }

        if (!(await getMicrophone().then(res => res?.isPermission))) {
            return navigation.navigate('MicrophonePermission', { route });
        }

        navigation.navigate(route);
    };

    return (
        <ImageBackground source={require('../../assets/WelcomeScreen.png')} style={[styles.container, !loading && styles.contentBottom]}>
            {
                loading ? (
                    <ActivityIndicator size="large" color="white" />
                ) : (
                    <View style={styles.landingContainer}>
                        <TouchableOpacity onPress={() => navigationPage('Login')} style={[styles.button]}>
                            <Text style={styles.buttonText}>Login</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => navigationPage('Registration')} style={[styles.button]}>
                            <Text style={[styles.buttonText, styles.buttonOutlineText]}>Create Account</Text>
                        </TouchableOpacity>
                        <Text style={styles.buttonText} onPress={() => navigation.navigate('HomeScreen')}>Continue as a guest</Text>
                    </View>
                )
            }
        </ImageBackground>
    );
};

export default Landing;

const styles = StyleSheet.create({
    landingContainer: {
        flex: 1,
        padding: 20,
    },
    container: {
        height: height,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        objectFit: 'contain',
    },
    contentBottom: {
        alignItems: 'flex-end',
    },
    button: {
        backgroundColor: '#4caf50',
        marginBottom: 12,
        borderRadius: 10,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        paddingVertical: 18,
        borderRadius: 10,
    },
    buttonOutlineText: {
        color: '#000',
        backgroundColor: '#fff',
    },
});
