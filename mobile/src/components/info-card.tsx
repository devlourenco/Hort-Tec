import { colors } from "@/styles/colors";
import { Feather, FontAwesome6, MaterialCommunityIcons } from "@expo/vector-icons";
import { Text, View } from "react-native";

type Prosp = {
  title: string,
  variable: string,
  icon: string
}

export default function InfoCard(props: Prosp){
  const Icon = () => {
    if (props.icon === "wind") {
      return (
        <Feather name="wind" size={40} color={colors.green[900]} />
      );
    }
    if (props.icon === "humidity") {
      return (
        <MaterialCommunityIcons 
          name="waves" 
          size={40} 
          color={colors.green[900]}
        />
      );
    }
    if (props.icon === "temperatureMin") {
      return (
        <FontAwesome6 
          name="temperature-low" 
          size={40} 
          color={colors.green[900]}
        />
      );
    }
    if (props.icon === "temperatureMax") {
      return (
        <FontAwesome6 
          name="temperature-full" 
          size={40} 
          color={colors.green[900]}
        />
      );
    }
  };
  return(
    <View className="flex-1 items-center m-3">
      <Icon/>
      <Text className="text-green-900 m-5 ml-15 text-base">
        {props.title}
      </Text>
      <Text className="text-green-900 m-5 ml-15">
        {props.variable}
      </Text>
    </View>
  )
}