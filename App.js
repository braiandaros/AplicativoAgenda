// Imports
import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { AuthProvider, useAuth } from './context/AuthContext'; 
// Importa os navegadores
import AppNavigator from './navigation/AppNavigator';
import LoginScreen from './screens/LoginScreen';
import SignUpScreen from './screens/SignUpScreen';
// Inicializa o navegador de pilha
const Stack = createStackNavigator();

function RootNavigator() {
  // Pega o 'user' do contexto. Se for 'null', está deslogado.
  const { user } = useAuth(); 

  return (
    // O container de navegação envolve tudo
    <NavigationContainer>
      {user == null ? (
        <Stack.Navigator
          screenOptions={{
            headerStyle: { backgroundColor: '#007AFF' },
            headerTintColor: '#FFFFFF',
            headerTitleStyle: { fontWeight: 'bold' },
          }}>
          <Stack.Screen //Tela de Login
            name="Login"
            component={LoginScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen //Tela de Cadastro
            name="SignUp"
            component={SignUpScreen}
            options={{ title: 'Criar Conta' }}
          />
        </Stack.Navigator>
      ) : (
        <AppNavigator />
      )}
    </NavigationContainer>
  );
}
// Componente principal que inicia tud
export default function App() {
  return (
    <AuthProvider>
      <RootNavigator />
    </AuthProvider>
  );
}