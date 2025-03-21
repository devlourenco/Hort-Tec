import { jwtDecode } from "jwt-decode";
import { storageTokenRemove, storageTokenGet } from "@/storange/storageUser";
import { WelcomeScreenNavigationProp } from "@/types/navigationTypes";
import { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Image, ScrollView } from "react-native";
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import Fontisto from '@expo/vector-icons/Fontisto';
import { colors } from "@/styles/colors";
import LoadingScreen from "@/components/loading-screen";
import { 
  getCurrentPositionAsync,
  requestForegroundPermissionsAsync,  
} from 'expo-location'
import apiWeather, { currentProps } from "@/config/weatherApi";

type Props = {
  navigation: WelcomeScreenNavigationProp;
};

export default function Home({navigation}: Props){
  const [tokenData, setTokenData] = useState<UserDto | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [weather, setWeather] = useState<currentProps | null>(null);

  const dataAtual = new Date();
  const dataFormatada = format(dataAtual, "eeee, dd 'de' MMMM 'de' yyyy", { locale: ptBR });

  function kelvinParaCelsius(kelvin: number): number {
    return Math.round(kelvin - 273.15);
  }

  async function requestLocationPermissions(){
    const { granted } = await requestForegroundPermissionsAsync()

    if(granted){
      const currentPosition = await getCurrentPositionAsync()
      const data = await apiWeather(currentPosition.coords.latitude, currentPosition.coords.longitude)
      setWeather(data)
    }
  }

  const user = async () => {
    const token = await storageTokenGet();
    
    if(token){
      const decoded: UserDto = jwtDecode(token)
      setTokenData(decoded)
    } else {
      setError("Token não encontrado")
    }
  }

  useEffect(() => {
    user()
    requestLocationPermissions()
  },[])

  async function handleLogout(){
    storageTokenRemove()
    navigation.navigate("Login")
  }

  function handleWeather(){
    navigation.navigate("WeatherPage")
  }

  if(weather === null){
    return <LoadingScreen />;
  }

  return(
    <ScrollView scrollEnabled={false} className="mt-10 px-5">

      <View className="flex-1 flex-row justify-between items-center">
        <View>
          <Text className="text-3xl text-green-800">Olá {tokenData?.nome}</Text>
          <Text className="text-xl text-green-900">{dataFormatada}</Text>
        </View>
        <Image source={require("@/assets/avatar.png")} className="w-20 h-20 rounded-full" />
      </View>

      <TouchableOpacity
        onPress={() => navigation.navigate("NotificationScreen")} 
        className="h-24 bg-white mt-5 px-4 py-6 rounded-lg flex-1 flex-row justify-between items-center"
      >
        <View>
          <Text className="text-green-900 text-3xl font-bold">Notificações</Text>
          <Text className="text-green-800 text-xl">Ultimas Atualizações</Text>
        </View>
        <Fontisto name="email" size={24} color={colors.green[900]}/>
      </TouchableOpacity>

      <TouchableOpacity className="h-24 bg-white mt-5 px-4 py-6 rounded-lg flex-1 flex-row justify-between items-center" onPress={handleWeather}>
        <View>
          <Text className="text-green-900 text-3xl font-bold">Clima</Text>
          <Text className="text-green-800 text-xl">{weather.locationName}</Text>
        </View>
        <Text className="text-green-900 text-2xl font-bold">{
          kelvinParaCelsius(weather.currentTemperature)
        }ºC</Text>
      </TouchableOpacity>
      <TouchableOpacity className="p-4" onPress={handleLogout}>
        <Text className="text-green-900 font-bold text-3xl">Sair</Text>
      </TouchableOpacity>

    </ScrollView>
  )
}