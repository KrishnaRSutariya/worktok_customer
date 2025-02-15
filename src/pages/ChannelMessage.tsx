/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import React, { useRef } from 'react';
import { useEffect, useState } from 'react';
import { Dimensions, FlatList, Image, KeyboardAvoidingView, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import { useChat } from '../components/common/StreamChat';
import { Text } from 'react-native-paper';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../Layout';
import FontAwesome from 'react-native-vector-icons/FontAwesome6';
import moment from 'moment';

const { height } = Dimensions.get('window');

type CreateChannelMessageProps = NativeStackScreenProps<RootStackParamList, 'ChannelMessage'>;

const defaultImage = 'https://cdn1.iconfinder.com/data/icons/user-interface-263/24/Account-512.png';

const ChannelMessage: React.FC<CreateChannelMessageProps> = ({ route, navigation }) => {
    const { channelId, channelType } = route.params;

    const flatListRef = useRef<FlatList>(null);

    const { client, isConnected } = useChat();
    const [channel, setChannel] = useState<any>(null);
    const [messages, setMessages] = useState<any[]>([]);
    const [member, setMember] = useState<any>(null);
    const [lastSeen, setLastSeen] = useState<string>('');
    const [message, setMessage] = useState<string>('');

    const scrollToBottom = () => {
        if (flatListRef.current) {
            flatListRef.current.scrollToEnd({ animated: true });
        }
    };

    useEffect(() => {
        const fetchChannel = async () => {
            try {
                const userChannel = client.channel(channelType, channelId);

                if (userChannel) {
                    setChannel(userChannel);
                    setMessages(userChannel?.state?.messages || []);
                    const foundMember: any = Object.values(userChannel?.state?.members).find((m: any) => m.user?.id !== client.userID);
                    setMember(foundMember);

                    if (foundMember?.user?.last_active) {
                        setLastSeen(moment(foundMember.user.last_active).fromNow());
                    }

                }
            } catch (error) {
                console.error('Error fetching channel:', error);
            }
        };

        if (isConnected && client) {
            fetchChannel();
        }
        return () => {
            if (channel) {
                channel.off();
            }
        };
    }, []);

    useEffect(() => {
        if (!channel) {
            return;
        }

        const handleEvent = (event: any) => {
            if (event.type === 'message.new') {
                setMessages((prevMessages) => [...prevMessages, event.message]);
            }
            if (event.type === 'user.presence.changed' && member?.user?.id === event.user.id) {
                setMember((prevMember: any) => ({ ...prevMember, user: { ...prevMember.user, online: event.user.online } }));
                if (!event.user.online && event.user.last_active) {
                    setLastSeen(moment(event.user.last_active).fromNow());
                }
            }
        };

        channel.on(handleEvent);

        return () => {
            channel.off(handleEvent);
        };
    }, [channel, member]);

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    // Function to send a message
    const sendMessage = async () => {
        if (message.trim() === '' || !channel) {
            return;
        }

        try {
            await channel.sendMessage({ text: message });
            setMessage('');
        } catch (error) {
            console.error('Error sending message:', error);
        }
    };

    return (
        <KeyboardAvoidingView style={[styles.container]} behavior={'height'}>
            <View style={styles.topContainer}>
                <View style={styles.channelItem}>
                    <View style={styles.profileContainer}>
                        <Image source={{ uri: member?.user?.image || defaultImage }} style={styles.channelImage} />
                        <View style={[styles.onlineIndicator, { backgroundColor: member?.user?.online ? '#34c759' : '#aaa' }]} />
                    </View>
                    <View style={styles.channelInfo}>
                        <View style={styles.channelNameContainer}>
                            <Text style={styles.channelName} numberOfLines={1}>{channel?.data.name}</Text>
                            <Text style={styles.lastMessage} numberOfLines={1}>
                                {member?.user?.online ? 'Online' : `Last seen ${lastSeen}`}
                            </Text>
                        </View>
                    </View>
                </View>
                <TouchableOpacity style={styles.backButton} onPress={navigation.goBack}>
                    <FontAwesome name="arrow-right" size={25} solid color="white" />
                </TouchableOpacity>
            </View>

            <View style={styles.messagesContainer}>
                {messages.length === 0 ? (
                    <Text style={styles.noMessages}>No messages yet</Text>
                ) : (
                    <FlatList
                        ref={flatListRef}
                        data={messages}
                        keyExtractor={(item) => item.id}
                        showsVerticalScrollIndicator={false}
                        onContentSizeChange={scrollToBottom}
                        renderItem={({ item }) => (
                            <View style={[styles.messageRow, item.user.id === client.userID ? styles.myMessageRow : styles.otherMessageRow]}>
                                {item.user.id === client.userID && (
                                    <Text style={styles.timestamp}>{moment(item.created_at).format('h:mm A')}</Text>
                                )}
                                <View style={[styles.messageBubble, item.user.id === client.userID ? styles.myMessage : styles.otherMessage]}>
                                    <Text style={[styles.messageText, item.user.id === client.userID ? styles.myMessageText : styles.otherMessageText]}>
                                        {item.text}
                                    </Text>
                                </View>
                                {item.user.id !== client.userID && (
                                    <Text style={styles.timestamp}>{moment(item.created_at).format('h:mm A')}</Text>
                                )}
                            </View>
                        )}
                    />
                )}
            </View>

            {/* Chat Input Section */}
            <View style={styles.inputContainer}>
                <View style={styles.inputWrapper}>
                    <TextInput
                        style={styles.input}
                        placeholder="Type a message..."
                        value={message}
                        onChangeText={setMessage}
                        placeholderTextColor={'#aaa'}
                        cursorColor={'#34c759'}
                    />
                    <TouchableOpacity onPress={() => { }} style={styles.uploadButton}>
                        <FontAwesome name="paperclip" size={25} color="#a1aab9" style={styles.uploadDocs} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={sendMessage}>
                        <Image source={require('../assets/SendMessage.png')} style={styles.sendButton} />
                    </TouchableOpacity>
                </View>
            </View>
        </KeyboardAvoidingView>
    );
};

export default ChannelMessage;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    topContainer: {
        paddingTop: 30,
        paddingHorizontal: 15,
        paddingVertical: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        objectFit: 'contain',
        backgroundColor: '#4caf50',
    },
    backButton: {
        padding: 10,
    },
    channelItem: {
        flex: 1,
        padding: 5,
        flexDirection: 'row',
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
    channelImage: {
        width: 56,
        height: 56,
        borderRadius: 50,
        borderWidth: 2,
        borderColor: '#fff',
        backgroundColor: '#fff',
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
    channelName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff',
    },
    lastMessage: {
        fontSize: 14,
        color: '#fff',
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        position: 'absolute',
        bottom: 0,
        width: '100%',
        boxShadow: '0px -2px 4px rgba(0, 0, 0, 0.1)',
    },
    input: {
        flex: 1,
        paddingLeft: 55,
        paddingRight: 65,
        padding: 20,
        fontSize: 16,
        backgroundColor: '#fff',
        borderRadius: 50,
        borderWidth: 1,
        borderColor: '#ccc',
    },
    inputWrapper: {
        position: 'relative',
        flex: 1,
    },
    uploadButton: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    uploadDocs: {
        position: 'absolute',
        bottom: 5,
        left: 7,
        padding: 12,
        borderRadius: 50,
    },
    sendButton: {
        position: 'absolute',
        bottom: 5,
        right: 7,
        width: 50,
        height: 50,
        marginLeft: 10,
        borderRadius: 50,
    },
    messagesContainer: {
        height: height - 200,
        margin: 10,
        paddingHorizontal: 5,
    },
    messageRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 0.5,
    },
    myMessageRow: {
        justifyContent: 'flex-end',
    },
    otherMessageRow: {
        justifyContent: 'flex-start',
    },
    noMessages: {
        fontSize: 16,
        color: '#888',
    },
    messageBubble: {
        maxWidth: '80%',
        padding: 10,
        borderRadius: 15,
        marginBottom: 10,
    },
    myMessage: {
        backgroundColor: '#4caf50',
        alignSelf: 'flex-end',
        borderBottomRightRadius: 0,
    },
    otherMessage: {
        backgroundColor: '#f2f4f7',
        alignSelf: 'flex-start',
        borderBottomLeftRadius: 0,
    },
    messageText: {
        fontSize: 16,
        color: '#000',
    },
    myMessageText: {
        color: '#fff',
    },
    otherMessageText: {
    },
    timestamp: {
        fontSize: 12,
        color: '#888',
        marginHorizontal: 7,
    },
});
