import { Dimensions, ScrollView, StyleSheet, Text, View } from 'react-native';
import React, { useRef } from 'react';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../Layout';
import RBSheet from 'react-native-raw-bottom-sheet';
import { Button } from 'react-native-paper';
import { OtpInput } from 'react-native-otp-entry';
import ForgotPasswordMain from '../components/login_registration/ForgotPassword';
import ForgotPasswordHeader from '../components/home/ForgotPasswordHeader';
import ApiService from '../apis/ApiService';
import { ApiList } from '../apis/ApiList';
import { Constants } from '../constants/Constants';
import { useToast } from '../components/common/Toaster';

const { height } = Dimensions.get('window');

type ForgotPasswordProps = NativeStackNavigationProp<RootStackParamList, 'ForgotPassword'>;

export type RegistrationFormProps = {
    phone: string;
    countryCode: string;
}

const ForgotPassword = ({ navigation }: { navigation: ForgotPasswordProps }) => {
    const refRBSheet: any = useRef(null);
    const [formData, setFormData] = React.useState<RegistrationFormProps | null>(null);
    const [otp, setOtp] = React.useState<string | null>(null);
    const [errorMessage, setErrorMessage] = React.useState<string | null>(null);
    const [resendTime, setResendTime] = React.useState(180);
    const [isResendDisabled, setIsResendDisabled] = React.useState(false);

    const { showToast } = useToast();

    React.useEffect(() => {
        const sendOtp = async () => {
            const res = await ApiService(
                ApiList.FORGET_PASSWORD_OTP,
                Constants.POST,
                {
                    mobile: formData?.phone,
                    country_code: formData?.countryCode,
                    role: Constants.ROLE.CUSTOMER,
                },
            );

            if (!res?.ack) {
                showToast({ title: res?.msg || res?.message, icon: 'error' });
            }
            if (res?.ack) {
                setIsResendDisabled(true);
                refRBSheet.current.open();
            }
        };
        if (formData?.countryCode && formData?.phone) {
            sendOtp();
        }
    }, [formData, showToast]);

    React.useEffect(() => {
        if (otp?.length && otp?.length !== 6 && errorMessage) {
            setErrorMessage(null);
        }
    }, [otp, errorMessage]);

    const handleOTPSubmit = async () => {
        const res = await ApiService(
            ApiList.FORGET_PASSWORD_VERIFY,
            Constants.POST,
            {
                mobile: formData?.phone,
                country_code: formData?.countryCode,
                role: Constants.ROLE.CUSTOMER,
                otp,
            },
        );

        if (!res?.ack) {
            showToast({ title: res?.msg || res?.message, icon: 'error' });
            setErrorMessage('Please ensure you entered the correct OTP code.');
        }
        if (res?.ack) {
            refRBSheet.current.close();
            navigation.navigate('CreateNewPassword', { user_id: res?.user_id, reset_token: res?.reset_token?.accessToken });
        }
    };

    React.useEffect(() => {
        let timer: any;
        if (isResendDisabled) {
            timer = setInterval(() => {
                setResendTime((prevTime) => {
                    if (prevTime <= 1) {
                        clearInterval(timer);
                        setIsResendDisabled(false);
                        return 0;
                    }
                    return prevTime - 1;
                });
            }, 1000);
        }

        return () => clearInterval(timer);
    }, [isResendDisabled]);

    const handleResendCode = async () => {
        if (!isResendDisabled) {
            setIsResendDisabled(true);
            setResendTime(180);
            const res = await ApiService(
                ApiList.FORGET_PASSWORD_OTP,
                Constants.POST,
                {
                    mobile: formData?.phone,
                    country_code: formData?.countryCode,
                    role: Constants.ROLE.CUSTOMER,
                },
            );
            showToast({ title: res?.msg || res?.message, icon: !res?.ack ? 'error' : 'success' });
        }
    };

    return (
        <View>
            <ForgotPasswordHeader image={require('../assets/ForgotPassword.png')} />
            <ScrollView style={styles.container}>
                <ForgotPasswordMain navigation={navigation} setFormData={setFormData} />
            </ScrollView>

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
                    <View>
                        <Text style={styles.headingText}>
                            Verify phone number!
                        </Text>
                        <View style={styles.otpMainContainer}>
                            <Text style={styles.subHeadingText}>
                                We have sent you a one time password to your phone number <Text style={styles.mainText}>{formData?.countryCode} {formData?.phone}</Text>.
                            </Text>
                            <View>
                                <Text style={styles.subHeadingText}>
                                    <Text style={styles.mainText}>OTP Number</Text>
                                </Text>
                                <OtpInput
                                    numberOfDigits={6}
                                    autoFocus={false}
                                    disabled={false}
                                    type="numeric"
                                    secureTextEntry={false}
                                    focusStickBlinkingDuration={500}
                                    onTextChange={(text) => setOtp(text)}
                                    // onFilled={handleOTPSubmit}
                                    theme={{
                                        containerStyle: styles.otpContainer,
                                        pinCodeContainerStyle: styles.pinCodeContainer,
                                        focusedPinCodeContainerStyle: styles.activePinCodeContainer,
                                        placeholderTextStyle: styles.placeholderText,
                                        filledPinCodeContainerStyle: !errorMessage ? styles.filledPinCodeContainer : styles.filledPinCodeErrorContainer,
                                    }}
                                />
                                {
                                    errorMessage && (
                                        <Text style={styles.subHeadingText}>
                                            <Text style={[styles.mainText, styles.wrongOtp]}>{errorMessage}</Text>
                                        </Text>
                                    )
                                }
                            </View>
                            <View style={styles.innerButtonContainer}>
                                <Button mode="contained" style={[styles.button, styles.innerButton, styles.innerButtonRight]} onPress={otp?.length === 6 ? handleOTPSubmit : () => setErrorMessage('Please enter a valid OTP code.')}>
                                    <Text style={[styles.buttonText]}>Continue</Text>
                                </Button>
                                <Button mode="contained" style={[styles.button, styles.innerButton, styles.innerButtonLeft, isResendDisabled && styles.isResendDisabled]} onPress={handleResendCode}>
                                    <Text style={[styles.buttonText, styles.buttonOutlineText]}>{isResendDisabled ? `Resend again in (${resendTime} sec)` : 'Resend Code'}</Text>
                                </Button>
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </RBSheet>

        </View>
    );
};

