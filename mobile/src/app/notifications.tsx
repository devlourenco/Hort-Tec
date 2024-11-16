import React from "react";
import { View, Text, FlatList, TouchableOpacity, Image } from "react-native";

const notificationsData = [
  {
    id: "1",
    title: "Rosa: Irrigação",
    dataHora: "08/05/2024 às 20h00",
    umidade: "Normal",
  },
];

type NotificationItem = {
  id: string;
  title: string;
  dataHora: string;
  umidade: string;
};
const NotificationScreen = () => {
  const renderItem = ({ item }: { item: NotificationItem }) => (
    <TouchableOpacity className="bg-white p-4 mb-2 rounded-lg flex-1 flex-row gap-2 items-center">
      <Image
        source={require("@/assets/cactus.png")}
        className="w-24 h-24 rounded-full"
      />
      <View>
        <Text className="text-lg font-semibold text-green-950">
          {item.title}
        </Text>
        <Text className="text-sm text-green-900">{item.dataHora}</Text>
        <Text className="text-sm text-green-900">
          Umidade do Solo: {item.umidade}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View className="flex-1 bg-gray-100 p-4">
      <Text className="text-2xl font-bold text-green-950 mb-4">
        Notificações
      </Text>
      <FlatList
        data={notificationsData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

export default NotificationScreen;
