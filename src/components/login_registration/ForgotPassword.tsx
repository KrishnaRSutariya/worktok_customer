import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions } from 'react-native';
import { TextInput } from 'react-native-paper';
import { useForm, Controller } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import CountryPicker, { CountryCode } from 'react-native-country-picker-modal';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../Layout';

const { height } = Dimensions.get('window');

interface FormValues {
  phone: string;
}

const schema = yup.object().shape({
  phone: yup
    .string()
    .matches(/^\d+$/, 'Phone number must contain only digits')
    .required('Phone number is required'),
});

type ForgotPasswordProps = NativeStackNavigationProp<RootStackParamList, 'ForgotPassword'>;

const ForgotPasswordMain = ({ navigation, setFormData }: { navigation: ForgotPasswordProps, setFormData: any }) => {
  const [countryCode, setCountryCode] = React.useState<CountryCode>('IN');
  const [callingCode, setCallingCode] = React.useState<string>('91');
  const [countryPickerVisible, setCountryPickerVisible] = React.useState<boolean>(false);

  const { control, handleSubmit, formState: { errors } } = useForm<FormValues>({
    resolver: yupResolver(schema),
    defaultValues: {
      phone: '',
    },
  });

  const onSubmit = (data: FormValues) => {
    setFormData({ ...data, countryCode: `+${callingCode}` });
  };

  return (
    <View style={styles.container}>
      {
        countryPickerVisible && (
          <View style={styles.countryPicker}>
            <CountryPicker
              visible={countryPickerVisible}
              onClose={() => setCountryPickerVisible(false)}
              withCallingCode
              withFilter
              withFlag
              countryCode={countryCode}
              onSelect={(country: any) => {
                setCountryCode(country.cca2 as any);
                setCallingCode(country.callingCode[0]);
              }}
              countryCodes={['US', 'IN', 'PK', 'IQ']}
            />
          </View>
        )
      }
      <View style={styles.subContainer}>
        <Text style={styles.text}>
          Phone Number <Text style={styles.required}>*</Text>
        </Text>
        <View style={styles.phoneContainer}>
          <Controller
            control={control}
            name="phone"
            render={({ field: { onChange, value } }: any) => (
              <TextInput
                placeholder="Enter your phone"
                value={value}
                onChangeText={onChange}
                style={[styles.textInput, errors.phone && styles.errorBorder]}
                keyboardType="phone-pad"
                selectionColor={'#000'}
                textColor={'#000'}
                activeUnderlineColor={'transparent'}
                left={
                  value && <TextInput.Affix text={`+${callingCode} ↓`} textStyle={styles.countryCode} onPress={() => setCountryPickerVisible(true)} />
                }
              />
            )}
          />
        </View>
        {errors.phone && <Text style={styles.errorText}>{errors.phone.message}</Text>}
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={handleSubmit(onSubmit)} style={styles.submitButton}>
          <Text style={styles.submitText}>Send code</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => { navigation.goBack(); }} style={styles.cancelButton}>
          <Text style={styles.cancelText}>Cancel</Text>
        </TouchableOpacity>
      </View>

    </View>
  );
};

export default ForgotPasswordMain;

const styles = StyleSheet.create({
  container: {
    height: height / 2,
    padding: 20,
    flex: 1,
    justifyContent: 'space-between',
  },
  subContainer: {
    marginBottom: 15,
  },
  text: {
    marginBottom: 5,
    fontWeight: 'bold',
  },
  required: {
    color: 'red',
  },
  textInput: {
    backgroundColor: 'white',
    borderRadius: 5,
    borderColor: 'rgba(0, 0, 0, 0.1)',
    borderWidth: 1.5,
    flex: 1,
  },
  phoneContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  countryPicker: {
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#eee',
    borderRadius: 5,
  },
  countryCode: {
    fontSize: 16,
    color: '#000',
    paddingRight: 15,
    borderRightColor: 'rgba(0, 0, 0, 0.3)',
    borderRightWidth: 1,
    marginRight: 15,
  },
  buttonContainer: {
    gap: 10,
  },
  submitButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#f2f4f7',
    paddingVertical: 15,
    borderRadius: 5,
    alignItems: 'center',
    borderColor: '#f0f2f5',
    borderWidth: 2,
  },
  submitText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  cancelText: {
    color: '#1d2939',
    fontWeight: 'bold',
    fontSize: 16,
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: 5,
  },
  errorBorder: {
    borderColor: 'red',
  },
});
