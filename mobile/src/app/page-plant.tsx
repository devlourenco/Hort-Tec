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

type AutoPropsById = {
  id: number;
  usuario_id: number;
  arduino_id: number;
  nome: string;
  umidade_ideal: string;
  temperatura_ideal: string;
};

type Props = {
  navigation: WelcomeScreenNavigationProp;
};

export default function PagePlant({ navigation }: Props) {
  const [autoByArduino, setAutoByArduino] = useState<AutoPropsById[]>([]);

  const route = useRoute();
  const { itemId } = route.params;

  console.log(itemId);

  async function handlerArduinoById() {
    await api
      .get(`/usuario-arduino/id/${itemId}`)
      .then((response) => {
        setAutoByArduino(response.data.message[0]);
        console.log(response.data.message[0]);
      })
      .catch((error: AxiosError) => {
        const message = error.response?.data.message || "Erro desconhecido";
        Alert.alert(message);
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
          <Text className="text-green-800 text-lg">Voltar</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleClick(itemId)}>
          <Text className="text-green-800 text-lg">Atualizar</Text>
        </TouchableOpacity>
      </View>

      <Image
        source={require("@/assets/flores.png")}
        className="w-full h-80 fixed"
      />
      <View className="">
        <View className="mt-6">
          <Text className="text-center text-3xl text-green-800 font-bold">
            {autoByArduino.nome}
          </Text>
          <View className=" bg-white mt-5 px-4 py-6 rounded-lg flex-1 justify-between gap-2">
            <View className="flex-1 flex-row items-center justify-between">
              <Text className="text-green-900 text-xl font-semibold">
                Identificador Arduino
              </Text>
              <Text className="text-green-800 text-xl">
                {autoByArduino.arduino_id}
              </Text>
            </View>
            <View className="flex-1 flex-row items-center justify-between">
              <Text className="text-green-900 text-xl font-semibold">
                Temperatura Ideal
              </Text>
              <Text className="text-green-800 text-xl">
                {autoByArduino.temperatura_ideal}
              </Text>
            </View>
            <View className="flex-1 flex-row items-center justify-between">
              <Text className="text-green-900 text-xl font-semibold">
                Umidade Ideal
              </Text>
              <Text className="text-green-800 text-xl">
                {autoByArduino.umidade_ideal}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
