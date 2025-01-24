import { Dimensions, ScrollView, StyleSheet, Text, View } from 'react-native';
import React, { useRef } from 'react';
import LoginHeader from '../components/home/LoginHeader';
import RegistrationMain from '../components/login_registration/RegistrationMain';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../Layout';
import RBSheet from 'react-native-raw-bottom-sheet';

const { height } = Dimensions.get('window');

type RegistrationProps = NativeStackNavigationProp<RootStackParamList, 'Registration'>;

export type RegistrationFormProps = {
    full_name: string;
    phone: string;
    password: string;
    confirm_password: string;
    countryCode: string;
}

const Registration = ({ navigation }: { navigation: RegistrationProps }) => {
    const refRBSheet: any = useRef(null);
    const [formData, setFormData] = React.useState<RegistrationFormProps | null>(null);

    React.useEffect(() => {
        if (formData?.countryCode && formData?.phone) {
            refRBSheet.current.open();
        }
    }, [formData]);

    return (
        <View>
            <LoginHeader title={'Create an account'} subTitle={'Create an account and start your amazing trip'} navigation={navigation} />
            <ScrollView style={styles.container}>
                <RegistrationMain navigation={navigation} setFormData={setFormData} />
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
                        <Text style={styles.subHeadingText}>
                            We have sent you a one time password to your phone number <Text style={styles.mainText}>{formData?.countryCode} {formData?.phone}</Text>.
                        </Text>
                    </View>
                </ScrollView>
            </RBSheet>

        </View>
    );
};

export default Registration;

const styles = StyleSheet.create({
    container: {
        height: height - 220,
        backgroundColor: '#fff',
    },
    innerContainer: {
        padding: 15,
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
});
