import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { View, StyleSheet, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Input } from './ui/inputs';
import api from '@/modules/api';
import { useRouter } from 'expo-router';
import SecureStore from 'expo-secure-store';
import { useAuthStore } from '@/store/useAuthStore';

const yupSchema = yup.object({
  email: yup.string().email('Email inválido').required('Email é obrigatório.'),
  password: yup
    .string()
    .matches(/(?:[a-zA-Z].*){6,}/, 'Insira no mínimo 6 letras.')
    .matches(/.*[A-Z].*/, 'Insira no mínimo 1 letra maiúscula.')
    .matches(/.*[a-z].*/, 'Insira no mínimo 1 letra minúscula.')
    .matches(/.*[0-9].*/, 'Insira no mínimo 1 número.')
    .matches(
      /.*[!@#$%^&*()_+{}[\]/:;<>,.?~\\-].*/,
      'Insira pelo menos um dos seguintes símbolos: !@#$%^&*()_+{}[]/:;<>,.?~\\-',
    )
    .required('Senha é obrigatório.'),
});

type YupSchemaType = yup.InferType<typeof yupSchema>;

type LoginResponse = {
  id: string;
  username: string;
  email: string;
  role: string;
  accessToken: string;
}

function SignInForm() {
  const [error, setError] = useState('');
  const router = useRouter()
  
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<YupSchemaType>({
    resolver: yupResolver(yupSchema),
  });

  const { setToken } = useAuthStore()

  const onSubmit = async ({ email, password }: YupSchemaType) => {
    try {
      setError('');

      const response = await api.post<LoginResponse>('/auth/login', {
        email,
        password,
      });

      // await SecureStore.setItemAsync('@qfila/auth_token', response.data.accessToken)
      // await SecureStore.setItemAsync('@qfila/username', response.data.username)
      setToken(response.data.accessToken)
      router.replace('/')
    } catch (error) {
      console.error(error);
      setError('Erro inesperado na API')
    }
  };

  return (
    <View style={styles.container}>
      <Controller
        control={control}
        render={({ field: { onChange, ...restField } }) => (
          <Input
            onChangeText={onChange}
            {...restField}
            error={!!errors.email}
            helperText={errors.email?.message}
            placeholder="E-mail"
          />
        )}
        name="email"
      />

      <Controller
        control={control}
        render={({ field: { onChange, ...restField } }) => (
          <Input
            onChangeText={onChange}
            {...restField}
            error={!!errors.password}
            helperText={errors.password?.message}
            placeholder="Senha"
            secureTextEntry
          />
        )}
        name="password"
      />

      <TouchableOpacity style={styles.pressable} onPress={handleSubmit(onSubmit)}>
        <Text style={styles.pressableText}>
          {
            isSubmitting ? <ActivityIndicator size={24} color="#FFF" /> : 'Entrar'
          }
        </Text>
      </TouchableOpacity>
      {
        error ? (
          <Text style={styles.error}>
            {error}
          </Text>
        ) : null
      }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 32,
    gap: 16,
    width: '100%',
  },
  pressable: {
    borderRadius: 4,
    backgroundColor: '#044557',
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pressableText: {
    color: '#FAFAFA',
    fontFamily: 'Poppins-Light',
    fontSize: 14
  },
  error: {
    textAlign: 'center',
    color: 'red',
    fontSize: 16
  }
});

export default SignInForm;