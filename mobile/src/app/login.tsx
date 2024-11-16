import api from "@/config/api";
import { storageTokenGet, storageTokenSave } from "@/storange/storageUser";
import { WelcomeScreenNavigationProp } from "@/types/navigationTypes";
import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { ErrorResponse } from "./cadastro";

type Props = {
  navigation: WelcomeScreenNavigationProp;
};

export default function Login({navigation}: Props) {
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const token = async () => {
      console.log(await storageTokenGet())
    }
    token()
  },[])

  async function handleLogin(){
    await api.post('/login', {
      mail,
      password
    })
    .then((response) => {
      Alert.alert("Login realizado com sucesso!");
      const token = response.data.message
      storageTokenSave(token)
      
      setMail("")
      setPassword("")

      navigation.navigate('App')
    })
    .catch((error: AxiosError) => {
      const errorMessage = (error.response?.data as ErrorResponse)?.message || "Erro desconhecido";
      Alert.alert(errorMessage);
    })
  }
  
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS == "ios" ? "padding" : "height"}
      className={Platform.OS == "ios" ? 
        "pt-20 flex-1 items-center" : 
        "pt-10 flex-1 items-center"
      }
    >
      <ScrollView 
        keyboardShouldPersistTaps="handled"
      >
        <View className="flex-1 items-center gap-2 mb-20">
          <Text className="text-4xl font-semibold text-green-900">Hort-Tec</Text>
          <Text className="text-lg text-green-900">Faça login e comece a usar</Text>
        </View>

        <View className="flex-1 gap-6 w-screen px-7">
          <View className="flex-1 gap-1">
            <Text className="text-lg text-green-900">E-mail:</Text>
            <TextInput 
              className="border-b py-2 px-1 border-green-900 text-green-800"
              onChangeText={setMail}
              value={mail}
            />
          </View>
          <View className="flex-1 gap-1">
            <Text className="text-lg text-green-900">Senha:</Text>
            <TextInput 
              className="border-b py-2 px-1 border-green-900 text-green-800"
              onChangeText={setPassword}
              value={password}
            />
          </View>

          <TouchableOpacity 
            className="mt-14 p-4 bg-green-300 rounded-lg"
            onPress={handleLogin}
          >
            <Text 
              className="text-lg font-semibold text-white text-center"
            >
              Entrar na Plataforma
            </Text>
          </TouchableOpacity>
        </View>

        <View className="flex-1 gap-1 items-center mt-10">
          <Text className="text-green-800 underline text-base">Esqueceu a senha?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Cadastro')}>
            <Text className="text-green-800 underline text-base">Não possui conta? Crie uma agora</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
