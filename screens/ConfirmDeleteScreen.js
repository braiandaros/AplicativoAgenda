import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, Alert } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';

// Importa o Axios e definição da API
import axios from 'axios';
const api = axios.create({
  baseURL: 'https://690d50f0a6d92d83e851131f.mockapi.io',
});

// Paleta de cores local
const COLORS = {
  primary: '#007AFF',
  error: '#FF3B30',
  background: '#F2F2F7',
  surface: '#FFFFFF',
  text: '#1C1C1E',
  textSecondary: '#6E6E73',
};

// Define o componente da tela
export default function ConfirmDeleteScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  
  // Pega os dados (ID e Nome) passados da tela anterior
  const { contactId, contactName } = route.params;

  const [isDeleting, setIsDeleting] = useState(false);

  // Função que executa a exclusão
  const handleDelete = async () => {
    if (isDeleting) return;
    setIsDeleting(true);

    try {
      await api.delete(`/contacts/contacts/${contactId}`);
      Alert.alert('Sucesso!', 'Contato excluído.');
      
      navigation.navigate('ContactList');

    } catch (error) {
      console.error('ERRO AO EXCLUIR!:', error.response || error.message);
      Alert.alert('Erro', 'Não foi possível excluir o contato.');
      setIsDeleting(false);
    }
  };
  // Renderização da tela
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Excluir Contato</Text>
        <Text style={styles.subtitle}>
          Tem certeza que deseja excluir permanentemente o contato
          <Text style={{ fontWeight: 'bold' }}> {contactName}</Text>?
        </Text>
        <Text style={styles.warning}>Esta ação não pode ser desfeita.</Text>

        <View style={styles.buttonContainer}>
          <Pressable
            style={[styles.button, styles.buttonCancel]}
            onPress={() => navigation.goBack()}
            disabled={isDeleting}>
            <Text style={[styles.buttonText, styles.buttonTextCancel]}>Cancelar</Text>
          </Pressable>

          <Pressable
            style={[styles.button, styles.buttonConfirm]}
            onPress={handleDelete}
            disabled={isDeleting}>
            <Text style={styles.buttonText}>
              {isDeleting ? 'Excluindo...' : 'Confirmar Exclusão'}
            </Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

// Folha de estilos
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  card: {
    backgroundColor: COLORS.surface,
    borderRadius: 14,
    padding: 24,
    width: '100%',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: COLORS.textSecondary,
    textAlign: 'center',
    marginBottom: 10,
  },
  warning: {
    fontSize: 14,
    color: COLORS.error,
    fontWeight: '500',
    textAlign: 'center',
    marginBottom: 25,
  },
  buttonContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
  },
  button: {
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 5,
  },
  buttonCancel: {
    backgroundColor: COLORS.background,
    borderWidth: 1,
    borderColor: COLORS.textSecondary,
  },
  buttonConfirm: {
    backgroundColor: COLORS.error,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  buttonTextCancel: {
    color: COLORS.textSecondary,
  },
});