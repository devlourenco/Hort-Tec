import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function Login() {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS == "ios" ? "padding" : "height"}
      className={Platform.OS == "ios" ? 
        "pt-20 flex-1 items-center" : 
        "flex-1 items-center pt-10"
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
          <View className="flex-1">
            <Text className="text-base text-green-800">E-mail</Text>
            <TextInput className="border-b py-4"/>
          </View>
          <View className="flex-1">
            <Text className="text-base text-green-800">Senha</Text>
            <TextInput className="border-b py-4"/>
          </View>

          <TouchableOpacity className="mt-10 p-4 bg-green-300 rounded-lg">
            <Text 
              className="text-lg font-semibold text-white text-center"
            >
              Entrar na Plataforma
            </Text>
          </TouchableOpacity>
        </View>

        <View className="flex-1 gap-1 items-center mt-10">
          <Text className="text-green-800 underline">Esqueceu a senha?</Text>
          <Text className="text-green-800 underline">Não possui conta? Crie uma agora</Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
