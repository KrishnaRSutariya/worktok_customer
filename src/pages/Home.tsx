/* eslint-disable react-hooks/exhaustive-deps */
import ApiService from '../apis/ApiService';
import { ApiList } from '../apis/ApiList';
import { Constants } from '../constants/Constants';

import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { globalStyles } from '../styles/global';
import { Button } from 'react-native-paper';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../Layout';
import { useAsyncStorage } from '../hooks/useAsyncStorage';

type HomeScreenProps = NativeStackNavigationProp<RootStackParamList, 'Home'>;

const CategoryItem = ({ item }: any) => {
    return (
        <TouchableOpacity style={[styles.flexCol]}>
            <View style={[styles.flexCard]}>
                <Image source={{ uri: item.image }} style={styles.image} />
                <Text numberOfLines={1} style={[globalStyles.text, styles.text]}>{item.name}</Text>
            </View>
        </TouchableOpacity>
    );
};

const Home = ({ navigation }: { navigation: HomeScreenProps }) => {
    const [category, setCategory] = React.useState([]);
    const { getStoredValue: getUserToken } = useAsyncStorage('userToken');
    const { saveValue: saveUserDetails } = useAsyncStorage('userDetails');

    React.useEffect(() => {
        const fetchCategory = async () => {
            const response = await ApiService(ApiList.GET_HOME, Constants.GET);
            if (response?.ack) {
                setCategory(response?.categories);
            }
        };
        const getUser = async () => {
            const token = await getUserToken().then((res) => res?.accessToken ?? null).catch(() => null);
            if (token) {
                const res = await ApiService(ApiList.GET_PROFILE, Constants.GET, {}, navigation);
                if (res?.ack) {
                    saveUserDetails(res?.data);
                }
            }
        };
        fetchCategory();
        getUser();
    }, []);

    return (
        <View style={[styles.container]}>
            <Text style={[globalStyles.textBold, styles.headingText]}>Select a category to start a job</Text>
            <FlatList
                key={3}
                numColumns={3}
                keyExtractor={(item: any) => `${item?.id}`}
                data={category}
                renderItem={({ item }) => <CategoryItem item={item} />}
            />
            <View style={[styles.seeAllButton]}>
                <Button mode="contained" style={[styles.button]} onPress={() => navigation.navigate('AllServices')} >
                    <Text style={[globalStyles.textBold, styles.button]}>See all categories</Text>
                </Button>
            </View>
        </View>
    );
};

export default Home;

const styles = StyleSheet.create({
    container: {
        padding: 10,
    },
    flexCol: {
        width: '33.33%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    flexCard: {
        width: '90%',
        margin: 5,
        padding: 10,
        borderRadius: 5,
        backgroundColor: '#fff',
        alignItems: 'center',
    },
    headingText: {
        margin: 5,
        fontSize: 16,
        fontWeight: 'bold',
    },
    image: {
        width: 50,
        height: 50,
        borderRadius: 50,
    },
    text: {
        marginVertical: 5,
        fontSize: 12,
    },
    seeAllButton: {
        marginVertical: 10,
        padding: 5,
    },
    button: {
        backgroundColor: '#4caf50',
        color: '#fff',
        borderRadius: 5,
    },
});
