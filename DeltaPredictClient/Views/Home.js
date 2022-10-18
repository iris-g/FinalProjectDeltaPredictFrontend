import React from "react";
import { StyleSheet, Text, View ,StatusBar, Platform } from 'react-native';
import {useEffect,useState,useCallback  } from 'react'
import {fetch_clock,fetch_from_server,fetchData} from "../client/deltaPredicrClient";
import { useDebounce } from 'use-lodash-debounce'
import { useNavigation } from '@react-navigation/native';
import { Searchbar } from 'react-native-paper';
import { useInterval } from "react-use";


function Home(){
    const [activeStocks, setActive] = React.useState("");
    const [loserStocks, setLosers] = useState(""); 
    const [gainerStocks, setGainers] = useState(""); 
    const [market, setMarket] = useState(""); 
    const [searchQuery, setSearchQuery] = React.useState('');

  const onChangeSearch = query => setSearchQuery(query);

//get app navigation
const navigation = useNavigation();
const lastValue = useDebounce(activeStocks, 500);
async function getMarketData() {
      if(Platform.OS === "web"){
        try { 
          
          const promise = new Promise((resolve, reject) => {
            resolve(fetch_clock() )
          })
          promise.then((response) => {
            setMarket(response["clock"].date+" , "+  response["clock"].description+  " next change: "+ response["clock"].next_change )
            
          })
        } catch (error) {
      
        
        }
      }
      
    }

async function getActive() {
    
    try { 
      const promise = new Promise((resolve, reject) => {
        resolve(fetch_from_server("GET",'activeStockData') )
      })
      promise.then((response) => {
        setActive(response)
        
      })
    } catch (error) {
    } finally {
    
    
    }
  }

  //get active stock data not more than once in 3000 ms
  useInterval(() => {
      getActive()
    },
    // Delay in milliseconds or null to stop it
  3000
  )
  useInterval(() => {
    getMarketData()
  },  3000// Delay in milliseconds or null to stop it
  
  )

     
  return (

    <View style={styles.container}>
    <View style={styles.blackScreen}>
    <View style={styles.centered}>
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
      </View>
      </View>
      <h1 style={{ color: 'white', fontSize: 23}}>  {market}</h1>
      <View style={styles.blackScreen}>
        <Text style={{ color: 'white', fontSize: 20, flex: 4 }}> Most Active:{  Object.values(activeStocks).map(({ close, symbol }) => (
      <p key={close}> {symbol} : {close} </p>
    ))} </Text>
    <Text style={{ color: 'white', fontSize: 20, flex: 4 }}> Top Losers:{  Object.values(loserStocks).map(({ close, symbol }) => (
      <p key={close}> {symbol} : {close} </p>
    ))} </Text>
        <Text style={{ color: 'white', fontSize: 20, flex: 2 }}>  Top Gainers:{gainerStocks} </Text>
      </View>
    </View>
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










