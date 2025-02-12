import { Dimensions, Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import React, { useRef } from 'react';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../Layout';
import RBSheet from 'react-native-raw-bottom-sheet';
import { Button } from 'react-native-paper';
import ForgotPasswordHeader from '../components/home/ForgotPasswordHeader';
import CreateNewPasswordMain from '../components/login_registration/CreateNewPassword';

const { height } = Dimensions.get('window');

type ForgotPasswordProps = NativeStackNavigationProp<RootStackParamList, 'ForgotPassword'>;

export type RegistrationFormProps = {
    password: string;
    confirm_password: string;
}

const CreateNewPassword = ({ navigation }: { navigation: ForgotPasswordProps }) => {
    const refRBSheet: any = useRef(null);
    const [formData, setFormData] = React.useState<RegistrationFormProps | null>(null);

    React.useEffect(() => {
        if (formData?.password && formData?.confirm_password) {
            refRBSheet.current.open();
        }
    }, [formData]);

    const handleLogin = () => {
        refRBSheet.current.close();
        navigation.navigate('Login');
    };

    return (
        <View>
            <ForgotPasswordHeader image={require('../assets/CreateNewPassword.png')} />
            <ScrollView style={styles.container}>
                <CreateNewPasswordMain setFormData={setFormData} />
            </ScrollView>

            <RBSheet
                ref={refRBSheet}
                height={height / 2}
                useNativeDriver={false}
                draggable
                customStyles={{ wrapper: { backgroundColor: 'rgba(0,0,0,0.5)' }, container: { borderTopLeftRadius: 25, borderTopRightRadius: 25 } }}
                customModalProps={{
                    animationType: 'fade',
                    statusBarTranslucent: true,
                }}
                customAvoidingViewProps={{ enabled: false }}
            >
                <View style={styles.innerContainer}>
                    <Image source={require('../assets/PasswordRestSuccessfully.png')} style={styles.imageContainer} />
                    <View style={styles.innerButtonContainer}>
                        <Button mode="contained" style={[styles.button]} onPress={handleLogin}>
                            <Text style={[styles.buttonText]}>Login to my account</Text>
                        </Button>
                    </View>
                </View>
            </RBSheet>

        </View>
    );
};

export default CreateNewPassword;

const styles = StyleSheet.create({
    container: {
        height: height - 220,
        backgroundColor: '#fff',
    },
    innerContainer: {
        padding: 20,
        justifyContent: 'space-between',
    },
    imageContainer: {
        width: '100%',
        height: '70%',
        objectFit: 'contain',
    },
    innerButtonContainer: {
        marginVertical: 10,
    },
    button: {
        width: '100%',
        marginVertical: 5,
        padding: 10,
        borderRadius: 7,
        backgroundColor: '#4CAF50',
    },
    buttonText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff',
    },
});
