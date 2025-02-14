import { Image, StyleSheet, Text, View } from 'react-native';
import React from 'react';

import FontAwesome from 'react-native-vector-icons/FontAwesome6';
import { Button } from 'react-native-paper';
import { globalStyles } from '../../styles/global';
import { useAsyncStorage } from '../../hooks/useAsyncStorage';


const TopProfile = () => {
    const [user, setUser] = React.useState<{
        full_name: string;
        country_code: string;
        mobile: string;
    }>({
        full_name: '',
        country_code: '',
        mobile: '',
    });
    const { getStoredValue: getUserDetails } = useAsyncStorage('userDetails');

    React.useEffect(() => {
        const getUser = async () => {
            setUser(await getUserDetails());
        };
        getUser();
    }, [getUserDetails]);

    return (
        <View>
            <View style={styles.topProfile}>
                <View style={styles.imageContainer}>
                    <Image source={require('../../assets/TempUser.png')} style={styles.image} />
                    <Image source={require('../../assets/Verify.png')} style={styles.verifyImage} />
                </View>
                <Text style={styles.textUserName}>{user?.full_name}</Text>
                <View style={styles.mobile}>
                    <FontAwesome name={'phone-volume'} size={20} solid color={'white'} />
                    <Text style={styles.textMobile}>{user?.country_code} {user?.mobile}</Text>
                </View>
                <View style={styles.mobile}>
                    <Button mode="contained" style={[styles.button]}>
                        <Text style={[globalStyles.textBold, styles.buttonText]}>View Profile</Text>
                    </Button>
                </View>
            </View>
        </View>
    );
};

export default TopProfile;

const styles = StyleSheet.create({
    topProfile: {
        justifyContent: 'flex-end',
        alignItems: 'center',
        height: 300,
        backgroundColor: '#4caf50',
        paddingHorizontal: 20,
        paddingVertical: 15,
        borderBottomRightRadius: 30,
        borderBottomLeftRadius: 30,
    },
    imageContainer: {
        width: 100,
        height: 100,
        marginVertical: 5,
    },
    image: {
        width: 100,
        height: 100,
        objectFit: 'contain',
    },
    verifyImage: {
        position: 'absolute',
        width: 40,
        height: 40,
        objectFit: 'contain',
        top: -5,
        right: -5,
    },
    textUserName: {
        fontWeight: 'bold',
        fontSize: 30,
        color: '#fff',
        marginVertical: 5,
    },
    mobile: {
        marginVertical: 5,
        flexDirection: 'row',
    },
    textMobile: {
        fontSize: 20,
        color: '#fff',
        marginHorizontal: 10,
    },
    button: {
        width: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.12)',
        borderRadius: 7,
        padding: 5,
        margin: 5,
    },
    buttonText: {
        fontSize: 18,
        color: '#fff',
    },
});
