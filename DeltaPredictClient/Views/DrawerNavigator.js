
import React from "react";
import { Text, View, Button ,Pressable, Image} from 'react-native';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem } from "@react-navigation/drawer";
import Home from "./Home.js";
import SectorStockScreen from "./SectorStockScreen.js"
import FavoriteStocks from "./FavoriteStocks"
import { color } from "react-native-reanimated";
import Ionicons from 'react-native-vector-icons/Ionicons';
import Icon from "react-native-vector-icons/Ionicons";



const Drawer = createDrawerNavigator();



const DrawerContent = (props) => {
    return (
        <View>
            <View style={{ flexDirection: 'row' }}>
                    <Image style={{ flex: 0.8, width: 100, height: 80, margin: 20, }} resizeMode="contain" source={require('../assets/Photos/ImageForDrawer_rev.png')} />
            </View>
 
            <View>
                <DrawerContentScrollView>
                    <DrawerItemList {...props} />
                </DrawerContentScrollView>
            </View>
            <View style={{ flexDirection: "row", marginTop: '50%', marginRight: 45, alignItems: 'center', justifyContent: 'center'}}>
                <Icon name={"exit-outline"} size={20} style= {{padding: 5, paddingRight: 75, position:'absolute', right: 0, color: 'white'}}/>
                <Button title = "logout " uppercase={false} color = "#1e222d" style={{paddingRight: 100 }} onPress={() => {navigation.navigate('Welcome')} }/>
            </View>  
        </View>
            
  )};



 
const DrawerNavigator = ({route,navigation}) => { //##
    
    return (
        <Drawer.Navigator initialRouteName="Dashboard" screenOptions={{
           
            drawerStyle: {backgroundColor: '#1e222d'},         //Change color  background  drawer
            headerTintColor: "white",        // Change color hamburger icon to white
            }}
            drawerContent = {(props)=> <DrawerContent {...props}/>}
        >   
        
        
        
        <Drawer.Screen name="Home" initialParams={route.params} component={Home} options={{
                drawerIcon: ({focused, size}) => (
                    <Ionicons
                     name="home"
                     size={size}
                     color={focused ? '#7cc' : '#ccc'}
                    />
                ),
          headerTitleStyle: {color: 'white', fontSize: 18,},
          headerStyle: { backgroundColor: '#1e222d'},          
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
          headerStyle: { backgroundColor: '#1e222d'},
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
          headerStyle: { backgroundColor: '#1e222d'},          
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
          headerStyle: { backgroundColor: '#1e222d'},          
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
          headerStyle: { backgroundColor: '#1e222d'},          
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
          headerStyle: { backgroundColor: '#1e222d'},          
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
          headerStyle: { backgroundColor: '#1e222d'},          
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
          headerStyle: {backgroundColor: '#1e222d'},          
          drawerItemStyle: {color: 'white', fontSize: 18,},
          drawerLabelStyle:{color:'white', fontSize: 18,},
          
        }}/>
        
        </Drawer.Navigator>
    );
}



export default DrawerNavigator;





