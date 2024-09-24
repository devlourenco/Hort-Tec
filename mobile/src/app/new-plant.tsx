import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function NewPlant() {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS == "ios" ? "padding" : "height"}
      className={
        Platform.OS == "ios"
          ? "pt-20 flex-1 items-center"
          : "flex-1 items-center pt-10"
      }
    >
      <ScrollView keyboardShouldPersistTaps="handled">
        <View className="flex-1 items-center gap-1 mb-10">
          <Text className="text-3xl font-semibold text-green-900">
            Nova Planta
          </Text>
        </View>

        <View className="flex-1 gap-6 w-screen px-7">
          <View className="flex-1 gap-1">
            <Text className="text-base text-green-900">Identificador Arduino:</Text>
            <TextInput
              className="border-b py-2 text-green-800"
            />
          </View>
          <View className="flex-1 gap-1">
            <Text className="text-base text-green-900">Nome da Planta:</Text>
            <TextInput
              className="border-b py-2 text-green-800"
            />
          </View>
          <View className="flex-1 gap-1">
            <Text className="text-base text-green-900">Umidade ideal:</Text>
            <TextInput
              className="border-b py-2 text-green-800"
            />
          </View>
          <View className="flex-1 gap-1">
            <Text className="text-base text-green-900">Temperatura ideal:</Text>
            <TextInput
              className="border-b py-2 text-green-800"
            />
          </View>

          <TouchableOpacity
            className="mt-10 p-4 bg-green-300 rounded-lg"
          >
            <Text className="text-lg font-semibold text-white text-center">
              Cadastrar
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
