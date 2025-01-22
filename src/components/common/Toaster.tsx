import React, { createContext, useContext, useState, useEffect } from 'react';
import { Animated, View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { Snackbar } from 'react-native-paper';
import FontAwesome6Icon from 'react-native-vector-icons/FontAwesome6';

const { height } = Dimensions.get('window');

type ToastContextType = {
    showToast: (toastOptions: ToastOptions) => void;
    hideToast: () => void;
};

type IconsTypes = 'success' | 'error' | 'warning';
type IconsProps = {
    name: IconsTypes;
    icon: string;
    color: string;
    bgColor: string;
};

type ToastOptions = {
    title?: string;
    subTitle?: string;
    icon?: IconsTypes;
};

const initialState: ToastContextType = {
    showToast: () => { },
    hideToast: () => { },
};

const ErrorType: IconsProps[] = [
    { name: 'success', icon: 'circle-check', color: '#2dd87d', bgColor: '#2f5154' },
    { name: 'error', icon: 'circle-xmark', color: '#f0443a', bgColor: '#4a4053' },
    { name: 'warning', icon: 'circle-exclamation', color: '#ffc136', bgColor: '#484e50' },
];

const initialAnimation = {
    width: 110,
    duration: 2000,
};

const getIcons = (iconName: IconsTypes, key: keyof IconsProps) => {
    return ErrorType.find((item) => item.name === iconName)?.[key];
};

const Toast = createContext<ToastContextType>(initialState);

export const ToastContainer = ({ children }: { children: React.ReactNode }) => {
    const [animation, setAnimation] = useState(initialAnimation);
    const [toastDetails, setToastDetails] = useState<ToastOptions | null>(null);
    const [toastHeight, setToastHeight] = useState(0);
    const [widthAnim, setWidthAnim] = useState(new Animated.Value(animation.width));

    const showToast = (toastOptions: ToastOptions) => setToastDetails(toastOptions);
    const hideToast = () => setToastDetails(null);

    useEffect(() => {
        if (toastDetails) {
            Animated.timing(widthAnim, {
                toValue: 0,
                duration: (animation.duration * 2),
                useNativeDriver: false,
            }).start();
        }
    }, [toastDetails, widthAnim, animation]);

    useEffect(() => {
        const timer = setTimeout(() => hideToast(), animation.duration);
        return () => clearTimeout(timer);
    }, [animation]);

    useEffect(() => {
        setAnimation(initialAnimation);
        setWidthAnim(new Animated.Value(initialAnimation.width));
    }, [toastDetails]);

    return (
        <Toast.Provider value={{ showToast, hideToast }}>
            {children}
            <Snackbar
                visible={!!toastDetails}
                onDismiss={hideToast}
                duration={Snackbar.DURATION_SHORT}
                style={[styles.snackbar, { top: height - height - height + 75 + toastHeight }]}
            >
                <TouchableOpacity
                    style={styles.toastContent}
                    onLayout={(e) => setToastHeight(e.nativeEvent.layout.height)}
                    // onPress={hideToast}
                >
                    <Animated.View
                        style={[
                            styles.bottomBorder,
                            {
                                backgroundColor: getIcons(toastDetails?.icon ?? 'success', 'color'),
                                width: widthAnim.interpolate({
                                    inputRange: [0, animation.width],
                                    outputRange: ['0%', '110%'],
                                }),
                            },
                        ]}
                    />

                    {toastDetails?.icon && (
                        <FontAwesome6Icon
                            name={getIcons(toastDetails.icon, 'icon') as string}
                            size={24}
                            solid
                            color={getIcons(toastDetails.icon, 'color')}
                            style={[styles.icon, { backgroundColor: getIcons(toastDetails.icon, 'bgColor') }]}
                        />
                    )}
                    <View style={styles.textContent}>
                        {toastDetails?.title && (
                            <Text style={styles.title}>{toastDetails.title}</Text>
                        )}
                        {toastDetails?.subTitle && (
                            <Text style={styles.subTitle}>{toastDetails.subTitle}</Text>
                        )}
                    </View>
                </TouchableOpacity>
            </Snackbar>
        </Toast.Provider>
    );
};

export const useToast = () => useContext(Toast);

const styles = StyleSheet.create({
    bottomBorder: {
        position: 'absolute',
        bottom: -24,
        left: -18,
        height: 10,
    },
    snackbar: {
        borderRadius: 10,
        backgroundColor: '#1d2939',
        borderBottomColor: 'transparent',
        borderBottomWidth: 10,
        overflow: 'hidden',
    },
    toastContent: {
        position: 'relative',
        flexDirection: 'row',
        alignItems: 'center',
    },
    icon: {
        marginRight: 10,
        padding: 5,
        borderRadius: 50,
    },
    textContent: {
        flex: 1,
        marginHorizontal: 5,
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'white',
        marginVertical: 5,
    },
    subTitle: {
        color: '#888c93',
        fontSize: 14,
    },
});
