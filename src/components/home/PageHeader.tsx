/* eslint-disable react-native/no-inline-styles */
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';

import FontAwesome from 'react-native-vector-icons/FontAwesome6';
import { useNavigation } from '@react-navigation/native';
import { globalStyles } from '../../styles/global';

const formatTitle = (title: string = 'Home') => {
    return title.replace(/([a-z0-9])([A-Z])/g, '$1 $2').replace(/([A-Z]+)([A-Z][a-z])/g, '$1 $2').replace(/^./, (match) => match.toUpperCase());
};

const PageHeader = ({ route }: any) => {
    const navigation = useNavigation();
    return (
        <View style={styles.container}>
            <TouchableOpacity style={[styles.leftButton, { opacity: 0 }]}>
                <FontAwesome name="bell" size={15} solid color="white" />
            </TouchableOpacity>
            <Text style={[globalStyles.textBold, styles.headerText]}>{formatTitle(route?.name)}</Text>
            <TouchableOpacity style={styles.backButton} onPress={navigation.goBack}>
                <FontAwesome name="arrow-right" size={20} solid color="white" />
            </TouchableOpacity>
        </View>
    );
};

export default PageHeader;

const styles = StyleSheet.create({
    container: {
        height: 80,
        paddingHorizontal: 15,
        paddingBottom: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        objectFit: 'contain',
        backgroundColor: '#4caf50',
    },
    leftButton: {
        padding: 10,
        borderRadius: 50,
        backgroundColor: 'rgba(255, 255, 255, 0.3)',
    },
    headerText: {
        fontSize: 18,
        padding: 10,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#fff',
    },
    backButton: {
        padding: 10,
    },
});
