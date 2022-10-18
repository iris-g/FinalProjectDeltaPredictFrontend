
import React from "react";
import { StyleSheet, Text, View,Button ,Pressable} from 'react-native';
import { createDrawerNavigator } from "@react-navigation/drawer";
import Home from "./Home.js";
import FavoriteStocks from "./FavoriteStocks"
import { color } from "react-native-reanimated";
//var yahooFinance = require('yahoo-finance');


const Drawer = createDrawerNavigator();


// function FavoritesScreen() {
//     return (
//         <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
//             <Text>favorites Screen</Text>
//         </View>
//     );
// }
const DrawerNavigator = ({route,navigation}) => { //##
    console.log(route.params); //##
    return (
         <Drawer.Navigator initialRouteName="Dashboard" screenOptions={{
           
             drawerStyle: {backgroundColor: '#1e222d',},         //Change color  backgrund  drawer
             headerTintColor: "white",        // Change color hamburger icon to white
            
            
             }} >
        
        

        <Drawer.Screen name="Home" component={Home} options={{
          headerTitleStyle: {fontFamily: 'Gugi-Regular', color: 'white', fontSize: 18,},
          headerStyle: { backgroundColor: '#131722'},          
          drawerItemStyle: {color: 'white', fontSize: 18,},
          drawerLabelStyle:{color:'white', fontSize: 18,},
          
        }}/>
        <Drawer.Screen name="Favorites" initialParams={route.params} component={FavoriteStocks} options={{ //##
          headerTitleStyle: {fontFamily: 'Gugi-Regular', color: 'white', fontSize: 18,},
          headerStyle: { backgroundColor: '#131722'},
          drawerItemStyle: {color: 'white'},
          drawerLabelStyle:{color:'white', fontSize: 18,},
          
        }}/>
        
        </Drawer.Navigator>
    
    );
}




const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#131722",
        justifyContent: 'flex-start',
        // ...Platform.select({
        //     android: {backgroundColor: '#FFFFFF',},

        // })
    },
 

});


export default DrawerNavigator;





