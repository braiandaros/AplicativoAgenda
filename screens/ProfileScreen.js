// Imports do React
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Pressable,
  Alert,
  ScrollView,
} from 'react-native';
import { useAuth } from '../context/AuthContext'; 

// Paleta de cores
const COLORS = {
  primary: '#007AFF',
  success: '#34C759',
  background: '#F2F2F7',
  surface: '#FFFFFF',
  text: '#1C1C1E',
  textSecondary: '#6E6E73',
  error: '#FF3B30',
};

// Define o componente da tela "Meu Perfil"
export default function ProfileScreen() {
  // Pega os dados do usuário logado
  const { user, signOut, saveUserProfile } = useAuth(); 
  // Cria estados locais para os campos
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [phone, setPhone] = useState(user.phone || ''); 
  const [errors, setErrors] = useState({});

  // Função que valida os campos do formulário
  const validate = () => {
    const newErrors = {};
    if (!name) {
      newErrors.name = 'Nome é obrigatório';
    } else if (name.length < 3) {
      newErrors.name = 'Nome deve ter pelo menos 3 caracteres';
    }
    if (!email) {
      newErrors.email = 'E-mail é obrigatório';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Formato de e-mail inválido';
    }
    if (!phone) {
      newErrors.phone = 'Telefone é obrigatório';
    } else if (phone.length < 10) {
      newErrors.phone = 'Telefone deve ter pelo menos 10 dígitos';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Função chamada ao clicar no botão "Salvar Perfil"
  const handleSave = () => {
    if (validate()) {
      const updatedUser = {
        ...user,
        name: name,
        email: email,
        phone: phone,
      };
      saveUserProfile(updatedUser); 
    }
  };

  // Renderização da tela
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Meu Perfil</Text>
      <Text style={styles.subtitle}>
        Edite suas informações de usuário.
      </Text>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Nome</Text>
        <TextInput
          style={[styles.input, errors.name && styles.inputError]}
          placeholder="Seu nome completo"
          value={name}
          onChangeText={setName}
          placeholderTextColor={COLORS.textSecondary}
        />
        {errors.name && <Text style={styles.errorText}>{errors.name}</Text>}
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>E-mail</Text>
        <TextInput
          style={[styles.input, errors.email && styles.inputError]}
          placeholder="seu.email@dominio.com"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          placeholderTextColor={COLORS.textSecondary}
        />
        {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Meu Telefone</Text>
        <TextInput
          style={[styles.input, errors.phone && styles.inputError]}
          placeholder="(XX) XXXXX-XXXX"
          value={phone}
          onChangeText={setPhone}
          keyboardType="phone-pad"
          placeholderTextColor={COLORS.textSecondary}
        />
        {errors.phone && <Text style={styles.errorText}>{errors.phone}</Text>}
      </View>

      <Pressable
        style={({ pressed }) => [
          styles.button,
          { opacity: pressed ? 0.7 : 1 },
        ]}
        onPress={handleSave}>
        <Text style={styles.buttonText}>Salvar Perfil</Text>
      </Pressable>

      <Pressable
        style={({ pressed }) => [
          styles.button,
          styles.buttonSignOut,
          { opacity: pressed ? 0.7 : 1 },
        ]}
        onPress={signOut}>
        <Text style={styles.buttonText}>Sair (Logout)</Text>
      </Pressable>
    </ScrollView>
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
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: COLORS.textSecondary,
    marginBottom: 30,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    color: COLORS.text,
    marginBottom: 8,
    fontWeight: '500',
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
  },
  inputError: {
    borderColor: COLORS.error,
  },
  errorText: {
    color: COLORS.error,
    fontSize: 12,
    marginTop: 5,
  },
  button: {
    backgroundColor: COLORS.success,
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
  buttonSignOut: {
    backgroundColor: COLORS.error, // Vermelho
    marginTop: 20,
  },
});