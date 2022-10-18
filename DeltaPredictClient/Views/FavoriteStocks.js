import React, { useState, useEffect } from "react";
import { useNavigation } from '@react-navigation/native';
import {StyleSheet, Text, View, TextInput, Button, Image, ImageBackground, Platform, FlatList } from "react-native";
import { Searchbar } from 'react-native-paper';
import Welcome from "./Welcome"
import { NavigationContainer, DrawerActions } from '@react-navigation/native';


//console.log(this.props.route.params);
export default function FavoriteStocks({route, navigation})    {
   
    //const navigation = useNavigation();
    const [searchQuery, setSearchQuery] = React.useState('');
    const onChangeSearch = query => setSearchQuery(query);
    const [data, setData] = useState('');
   
    console.log(route.params);  
    const otherParam = route.params;
    console.log(otherParam)

    fetch('http://localhost:5000/getuser', {
        method: 'POST', 
        headers: { 'Content-Type': 'application/json' }, 
        body: JSON.stringify(otherParam)
    })
    .then(res => res.json())
    .then(data => { setData(data.result)})

    
   // return getDataFromServer;

    // function getFavoriteStockListFromTheServer(getDataFromServer){
    //     console.log (getDataFromServer);
    //     DATA = getDataFromServer;
    //     return getDataFromServer;
    // }
   
   

    return (
         
        <View style={styles.container}>
            
            <Searchbar 
                style={{height: 40}}
                placeholder=""
                type="text"
                value={searchQuery}
                onChangeText={onChangeSearch}
                onIconPress={ event =>event != "" ?  navigation.navigate('StockScreen',{
                    otherParam: searchQuery,
                }) : ""}
            />
            <Text>{data}</Text>
            <FlatList 
               data={data}
               renderItem={(data) => {
                return (
                <View style={styles.listItem}>
                <Text>{data.item}</Text>
                </View>
                );}}
         
            />


        </View>

    );



}const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#131722",
        justifyContent: 'flex-start',
        // ...Platform.select({
        //     android: {backgroundColor: '#FFFFFF',},

        // })
    },
    listItem: {
        backgroundColor: "orange",
        borderWidth: 1,
        borderColor: "#333",
        padding: 25,
      },

});