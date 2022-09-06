
import React from "react";
import { StyleSheet, Text, View,Button ,Pressable} from 'react-native';
import { createDrawerNavigator } from "@react-navigation/drawer";

//var yahooFinance = require('yahoo-finance');




const Drawer = createDrawerNavigator();


function DashboardScreen({navigation}) {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Home Screen</Text>
        </View>
    );
}
function FavoritesScreen() {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>favorites Screen</Text>
        </View>
    );
}
const DrawerNavigator = () => {
    return (
        <Drawer.Navigator initialRouteName="Dashboard" >
        <Drawer.Screen name="Dashboard" component={DashboardScreen} />
        <Drawer.Screen name="Favorites" component={FavoritesScreen} />
        </Drawer.Navigator>
    
    );
}

export default DrawerNavigator;