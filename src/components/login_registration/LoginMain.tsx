import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { TextInput, Checkbox } from 'react-native-paper';
import { useForm, Controller } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import CountryPicker, { CountryCode } from 'react-native-country-picker-modal';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../Layout';

interface FormValues {
  phone: string;
  password: string;
}

const schema = yup.object().shape({
  phone: yup
    .string()
    .matches(/^\d+$/, 'Phone number must contain only digits')
    .required('Phone number is required'),
  password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
});

type LoginProps = NativeStackNavigationProp<RootStackParamList, 'Login'>;

const LoginMain = ({ navigation }: { navigation: LoginProps }) => {
  const [countryCode, setCountryCode] = React.useState<CountryCode>('IN');
  const [callingCode, setCallingCode] = React.useState<string>('91');
  const [countryPickerVisible, setCountryPickerVisible] = React.useState<boolean>(false);
  const [viewPassword, setViewPassword] = React.useState<boolean>(false);
  const [rememberMe, setRememberMe] = React.useState<boolean>(false);

  const { control, handleSubmit, formState: { errors } } = useForm<FormValues>({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: FormValues) => {
    const fullPhoneNumber = `+${callingCode}${data.phone}`;
    console.log('Form Submitted', { ...data, fullPhoneNumber });
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

      <View style={styles.subContainer}>
        <Text style={styles.text}>
          Password <Text style={styles.required}>*</Text>
        </Text>
        <Controller
          control={control}
          name="password"
          render={({ field: { onChange, value } }: any) => (
            <TextInput
              placeholder="Type your password"
              value={value}
              onChangeText={onChange}
              style={[styles.textInput, errors.password && styles.errorBorder]}
              secureTextEntry={!viewPassword}
              selectionColor={'#000'}
              textColor={'#000'}
              activeUnderlineColor={'transparent'}
              right={
                value && <TextInput.Icon icon={viewPassword ? 'eye-off' : 'eye'} color={'#8b92a2'} onPress={() => setViewPassword(!viewPassword)} />
              }
            />
          )}
        />
        {errors.password && <Text style={styles.errorText}>{errors.password.message}</Text>}
      </View>

      <View style={styles.optionsContainer}>
        <TouchableOpacity>
          <Text style={styles.forgotPassword}>Forgot password?</Text>
        </TouchableOpacity>
        <View style={styles.rememberMe}>
          <Checkbox
            status={rememberMe ? 'checked' : 'unchecked'}
            color={'#4caf50'}
            onPress={() => setRememberMe(!rememberMe)}
          />
          <Text onPress={() => setRememberMe(!rememberMe)}>Remember me</Text>
        </View>
      </View>

      <TouchableOpacity onPress={handleSubmit(onSubmit)} style={styles.submitButton}>
        <Text style={styles.submitText}>Login</Text>
      </TouchableOpacity>

      <View style={styles.registerContainer}>
        <Text style={styles.registerText}>
          Not registered yet? <Text style={styles.registerLink} onPress={() => navigation.navigate('Registration')}>Register now</Text>
        </Text>
      </View>
    </View>
  );
};

export default LoginMain;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
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
  submitButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  submitText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  registerContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  registerText: {
    color: '#555',
  },
  registerLink: {
    color: '#4CAF50',
    fontWeight: 'bold',
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: 5,
  },
  errorBorder: {
    borderColor: 'red',
  },
  optionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  forgotPassword: {
    color: '#28a745',
    fontWeight: 'bold',
  },
  rememberMe: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
