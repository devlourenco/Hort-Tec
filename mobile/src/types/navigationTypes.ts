// types.ts
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

// Define suas rotas aqui
export type RootStackParamList = {
  Welcome: undefined;
  Login: undefined; // Pode adicionar parâmetros aqui se necessário
  Cadastro: undefined; 
};

// Define o tipo de navegação para a tela Welcome
export type WelcomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Welcome'>;
