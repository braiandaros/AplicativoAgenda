import React, { createContext, useState, useContext } from 'react';

// Criar o Contexto
const UserContext = createContext();

// Criar o Provedor
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({
    name: '',
    email: '',
    phone: '',
  });

  // Função para salvar/atualizar o usuário
  const saveUser = (userData) => {
    setUser(userData);
  };

  return (
    <UserContext.Provider value={{ user, saveUser }}>
      {children}
    </UserContext.Provider>
  );
};

// Criar o Hook customizado
export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};