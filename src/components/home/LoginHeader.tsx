import { ImageBackground, StyleSheet, Text, View } from 'react-native';
import React from 'react';

import FontAwesome from 'react-native-vector-icons/FontAwesome6';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../Layout';

type LoginHeaderProps = NativeStackNavigationProp<RootStackParamList, 'Login' | 'Registration'>;

const LoginHeader = ({ title, subTitle, navigation }: { title: string; subTitle: string, navigation: LoginHeaderProps }) => {
    return (
        <View style={styles.roundedContainer}>
            <ImageBackground source={require('../../assets/HomeHeaderBackground.png')} style={styles.container}>
                <View style={styles.topBar}>
                    <FontAwesome name="angle-left" size={30} solid color="white" style={styles.icon} onPress={() => navigation.goBack()} />
                    <FontAwesome name="circle-user" size={50} solid color="white" style={styles.icon} />
                    <Text style={styles.mainTitle}>{title}</Text>
                    <Text style={styles.subTitle}>{subTitle}</Text>
                </View>
            </ImageBackground>
        </View>
    );
};

export default LoginHeader;

const styles = StyleSheet.create({
    roundedContainer: {
        backgroundColor: '#fff',
    },
    container: {
        height: 220,
        padding: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        objectFit: 'contain',
        borderBottomRightRadius: 50,
        overflow: 'hidden',
    },
    topBar: {
        gap: 10,
        flexDirection: 'column',
    },
    icon: {
        paddingBottom: 10,
        width: 50,
    },
    mainTitle: {
        color: '#fff',
        fontSize: 22,
        fontWeight: 'bold',
    },
    subTitle: {
        color: '#fff',
        fontSize: 14,
    },
});
