import { Dimensions, ScrollView, StyleSheet, View } from 'react-native';
import React from 'react';
import LoginHeader from '../components/home/LoginHeader';
import LoginMain from '../components/login/LoginMain';

const { height } = Dimensions.get('window');

const Login = () => {
    return (
        <View>
            <ScrollView style={styles.container}>
                <LoginHeader title={'Login account'} subTitle={'Login to your account and get your desired service.'} />
                <LoginMain />
            </ScrollView>
        </View>
    );
};

export default Login;

const styles = StyleSheet.create({
    container: {
        height: height,
        backgroundColor: '#fff',
    },
});
