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
  full_name: string;
  phone: string;
  password: string;
  confirm_password: string;
}

const schema = yup.object().shape({
  full_name: yup.string().required('Full name is required'),
  phone: yup
    .string()
    .matches(/^\d+$/, 'Phone number must contain only digits')
    .required('Phone number is required'),
  password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
  confirm_password: yup
    .string()
    .oneOf([yup.ref('password')], 'Passwords must match')
    .required('Confirm password is required'),
});

type RegistrationProps = NativeStackNavigationProp<RootStackParamList, 'Registration'>;

const RegistrationMain = ({ navigation, setFormData }: { navigation: RegistrationProps, setFormData: any }) => {
  const [countryCode, setCountryCode] = React.useState<CountryCode>('IN');
  const [callingCode, setCallingCode] = React.useState<string>('91');
  const [countryPickerVisible, setCountryPickerVisible] = React.useState<boolean>(false);
  const [viewPassword, setViewPassword] = React.useState<boolean>(false);
  const [rememberMe, setRememberMe] = React.useState<boolean>(false);

  const { control, handleSubmit, formState: { errors } } = useForm<FormValues>({
    resolver: yupResolver(schema),
    defaultValues: {
      full_name: '',
      phone: '',
      password: '',
      confirm_password: '',
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
          Full Name <Text style={styles.required}>*</Text>
        </Text>
        <Controller
          control={control}
          name="full_name"
          render={({ field: { onChange, value } }: any) => (
            <TextInput
              placeholder="Enter your full name"
              value={value}
              onChangeText={onChange}
              selectionColor={'#000'}
              textColor={'#000'}
              activeUnderlineColor={'transparent'}
              style={[styles.textInput, errors.full_name && styles.errorBorder]}
            />
          )}
        />
        {errors.full_name && <Text style={styles.errorText}>{errors.full_name.message}</Text>}
      </View>

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

      <View style={styles.subContainer}>
        <Text style={styles.text}>
          Confirm Password <Text style={styles.required}>*</Text>
        </Text>
        <Controller
          control={control}
          name="confirm_password"
          render={({ field: { onChange, value } }: any) => (
            <TextInput
              placeholder="Confirm your password"
              value={value}
              onChangeText={onChange}
              style={[styles.textInput, errors.confirm_password && styles.errorBorder]}
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
        {errors.confirm_password && <Text style={styles.errorText}>{errors.confirm_password.message}</Text>}
      </View>

      <View style={styles.optionsContainer}>
        <View style={styles.rememberMe}>
          <Checkbox
            status={rememberMe ? 'checked' : 'unchecked'}
            color={'#4caf50'}
            onPress={() => setRememberMe(!rememberMe)}
          />
          <Text onPress={() => setRememberMe(!rememberMe)} style={styles.rememberMeText}>By selecting “Create Account” you are confirming that you have read and agreed to WorkTok’s <Text style={styles.registerLink}>Terms of Use</Text> and <Text style={styles.registerLink}>Privacy Policy</Text>.</Text>
        </View>
      </View>

      <TouchableOpacity onPress={handleSubmit(onSubmit)} style={styles.submitButton}>
        <Text style={styles.submitText}>Create account</Text>
      </TouchableOpacity>

      <View style={styles.registerContainer}>
        <Text style={styles.registerText}>
          Already have an account? <Text style={styles.registerLink} onPress={() => navigation.navigate('Login')}>Log in</Text>
        </Text>
      </View>
    </View>
  );
};

export default RegistrationMain;

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
  rememberMeText: {
    color: '#555',
    width: '90%',
    textAlign: 'justify',
  },
});
