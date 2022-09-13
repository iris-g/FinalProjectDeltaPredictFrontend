import React from "react";
import { StyleSheet, Text, View,Button ,Pressable,Ticker,ScrollView ,StatusBar,SafeAreaView,FlatList,Image   } from 'react-native';
import {useEffect,useState} from 'react'
// import TradingViewWidget, { Themes } from 'react-tradingview-widget';
// import { StockMarket } from "react-ts-tradingview-widgets";
// import { SymbolInfo } from "react-ts-tradingview-widgets";




function Home(){
    const [activeStocks, setActive] = useState("");
    const [loserStocks, setLosers] = useState(""); 
    const [gainerStocks, setGainers] = useState(""); 
    const [market, setMarket] = useState(""); 
    const request = require('request');
    useEffect(() => {
        // Update the document title using the browser API
        request({
            method: 'get',
            url: 'https://api.tradier.com/v1/markets/clock',
            qs: {
                'delayed': 'true'
            },
            headers: {
                'Authorization': 'Bearer <TOKEN>',
                'Accept': 'application/json'
            }
            }, (error, response, body) => {
                setMarket(body)
            });
          ////
            
        },[]);

    fetch('http://localhost:5000/activeStockData', {
        method: 'GET', 
        headers: { 'Content-Type': 'application/json' }, 
    })
    .then(res => res.json())
    .then(data => {setActive(data ) });
    fetch('http://localhost:5000/losersStockData', {
        method: 'GET', 
        headers: { 'Content-Type': 'application/json' }, 
    })
    .then(res => res.json())
    .then(data => {setLosers(data ) });
    

    return (
        <SafeAreaView style={styles.container}>
        <ScrollView style={styles.scrollView}>
        <Text style={{ color: 'white' , fontSize: 22,flex:1}}>  Market:{market} </Text>
        <View style={styles.blackScreen}>
        <Text style={{ color: 'white' , fontSize: 20,flex:3}}> Most Active:{activeStocks[1]} {'\n'}{activeStocks[2]} {'\n'}{activeStocks[3]} {"\n"} {activeStocks[4]}  {"\n"} {activeStocks[5]} {"\n"} {activeStocks[6]}</Text>
        <Text style={{ color: 'white' , fontSize: 20,flex:2}}>  Top Losers:{loserStocks}  </Text>
        <Text style={{ color: 'white' , fontSize: 20,flex:1}}>  Top Gainers:{gainerStocks} </Text>
        {/* <h1  style={{ color: 'white' }}>{data[1]} {'\n'}{data[2]}  {'\n'}{data[3]} {"\n"} {data[4]} </h1> */}
        </View>
        </ScrollView>
    </SafeAreaView>
    );


}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: StatusBar.currentHeight,
    },
    scrollView: {
      backgroundColor: "#131722",
      marginHorizontal: 20,
    },
    text: {
      fontSize: 42,
    },
    blackScreen: {
        flexDirection: "row",
        backgroundColor: "#1e222d",
        
    },
  });
  

export default Home;










