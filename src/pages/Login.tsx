import { Dimensions, ScrollView, StyleSheet, View } from 'react-native';
import React from 'react';
import LoginHeader from '../components/home/LoginHeader';
import LoginMain from '../components/login_registration/LoginMain';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../Layout';

const { height } = Dimensions.get('window');

type LoginProps = NativeStackNavigationProp<RootStackParamList, 'Login'>;

const Login = ({ navigation }: { navigation: LoginProps }) => {
    return (
        <View>
            <LoginHeader title={'Login account'} subTitle={'Login to your account and get your desired service.'} navigation={navigation} />
            <ScrollView style={styles.container}>
                <LoginMain navigation={navigation} />
            </ScrollView>
        </View>
    );
};

export default Login;

const styles = StyleSheet.create({
    container: {
        height: height - 220,
        backgroundColor: '#fff',
    },
});
