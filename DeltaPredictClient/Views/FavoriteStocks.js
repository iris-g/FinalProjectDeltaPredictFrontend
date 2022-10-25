import React, { useState, useEffect } from "react";
import {StyleSheet, Text, View, TextInput, Button, Image, ImageBackground, Platform, FlatList } from "react-native";
import { Searchbar } from 'react-native-paper';
import { useInterval } from "react-use";
import {fetchFavoritesData} from "../client/deltaPredicrClient";


export default function FavoriteStocks({route, navigation})    {
    
    const [searchQuery, setSearchQuery] = React.useState('');
    const onChangeSearch = query => setSearchQuery(query);
    const [stocks, setData] = useState(''); 
    const [selectedId, setSelectedId] = useState(null);
    const user = route.params;


    async function fetch_Data(text) {
        try { 
        const promise = new Promise((resolve, reject) => {
            resolve(fetchFavoritesData(text))})
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
        },  7000 // Delay in milliseconds or null to stop it
        )

        function _onPressButton (symbol) { // On press button its transition to stock page.
            navigation.navigate('StockScreen',{otherParam: symbol.key,}) 
        }

    return (
        <View style={styles.container}>
            <View style={styles.centeredSearch}>
                <Searchbar 
                style={{height: 40}}
                placeholder="enter symbol"
                type="text"
                justifyContent= "center"
                alignItems= "center"
                value={searchQuery}
                onChangeText={onChangeSearch}
                onIconPress={ event =>event != "" ?  navigation.navigate('StockScreen',{otherParam: searchQuery,}) : ""}
                /> 
        </View>
            <FlatList 
                data={ Object.values(stocks).map(({ currentPrice, symbol,volume, dayLow,dayHigh }) => (
                <p key={symbol}> {symbol} , price: {currentPrice}, volume: {volume}, day low: {dayLow}, day high: {dayHigh}</p>))}
                renderItem={(stocks) => {
                    return (
                        <View style={styles.listItem}>
                            <Button title={stocks.item} onPress={(item) => _onPressButton(stocks.item)}></Button>
                        </View>
                );}}
             />
        </View>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#131722",
        justifyContent: 'flex-start',
    },
    listItem: {
        borderWidth: 1,
        padding: 25,
        flex:0.5,
        alignItems: 'space-between'
      },
      centeredSearch: {
        flex: 1,
        alignItems: "center",
        backgroundColor: "#131722",
        marginTop: 50,
        margin: 35,
        
      },
});