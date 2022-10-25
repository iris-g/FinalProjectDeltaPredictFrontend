
import React from "react";
import { StyleSheet, Text, View,Button ,Pressable} from 'react-native';
import { createDrawerNavigator } from "@react-navigation/drawer";
import Home from "./Home.js";
import SectorStockScreen from "./SectorStockScreen.js"
import FavoriteStocks from "./FavoriteStocks"
import { color } from "react-native-reanimated";
import Ionicons from 'react-native-vector-icons/Ionicons';


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
    //console.log(route.params); //##
    
    return (
         <Drawer.Navigator initialRouteName="Dashboard" screenOptions={{
           
             drawerStyle: {backgroundColor: '#1e222d',},         //Change color  backgrund  drawer
             headerTintColor: "white",        // Change color hamburger icon to white
            
            
             }} >

        

        <Drawer.Screen name="Home" component={Home} options={{
                drawerIcon: ({focused, size}) => (
                    <Ionicons
                     name="home"
                     size={size}
                     color={focused ? '#7cc' : '#ccc'}
                    />
                ),
          headerTitleStyle: {color: 'white', fontSize: 18,},
          headerStyle: { backgroundColor: '#131722'},          
          drawerItemStyle: {color: 'white', fontSize: 18,},
          drawerLabelStyle:{color:'white', fontSize: 18,},
          
        }}/>

        <Drawer.Screen name="Favorites" initialParams={route.params} component={FavoriteStocks} options={{ //##
                drawerIcon: ({focused, size}) => (
                    <Ionicons
                     name="ios-heart"
                     size={size}
                     color={focused ? '#7cc' : '#ccc'}
                    />
                ),
          headerTitleStyle: {color: 'white', fontSize: 18,},
          headerStyle: { backgroundColor: '#131722'},
          drawerItemStyle: {color: 'white'},
          drawerLabelStyle:{color:'white', fontSize: 18,},
          
        }}/>

          <Drawer.Screen name="Healthcare" component={SectorStockScreen} initialParams={"Healthcare"} options={{
                drawerIcon: ({focused, size}) => (
                    <Ionicons
                     name="pulse-outline"
                     size={size}
                     color={focused ? '#7cc' : '#ccc'}
                    />
                ),
          headerTitleStyle: {color: 'white', fontSize: 18,},
          headerStyle: { backgroundColor: '#131722'},          
          drawerItemStyle: {color: 'white', fontSize: 18,},
          drawerLabelStyle:{color:'white', fontSize: 18,},
          
        }}/>
          <Drawer.Screen name="Technology" component={SectorStockScreen} initialParams={"Technology"} options={{
                drawerIcon: ({focused, size}) => (
                    <Ionicons
                     name="rocket-outline"
                     size={size}
                     color={focused ? '#7cc' : '#ccc'}
                    />
                ),
          headerTitleStyle: {color: 'white', fontSize: 18,},
          headerStyle: { backgroundColor: '#131722'},          
          drawerItemStyle: {color: 'white', fontSize: 18,},
          drawerLabelStyle:{color:'white', fontSize: 18,},
          
        }}/>
        <Drawer.Screen name="Energy" component={SectorStockScreen} initialParams={"Energy"} options={{
                drawerIcon: ({focused, size}) => (
                    <Ionicons
                     name="ios-nuclear"
                     size={size}
                     color={focused ? '#7cc' : '#ccc'}
                    />
                ),
          headerTitleStyle: {color: 'white', fontSize: 18,},
          headerStyle: { backgroundColor: '#131722'},          
          drawerItemStyle: {color: 'white', fontSize: 18,},
          drawerLabelStyle:{color:'white', fontSize: 18,},
          
        }}/>
         <Drawer.Screen name="Basic Materials" component={SectorStockScreen} initialParams={"Basic Materials"} options={{
                drawerIcon: ({focused, size}) => (
                    <Ionicons
                     name="ios-construct"
                     size={size}
                     color={focused ? '#7cc' : '#ccc'}
                    />
                ),
          headerTitleStyle: {color: 'white', fontSize: 18,},
          headerStyle: { backgroundColor: '#131722'},          
          drawerItemStyle: {color: 'white', fontSize: 18,},
          drawerLabelStyle:{color:'white', fontSize: 18,},
          
        }}/>
        <Drawer.Screen name="Real Estate" component={SectorStockScreen} initialParams={"Real Estate"} options={{
                drawerIcon: ({focused, size}) => (
                    <Ionicons
                     name="receipt-outline"
                     size={size}
                     color={focused ? '#7cc' : '#ccc'}
                    />
                ),
          headerTitleStyle: {color: 'white', fontSize: 18,},
          headerStyle: { backgroundColor: '#131722'},          
          drawerItemStyle: {color: 'white', fontSize: 18,},
          drawerLabelStyle:{color:'white', fontSize: 18,},
          
        }}/>
          <Drawer.Screen name="Utilities" component={SectorStockScreen} initialParams={"Utilities"} options={{
                drawerIcon: ({focused, size}) => (
                    <Ionicons
                     name="cash"
                     size={size}
                     color={focused ? '#7cc' : '#ccc'}
                    />
                ),
          headerTitleStyle: {color: 'white', fontSize: 18,},
          headerStyle: {backgroundColor: '#131722'},          
          drawerItemStyle: {color: 'white', fontSize: 18,},
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





