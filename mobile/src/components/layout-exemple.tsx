import { Slot } from 'expo-router'; // Certifique-se de importar o Slot corretamente
import { View, StatusBar } from 'react-native';
import '@/styles/global.css'; // Importar o CSS global (se aplicável)

import {
  useFonts,
  Jost_400Regular,
  Jost_500Medium,
  Jost_600SemiBold,
  Jost_700Bold
} from "@expo-google-fonts/jost"

import { Loading } from '@/components/loading';

function Layout() {
  const [fontsLoaded] = useFonts({
    Jost_400Regular,
    Jost_500Medium,
    Jost_600SemiBold,
    Jost_700Bold
  })

  if(!fontsLoaded){
    return <Loading/>
  }

  return (
    <View className="flex-1 items-center justify-center bg-brand-100">
      <StatusBar 
        barStyle="dark-content" 
        backgroundColor="transparent" 
        translucent
      />
      <Slot />
    </View>
  );
}

export default Layout; // Exporte o Layout, não o Slot

