import React from "react";
import { StyleSheet, Text, View ,StatusBar } from 'react-native';
import { useState } from 'react'
import { fetch_clock,fetch_from_server } from "../client/deltaPredicrClient";
import { useNavigation } from '@react-navigation/native';
import { Searchbar } from 'react-native-paper';
import Icon from "react-native-vector-icons/Ionicons";
import { useInterval } from "react-use";


function Home({route, navigation}){
    const [activeStocks, setActive] = React.useState("");
    const [loserStocks, setLosers] = useState(""); 
    const [gainerStocks, setGainers] = useState(""); 
    const [market, setMarket] = useState(""); 
    const [searchQuery, setSearchQuery] = React.useState('');
    const [currentPrice, setAPrice] = useState([]);
    const [counter, setCounter] = useState(0)
    const onChangeSearch = query => setSearchQuery(query);
    const user = route.params;
    console.log(user)
    const [getUser, setUser] = useState(user);
   

    async function getMarketData() {
        try { 
          const promise = new Promise((resolve, reject) => {
            resolve(fetch_clock() )
          })
          promise.then((response) => {
            setMarket(response["clock"].date+" , "+  response["clock"].description+  " next change: "+ response["clock"].next_change )
            
          })
        } catch (error) {}
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

        } finally {}
        
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

      } finally {}
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
      } finally {}
    }

    //get active stock data not more than once in 3000 ms
    useInterval(() => {
        getActive()
      }, 3000   // Delay in milliseconds or null to stop it
    )
    useInterval(() => {
      getMarketData()
    },  3000    // Delay in milliseconds or null to stop it
    )
    useInterval(() => {
      getLosers()
    },  3000    // Delay in milliseconds or null to stop it
    )
    useInterval(() => {
      getGainers()
    },  3000    // Delay in milliseconds or null to stop it
    )

const handleColors = (newPrice, stockSymbol) => {
  
  const myNextList = [...currentPrice];
  if(myNextList.find(a=>a.symbol === stockSymbol) === undefined ){
    currentPrice.push({ symbol: stockSymbol, price: newPrice })
      // Items after the insertion point:
  }else{
    const artwork = myNextList.find(a=>a.symbol === stockSymbol)
    if(artwork.symbol == stockSymbol) {
      if(artwork.price < newPrice ){
        console.log(newPrice)
        artwork.price = newPrice
        console.log(artwork.price)
        return "green"
      }
      else if (artwork.price > newPrice ){
        console.log(newPrice)
        currentPrice.price = newPrice
        console.log(artwork.price)
        return "red";
      }
      else{
          return "white";
      }
    }
  }
};

    
  return (
 
    <View style={styles.container}>
      
        <View style={styles.centered}>
          <Searchbar 
            style={{height: 40}}
            placeholder="enter symbol"
            type="text"
            value={searchQuery}
            onChangeText={onChangeSearch}
            onIconPress={ event =>event != "" ?  navigation.navigate('StockScreen',{otherParam: searchQuery, userParam: getUser}) : ""}
          /> 
        </View>

        <View style={{backgroundColor: "#131722"}}>
          <View style={{backgroundColor: "#131722", flexDirection: 'row', margin: 35, alignItem: "center",}}>
            <Icon name="time-outline" size={33} color="white"/>
            <Text style={{color: 'white', marginLeft: 15, fontSize: 25, fontWeight: 'bold',}}>
              {market}
            </Text>
          </View>
        </View>

        <View style={{backgroundColor: "#131722"}}>
          <View style={styles.blackScreen}>

              <View style={{backgroundColor: "#131722", margin: 10, flex: 0.33}}>
                <Text style={styles.subTitle}>  Most Active  </Text>
                <Text style={{color: 'white', fontSize: 20, alignSelf: "center" }}> { Object.values(activeStocks).map(({ close, symbol }) => (
                  <p key={close}> <Text style={{ color: 'white'}}>   {symbol} : </Text> <Text style={{ color: handleColors(close,symbol) }}> {close} </Text> </p>
                  ))} 
                </Text>
              </View>
              
              <View style={{backgroundColor: "#131722", margin: 10, flex: 0.333}}>
                <Text style={styles.subTitle}>  Top Losers  </Text>
                <Text style={{ fontSize: 20, alignSelf: "center"}}> { Object.values(loserStocks).map(({ close, symbol }) => (
                  <p key={close}> <Text style={{ color: 'white'}}>   {symbol} : </Text> <Text style={{ color: handleColors(close,symbol) }}> {close} </Text> </p>
                  
                  ))} 
                </Text>
              </View>

              <View style={{backgroundColor: "#131722", margin: 10, flex: 0.333}}>
                <Text style={styles.subTitle}>  Top Gainers  </Text>
                <Text style={{ color: 'white', fontSize: 20, alignSelf: "center" }}>  { Object.values(gainerStocks).map(({ close, symbol }) => (
                  <p key={close}> <Text style={{ color: 'white'}}>   {symbol} : </Text> <Text style={{ color: handleColors(close,symbol) }}> {close} </Text> </p>
                  ))}
                </Text>
              </View>

          </View>
        </View>
        

      </View>
  );


}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#131722",
      justifyContent: 'flex-start',
      alignItem: "center",
    },
    blackScreen: {
      alignItem: "center",
      backgroundColor: "#131722",
      flexDirection: "row",
      margin:20
    },
    subTitle: {
      backgroundColor: "#307d7e",
      color: '#131822',
      borderRadius: 8,
      borderWidth: 3,
      borderColor: '#1e222d',
      fontSize: 25,
      fontWeight: 'bold',
      alignSelf: "center",
    },
    centered: {
      alignSelf: "center",
      justifyContent: 'flex-start',
      backgroundColor: "#131722",
      marginTop: 50,
      
    },
  });
  

export default Home;