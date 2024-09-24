import PlantCard from "@/components/plant-card";
import { WelcomeScreenNavigationProp } from "@/types/navigationTypes";
import { ScrollView, Text, View } from "react-native";

type Props = {
  navigation: WelcomeScreenNavigationProp;
};

export default function ListPlants({navigation}: Props) {
  function handleClick(){
    navigation.navigate("PagePlant")
  }
  return (
    <ScrollView>
      <View>
        <Text className="text-3xl font-semibold text-green-900 mt-16 text-center">
          Minhas Plantas
        </Text>
      </View>
      <View className="mt-10 flex-1 gap-2">
        <PlantCard onPress={handleClick}/>
        <PlantCard onPress={handleClick}/>
        <PlantCard onPress={handleClick}/>
      </View>
    </ScrollView>
  );
}
