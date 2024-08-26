import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function Cadastro() {
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
          <Text className="text-4xl font-semibold text-green-900">Já nos conhecemos?</Text>
          <Text className="text-lg text-green-900">Se sim,&ensp;
            <Text className="underline">
             clique aqui!
            </Text>
          </Text>
        </View>

        <View className="flex-1 gap-6 w-screen px-7">
          <View className="flex-1">
            <Text className="text-base text-green-800">Nome Completo</Text>
            <TextInput className="border-b py-4"/>
          </View>
          <View className="flex-1">
            <Text className="text-base text-green-800">E-mail</Text>
            <TextInput className="border-b py-4"/>
          </View>
          <View className="flex-1">
            <Text className="text-base text-green-800">Senha</Text>
            <TextInput className="border-b py-4"/>
          </View>
          <View className="flex-1">
            <Text className="text-base text-green-800">Confirmar senha</Text>
            <TextInput className="border-b py-4"/>
          </View>

          <TouchableOpacity className="mt-10 p-4 bg-green-300 rounded-lg">
            <Text 
              className="text-lg font-semibold text-white text-center"
            >
              Cadastrar
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
