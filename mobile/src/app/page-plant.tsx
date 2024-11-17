import api from "@/config/api";
import { useRoute } from "@react-navigation/native";
import { useCallback, useEffect, useState } from "react";
import {
  Alert,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { AxiosError } from "axios";
import { useFocusEffect } from "expo-router";
import { WelcomeScreenNavigationProp } from "@/types/navigationTypes";
import { ErrorResponse } from "./cadastro";
import { Fontisto } from "@expo/vector-icons";
import { colors } from "@/styles/colors";

type AutoPropsById = {
  id: number;
  usuario_id: number;
  arduino_id: number;
  nome: string;
  umidade_ideal: number;
  temperatura_ideal: number;
  status: string;
  umidade_atual: number;
};

type Props = {
  navigation: WelcomeScreenNavigationProp;
};

export default function PagePlant({ navigation }: Props) {
  const [autoByArduino, setAutoByArduino] = useState<AutoPropsById[]>([]);

  const route = useRoute();
  const { itemId } = route.params;

  async function handlerArduinoById() {
    await api
      .get(`/usuario-arduino/id/${itemId}`)
      .then((response) => {
        setAutoByArduino(response.data.message[0]);
      })
      .catch((error: AxiosError) => {
        const errorMessage =
          (error.response?.data as ErrorResponse)?.message ||
          "Erro desconhecido";
        Alert.alert(errorMessage);
      });
  }

  useFocusEffect(
    useCallback(() => {
      handlerArduinoById();
    }, [])
  );

  function handleClick(id: number) {
    navigation.navigate("UpdatePlant", {
      itemId: id,
    });
  }

  return (
    <ScrollView>
      <View className="flex flex-row justify-between p-4">
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text className="text-green-800 text-2xl">Voltar</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleClick(itemId)}>
          <Text className="text-green-800 text-2xl">Atualizar</Text>
        </TouchableOpacity>
      </View>

      <Image
        source={require("@/assets/flores.png")}
        className="w-full h-80 fixed"
      />
      <View className="">
        <View className="mt-6">
          <Text className="text-center text-5xl text-green-800 font-bold">
            {autoByArduino.nome}
          </Text>
          <View className=" bg-white mt-5 px-4 py-6 rounded-lg flex-1 justify-between gap-2">
            <View className="flex-1 flex-row items-center justify-between">
              <Text className="text-green-900 text-2xl font-semibold">
                Identificador Arduino
              </Text>
              <Text className="text-green-800 text-3xl">
                {autoByArduino.arduino_id}
              </Text>
            </View>
            <View className="flex-1 flex-row items-center justify-between">
              <Text className="text-green-900 text-2xl font-semibold">
                Temperatura Ideal
              </Text>
              <Text className="text-green-800 text-3xl">
                {autoByArduino.temperatura_ideal}
              </Text>
            </View>
            <View className="flex-1 flex-row items-center justify-between">
              <Text className="text-green-900 text-2xl font-semibold">
                Umidade Ideal
              </Text>
              <Text className="text-green-800 text-3xl">
                {autoByArduino.umidade_ideal}
              </Text>
            </View>
          </View>
          <View className=" bg-white mt-5 px-4 py-6 rounded-lg flex-1 justify-between gap-2">
            <View className="flex-1 flex-row items-center justify-between">
              <Text className="text-green-900 text-2xl font-semibold">
                Umidade Atual
              </Text>
              <Text className="text-green-800 text-3xl">
                {autoByArduino.umidade_atual}
              </Text>
            </View>
            <View className="flex-1 flex-row items-center justify-between">
              <Text className="text-green-900 text-2xl font-semibold">
                Status
              </Text>
              <Text className="text-green-800 text-2xl">
                {autoByArduino.status}
              </Text>
            </View>
          </View>
          <TouchableOpacity 
            className="h-24 bg-white mt-5 px-4 py-6 rounded-lg flex-1 flex-row items-center"
            onPress={() => navigation.navigate("NotificationScreen")}
          >
            <View>
              <Text className="text-green-900 text-4xl font-bold">
                Notificações
              </Text>
              <Text className="text-green-800 text-2xl">
                Ultimas Atualizações
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}
