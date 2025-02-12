import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions } from 'react-native';
import { TextInput } from 'react-native-paper';
import { useForm, Controller } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

const { height } = Dimensions.get('window');

interface FormValues {
  password: string;
  confirm_password: string;
}

const schema = yup.object().shape({
  password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
  confirm_password: yup
    .string()
    .oneOf([yup.ref('password')], 'Passwords must match')
    .required('Confirm password is required'),
});

const CreateNewPasswordMain = ({ setFormData }: { setFormData: any }) => {
  const [viewPassword, setViewPassword] = React.useState<boolean>(false);

  const { control, handleSubmit, formState: { errors } } = useForm<FormValues>({
    resolver: yupResolver(schema),
    defaultValues: {
      password: 'Test@123',
      confirm_password: 'Test@123',
    },
  });

  const onSubmit = (data: FormValues) => {
    const passwordUpdated = true;

    if (passwordUpdated) {
      setFormData({ ...data });
    }
  };

  return (
    <View style={styles.container}>
      <View>
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
      </View>

      <TouchableOpacity onPress={handleSubmit(onSubmit)} style={styles.submitButton}>
        <Text style={styles.submitText}>Confirm new password</Text>
      </TouchableOpacity>

    </View>
  );
};

export default CreateNewPasswordMain;

const styles = StyleSheet.create({
  container: {
    minHeight: height / 2,
    padding: 20,
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
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: 5,
  },
  errorBorder: {
    borderColor: 'red',
  },
});
