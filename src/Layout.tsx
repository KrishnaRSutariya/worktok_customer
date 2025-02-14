import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home from './pages/Home';
import Message from './pages/Message';
import Jobs from './pages/Jobs';
import More from './pages/More';
import AllServices from './pages/AllServices';

import FontAwesome from 'react-native-vector-icons/FontAwesome6';
import HomeHeader from './components/home/HomeHeader';
import PageHeader from './components/home/PageHeader';
import Login from './pages/Login';
import Registration from './pages/Registration';
import Landing from './components/landing/Landing';
import Notification from './pages/permissions/Notification';
import Location from './pages/permissions/Location';
import Microphone from './pages/permissions/Microphone';
import AccountCreation from './pages/AccountCreation';
import ForgotPassword from './pages/ForgotPassword';
import CreateNewPassword from './pages/CreateNewPassword';
import ChannelMessage from './pages/ChannelMessage';

export type RootStackParamList = {
    Landing: undefined;
    Login: undefined;
    Registration: undefined;
    AccountCreation: undefined;
    ForgotPassword: undefined;
    CreateNewPassword: { user_id: string, reset_token: string };
    Home: undefined;
    NotificationPermission: { route: 'Login' | 'Registration' };
    LocationPermission: { route: 'Login' | 'Registration' };
    MicrophonePermission: { route: 'Login' | 'Registration' };
    Message: undefined;
    ChannelMessage: { channelId: string, channelType: string };
    MyJobs: undefined;
    More: undefined;
    HomeScreen: undefined;
    AllServices: undefined;
};

const Tab = createBottomTabNavigator<RootStackParamList>();
const Stack = createNativeStackNavigator<RootStackParamList>();

const getIcons = (iconName: string, focused: boolean) => {
    return <FontAwesome name={iconName} size={25} solid color={focused ? '#f86a53' : '#98a2b3'} />;
};

const BottomNavigator = () => {
    return (
        <Tab.Navigator
            screenOptions={{
                header: HomeHeader,
                tabBarInactiveTintColor: '#98a2b3',
                tabBarActiveTintColor: '#f86a53',
                tabBarStyle: {
                    height: 'auto',
                    borderTopLeftRadius: 40,
                    borderTopRightRadius: 40,
                    paddingTop: 10,
                    paddingBottom: 20,
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                },
                tabBarLabelStyle: {
                    fontFamily: 'Roboto_400Regular',
                    fontSize: 12,
                    paddingVertical: 5,
                },
            }}
        >
            <Tab.Screen name="Home"
                options={{
                    tabBarIcon: ({ focused }) => getIcons('house', focused),
                }}
                component={Home}
            />
            <Tab.Screen name="Message"
                options={{
                    header: PageHeader,
                    tabBarIcon: ({ focused }) => getIcons('message', focused),
                    tabBarBadge: 3,
                }}
                component={Message}
            />
            <Tab.Screen name="MyJobs"
                options={{
                    title: 'My Jobs',
                    tabBarIcon: ({ focused }) => getIcons('briefcase', focused),
                }}
                component={Jobs}
            />
            <Tab.Screen name="More"
                options={{
                    tabBarIcon: ({ focused }) => getIcons('table-cells-large', focused),
                    headerShown: false,
                }}
                component={More}
            />
        </Tab.Navigator>
    );
};

export const Layout = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ header: PageHeader }}>
                <Stack.Screen
                    name="Landing"
                    component={Landing}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="Login"
                    component={Login}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="Registration"
                    component={Registration}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="AccountCreation"
                    component={AccountCreation}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="NotificationPermission"
                    component={Notification}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="LocationPermission"
                    component={Location}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="MicrophonePermission"
                    component={Microphone}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="ForgotPassword"
                    component={ForgotPassword}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="CreateNewPassword"
                    component={CreateNewPassword}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="HomeScreen"
                    component={BottomNavigator}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="ChannelMessage"
                    component={ChannelMessage}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="AllServices"
                    component={AllServices}
                    options={{
                        headerTitle: 'All services',
                    }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
};
