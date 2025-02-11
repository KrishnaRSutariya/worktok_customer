import { Dimensions, Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../Layout';
import { Button } from 'react-native-paper';

const { width, height } = Dimensions.get('window');

type AccountCreationProps = NativeStackNavigationProp<RootStackParamList, 'AccountCreation'>;

const AccountCreation = ({ navigation }: { navigation: AccountCreationProps }) => {
    return (
        <View>
            <ScrollView style={styles.container}>
                <View style={styles.innerContainer}>
                    <Image source={require('../assets/AccountCreation.png')} style={styles.image} />
                    <Button mode="contained" style={[styles.button]} onPress={() => { navigation.replace('HomeScreen'); }}>
                        <Text style={[styles.buttonText]}>Start application</Text>
                    </Button>
                </View>
            </ScrollView>
        </View>
    );
};

export default AccountCreation;

const styles = StyleSheet.create({
    container: {
        width: width,
        height: height,
        backgroundColor: '#fff',
    },
    innerContainer: {
        width: width,
        height: height,
        justifyContent: 'center',
        padding: 20,
    },
    image: {
        width: '100%',
        height: '60%',
        objectFit: 'contain',
    },
    button: {
        padding: 10,
        borderRadius: 7,
        backgroundColor: '#4CAF50',
    },
    buttonText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff',
    },
});
