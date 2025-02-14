import React, { createContext, useContext, useEffect, useState } from 'react';
import { StreamChat } from 'stream-chat';
import { Environments } from '../../constants/Environments';
import { useAsyncStorage } from '../../hooks/useAsyncStorage';

const ChatContext = createContext<any>(null);

export const ChatProvider = ({ children }: { children: React.ReactNode }) => {
    const [client] = useState(() => StreamChat.getInstance(Environments.GET_STREAM_CHAT_API_KEY));
    const [isConnected, setIsConnected] = useState(false);

    const { getStoredValue: getUserToken } = useAsyncStorage('userToken');
    const { getStoredValue: getUserDetails } = useAsyncStorage('userDetails');

    useEffect(() => {
        const connectUser = async () => {
            const token = await getUserToken();
            const user = await getUserDetails();

            if (!token?.streamToken || !user) {
                return;
            }

            try {
                await client.connectUser(
                    {
                        id: `${user.id}`,
                        name: user.full_name,
                        image: user.profile_picture,
                    },
                    token.streamToken
                );
                setIsConnected(true);
            } catch (error) {
                console.error('Error connecting user:', error);
            }
        };

        connectUser();

        return () => {
            client.disconnectUser();
        };
    }, [client, getUserDetails, getUserToken]);

    return (
        <ChatContext.Provider value={{ client, isConnected }}>
            {children}
        </ChatContext.Provider>
    );
};

export const useChat = () => useContext(ChatContext);
