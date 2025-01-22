import { Dimensions, ScrollView, StyleSheet, View } from 'react-native';
import React from 'react';
import LoginHeader from '../components/home/LoginHeader';
import RegistrationMain from '../components/login_registration/RegistrationMain';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../Layout';

const { height } = Dimensions.get('window');

type RegistrationProps = NativeStackNavigationProp<RootStackParamList, 'Registration'>;

const Registration = ({ navigation }: { navigation: RegistrationProps }) => {
    return (
        <View>
            <LoginHeader title={'Create an account'} subTitle={'Create an account and start your amazing trip'} navigation={navigation} />
            <ScrollView style={styles.container}>
                <RegistrationMain navigation={navigation} />
            </ScrollView>
        </View>
    );
};

export default Registration;

const styles = StyleSheet.create({
    container: {
        height: height - 220,
        backgroundColor: '#fff',
    },
});
