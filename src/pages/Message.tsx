/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
import { Dimensions, FlatList, Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { useAsyncStorage } from '../hooks/useAsyncStorage';
import { ActivityIndicator, Searchbar, Text } from 'react-native-paper';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../Layout';
import { useChat } from '../components/common/StreamChat';

const { height } = Dimensions.get('window');

const getTime = (time: string) => {
    const date = new Date(time);
    const hours = date.getHours() % 12 || 12;
    const minutes = date.getMinutes();
    const AmPm = date.getHours() >= 12 ? 'PM' : 'AM';
    return `${hours}:${minutes < 10 ? '0' + minutes : minutes} ${AmPm}`;
};

const defaultImage = 'https://cdn1.iconfinder.com/data/icons/user-interface-263/24/Account-512.png';

type MessageProps = NativeStackNavigationProp<RootStackParamList, 'Message'>;

const Message = ({ navigation }: { navigation: MessageProps }) => {

    const { client, isConnected } = useChat();
    const { getStoredValue: getUserDetails } = useAsyncStorage('userDetails');

    const [channels, setChannels] = React.useState<Array<any>>([]);
    const [loading, setLoading] = React.useState(true);
    const [search, setSearch] = React.useState<string>('');
    const [userPresence, setUserPresence] = React.useState<Record<string, boolean>>({});

    const getUser = async () => {
        const user = await getUserDetails();
        try {
            const filters = { members: { $in: [`${user?.id}`] } };
            const userChannels: Array<any> = await client.queryChannels(filters, { last_message_at: -1 }, {
                watch: true,
                state: true,
                presence: true,
            });

            setChannels(userChannels);

            // Set initial presence of users
            const presenceState: Record<string, boolean> = {};
            userChannels.forEach(channel => {
                const members = Object.values(channel.state.members);
                members.forEach((m: any) => {
                    if (m.user?.id !== client.userID) {
                        presenceState[m.user.id] = m.user.online || false;
                    }
                });
            });
            setUserPresence(presenceState);

        } catch (error) {
            console.error('Error fetching channels:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleNewMessage = (event: any) => {
        setChannels((prevChannels) => {
            return prevChannels.map((channel) =>
                channel.id === event.channel_id
                    ? { ...channel, state: { ...channel.state, messages: [...channel.state.messages, event.message] } }
                    : channel
            );
        });
    };

    const handleChannelUpdated = (event: any) => {
        setChannels((prevChannels) => {
            return prevChannels.map((channel) =>
                channel.id === event.channel.id ? { ...channel, ...event.channel } : channel
            );
        });
    };

    const handleUserPresence = (event: any) => {
        setUserPresence(prevState => ({
            ...prevState,
            [event.user.id]: event.user.online,
        }));
    };

    React.useEffect(() => {
        if (isConnected) {
            getUser();
        }

        // Real-time event listeners
        client.on('message.new', handleNewMessage);
        client.on('channel.updated', handleChannelUpdated);
        client.on('user.presence.changed', handleUserPresence);

        return () => {
            client.off('message.new', handleNewMessage);
            client.off('channel.updated', handleChannelUpdated);
            client.off('user.presence.changed', handleUserPresence);
        };
    }, []);

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#4caf50" />
            </View>
        );
    }

    return (
        <View style={[styles.container]}>
            <View style={[styles.searchBarContainer]}>
                <Searchbar
                    placeholder="Search chat, people and more..."
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
            {channels.length === 0 ? (
                <View style={styles.noChannelsContainer}>
                    <Text style={styles.noChannels}>No channels found</Text>
                </View>
            ) : (
                <FlatList
                    data={channels}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => {
                        const members = Object.values(item?.state?.members);
                        const otherMember: any = members.find((m: any) => m.user?.id !== client.userID);
                        const userImage = otherMember?.user?.image || defaultImage;
                        const isOnline = userPresence[otherMember?.user?.id] ?? false;
                        return (
                            <TouchableOpacity onPress={() => { navigation.navigate('ChannelMessage', { channelId: item?.id, channelType: item?.data?.type }); }} style={styles.channelItem}>
                                <View style={styles.profileContainer}>
                                    <Image source={{ uri: userImage }} style={styles.channelImage} />
                                    <View style={[styles.onlineIndicator, { backgroundColor: isOnline ? '#34c759' : '#aaa' }]} />
                                </View>
                                <View style={styles.channelInfo}>
                                    <View style={styles.channelNameContainer}>
                                        <Text style={styles.channelName} numberOfLines={1}>{item.data.name}</Text>
                                        <Text style={styles.lastMessage} numberOfLines={1}>
                                            {item.state.messages.length > 0 ? item.state.messages[item.state.messages.length - 1].text : 'No messages yet'}
                                        </Text>
                                    </View>
                                    <View style={styles.lastMessageContainer}>
                                        <Text style={styles.lastMessageTime}>{getTime(item.data.last_message_at)}</Text>
                                        {item?.state?.unreadCount > 0 && (
                                            <Text style={styles.unreadMessage}>{`${item?.state?.unreadCount}`.slice(0, 2)}</Text>
                                        )}
                                    </View>
                                </View>
                            </TouchableOpacity>
                        );
                    }}
                />
            )}
        </View>
    );
};

export default Message;

const styles = StyleSheet.create({
    loadingContainer: {
        width: '100%',
        height: height - 175,
        justifyContent: 'center',
    },
    container: {
        width: '100%',
        height: height - 175,
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
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    noChannelsContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    noChannels: {
        fontSize: 18,
        color: 'gray',
    },
    channelItem: {
        padding: 10,
        marginHorizontal: 10,
        marginVertical: 2.5,
        borderRadius: 7,
        backgroundColor: '#fff',
        flexDirection: 'row',
    },
    channelInfo: {
        flex: 1,
        marginLeft: 10,
        marginRight: 5,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    channelNameContainer: {
        gap: 7,
        flex: 1,
        marginRight: 10,
    },
    channelImage: {
        width: 56,
        height: 56,
        borderRadius: 50,
    },
    profileContainer: {
        position: 'relative',
    },
    onlineIndicator: {
        width: 18,
        height: 18,
        borderRadius: 50,
        position: 'absolute',
        bottom: 2,
        right: 2,
        borderWidth: 2.5,
        borderColor: '#fff',
    },
    channelName: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#000',
    },
    lastMessage: {
        fontSize: 14,
        color: 'gray',
    },
    lastMessageTime: {
        fontSize: 14,
        color: 'gray',
    },
    lastMessageContainer: {
        alignItems: 'flex-end',
        gap: 7,
    },
    unreadMessage: {
        width: 26,
        height: 26,
        padding: 3,
        fontSize: 16,
        fontWeight: 'bold',
        color: '#fff',
        backgroundColor: '#f86a53',
        borderRadius: 50,
        textAlign: 'center',
    },
});
