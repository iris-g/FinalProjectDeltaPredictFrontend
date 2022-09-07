
import { StyleSheet, Text, View } from 'react-native';
import SignInScreen from './Views/SignInScreen.js'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DrawerNavigator from './Views/DrawerNavigator.js';
import 'react-native-gesture-handler';


//create stack for navigation bewteen screens   
const Stack = createNativeStackNavigator();
    
export default function App() {
  return (
    <NavigationContainer>
    <Stack.Navigator initialRouteName="Home" >
      <Stack.Screen name="Dashboard" component={DrawerNavigator}   options={{ headerShown: false }} />
      <Stack.Screen name="Home" component={SignInScreen} options={{ headerShown: false }}/>
    </Stack.Navigator>
  </NavigationContainer>
  );
}    
//hey
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#15202B',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
