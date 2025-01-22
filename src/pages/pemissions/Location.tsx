import { Dimensions, Image, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Button } from 'react-native-paper';

const { height } = Dimensions.get('window');

const Location = () => {
    return (
        <View style={styles.container}>
            <View style={styles.imageContainer}>
                <Image source={require('../../assets/Notification.png')} style={styles.image} />
            </View>
            <View style={styles.buttonContainer}>
                <Button mode="contained" style={[styles.button, styles.buttonLeft]}>
                    <Text style={[styles.buttonText, styles.buttonOutlineText]}>Skip</Text>
                </Button>
                <Button mode="contained" style={[styles.button, styles.buttonRight]}>
                    <Text style={[styles.buttonText]}>Yes, enable it now</Text>
                </Button>
            </View>
        </View>
    );
};

export default Location;

const styles = StyleSheet.create({
    container: {
        height: height,
        backgroundColor: '#fff',
        justifyContent: 'space-between',
    },
    imageContainer: {
        width: '100%',
        height: '80%',
        borderRadius: 25,
        overflow: 'hidden',
    },
    image: {
        width: '100%',
        height: '100%',
        objectFit: 'cover',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 15,
        marginVertical: 30,
    },
    button: {
        padding: 10,
        borderRadius: 10,
        backgroundColor: '#4CAF50',
    },
    buttonLeft: {
        width: '30%',
        backgroundColor: '#fff',
    },
    buttonRight: {
        width: '60%',
    },
    buttonText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff',
    },
    buttonOutlineText: {
        color: '#4CAF50',
    },
});
