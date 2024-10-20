import PlantCard, { AutoProps } from "@/components/plant-card";
import api from "@/config/api";
import { storageTokenGet } from "@/storange/storageUser";
import { WelcomeScreenNavigationProp } from "@/types/navigationTypes";
import { AxiosError } from "axios";
import { useFocusEffect } from "expo-router";
import { jwtDecode } from "jwt-decode";
import { useCallback, useEffect, useState } from "react";
import { Alert, ScrollView, Text, View } from "react-native";

type Props = {
  navigation: WelcomeScreenNavigationProp;
};

// Defina ou importe o UserDto aqui
type UserDto = {
  email: string;
};

export default function ListPlants({ navigation }: Props) {
  const [error, setError] = useState<string | null>(null);
  const [listAuto, setListAuto] = useState<AutoProps[]>([]);

  async function handlerArduino() {
    const token = await storageTokenGet();
    let decoded: UserDto | null = null;

    if (token) {
      decoded = jwtDecode(token);
    } else {
      setError("Token não encontrado");
      return; // Adicione um retorno para evitar chamadas desnecessárias
    }

    const mail = decoded?.email;

    await api
      .get(`/usuario-arduino/${mail}`)
      .then((response) => {
        if(response === null){}
        setListAuto(response.data.message);
      })
      .catch((error: AxiosError) => {
        const message = error.response?.data.message || "Erro desconhecido";
        Alert.alert(message);
      });
  }

  useFocusEffect(
    useCallback(() => {
      handlerArduino();
    }, [])
  );

  function handleClick(id: number) {
    navigation.navigate('PagePlant', {
      itemId: id
    });
  }

  return (
    <ScrollView>
      <View>
        <Text className="text-3xl font-semibold text-green-900 mt-16 text-center">
          Minhas Plantas
        </Text>
      </View>
      <View className="mt-10 flex-1 gap-2">
        {listAuto ? (
          listAuto.map((item, index) => {
            return(
              <PlantCard
                onPress={() => handleClick(item.id)}
                key={index}
                id={item.id}
                nome={item.nome.charAt(0).toUpperCase() + item.nome.slice(1)}
                umidade_ideal={item.umidade_ideal}
                temperatura_ideal={item.temperatura_ideal}
              />
            )
          })
        ) : (
          <></>
        )}
      </View>
    </ScrollView>
  );
}
