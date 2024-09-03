import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Cadastro from "@/app/cadastro"
import Login from "@/app/login"
import Welcome from "@/app/welcome"

const Stack = createNativeStackNavigator()

export default function StackRoutes(){
  return(
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Welcome" component={Welcome} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Cadastro" component={Cadastro} />
    </Stack.Navigator>
  )
} 
