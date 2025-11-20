// Imports do React e React Native
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Pressable,
  Alert,
  SafeAreaView,
} from 'react-native';
// Importa os hooks personalizados e de navegação
import { useAuth } from '../context/AuthContext';
import { useNavigation } from '@react-navigation/native';
// Importa ícones
import { MaterialIcons } from '@expo/vector-icons';

// Paleta de cores
const COLORS = {
  primary: '#007AFF',
  background: '#F2F2F7',
  surface: '#FFFFFF',
  text: '#1C1C1E',
  textSecondary: '#6E6E73',
  error: '#FF3B30',
  errorBackground: '#FFD2D2',
  errorBorder: '#D8000C',
  errorTextContent: '#5F2120',
};

// Define o componente da tela de Login
export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { signIn } = useAuth();
  const navigation = useNavigation();

  // Função chamada ao clicar em "Entrar"
  const handleLogin = async () => {
    setError('');

    // Validação básica
    if (!email || !password) {
      setError('Por favor, preencha o email e a senha.');
      return;
    }

    try {
      await signIn(email, password);
    } catch (e) {
      setError(e.message);
    }
  };

  return (
    // SafeAreaView protege o conteúdo das bordas da tela
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Agenda Express</Text>
        <Text style={styles.subtitle}>Faça login para continuar</Text>
        {error ? (
          <View style={styles.errorBox}>
            <MaterialIcons
              name="error-outline"
              size={20}
              color={COLORS.errorBorder}
            />
            <Text style={styles.errorBoxText}>{error}</Text>
          </View>
        ) : null}

        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={(text) => {
            setEmail(text);
            setError('');
          }}
          keyboardType="email-address"
          autoCapitalize="none"
          placeholderTextColor={COLORS.textSecondary}
        />
        <TextInput
          style={styles.input}
          placeholder="Senha"
          value={password}
          onChangeText={(text) => {
            setPassword(text);
            setError('');
          }}
          secureTextEntry
          placeholderTextColor={COLORS.textSecondary}
        />

        <Pressable
          style={({ pressed }) => [
            styles.button,
            { opacity: pressed ? 0.7 : 1 },
          ]}
          onPress={handleLogin}>
          <Text style={styles.buttonText}>Entrar</Text>
        </Pressable>

        <Pressable
          style={styles.signUpButton}
          onPress={() => navigation.navigate('SignUp')}>
          <Text style={styles.signUpButtonText}>
            Não tem conta? <Text style={{ fontWeight: 'bold' }}>Cadastre-se</Text>
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

// Folha de estilos
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    justifyContent: 'center',
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: COLORS.primary,
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: COLORS.textSecondary,
    textAlign: 'center',
    marginBottom: 40,
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
    marginBottom: 15,
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
  
  button: {
    backgroundColor: COLORS.primary,
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  signUpButton: {
    marginTop: 20,
    alignItems: 'center',
  },
  signUpButtonText: {
    fontSize: 14,
    color: COLORS.textSecondary,
  },
});