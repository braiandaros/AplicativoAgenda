// Imports do React
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Pressable,
  Alert,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';

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
};

// valida o formato do email
const validateEmail = (email) => {
  const re = /\S+@\S+\.\S+/;
  return re.test(email);
};

// valida o telefone
const validatePhone = (phone) => {
  const digits = phone.replace(/\D/g, '');
  return digits.length >= 10;
};

// Define o componente da tela "Novo Contato"
export default function NewContactScreen() {
  const navigation = useNavigation();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [group, setGroup] = useState('Amigos');
  const [errors, setErrors] = useState({});

  // Função que valida todos os campos do formulário
  const validate = () => {
    const newErrors = {};
    if (!name) newErrors.name = 'Nome é obrigatório';

    if (!phone) {
      newErrors.phone = 'Telefone é obrigatório';
    } else if (!validatePhone(phone)) {
      newErrors.phone = 'Número de telefone inválido (mín. 10 dígitos)';
    }

    if (email && !validateEmail(email)) {
      newErrors.email = 'Formato de email inválido';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Função chamada ao clicar no botão "Salvar"
  const handleSave = async () => {
    if (validate()) {
      const newContact = { name, phone, email, group };
      try {
        await api.post('/contacts/contacts', newContact);
        Alert.alert('Sucesso!', 'Contato salvo com sucesso.');
        navigation.goBack();
      } catch (error) {
        console.error('Erro ao salvar contato:', error);
        Alert.alert('Erro', 'Não foi possível salvar o contato.');
      }
    }
  };

  // Renderização da tela
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Nome</Text>
        <TextInput
          style={[styles.input, errors.name && styles.inputError]}
          placeholder="Nome do contato"
          value={name}
          onChangeText={setName}
          placeholderTextColor={COLORS.textSecondary}
        />
        {errors.name && <Text style={styles.errorText}>{errors.name}</Text>}
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Telefone</Text>
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

      <View style={styles.inputGroup}>
        <Text style={styles.label}>E-mail (Opcional)</Text>
        <TextInput
          style={[styles.input, errors.email && styles.inputError]}
          placeholder="email@dominio.com"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          placeholderTextColor={COLORS.textSecondary}
        />
        {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Grupo</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={group}
            onValueChange={(itemValue) => setGroup(itemValue)}
            style={styles.picker}>
            <Picker.Item label="Amigos" value="Amigos" />
            <Picker.Item label="Família" value="Família" />
            <Picker.Item label="Trabalho" value="Trabalho" />
          </Picker>
        </View>
      </View>

      <Pressable
        style={({ pressed }) => [
          styles.button,
          { opacity: pressed ? 0.7 : 1 },
        ]}
        onPress={handleSave}>
        <Text style={styles.buttonText}>Salvar Contato</Text>
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
  pickerContainer: {
    backgroundColor: COLORS.surface,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  picker: {
    height: 50,
    width: '100%',
    color: COLORS.text,
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
});