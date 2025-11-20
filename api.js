import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { UserProvider } from './context/UserContext';
import { AuthProvider, useAuth } from './context/AuthContext';

import AppNavigator from './navigation/AppNavigator'; // O app principal
import LoginScreen from './screens/LoginScreen'; // A tela de Login

const Stack = createStackNavigator();

function RootNavigator() {
  // Pega o token. Se 'null', está deslogado
  const { userToken } = useAuth();

  return (
    <NavigationContainer> //Checa se o usuário está logado
      {userToken == null ? (
        <Stack.Navigator>
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      ) : (
        <AppNavigator />
      )}
    </NavigationContainer>
  );
}

// Componente principal que inicia tudo
export default function App() {
  return (
    <AuthProvider>
      <UserProvider>
        <RootNavigator />
      </UserProvider>
    </AuthProvider>
  );
}