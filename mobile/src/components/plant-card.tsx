import { WelcomeScreenNavigationProp } from "@/types/navigationTypes";
import { GestureResponderEvent, Image, Text, TouchableOpacity, View } from "react-native";

type Props = {
  onPress: (event: GestureResponderEvent) => void;
};

export default function PlantCard({onPress}: Props) {
  return (
    <TouchableOpacity 
      className=" bg-white p-4 rounded-lg flex-1 flex-row items-center gap-4 mx-2"
      onPress={onPress}
    >
      <Image source={require("@/assets/cactus.png")} className="w-24 h-24 rounded-full" />
      <View>
        <Text className="text-green-900 text-2xl font-bold">Alface</Text>
        <Text className="text-green-800 text-xs">Umidade do solo: Normal</Text>
        <Text className="text-green-800 text-xs">Ultima irrigação: 20/09/2024</Text>
      </View>
    </TouchableOpacity>
  );
}
