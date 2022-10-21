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
            var obj=null; 
            const stocksData =new Array();
            console.log(response)
            for(let i=0;i<Object.keys(response).length;i++)
            {
                obj= JSON.parse(response[i])
                stocksData.push(obj)
            }
            console.log(stocksData)
            setData(stocksData)
            
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
            data={ Object.values(stocks).map(({ currentPrice, symbol,volume, dayLow,dayHigh }) => (
        <p key={currentPrice}> {symbol} , price: {currentPrice}, volume: {volume}, day low: {dayLow}, day high: {dayHigh}</p>
      ))}
            renderItem={(stocks) => {
            return (
            <View style={styles.listItem}>
            <Text>{stocks.item}</Text>
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
        flex:0.5,
        alignItems: 'space-between'
      },

});