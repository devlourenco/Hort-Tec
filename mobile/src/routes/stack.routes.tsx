import { useEffect, useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TabRoutes from "./tabs.routes";

import Cadastro from "@/app/cadastro";
import Login from "@/app/login";
import Welcome from "@/app/welcome";
import WeatherPage from "@/app/weather-page";
import LoadingScreen from "@/components/loading-screen";
import PagePlant from "@/app/page-plant";

import { storageTokenGet } from "@/storange/storageUser";

const Stack = createNativeStackNavigator();

export default function StackRoutes() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const checkToken = async () => {
      try {
        const token = await storageTokenGet();
        if (token) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.error("Erro ao verificar o token:", error);
        setIsAuthenticated(false);
      }
    };

    checkToken();
  }, []);

  if (isAuthenticated === null) {
    return <LoadingScreen />;
  }

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {isAuthenticated && <Stack.Screen name="App" component={TabRoutes} />}
      <Stack.Screen name="Welcome" component={Welcome} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Cadastro" component={Cadastro} />
      <Stack.Screen name="WeatherPage" component={WeatherPage} />
      <Stack.Screen name="PagePlant" component={PagePlant} />
    </Stack.Navigator>
  );
}
