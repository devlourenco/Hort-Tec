import { colors } from "@/styles/colors";
import { Feather, Fontisto } from "@expo/vector-icons";
import { Text, View } from "react-native";

type props = {
  title: string;
  temperature: string;
  icon: string;
};

export default function MainCard(props: props) {

  const Icon = () => {
    if (props.icon === "morning") {
      return (
        <Feather name="sun" size={40} color={colors.green[900]} />
      );
    }
    if (props.icon === "afternoon") {
      return (
        <Fontisto
          name="day-cloudy"
          size={40}
          color={colors.green[900]}
        />
      );
    }
    if (props.icon === "night") {
      return (
        <Feather 
          name="moon" 
          size={40}
          color={colors.green[900]} 
        />
      );
    }
  };

  return (
    <View className="flex-1 items-center justify-center m-3 w-28 h-52 bg-gray-50 rounded-lg">
      <Text className="text-xl text-green-900">
        {props.title}
      </Text>
      <Icon/>
      <Text className="text-xl text-green-900">{props.temperature}</Text>
    </View>
  );
}
