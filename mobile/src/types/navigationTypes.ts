// types.ts
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

// Define suas rotas aqui
export type RootStackParamList = {
  Welcome: undefined;
  Login: undefined; 
  Cadastro: undefined; 
  Home: undefined;
  App: undefined;
  ListPlants: undefined;
  NewPlant: undefined;
  WeatherPage: undefined;
  PagePlant: { id: number };
  UpdatePlant: { id: number };
};

// Define o tipo de navegação para a tela Welcome
export type WelcomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Welcome'>;
