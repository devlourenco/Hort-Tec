import { storageTokenGet } from "@/storange/storageUser";
import { useState } from "react";
import { jwtDecode } from "jwt-decode";
import { AxiosError, AxiosResponse } from "axios";
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
import { useEffect } from "react";
import api from "@/config/api";

export default function NewPlant() {
  const [error, setError] = useState<string | null>(null);
  const [arduinoId, setArduinoId] = useState("");
  const [plantaNome, setPlantaNome] = useState("");
  const [umidadeIdeal, setUmidadeIdeal] = useState("");
  const [temperaturaIdeal, setTemperaturaIdeal] = useState("");
  const [tokenDataEmail, setTokenDataEmail] = useState<string | null>(null);

  const user = async () => {
    const token = await storageTokenGet();

    if (token) {
      const decoded: UserDto = jwtDecode(token);
      setTokenDataEmail(decoded.email);
      console.log(decoded.email);
    } else {
      setError("Token não encontrado");
    }
  };

  useEffect(() => {
    user();
  }, []);

  const handleSubmit = () => {

    api.post('/usuario-arduino', {
      id_arduino: arduinoId, 
      email: tokenDataEmail, 
      planta_nome: plantaNome, 
      umidade_ideal: parseFloat(umidadeIdeal), 
      temperatura_ideal: parseFloat(temperaturaIdeal)
    })
    .then((response: AxiosResponse) => {
      Alert.alert(response.data.message);
    })
    .catch((error: AxiosError) => {
      Alert.alert(error.response?.data.message);
    });
  };

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
        <View className="flex-1 items-center gap-1 mb-10">
          <Text className="text-3xl font-semibold text-green-900">
            Nova Planta
          </Text>
        </View>

        <View className="flex-1 gap-6 w-screen px-7">
          <View className="flex-1 gap-1">
            <Text className="text-base text-green-900">
              Identificador Arduino:
            </Text>
            <TextInput
              className="border-b py-2 text-green-800"
              value={arduinoId}
              onChangeText={setArduinoId}
            />
          </View>
          <View className="flex-1 gap-1">
            <Text className="text-base text-green-900">Nome da Planta:</Text>
            <TextInput
              className="border-b py-2 text-green-800"
              value={plantaNome}
              onChangeText={setPlantaNome}
            />
          </View>
          <View className="flex-1 gap-1">
            <Text className="text-base text-green-900">Umidade ideal:</Text>
            <TextInput
              className="border-b py-2 text-green-800"
              value={umidadeIdeal}
              onChangeText={setUmidadeIdeal}
            />
          </View>
          <View className="flex-1 gap-1">
            <Text className="text-base text-green-900">Temperatura ideal:</Text>
            <TextInput
              className="border-b py-2 text-green-800"
              value={temperaturaIdeal}
              onChangeText={setTemperaturaIdeal}
            />
          </View>

          <TouchableOpacity
            className="mt-10 p-4 bg-green-300 rounded-lg"
            onPress={handleSubmit}
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
