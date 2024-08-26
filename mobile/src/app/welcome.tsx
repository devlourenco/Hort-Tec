import { View, Text, Image, TouchableOpacity } from "react-native";
import AntDesign from '@expo/vector-icons/AntDesign';

export default function Welcome() {
  return (
    <View className="flex-1 items-center justify-center px-7 gap-10">
      <Text className="font-semibold text-4xl text-center text-green-900">Gerencie suas plantas de forma fácil</Text>
      <Image
        className="w-80 h-80 object-contain" 
        source={require("@/assets/home.png")}
      />
      <Text className="text-green-800 text-lg text-center">Não esqueça mais de regar suas plantas. Deixe que cuidamos disso..</Text>
      <TouchableOpacity 
        className="bg-green-500 p-4 rounded-xl"
        
      >
        <AntDesign name="right" size={24} color="white" />
      </TouchableOpacity>
    </View>
  );
}
