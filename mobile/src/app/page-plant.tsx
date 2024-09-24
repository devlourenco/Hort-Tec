import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";

export default function PagePlant() {
  return (
    <ScrollView>
      <Image
        source={require("@/assets/flores.png")}
        className="w-full h-80 fixed"
      />
      <View className="">
        <View className="mt-6">
          <Text className="text-center text-3xl text-green-800 font-bold">
            Alface
          </Text>
        </View>
        <View className="h-24 bg-white mt-5 px-4 flex-1 justify-between items-center flex-row">
          <Text className="text-green-900 text-2xl font-semibold">Umidade do solo</Text>
          <Text className="text-green-900 text-xl">70%</Text>
        </View>
        <TouchableOpacity className="h-24 bg-white mt-5 px-4 flex-1 justify-center">
          <Text className="text-green-900 text-2xl font-semibold">Histórico</Text>
          <Text className="text-green-800 text-xs">Ultima irrigação: 20/09/2024</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
