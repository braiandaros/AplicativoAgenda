// Imports do React
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Pressable,
  Alert,
} from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';

// Importa o Axios e define a API
import axios from 'axios';
const api = axios.create({
  baseURL: 'https://690d50f0a6d92d83e851131f.mockapi.io',
});

// Paleta de cores
const COLORS = {
  primary: '#007AFF',
  success: '#34C759',
  error: '#FF3B30',
  background: '#F2F2F7',
  surface: '#FFFFFF',
  text: '#1C1C1E',
  textSecondary: '#6E6E73',
};

// Define o componente da tela de Detalhes do Contato
export default function ContactDetailScreen() {
  const route = useRoute();
  const navigation = useNavigation();
  const { contactId } = route.params;

// Estado para guardar os dados do contato (começa como nulo)
  const [contact, setContact] = useState(null);

  // Estado para controlar a tela de "carregando"
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContactDetails = async () => {
      setLoading(true);
      try {
        // Faz a chamada GET para a API (/contacts/contacts/ID_DO_CONTATO)
        const response = await api.get(`/contacts/contacts/${contactId}`);
        setContact(response.data);
      } catch (error) {
        console.error('Erro ao buscar detalhes:', error);
        Alert.alert('Erro', 'Não foi possível carregar o contato.');
      }
      setLoading(false);
    };

    fetchContactDetails();
  }, [contactId]);

  // Se estiver carregando, mostra o ActivityIndicator
  if (loading) {
    return (
      <View style={[styles.container, styles.center]}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
  }

  // Se terminou de carregar e não achou o contato, mostra mensagem
  if (!contact) {
    return (
      <View style={[styles.container, styles.center]}>
        <Text>Contato não encontrado.</Text>
      </View>
    );
  }
  // Função chamada ao clicar no botão "Excluir"
  const onExcludePress = () => {
    navigation.navigate('ConfirmDelete', {
      // Passa os parâmetros necessários para a próxima tela
      contactId: contact.id,
      contactName: contact.name,
    });
  };

  // Renderização principal
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{contact.name[0].toUpperCase()}</Text>
        </View>
        <Text style={styles.name}>{contact.name}</Text>
        <Text style={styles.group}>{contact.group}</Text>
      </View>

      <View style={styles.card}>
        <InfoRow label="Telefone" value={contact.phone} />
        <InfoRow label="E-mail" value={contact.email || 'Não informado'} />
      </View>

      <View style={styles.actionsContainer}>
        <Pressable
          style={[styles.button, styles.buttonCall]}
          onPress={() => navigation.navigate('SimulateCall', {
              contactName: contact.name,
              contactPhone: contact.phone,
            })}>
          <Text style={styles.buttonText}>Ligar</Text>
        </Pressable>
        
        <Pressable
          style={[styles.button, styles.buttonDelete]}
          onPress={onExcludePress}>
          <Text style={styles.buttonText}>Excluir</Text>
        </Pressable>
      </View>
    </View>
  );
}

const InfoRow = ({ label, value }) => (
  <View style={styles.infoRow}>
    <Text style={styles.infoLabel}>{label}</Text>
    <Text style={styles.infoValue}>{value}</Text>
  </View>
);

// Folha de estilos
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    backgroundColor: COLORS.surface,
    paddingVertical: 30,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  avatarText: {
    color: '#FFFFFF',
    fontSize: 40,
    fontWeight: 'bold',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  group: {
    fontSize: 16,
    color: COLORS.textSecondary,
    marginTop: 4,
  },
  card: {
    backgroundColor: COLORS.surface,
    borderRadius: 10,
    margin: 20,
    padding: 20,
  },
  infoRow: {
    marginVertical: 10,
  },
  infoLabel: {
    fontSize: 14,
    color: COLORS.textSecondary,
  },
  infoValue: {
    fontSize: 16,
    color: COLORS.text,
    marginTop: 4,
  },
  actionsContainer: {
    paddingHorizontal: 20,
    marginTop: 10,
  },
  button: {
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonCall: {
    backgroundColor: COLORS.success,
  },
  buttonDelete: {
    backgroundColor: COLORS.error,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});