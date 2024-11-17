import React, { useCallback, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { AxiosError } from "axios";
import { storageTokenGet } from "@/storange/storageUser";
import { jwtDecode } from "jwt-decode";
import { useFocusEffect } from "expo-router";
import api from "@/config/api";
import { ErrorResponse } from "./cadastro";

type NotificationItem = {
  id: number;
  usuario_id: number;
  nome: string;
  tipo: string;
  status: string;
  data_hora: string;
  umidade: number;
};
const NotificationScreen = () => {
  const [error, setError] = useState<string | null>(null);
  const [notificationsData, setNotificationsData] = useState([]);
  const dataAtual = new Date();
  const dataFormatada = format(dataAtual, "eeee, dd 'de' MMMM 'de' yyyy", {
    locale: ptBR,
  });

  async function handlerLeituras() {
    const token = await storageTokenGet();
    let decoded: UserDto | null = null;

    if (token) {
      decoded = jwtDecode(token);
    } else {
      setError("Token não encontrado");
      return; // Adicione um retorno para evitar chamadas desnecessárias
    }

    const usuario_id = decoded?.id;

    await api
      .get(`/leituras/${usuario_id}`)
      .then((response) => {
        if (response == null) {
          console.log("não sei");
        }
        setNotificationsData(response.data.message)
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
      handlerLeituras();
    }, [])
  );

  const renderItem = ({ item }: { item: NotificationItem }) => (
    <TouchableOpacity className="bg-white p-4 mb-2 rounded-lg flex-1 flex-row gap-2 items-center">
      <Image
        source={require("@/assets/cactus.png")}
        className="w-28 h-28 rounded-full"
      />
      <View>
        <Text className="text-2xl font-semibold text-green-950">
          {item.tipo} - {item.nome}
        </Text>
        <Text className="text-lg text-green-900">
          {format(item.data_hora, "dd 'de' MMMM 'de' yyyy 'às' HH:mm")}
        </Text>
        <Text className="text-lg text-green-900">
          Umidade do Solo: {item.umidade}
        </Text>
        <Text className="text-lg text-green-900">Status: {item.status}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View className="flex-1 bg-gray-100 p-4">
      <Text className="text-4xl  font-bold text-green-950 my-4">
        Notificações
      </Text>
      <FlatList
        data={notificationsData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

export default NotificationScreen;
