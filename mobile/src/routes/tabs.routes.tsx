import Home from "@/app/home";
import ListPlants from "@/app/list-plants";
import NewPlant from "@/app/new-plant";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import AntDesign from "@expo/vector-icons/AntDesign";
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';

const Tab = createBottomTabNavigator();

export default function TabRoutes() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ color, size }) => (
            <AntDesign 
              name="home" 
              color={color} 
              size={size}
            />
          ),
          tabBarLabel: "Inicio"
        }}
      />
      <Tab.Screen  
        name="ListPlants" 
        component={ListPlants}
        options={{
          tabBarIcon: ({ color, size }) => 
            <FontAwesome6 
              name="plant-wilt" 
              size={size} 
              color={color} 
            />,
          tabBarLabel: "Minhas Plantas"
        }} 
      />
      <Tab.Screen
        name="NewPlant"
        component={NewPlant}
        options={{
          tabBarIcon: ({ color, size }) => (
            <AntDesign 
              name="pluscircleo" 
              size={size} 
              color={color} 
            />
          ),
          tabBarLabel: "Nova Planta"
        }}
      />
    </Tab.Navigator>
  );
}
