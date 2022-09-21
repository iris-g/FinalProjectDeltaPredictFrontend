
import { StyleSheet, Text, View } from 'react-native';
import Welcome from './Views/Welcome.js'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DrawerNavigator from './Views/DrawerNavigator.js';
import SignUp from './Views/SignUp.js';
import 'react-native-gesture-handler';
import stockScreen from './Views/StockScreen.js';
import StockScreen from './Views/StockScreen.js';


//create stack for navigation bewteen screens   
const Stack = createNativeStackNavigator();
    
export default function App() {
  return (
    <NavigationContainer>
    <Stack.Navigator initialRouteName="Welcome" >
      <Stack.Screen name="Dashboard" component={DrawerNavigator}  options={{ headerShown: false }} />
      <Stack.Screen name="Welcome" component={Welcome} options={{ headerShown: false }}/>
      <Stack.Screen name="SignUp" component={SignUp} options={{ headerShown: false }}/>
      <Stack.Screen name="StockScreen" component={StockScreen} options={{ headerShown: false }}/>
      
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
