# 📱 Agenda Express

![Status](https://img.shields.io/badge/Status-Concluído-brightgreen?style=for-the-badge)
![React Native](https://img.shields.io/badge/React_Native-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Expo](https://img.shields.io/badge/Expo-000020?style=for-the-badge&logo=expo&logoColor=white)

> **Agenda Express** é um aplicativo completo para gerenciamento de contatos, desenvolvido para aplicar conceitos avançados de desenvolvimento mobile, persistência de dados e design de interação.

---

## 📖 Sobre o Projeto

Este projeto consiste em um aplicativo móvel que permite ao usuário criar uma conta, fazer login e gerenciar sua lista de contatos pessoais. O sistema consome uma **API RESTful** simulada para realizar operações de **CRUD** (Create, Read, Update, Delete) e utiliza armazenamento local para persistência de sessão.

O objetivo foi criar uma experiência de usuário fluida, utilizando navegação híbrida (**Drawer** para menus e **Stack** para fluxos), modais de confirmação e validação robusta de formulários.

---

## ✨ Funcionalidades Principais

### 🔐 Autenticação & Segurança
- **Login:** Validação de credenciais via API (`GET /user`).
- **Cadastro:** Criação de nova conta (`POST /user`) com verificação de duplicidade de e-mail.
- **Sessão Persistente:** Uso de `Context API` para manter o usuário logado durante o uso.
- **Validações:** Regex para garantir formatos corretos de e-mail e telefone (mínimo 10 dígitos).

### 📇 Gestão de Contatos (CRUD)
- **Listagem Otimizada:** Uso de `FlatList` para renderização eficiente.
- **Filtros Avançados:**
  - Busca por nome em tempo real.
  - Filtro por categoria (`Picker`) para classificar contatos (Amigos, Família, Trabalho).
- **Criação e Exclusão:** Adição de novos contatos e remoção com confirmação via modal para evitar cliques acidentais.

### 📱 Interface (UI/UX)
- **Feedback Visual:** Indicadores de carregamento (`ActivityIndicator`) durante requisições.
- **Mensagens de Erro:** Tratamento de erros de API (404, conexão) com mensagens amigáveis ao usuário.
- **Navegação:** Estrutura profissional com Menu Lateral (`Drawer`) e Pilha de telas (`Stack`).

---

## 🛠️ Tecnologias Utilizadas

* **Core:** [React Native](https://reactnative.dev/) & [Expo](https://expo.dev/)
* **Navegação:** [React Navigation](https://reactnavigation.org/) (Stack & Drawer)
* **Http Client:** [Axios](https://axios-http.com/)
* **Gerenciamento de Estado:** React Context API
* **Backend Simulado:** [MockAPI.io](https://mockapi.io/)
* **Componentes:** React Native Gesture Handler, Reanimated, Vector Icons.

---

## 🚀 Como executar o projeto

### Pré-requisitos
* [Node.js](https://nodejs.org/) instalado.
* Gerenciador de pacotes (NPM ou Yarn).
* Aplicativo **Expo Go** no celular ou emulador configurado.

### Passo a passo

1. **Clone este repositório:**
   ```bash
   git clone [https://github.com/SEU-USUARIO/agenda-express.git](https://github.com/SEU-USUARIO/agenda-express.git)
   cd agenda-express
