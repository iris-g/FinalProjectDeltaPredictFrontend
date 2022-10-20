import React, { useState, useEffect } from "react";
import { useNavigation } from '@react-navigation/native';
import {StyleSheet, Text, View, TextInput, Button, Image, ImageBackground, Platform, FlatList } from "react-native";
import { Searchbar } from 'react-native-paper';
import { useInterval } from "react-use";
import {fetchFavoritesData} from "../client/deltaPredicrClient";



//console.log(this.props.route.params);
export default function FavoriteStocks({route, navigation})    {
   
    //const navigation = useNavigation();
    const [searchQuery, setSearchQuery] = React.useState('');
    const onChangeSearch = query => setSearchQuery(query);
    const [stocks, setData] = useState(''); 
    const user = route.params;


    async function fetch_Data(text) {
        try { 
        const promise = new Promise((resolve, reject) => {
            resolve(fetchFavoritesData(text) )  })
        promise.then((response) => {
            // var obj=null; 
            // const stocks =new Array();
            // for(let i=0;i<Object.keys(response).length;i++)
            // {
            //   obj= JSON.parse(response[i])
            //   stocks.push(obj)
            // }
            setData(Object.values(response))
            console.log(Object.values(response))
            
        })
        } catch (error) {
        } 
        }
        useInterval(() => {
        fetch_Data(user)
        },  8000// Delay in milliseconds or null to stop it
        
        )

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
            <FlatList 
            data={stocks}
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