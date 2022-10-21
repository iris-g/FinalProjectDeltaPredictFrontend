import React from "react";
import { StyleSheet, Text, View ,StatusBar } from 'react-native';
import {useEffect,useState  } from 'react'
import {fetch_clock,fetch_from_server,fetchData} from "../client/deltaPredicrClient";
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

async function getMarketData() {
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

async function getActive() {
    try { 
      const promise = new Promise((resolve, reject) => {
        resolve(fetch_from_server("GET",'activeStockData') )
      })
      promise.then((response) => {
        var obj=null; 
        const active =new Array();
        for(let i=0;i<Object.keys(response).length;i++)
        {
          obj= JSON.parse(response[i])
          active.push(obj)
        }
        setActive(active)
        
      })
    } catch (error) {
    } finally {
    
    
    }
  }
  async function getLosers() {
    try { 
      const promise = new Promise((resolve, reject) => {
        resolve(fetch_from_server("GET",'losersStockData') )
      })
      promise.then((response) => {
        var obj=null; 
        const losers =new Array();
        for(let i=0;i<Object.keys(response).length;i++)
        {
          obj= JSON.parse(response[i])
          losers.push(obj)
        }
        setLosers(losers)
        
      })
    } catch (error) {
    } finally {
    
    
    }
  }
  async function getGainers() {
    try { 
      const promise = new Promise((resolve, reject) => {
        resolve(fetch_from_server("GET",'gainersStockData') )
      })
      promise.then((response) => {
        var obj=null; 
        const losers =new Array();
        for(let i=0;i<Object.keys(response).length;i++)
        {
          obj= JSON.parse(response[i])
          losers.push(obj)
        }
        setGainers(losers)
        
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
  useInterval(() => {
    getLosers()
  },
  // Delay in milliseconds or null to stop it
3000
)
useInterval(() => {
  getGainers()
},
// Delay in milliseconds or null to stop it
3000
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
          <Text style={{ color: 'white', fontSize: 20, flex: 2 }}> Top Gainers: { Object.values(gainerStocks).map(({ close, symbol }) => (
        <p key={close}> {symbol} : {close} </p>
      ))} </Text>
        </View>
      </View>
    );


}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#1e222d",
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
        marginLeft:20
        
    },
    centered: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#1e222d",
      marginTop: 50,
    },
  });
  

export default Home;
