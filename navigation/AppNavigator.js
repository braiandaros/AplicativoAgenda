// Imports do React e da Navegação
import React from 'react';
import { Pressable } from 'react-native'; // Importa o Pressable
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons'; // <-- 1. IMPORTA O ÍCONE

// Importa as telas
import ProfileScreen from '../screens/ProfileScreen';
import ContactListScreen from '../screens/ContactListScreen';
import NewContactScreen from '../screens/NewContactScreen';
import ContactDetailScreen from '../screens/ContactDetailScreen';
import ConfirmDeleteScreen from '../screens/ConfirmDeleteScreen';
import SimulateCallScreen from '../screens/SimulateCallScreen';

// Inicializa os dois tipos de navegador
const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

// Define a "Pilha de Contatos"
function ContactStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: '#007AFF' },
        headerTintColor: '#FFFFFF',
        headerTitleStyle: { fontWeight: 'bold' },
      }}>
      <Stack.Screen
        name="ContactList"
        component={ContactListScreen}
        options={({ navigation }) => ({
          title: 'Meus Contatos',
          // ADICIONA O BOTÃO DE MENU
          headerLeft: () => (
            <Pressable
              onPress={() => navigation.toggleDrawer()} // AÇÃO DE ABRIR O MENU
              style={{ marginLeft: 15 }}>
              <Ionicons name="menu" size={28} color="white" />
            </Pressable>
          ),
        })}
      />
      <Stack.Screen
        name="NewContact"
        component={NewContactScreen}
        options={{ title: 'Novo Contato' }}
      />
      <Stack.Screen
        name="ContactDetail"
        component={ContactDetailScreen}
        options={{ title: 'Detalhes' }}
      />
      <Stack.Screen
        name="ConfirmDelete"
        component={ConfirmDeleteScreen}
        options={{
          presentation: 'transparentModal',
          headerShown: false,
          cardStyle: { backgroundColor: 'transparent' },
        }}
      />
      <Stack.Screen
        name="SimulateCall"
        component={SimulateCallScreen}
        options={{
          presentation: 'transparentModal',
          headerShown: false,
          cardStyle: { backgroundColor: 'transparent' },
        }}
      />
    </Stack.Navigator>
  );
}

// O Drawer Navigator
export default function AppNavigator() {
  return (
    <Drawer.Navigator
      initialRouteName="Contatos"
      screenOptions={{
        headerShown: false,
        drawerActiveTintColor: '#007AFF',
      }}>
      <Drawer.Screen
        name="Contatos"
        component={ContactStack}
        options={{
          title: 'Meus Contatos',
        }}
      />

      <Drawer.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          title: 'Meu Perfil',
          headerShown: true,
          headerStyle: { backgroundColor: '#007AFF' },
          headerTintColor: '#FFFFFF',
        }}
      />
    </Drawer.Navigator>
  );

}