import { Image, Text, TouchableOpacity, View } from "react-native";


export type AutoProps = {
  nome: string
  umidade_ideal: number
  temperatura_ideal: number
  id: number
  umidade_atual: number
  status: number
  onPress: () => void
};

export default function PlantCard(props: AutoProps) {
  return (
    <TouchableOpacity 
      className=" bg-white p-4 rounded-lg flex-1 flex-row items-center gap-4 mx-2"
      onPress={props.onPress}
    >
      <Image source={require("@/assets/cactus.png")} className="w-28 h-28 rounded-full" />
      <View>
        <Text className="text-green-900 text-4xl font-bold">
          {props.nome}
        </Text>
        <Text className="text-green-800 text-xl">Umidade do solo: {props.umidade_atual}</Text>
        <Text className="text-green-800 text-xl">Status: {props.status}</Text>
      </View>
    </TouchableOpacity>
  );
}
