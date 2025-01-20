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

export type RootStackParamList = {
    Home: undefined;
    Message: undefined;
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
                    name="HomeScreen"
                    component={BottomNavigator}
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
