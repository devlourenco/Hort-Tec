import { useEffect, useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { Feather } from "@expo/vector-icons";
import MainCard from "@/components/main-card";
import InfoCard from "@/components/info-card";
import apiWeather, { currentProps } from "@/config/weatherApi";
import { WelcomeScreenNavigationProp } from "@/types/navigationTypes";
import LoadingScreen from "@/components/loading-screen";
import { colors } from "@/styles/colors";
import {
  getCurrentPositionAsync,
  requestForegroundPermissionsAsync,
} from "expo-location";

type Props = {
  navigation: WelcomeScreenNavigationProp;
};

export default function WeatherPage({ navigation }: Props) {
  const [weather, setWeather] = useState<currentProps | null>(null);

  async function requestLocationPermissions() {
    const { granted } = await requestForegroundPermissionsAsync();

    if (granted) {
      const currentPosition = await getCurrentPositionAsync();
      const data = await apiWeather(
        currentPosition.coords.latitude,
        currentPosition.coords.longitude
      );
      setWeather(data);
    }
  }

  useEffect(() => {
    requestLocationPermissions();
  }, []);

  function kelvinParaCelsius(kelvin: number): number {
    return Math.round(kelvin - 273.15);
  }

  if (weather === null) {
    return <LoadingScreen />;
  }

  return (
    <ScrollView scrollEnabled={false}>
      <View className="flex-1 items-center">
        <Feather
          className="mt-10"
          name="sun"
          size={60}
          color={colors.green[900]}
        />
      </View>

      <View className="flex-1 flex-row justify-center mt-10">
        <Text className="text-green-900 text-5xl">
          {kelvinParaCelsius(weather.currentTemperature)}
        </Text>
        <Text className="text-green-900 text-sm">°C</Text>
      </View>

      <Text className="text-center mt-4 text-green-900">
        {weather.locationName}
      </Text>

      <View className="flex-1 items-center rounded-2xl w-screen mt-4 bg-gray-50">

        <Text className="p-4 text-xl font-bold text-green-900">
          Informações adicionais:
        </Text>
        <View className="flex-1 flex-row flex-wrap">
          <InfoCard 
            title={"Vento"} 
            variable={`${weather.wind.toString()}m/h`}
            icon="wind" 
          />
          <InfoCard 
            title={"Umidade"} 
            variable={`${weather.humidity.toString()}%`}
            icon="humidity"  
          />
          <InfoCard 
            title={"Temp. Min"} 
            variable={
              `${kelvinParaCelsius(weather.temperatureMin).toString()}°`
            }
            icon="temperatureMin"
          />
          <InfoCard 
            title={"Temp. Max"} 
            variable={
              `${kelvinParaCelsius(weather.temperatureMax).toString()}°`
            }
            icon="temperatureMax"
          />
        </View>
      </View>
    </ScrollView>
  );
}
