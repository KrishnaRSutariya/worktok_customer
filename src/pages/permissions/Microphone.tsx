import { Dimensions, Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import React, { useRef } from 'react';
import { Button } from 'react-native-paper';
import RBSheet from 'react-native-raw-bottom-sheet';
import { useAsyncStorage } from '../../hooks/useAsyncStorage';
import { getMicrophonePermission } from '../../components/common';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../Layout';

const { height } = Dimensions.get('window');

type MicrophoneProps = NativeStackNavigationProp<RootStackParamList, 'MicrophonePermission'>

const Microphone = ({ route: { params: { route } }, navigation }: { route: { params: { route: 'Login' | 'Registration' } }, navigation: MicrophoneProps }) => {
    const { saveValue } = useAsyncStorage('microphone');
    const refRBSheet: any = useRef(null);

    const getNextPage = async () => {
        saveValue(await getMicrophonePermission());
        refRBSheet.current.close();

        await getSkipPage();
    };

    const getSkipPage = async () => {
        navigation.navigate(route);
    };

    return (
        <View style={styles.container}>
            <View style={styles.imageContainer}>
                <Image source={require('../../assets/Microphone.png')} style={styles.image} />
            </View>
            <View style={styles.buttonContainer}>
                <Button mode="contained" style={[styles.button, styles.buttonLeft]} onPress={getSkipPage}>
                    <Text style={[styles.buttonText, styles.buttonOutlineText]}>Skip</Text>
                </Button>
                <Button mode="contained" style={[styles.button, styles.buttonRight]} onPress={() => refRBSheet.current.open()}>
                    <Text style={[styles.buttonText]}>Yes, enable it now</Text>
                </Button>
            </View>
            <RBSheet
                ref={refRBSheet}
                height={height / 1.5}
                useNativeDriver={false}
                draggable
                customStyles={{ wrapper: { backgroundColor: 'rgba(0,0,0,0.5)' }, container: { borderTopLeftRadius: 25, borderTopRightRadius: 25 } }}
                customModalProps={{
                    animationType: 'fade',
                    statusBarTranslucent: true,
                }}
                customAvoidingViewProps={{ enabled: false }}
            >
                <ScrollView style={styles.innerContainer}>
                    <View style={styles.innerImageContainer}>
                        <Image source={require('../../assets/MicrophoneBottom.png')} style={[styles.image, styles.innerImage]} />
                    </View>
                    <View style={styles.innerButtonContainer}>
                        <Button mode="contained" style={[styles.button, styles.innerButton, styles.innerButtonRight]} onPress={async () => await getNextPage()}>
                            <Text style={[styles.buttonText]}>Enable</Text>
                        </Button>
                        <Button mode="contained" style={[styles.button, styles.innerButton, styles.innerButtonLeft]} onPress={() => refRBSheet.current.close()}>
                            <Text style={[styles.buttonText, styles.buttonOutlineText]}>Skip for now</Text>
                        </Button>
                    </View>
                </ScrollView>
            </RBSheet>
        </View>
    );
};

export default Microphone;

const styles = StyleSheet.create({
    container: {
        height: height,
        backgroundColor: '#fff',
        justifyContent: 'space-between',
    },
    innerContainer: {
        padding: 15,
    },
    imageContainer: {
        width: '100%',
        height: '80%',
        borderRadius: 25,
        overflow: 'hidden',
    },
    innerImageContainer: {
        width: '100%',
        height: height / 2.5,
        overflow: 'hidden',
    },
    image: {
        width: '100%',
        height: '100%',
        objectFit: 'cover',
    },
    innerImage: {
        objectFit: 'contain',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 15,
        marginVertical: 30,
    },
    innerButtonContainer: {
        marginHorizontal: 15,
        marginVertical: 30,
    },
    button: {
        padding: 10,
        borderRadius: 10,
        backgroundColor: '#4CAF50',
    },
    innerButton: {
        padding: 5,
    },
    buttonLeft: {
        width: '30%',
        backgroundColor: '#fff',
    },
    innerButtonLeft: {
        width: '100%',
        backgroundColor: '#fff',
        marginVertical: 5,
    },
    buttonRight: {
        width: '60%',
    },
    innerButtonRight: {
        width: '100%',
        marginVertical: 5,
    },
    buttonText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff',
    },
    buttonOutlineText: {
        color: '#4CAF50',
    },
});
