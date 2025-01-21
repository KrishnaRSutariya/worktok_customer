import { StyleSheet, View } from 'react-native';
import React from 'react';
import TopProfile from '../components/more/TopProfile';
import BottomNavigation from '../components/more/BottomNavigation';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../Layout';

type MoreScreenProps = NativeStackNavigationProp<RootStackParamList, 'More'>;

const More = ({ navigation }: { navigation: MoreScreenProps }) => {
    return (
        <View>
            <TopProfile />
            <BottomNavigation navigation={navigation} />
        </View>
    );
};

export default More;

const styles = StyleSheet.create({

});
