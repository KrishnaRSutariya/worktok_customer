import ApiService from '../apis/ApiService';
import { ApiList } from '../apis/ApiList';
import { Constants } from '../constants/Constants';

import { useNavigation } from '@react-navigation/native';

import { FlatList, Image, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { globalStyles } from '../styles/global';
import { Button } from 'react-native-paper';

const CategoryItem = ({ item }: any) => {
    return (
        <View style={[styles.flexCol]}>
            <View style={[styles.flexCard]}>
                <Image source={{ uri: item.image }} style={styles.image} />
                <Text numberOfLines={1} style={[globalStyles.text, styles.text]}>{item.name}</Text>
            </View>
        </View>
    );
};

const AllServices = () => {
    const navigation = useNavigation();
    const [category, setCategory] = React.useState([]);

    React.useEffect(() => {
        const fetchCategory = async () => {
            const response = await ApiService(ApiList.GET_HOME, Constants.GET);
            if (response?.ack) {
                setCategory(response?.categories);
            }
        };
        fetchCategory();
    }, []);

    return (
        <View>
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

export default AllServices;

const styles = StyleSheet.create({
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
        padding: 5,
    },
    button: {
        backgroundColor: '#4caf50',
        color: '#fff',
        borderRadius: 5,
    },
});
