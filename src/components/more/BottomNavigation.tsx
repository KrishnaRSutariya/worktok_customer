import { FlatList, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';

import FontAwesome from 'react-native-vector-icons/FontAwesome6';
import { globalStyles } from '../../styles/global';
import { RootStackParamList } from '../../Layout';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useAsyncStorage } from '../../hooks/useAsyncStorage';

const navigationMenu = [
    [
        {
            title: 'Push notifications',
            icon: 'bell',
            navigation: 'Home',
        },
        {
            title: 'My address',
            icon: 'location-dot',
            navigation: 'Home',
        },
        {
            title: 'How to use the app',
            icon: 'circle-exclamation',
            navigation: 'Home',
        },
    ],
    [
        {
            title: 'My wallet',
            icon: 'wallet',
            navigation: 'Home',
        },
        {
            title: 'Billing information',
            icon: 'receipt',
            navigation: 'Home',
        },
        {
            title: 'Coupons',
            icon: 'ticket',
            navigation: 'Home',
        },
    ],
    [
        {
            title: 'Support centre',
            icon: 'headset',
            navigation: 'Home',
        },
        {
            title: 'Rate our app',
            icon: 'star',
            navigation: 'Home',
        },
        {
            title: 'Term’s and conditions',
            icon: 'universal-access',
            navigation: 'Home',
        },
        {
            title: 'Privacy and policy',
            icon: 'shield-halved',
            navigation: 'Home',
        },
    ],
    [
        {
            title: 'Logout',
            icon: 'right-from-bracket',
            onPress: 'handleLogout',
            iconStyle: { color: '#f04438', backgroundColor: '#FEF0EE' },
            rightArrowHide: true,
        },
    ],
];

type MoreScreenProps = NativeStackNavigationProp<RootStackParamList, 'More'>;

const SubMenu = ({ item, navigation }: { item: any; navigation: MoreScreenProps }) => {

    const { removeValue: removeToken } = useAsyncStorage('userToken');
    const { removeValue: removeUserDetails } = useAsyncStorage('userDetails');

    const actions: Record<string, () => void> = {
        handleLogout: async () => {
            await removeToken();
            await removeUserDetails();
            navigation.navigate('Landing');
        },
    };


    return (
        <View style={styles.subBox}>
            <TouchableOpacity style={styles.innerContainer} onPress={() => item.navigation ? navigation.navigate(item.navigation as any) : item.onPress ? actions[item.onPress]() : null}>
                <View>
                    <FontAwesome name={item.icon} size={14} solid color={'#4caf50'} style={[styles.icons, item.iconStyle]} />
                </View>
                <Text style={[globalStyles.textBold, styles.text]}>{item.title}</Text>
                {!item.rightArrowHide && <FontAwesome name={'chevron-right'} size={20} solid color={'#8b92a2'} style={styles.iconsRightArrow} />}
            </TouchableOpacity>
        </View>
    );
};

const MainMenu = ({ item: data, navigation }: { item: any; navigation: MoreScreenProps }) => {
    return (
        <View style={styles.mainBox}>
            <FlatList
                keyExtractor={(_, i) => `${i}`}
                data={data}
                renderItem={({ item }) => <SubMenu item={item} navigation={navigation} />}
            />
        </View>
    );
};

const BottomNavigation = ({ navigation }: { navigation: MoreScreenProps }) => {
    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                keyExtractor={(_, i) => `${i}`}
                data={navigationMenu}
                renderItem={({ item }) => <MainMenu item={item} navigation={navigation} />}
            />
        </SafeAreaView>
    );
};

export default BottomNavigation;

const styles = StyleSheet.create({
    container: {
        marginBottom: 705,
        marginVertical: 10,
        marginHorizontal: 15,
    },
    innerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    mainBox: {
        backgroundColor: '#fff',
        marginVertical: 5,
        padding: 10,
        borderRadius: 10,
        borderColor: 'rgba(0, 0, 0, 0.1)',
        borderWidth: 1,
    },
    subBox: {
        padding: 10,
    },
    icons: {
        marginRight: 15,
        padding: 12,
        backgroundColor: '#F2F4F7',
        borderRadius: 10,
    },
    iconsRightArrow: {
        marginLeft: 'auto',
    },
    text: {
        fontSize: 16,
    },
});
