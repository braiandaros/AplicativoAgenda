// Imports do React
import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TextInput,
  ActivityIndicator,
  Pressable,
  Alert,
} from 'react-native';
// Hooks de navegação
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';
// Importa o Axios e define a API
import axios from 'axios';
const api = axios.create({
  baseURL: 'https://690d50f0a6d92d83e851131f.mockapi.io',
});

// Paleta de cores
const COLORS = {
  primary: '#007AFF',
  background: '#F2F2F7',
  surface: '#FFFFFF',
  text: '#1C1C1E',
  textSecondary: '#6E6E73',
};

// Define o componente da tela Lista de Contatos
export default function ContactListScreen() {
  const navigation = useNavigation();
  const [contacts, setContacts] = useState([]);
  const [filteredContacts, setFilteredContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedGroup, setSelectedGroup] = useState('Todos');

  useFocusEffect(
    useCallback(() => {
      fetchContacts(); // Chama a função para buscar/atualizar os dados
    }, [])
  );

  // Função que busca os contatos na API
  const fetchContacts = async () => {
    setLoading(true);
    try {
      // Faz a chamada GET para a API (/contacts/contacts)
      const response = await api.get('/contacts/contacts');
      setContacts(response.data);
      setFilteredContacts(response.data); 
    } catch (error) {
      console.error('Erro ao buscar contatos:', error);
      Alert.alert('Erro', 'Não foi possível carregar os contatos.');
    }
    setLoading(false);
  };

  // Roda sempre com  a busca
  useEffect(() => {
    let result = contacts;

    if (search) {
      result = result.filter((contact) =>
        contact.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (selectedGroup !== 'Todos') {
      result = result.filter((contact) => contact.group === selectedGroup);
    }

    setFilteredContacts(result);
  }, [search, selectedGroup, contacts]);

  // Função que "desenha" cada item da lista
  const renderItem = ({ item }) => (
    <Pressable
      style={styles.itemContainer}
      onPress={() => navigation.navigate('ContactDetail', { contactId: item.id })}>
      <View style={styles.avatar}>
        <Text style={styles.avatarText}>{item.name[0].toUpperCase()}</Text>
      </View>
      <View>
        <Text style={styles.itemText}>{item.name}</Text>
        <Text style={styles.itemSubText}>{item.phone}</Text>
      </View>
    </Pressable>
  );

  // Se a API ainda não respondeu, mostra o "carregando"
  if (loading) {
    return (
      <View style={[styles.container, styles.center]}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
  }

  // Renderização principal da tela
  return (
    <View style={styles.container}>
      <View style={styles.filtersContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar por nome..."
          value={search}
          onChangeText={setSearch}
          placeholderTextColor={COLORS.textSecondary}
        />
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={selectedGroup}
            onValueChange={(itemValue) => setSelectedGroup(itemValue)}
            style={styles.picker}>
            <Picker.Item label="Todos os Grupos" value="Todos" />
            <Picker.Item label="Família" value="Família" />
            <Picker.Item label="Trabalho" value="Trabalho" />
            <Picker.Item label="Amigos" value="Amigos" />
          </Picker>
        </View>
      </View>

      <FlatList
        data={filteredContacts}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        ListEmptyComponent={
          <Text style={styles.emptyText}>Nenhum contato encontrado.</Text>
        }
      />

      <Pressable
        style={styles.fab}
        onPress={() => navigation.navigate('NewContact')}>
        <Text style={styles.fabText}>+</Text>
      </Pressable>
    </View>
  );
}

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
  filtersContainer: {
    padding: 10,
    backgroundColor: COLORS.surface,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  searchInput: {
    backgroundColor: COLORS.background,
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    fontSize: 16,
    color: COLORS.text,
  },
  pickerContainer: {
    backgroundColor: COLORS.background,
    borderRadius: 10,
    marginTop: 10,
  },
  picker: {
    height: 50,
    width: '100%',
    color: COLORS.text,
  },
  itemContainer: {
    backgroundColor: COLORS.surface,
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  avatarText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  itemText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  itemSubText: {
    fontSize: 14,
    color: COLORS.textSecondary,
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 50,
    fontSize: 16,
    color: COLORS.textSecondary,
  },
  fab: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5, 
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  fabText: {
    color: '#FFFFFF',
    fontSize: 30,
    lineHeight: 30,
  },
});