export default ForgotPassword;

const styles = StyleSheet.create({
    container: {
        height: height - 220,
        backgroundColor: '#fff',
    },
    innerContainer: {
        paddingVertical: 15,
        paddingHorizontal: 20,
    },
    otpMainContainer: {
        minHeight: '95%',
        justifyContent: 'space-evenly',
    },
    headingText: {
        textAlign: 'center',
        fontSize: 20,
        fontWeight: 'bold',
        marginVertical: 10,
    },
    subHeadingText: {
        textAlign: 'center',
        fontSize: 16,
        marginVertical: 10,
        color: '#8b92a2',
    },
    mainText: {
        fontWeight: 'bold',
        color: '#000',
    },
    wrongOtp: {
        color: 'red',
    },
    otpContainer: {
        marginVertical: 5,
    },
    pinCodeContainer: {
        borderWidth: 2,
        borderColor: '#f0f2f5',
        borderRadius: 10,
        width: 55,
        height: 55,
        margin: 0,
        backgroundColor: '#f2f4f7',
    },
    placeholderText: {
        color: '#8b92a2',
    },
    activePinCodeContainer: {
        borderColor: '#4CAF50',
    },
    filledPinCodeContainer: {
        borderColor: '#4CAF50',
    },
    filledPinCodeErrorContainer: {
        borderColor: 'red',
    },
    innerButtonContainer: {
        marginVertical: 10,
    },
    button: {
        padding: 10,
        borderRadius: 7,
        backgroundColor: '#4CAF50',
    },
    innerButton: {
        padding: 5,
    },
    innerButtonLeft: {
        width: '100%',
        backgroundColor: '#f2f4f7',
        marginVertical: 5,
        borderColor: '#f0f2f5',
        borderWidth: 2,
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
        color: '#1d2939',
    },
    isResendDisabled: {
        opacity: 0.7,
    },
});
