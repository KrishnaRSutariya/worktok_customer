import { ImageBackground, StyleSheet, Text, View } from 'react-native';
import React from 'react';

import FontAwesome from 'react-native-vector-icons/FontAwesome6';


const LoginHeader = ({ title, subTitle }: { title: string; subTitle: string }) => {
    return (
        <View style={styles.roundedContainer}>
            <ImageBackground source={require('../../assets/HomeHeaderBackground.png')} style={styles.container}>
                <View style={styles.topBar}>
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
        borderBottomRightRadius: 50,
        overflow: 'hidden',
    },
    container: {
        height: 200,
        padding: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        objectFit: 'contain',
    },
    topBar: {
        gap: 10,
        flexDirection: 'column',
    },
    icon: {
        paddingBottom: 10,
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
