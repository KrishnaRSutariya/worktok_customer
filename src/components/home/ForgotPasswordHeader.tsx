import { Dimensions, Image, StyleSheet, View } from 'react-native';
import React from 'react';

const { height } = Dimensions.get('window');

const ForgotPasswordHeader = ({ image }: { image: any; }) => {
    return (
        <View style={styles.roundedContainer}>
            <Image source={image} style={styles.container} />
        </View>
    );
};

export default ForgotPasswordHeader;

const styles = StyleSheet.create({
    roundedContainer: {
        width: '100%',
        height: height / 2,
    },
    container: {
        width: '100%',
        height: '100%',
        objectFit: 'cover',
    },
});
