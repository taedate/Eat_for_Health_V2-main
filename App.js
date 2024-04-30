import React from 'react';
import { View, Text } from 'react-native';
import Splash from './screen/Splash';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import FormFood from './screen/FormFood';
import MenuScreen from './screen/MenuScreen';
import CameraAi from './screen/CameraAi';
import Home from './screen/Navigationbtn/Home';
import MainContainer from './screen/MainContainer';
const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <MainContainer/>
    // <NavigationContainer>
      
    //   {/* <Stack.Navigator initialRouteName="Splash" screenOptions={{ gestureEnabled: false }}>
    //     <Stack.Screen
    //       name="Splash"
    //       component={Splash}
    //       options={{ headerShown: false }}
    //     />
    //     <Stack.Screen
    //       name="Home"
    //       component={Home}
    //       options={{ headerShown: false }}
    //     />
    //     <Stack.Screen
    //       name="FormFood"
    //       component={FormFood}
    //       options={{ headerShown: false }}
    //     />
    //     <Stack.Screen
    //       name="MenuScreen"
    //       component={MenuScreen}
    //       options={{ headerShown: false }}
    //     />
    //     <Stack.Screen
    //       name="CameraAi"
    //       component={CameraAi}
    //       options={{ headerShown: false }}
    //     />
    //   </Stack.Navigator> */}
    // </NavigationContainer>
    
  );
};

export default App;