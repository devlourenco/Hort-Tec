import AsyncStorage from '@react-native-async-storage/async-storage';
import { TOKEN_STORAGE } from './storageConfig';

export async function storageTokenSave(token: string) {
  try {
    await AsyncStorage.setItem(TOKEN_STORAGE, token);
  } catch (error) {
    console.error('Erro ao salvar o token:', error);
  }
}

export async function storageTokenGet() {
  try {
    const token = await AsyncStorage.getItem(TOKEN_STORAGE);
    return token || null; // Retorna null se o token não existir
  } catch (error) {
    console.error('Erro ao recuperar o token:', error);
    return null;
  }
}

export async function storageTokenRemove(){
  await AsyncStorage.removeItem(TOKEN_STORAGE)
}


