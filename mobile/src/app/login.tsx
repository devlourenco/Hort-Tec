import { WelcomeScreenNavigationProp } from "@/types/navigationTypes";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

type Props = {
  navigation: WelcomeScreenNavigationProp;
};

export default function Login({navigation}: Props) {
  
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS == "ios" ? "padding" : "height"}
      className={Platform.OS == "ios" ? 
        "pt-20 flex-1 items-center" : 
        "pt-10 flex-1 items-center"
      }
    >
      <ScrollView 
        keyboardShouldPersistTaps="handled"
      >
        <View className="flex-1 items-center gap-2 mb-20">
          <Text className="text-4xl font-semibold text-green-900">Hort-Tec</Text>
          <Text className="text-lg text-green-900">Faça login e comece a usar</Text>
        </View>

        <View className="flex-1 gap-6 w-screen px-7">
          <View className="flex-1 gap-1">
            <Text className="text-lg text-green-900">E-mail:</Text>
            <TextInput className="border-b py-2 px-1 border-green-900 text-green-800"/>
          </View>
          <View className="flex-1 gap-1">
            <Text className="text-lg text-green-900">Senha:</Text>
            <TextInput className="border-b py-2 px-1 border-green-900 text-green-800"/>
          </View>

          <TouchableOpacity className="mt-14 p-4 bg-green-300 rounded-lg">
            <Text 
              className="text-lg font-semibold text-white text-center"
            >
              Entrar na Plataforma
            </Text>
          </TouchableOpacity>
        </View>

        <View className="flex-1 gap-1 items-center mt-10">
          <Text className="text-green-800 underline text-base">Esqueceu a senha?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Cadastro')}>
            <Text className="text-green-800 underline text-base">Não possui conta? Crie uma agora</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
