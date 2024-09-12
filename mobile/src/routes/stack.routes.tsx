import { useEffect, useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TabRoutes from './tabs.routes';

import Cadastro from "@/app/cadastro"
import Login from "@/app/login"
import Welcome from "@/app/welcome"

import { storageTokenGet } from '@/storange/storageUser';

const Stack = createNativeStackNavigator()

export default function StackRoutes(){
  return(
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Welcome" component={Welcome} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Cadastro" component={Cadastro} />
      <Stack.Screen name="App" component={TabRoutes}/>
    </Stack.Navigator>
  )
} 
