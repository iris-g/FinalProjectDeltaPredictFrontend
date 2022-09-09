
import React from "react";
import { StyleSheet, Text, View,Button ,Pressable} from 'react-native';
import { createDrawerNavigator } from "@react-navigation/drawer";
import Home from "./Home.js";
//var yahooFinance = require('yahoo-finance');


const Drawer = createDrawerNavigator();


function FavoritesScreen() {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>favorites Screen</Text>
        </View>
    );
}
const DrawerNavigator = ({navigation}) => {
    return (
        <Drawer.Navigator initialRouteName="Dashboard" >
        <Drawer.Screen name="Home" component={Home} />
        <Drawer.Screen name="Favorites" component={FavoritesScreen} />
        </Drawer.Navigator>
    
    );
}

export default DrawerNavigator;