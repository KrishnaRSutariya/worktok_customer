import { Image, ImageBackground, StyleSheet, TouchableOpacity, View } from 'react-native';
import React from 'react';

import FontAwesome from 'react-native-vector-icons/FontAwesome6';


const HomeHeader = () => {
    return (
        <ImageBackground source={require('../../assets/HomeHeaderBackground.png')} style={styles.container}>
            <View style={styles.leftIcons}>
                <TouchableOpacity style={styles.leftButton}>
                    <FontAwesome name="bell" size={15} solid color="white" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.leftButton}>
                    <FontAwesome name="magnifying-glass" size={15} solid color="white" />
                </TouchableOpacity>
            </View>
            <Image source={require('../../assets/worktok-homepage.png')} style={styles.image} />
        </ImageBackground>
    );
};

export default HomeHeader;

const styles = StyleSheet.create({
    container: {
        height: 80,
        paddingHorizontal: 15,
        paddingBottom: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        objectFit: 'contain',
    },
    leftIcons: {
        gap: 10,
        flexDirection: 'row',
    },
    image: {
        width: '50%',
        height: '50%',
        objectFit: 'contain',
    },
    leftButton: {
        padding: 10,
        borderRadius: 50,
        backgroundColor: 'rgba(255, 255, 255, 0.3)',
    },
});
