import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import 'react-native-gesture-handler';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import playersComponent from './components/players-component';
import detailComponent from './components/detail-component';
import videoComponent from './components/video-component';
import addPlayerComponent from './components/addPlayer-component';

export default function App() {

  const Stack = createStackNavigator();

  function MyStack() {
    return (
      <Stack.Navigator>
        <Stack.Screen 
          name="players" 
          component={playersComponent} 
          options={{
            title:"JUGADORES DE BALONCESTO",
            headerTitleAlign:"center",
            headerStyle: {backgroundColor: "#FFC300"},
            headerTintColor: "black",

          }}
        />

      {/*}  <Stack.Screen 
          name="addPlayers"
          component={addPlayerComponent}
          options={{
            title:"AÑADIR JUGADORES",
            headerTitleAlign:"center",
            headerStyle: {backgroundColor: "#F4D03F"},
            headerTintColor: "black",
          }}
        /> */}

        <Stack.Screen 
          name="details" 
          component={detailComponent} 
          options={{
            title:"DETALLES DE LOS JUGADORES",
            headerTitleAlign:"center",
            headerStyle: {backgroundColor: "#F4D03F"},
            headerTintColor: "black",

          }}
        />

        <Stack.Screen 
          name="video" 
          component={videoComponent} 
          options={{
            title:"VIDEOS DE LOS JUGADORES",
            headerTitleAlign:"center",
            headerStyle: {backgroundColor: "F4D03F"},
            headerTintColor: "black",

          }}
        />


    </Stack.Navigator>
    );
  }




  return (
    <NavigationContainer>
      <MyStack />
    </NavigationContainer>
    
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

