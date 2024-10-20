import { Image, Text, TouchableOpacity, View } from "react-native";


export type AutoProps = {
  nome: string
  umidade_ideal: string
  temperatura_ideal: string
  id: number
  onPress: () => void
};

export default function PlantCard({ nome,  temperatura_ideal, umidade_ideal, id, onPress }: AutoProps) {
  return (
    <TouchableOpacity 
      className=" bg-white p-4 rounded-lg flex-1 flex-row items-center gap-4 mx-2"
      onPress={onPress}
    >
      <Image source={require("@/assets/cactus.png")} className="w-24 h-24 rounded-full" />
      <View>
        <Text className="text-green-900 text-2xl font-bold">
          {nome}
        </Text>
        <Text className="text-green-800 text-xs">Umidade do solo: {umidade_ideal}</Text>
        <Text className="text-green-800 text-xs">Temperatura ideal: {temperatura_ideal}</Text>
      </View>
    </TouchableOpacity>
  );
}
