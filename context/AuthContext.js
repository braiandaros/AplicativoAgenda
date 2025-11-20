// Importa as funções principais
import React, { createContext, useState, useContext } from 'react';
import { Alert } from 'react-native';
// Importa o Axios para chamadas de API
import axios from 'axios';
const api = axios.create({ // Cria a instância do 'api'
  baseURL: 'https://690d50f0a6d92d83e851131f.mockapi.io',
});

// Cria o Contexto
const AuthContext = createContext();
// Cria o Componente Provedor (que disponibiliza os dados para o app)
export const AuthProvider = ({ children }) => {
  // Cria um estado para guardar os dados do usuário. 'null' = deslogado.
  const [user, setUser] = useState(null);

// Função para tentar fazer o login
  const signIn = async (email, password) => {
    try {
      // Busca na API o usuário pelo email
      const response = await api.get('/contacts/user', {
        params: { email: email },
      });

      if (response.data.length > 0 && response.data[0].password === password) {
        setUser(response.data[0]); 
      } else {
        throw new Error('Email ou senha inválidos.');
      }
    } catch (e) {
      console.error('Erro no login:', e);
      if (e.message === 'Email ou senha inválidos.') {
        throw e;
      }
      throw new Error('Erro no ligin');
    }
  };

// Função para fazer o logout
  const signOut = () => {
    setUser(null);
  };

// Função para atualizar os dados do perfil (na tela Meu Perfil)
  const saveUserProfile = (updatedUserData) => {
    setUser(updatedUserData);
    Alert.alert('Sucesso!', 'Perfil salvo com sucesso.');
  };

// Retorna o Provedor com os valores que o app poderá usar
  return (
    <AuthContext.Provider value={{ user, signIn, signOut, saveUserProfile }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook customizado (um atalho para usar o contexto mais fácil)
export const useAuth = () => {
  return useContext(AuthContext);
};