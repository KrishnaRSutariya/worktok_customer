import ApiService from '../apis/ApiService';
import { ApiList } from '../apis/ApiList';
import { Constants } from '../constants/Constants';

import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { globalStyles } from '../styles/global';
import { Searchbar } from 'react-native-paper';

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

const AllServices = () => {
    const [category, setCategory] = React.useState([]);
    const [search, setSearch] = React.useState<string>('');

    React.useEffect(() => {
        const fetchCategory = async () => {
            const response = await ApiService(`${ApiList.GET_ALL_CATEGORY}?search=${search}`, Constants.GET);
            if (response?.ack) {
                setCategory(response?.categories);
            }
        };
        fetchCategory();
    }, [search]);

    return (
        <View style={[styles.container]}>
            <View style={[styles.searchBarContainer]}>
                <Searchbar
                    placeholder="Search service..."
                    onChangeText={setSearch}
                    value={search}
                    style={styles.searchBar}
                    inputStyle={styles.searchBarInput}
                    cursorColor={'#fff'}
                    iconColor={'#fff'}
                    selectionColor={'#fff'}
                    placeholderTextColor={'#fff'}
                />
            </View>
            <Text style={[globalStyles.textBold, styles.headingText]}>Home maintenance</Text>
            <FlatList
                keyExtractor={(item: any) => `${item?.id}`}
                data={category}
                renderItem={({ item }) => <CategoryItem item={item} />}
            />
        </View>
    );
};

export default AllServices;

const styles = StyleSheet.create({
    container: {
        marginBottom: 195,
    },
    searchBarContainer: {
        padding: 10,
        backgroundColor: '#4caf50',
    },
    searchBar: {
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        borderRadius: 10,
        borderWidth: 2,
        borderColor: 'rgba(255, 255, 255, 0.25)',
    },
    searchBarInput: {
        fontSize: 20,
        color: '#fff',
    },
    flexCol: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    flexCard: {
        width: '90%',
        margin: 2,
        padding: 10,
        borderRadius: 5,
        backgroundColor: '#fff',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    headingText: {
        margin: 5,
        marginHorizontal: 20,
        fontSize: 16,
        fontWeight: 'bold',
    },
    image: {
        width: 50,
        height: 50,
        borderRadius: 10,
        marginRight: 20,
    },
    text: {
        width: '80%',
        marginVertical: 5,
        fontSize: 20,
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
