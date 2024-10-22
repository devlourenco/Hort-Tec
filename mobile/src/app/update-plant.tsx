import { storageTokenGet } from "@/storange/storageUser";
import { useCallback, useState } from "react";
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
import { WelcomeScreenNavigationProp } from "@/types/navigationTypes";
import { useRoute } from "@react-navigation/native";
import { useFocusEffect } from "expo-router";

type Props = {
  navigation: WelcomeScreenNavigationProp;
};

export default function UpdatePlant({navigation}: Props) {
  const [error, setError] = useState<string | null>(null);
  const [arduinoId, setArduinoId] = useState("");
  const [plantaNome, setPlantaNome] = useState("");
  const [umidadeIdeal, setUmidadeIdeal] = useState("");
  const [temperaturaIdeal, setTemperaturaIdeal] = useState("");
  const route = useRoute();
  const { itemId } = route.params;

  async function handlerUserArduinoById() {
    await api
      .get(`/usuario-arduino/id/${itemId}`)
      .then((response) => {
        console.log(response.data.message[0]);
        setArduinoId(response.data.message[0].id.toString())
        setPlantaNome(response.data.message[0].nome);
        setUmidadeIdeal(response.data.message[0].umidade_ideal);
        setTemperaturaIdeal(response.data.message[0].temperatura_ideal);
      })
      .catch((error: AxiosError) => {
        const message = error.response?.data.message || "Erro desconhecido";
        Alert.alert(message);
      });
  }

  const handleUpdate = () => {
    api.put('/usuario-arduino', {
      id: parseInt(arduinoId),
      nome: plantaNome,
      umidade_ideal: parseFloat(umidadeIdeal),
      temperatura_ideal: parseFloat(temperaturaIdeal)
    })
    .then((response: AxiosResponse) => {
      Alert.alert(response.data.message)
      navigation.goBack()
    })
    .catch((error: AxiosError) => {
      Alert.alert(error.response?.data.message)
    })
  }

  useFocusEffect(
    useCallback(() => {
      handlerUserArduinoById();
    }, [])
  );


  return (
    <KeyboardAvoidingView
      behavior={Platform.OS == "ios" ? "padding" : "height"}
      className={
        Platform.OS == "ios"
          ? "flex-1 items-center"
          : "flex-1 items-center pt-10"
      }
    >
      <ScrollView keyboardShouldPersistTaps="handled">
        <View className="flex flex-row justify-between p-4">
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text className="text-green-800 text-lg">Voltar</Text>
          </TouchableOpacity>
        </View>
        <View className="flex-1 items-center gap-1 mb-10">
          <Text className="text-3xl font-semibold text-green-900">
            Atualizações
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
              readOnly
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

          <TouchableOpacity className="mt-10 p-4 bg-green-300 rounded-lg" onPress={handleUpdate}>
            <Text className="text-lg font-semibold text-white text-center">
              Atualizar
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
