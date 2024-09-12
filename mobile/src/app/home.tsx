import { jwtDecode } from "jwt-decode";
import { storageTokenRemove, storageTokenGet } from "@/storange/storageUser";
import { WelcomeScreenNavigationProp } from "@/types/navigationTypes";
import { useEffect, useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";

type Props = {
  navigation: WelcomeScreenNavigationProp;
};

export default function Home({navigation}: Props){
  const [tokenData, setTokenData] = useState<UserDto | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const user = async () => {
      const token = await storageTokenGet();
      
      if(token){
        const decoded: UserDto = jwtDecode(token)
        console.log(decoded);
        setTokenData(decoded)
      } else {
        setError("Token não encontrado")
      }
    }

    user()
  },[])

  async function handleLogout(){
    storageTokenRemove()
    navigation.navigate("Login")
  }

  return(
    <View className="flex-1 justify-center items-center">
      <Text>Pagina Inicial</Text>
      <TouchableOpacity onPress={handleLogout}>
        <Text>Sair</Text>
      </TouchableOpacity>
    </View>
  )
}