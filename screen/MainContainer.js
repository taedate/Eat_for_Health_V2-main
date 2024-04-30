import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Ionicons from 'react-native-vector-icons/Ionicons';

import AiMode from './Navigationbtn/AiMode';
import Home from './Navigationbtn/Home';
import Splash from './Splash';
import FormFood from './FormFood';
import MenuScreen from './MenuScreen';
import CameraAi from './CameraAi';
import OutputAI from './constants/OutputAI';
import OutputAICMR from './constants/OutputAICMR';

const homeName = "Home";
const AiName = "AI Mode";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const MainContainer = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
      <Stack.Screen
          name="Splash"
          component={Splash}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Main"
          component={Tabs}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="FormFood"
          component={FormFood}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Home"
          component={Home}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="MenuScreen"
          component={MenuScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="CameraAi"
          component={CameraAi}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="OutputAI"
          component={OutputAI}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="OutputAICMR"
          component={OutputAICMR}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const Tabs = () => {
  return (
    <Tab.Navigator
  initialRouteName={homeName}
  screenOptions={({ route }) => ({
    tabBarIcon: ({ focused, color, size }) => {
      let iconName;
      let rn = route.name;

      if (rn === homeName) {
        iconName = focused ? 'home' : 'home-outline';

      } else if (rn === AiName) {
        iconName = focused ? 'happy' : 'happy-outline';
      }

      return <Ionicons name={iconName} size={size} color={color} />;
    },
    tabBarActiveTintColor: '#fff',
    tabBarInactiveTintColor: 'gray',
    tabBarLabelStyle: { paddingBottom: 0, fontSize: 15 , fontWeight: 'bold'},
    tabBarStyle: { padding: 10, height: 80 , backgroundColor: '#f48fb1'}
  })}
>
  <Tab.Screen name={homeName} component={Home} options={{ headerShown: false }}/>
  <Tab.Screen name={AiName} component={AiMode} options={{ headerShown: false }}/>
</Tab.Navigator>
  );
}

export default MainContainer;
