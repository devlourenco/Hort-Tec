import api from "@/config/api";
import { WelcomeScreenNavigationProp } from "@/types/navigationTypes";
import { AxiosError, AxiosResponse } from "axios";
import { useState } from "react";
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

type Props = {
  navigation: WelcomeScreenNavigationProp;
};

export interface ErrorResponse {
  message: string;
}

export default function Cadastro({ navigation }: Props) {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmaSenha, setCofirmaSenha] = useState("");

  function handleRegister() {

    if(senha !== confirmaSenha){
      return Alert.alert("Senhas não conferem")
    }
    
    api.post('/usuario', {
      nome,
      email,
      senha
    })
    .then((response: AxiosResponse) => {
      Alert.alert("Cadastro realizado com sucesso!");
      navigation.navigate('Login')
    })
    .catch((error: AxiosError) => {
      const errorMessage = (error.response?.data as ErrorResponse)?.message || "Erro desconhecido";
      Alert.alert(errorMessage);
    });
    
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS == "ios" ? "padding" : "height"}
      className={
        Platform.OS == "ios"
          ? "pt-20 flex-1 items-center"
          : "flex-1 items-center pt-10"
      }
    >
      <ScrollView keyboardShouldPersistTaps="handled">
        <View className="flex-1 items-center gap-1 mb-20">
          <Text className="text-3xl font-semibold text-green-900">
            Já nos conhecemos?
          </Text>
          <Text className="text-base text-green-900">
            Se sim,&ensp;
            <TouchableOpacity onPress={() => navigation.navigate("Login")}>
              <Text className="underline text-green-900">clique aqui!</Text>
            </TouchableOpacity>
          </Text>
        </View>

        <View className="flex-1 gap-6 w-screen px-7">
          <View className="flex-1 gap-1">
            <Text className="text-base text-green-900">Nome Completo:</Text>
            <TextInput
              className="border-b py-2 text-green-800"
              onChangeText={setNome}
              value={nome}
            />
          </View>
          <View className="flex-1 gap-1">
            <Text className="text-base text-green-900">E-mail:</Text>
            <TextInput
              className="border-b py-2 text-green-800"
              onChangeText={setEmail}
              value={email}
            />
          </View>
          <View className="flex-1 gap-1">
            <Text className="text-base text-green-900">Senha:</Text>
            <TextInput
              className="border-b py-2 text-green-800"
              onChangeText={setSenha}
              value={senha}
            />
          </View>
          <View className="flex-1 gap-1">
            <Text className="text-base text-green-900">Confirmar senha:</Text>
            <TextInput
              className="border-b py-2 text-green-800"
              onChangeText={setCofirmaSenha}
              value={confirmaSenha}
            />
          </View>

          <TouchableOpacity
            className="mt-10 p-4 bg-green-300 rounded-lg"
            onPress={() => {
              handleRegister();
            }}
          >
            <Text className="text-lg font-semibold text-white text-center">
              Cadastrar
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}