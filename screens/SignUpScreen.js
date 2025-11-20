// Imports do React
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Pressable,
  Alert,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';

// Importa o Axios e define a API
import axios from 'axios';
const api = axios.create({
  baseURL: 'https://690d50f0a6d92d83e851131f.mockapi.io',
});

// Paleta de cores
const COLORS = {
  primary: '#007AFF',
  success: '#34C759',
  background: '#F2F2F7',
  surface: '#FFFFFF',
  text: '#1C1C1E',
  textSecondary: '#6E6E73',
  error: '#FF3B30',
  errorBackground: '#FFD2D2',
  errorBorder: '#D8000C',
  errorTextContent: '#5F2120',
};

// Define o componente da tela de Cadastro
export default function SignUpScreen() {
  const navigation = useNavigation();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const clearErrors = () => {
    setErrors({});
    setApiError('');
  };

  // Função de validação do formulário
  const validate = () => {
    clearErrors();
    const newErrors = {};
    if (!name) newErrors.name = 'Nome é obrigatório';
    if (!email) newErrors.email = 'Email é obrigatório';
    if (!phone) {
      newErrors.phone = 'Telefone é obrigatório';
    } else if (phone.replace(/\D/g, '').length < 10) {
      newErrors.phone = 'Telefone inválido (mín. 10 dígitos)';
    }
    if (!password) newErrors.password = 'Senha é obrigatória';
    if (password.length < 6) newErrors.password = 'Senha deve ter no mínimo 6 caracteres';
    if (password !== confirmPassword) newErrors.confirmPassword = 'As senhas não conferem';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Função principal de cadastro
  const handleSignUp = async () => {
    if (!validate()) return;
    
    setIsLoading(true);
    setApiError('');

    try {
      const newUser = {
        name: name,
        email: email,
        phone: phone,
        password: password,
      };

      // Envia para a API - POST /contacts/user
      await api.post('/contacts/user', newUser);
      
      Alert.alert('Sucesso!', 'Usuário cadastrado. Faça o login para continuar.');
      navigation.goBack();

    } catch (error) {
      console.error('ERRO NO CADASTRO (POST):', error.message);
      setApiError('Erro de conexão. Tente novamente.');
      setIsLoading(false);
    }
  };

  // Renderização da tela
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Criar Nova Conta</Text>

        {apiError ? (
          <View style={styles.errorBox}>
            <MaterialIcons
              name="error-outline"
              size={20}
              color={COLORS.errorBorder}
            />
            <Text style={styles.errorBoxText}>{apiError}</Text>
          </View>
        ) : null}

        {/* Campos (sem mudanças) */}
        <TextInput
          style={[styles.input, errors.name && styles.inputError]}
          placeholder="Nome Completo"
          value={name}
          onChangeText={setName}
          editable={!isLoading}
        />
        {errors.name && <Text style={styles.errorText}>{errors.name}</Text>}

        <TextInput
          style={[styles.input, errors.email && styles.inputError]}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          editable={!isLoading}
        />
        {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}

        <TextInput
          style={[styles.input, errors.phone && styles.inputError]}
          placeholder="Telefone (DDD + Número)"
          value={phone}
          onChangeText={setPhone}
          keyboardType="phone-pad"
          editable={!isLoading}
        />
        {errors.phone && <Text style={styles.errorText}>{errors.phone}</Text>}

        <TextInput
          style={[styles.input, errors.password && styles.inputError]}
          placeholder="Senha (mín. 6 caracteres)"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          editable={!isLoading}
        />
        {errors.password && <Text style={styles.errorText}>{errors.password}</Text>}

        <TextInput
          style={[styles.input, errors.confirmPassword && styles.inputError]}
          placeholder="Confirmar Senha"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
          editable={!isLoading}
        />
        {errors.confirmPassword && <Text style={styles.errorText}>{errors.confirmPassword}</Text>}

        <Pressable
          style={({ pressed }) => [
            styles.button,
            (isLoading || pressed) && { opacity: 0.7 },
          ]}
          onPress={handleSignUp}
          disabled={isLoading}>
          <Text style={styles.buttonText}>
            {isLoading ? 'Cadastrando...' : 'Cadastrar'}
          </Text>
        </Pressable>
        
      </ScrollView>
    </SafeAreaView>
  );
}

// Folha de estilos
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  content: {
    padding: 20,
    justifyContent: 'center',
    flexGrow: 1,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: COLORS.primary,
    textAlign: 'center',
    marginBottom: 30,
  },
  errorBox: {
    backgroundColor: COLORS.errorBackground,
    borderColor: COLORS.errorBorder,
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    marginBottom: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },
  errorBoxText: {
    color: COLORS.errorTextContent,
    fontSize: 14,
    marginLeft: 10,
    flex: 1,
  },
  input: {
    backgroundColor: COLORS.surface,
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    fontSize: 16,
    color: COLORS.text,
    marginBottom: 5,
  },
  inputError: {
    borderColor: COLORS.error,
  },
  errorText: {
    color: COLORS.error,
    fontSize: 12,
    marginBottom: 10,
  },
  button: {
    backgroundColor: COLORS.success,
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});