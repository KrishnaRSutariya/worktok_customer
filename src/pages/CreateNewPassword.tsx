import { Dimensions, Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import React, { useRef } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../Layout';
import RBSheet from 'react-native-raw-bottom-sheet';
import { Button } from 'react-native-paper';
import ForgotPasswordHeader from '../components/home/ForgotPasswordHeader';
import CreateNewPasswordMain from '../components/login_registration/CreateNewPassword';
import { useToast } from '../components/common/Toaster';
import ApiService from '../apis/ApiService';
import { ApiList } from '../apis/ApiList';
import { Constants } from '../constants/Constants';

const { height } = Dimensions.get('window');

export type RegistrationFormProps = {
    password: string;
    confirm_password: string;
}

type CreateNewPasswordProps = NativeStackScreenProps<RootStackParamList, 'CreateNewPassword'>;

const CreateNewPassword: React.FC<CreateNewPasswordProps> = ({ route: { params }, navigation }) => {
    const refRBSheet: any = useRef(null);
    const [formData, setFormData] = React.useState<RegistrationFormProps | null>(null);
    const { user_id, reset_token } = params;

    const { showToast } = useToast();

    React.useEffect(() => {
        const updatePassword = async () => {
            const res = await ApiService(
                ApiList.FORGET_PASSWORD_RESET,
                Constants.POST,
                {
                    user_id,
                    reset_token,
                    password: formData?.password,
                    role: Constants.ROLE.CUSTOMER,
                },
            );

            if (!res?.ack) {
                showToast({ title: res?.msg || res?.message, icon: 'error' });
            }
            if (res?.ack) {
                refRBSheet.current.open();
            }
        };

        if (formData?.password && formData?.confirm_password) {
            updatePassword();
        }
    }, [formData, user_id, reset_token, showToast]);

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
