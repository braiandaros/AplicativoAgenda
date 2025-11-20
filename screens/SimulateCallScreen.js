// Imports do React
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ActivityIndicator,
} from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
// Importa o ícone de telefone
import { Ionicons } from '@expo/vector-icons';

// Paleta de cores
const COLORS = {
  primary: '#007AFF',
  success: '#34C759',
  error: '#FF3B30',
  surface: '#FFFFFF',
  text: '#1C1C1E',
  textSecondary: '#6E6E73',
};

// Define o componente da tela
export default function SimulateCallScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  // Pega o nome e o telefone passados da tela anterior
  const { contactName, contactPhone } = route.params;

  // Renderização da tela
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Ligando...</Text>
        
        <Ionicons name="call" size={48} color={COLORS.success} />

        <Text style={styles.contactName}>{contactName}</Text>
        <Text style={styles.contactPhone}>{contactPhone}</Text>

        <ActivityIndicator size="large" color={COLORS.primary} style={styles.spinner} />

        <Pressable
          style={[styles.button, styles.buttonCancel]}
          onPress={() => navigation.goBack()}>
          <Text style={styles.buttonText}>Cancelar Ligação</Text>
        </Pressable>
      </View>
    </View>
  );
} 

// Folha de estilos
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.7)',
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
    fontSize: 22,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 20,
  },
  contactName: {
    fontSize: 20,
    fontWeight: '500',
    color: COLORS.text,
    marginTop: 15,
  },
  contactPhone: {
    fontSize: 16,
    color: COLORS.textSecondary,
    marginBottom: 25,
  },
  spinner: {
    marginVertical: 10,
  },
  button: {
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
    width: '100%',
    marginTop: 10,
  },
  buttonCancel: {
    backgroundColor: COLORS.error,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});