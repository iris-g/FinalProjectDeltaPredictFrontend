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
    const save = new Map([["PARA", 0], ["EXR", 0], ["EL", 0], ["DVN", 0], ["TRMB", 0], ["TEL", 0]])
    const [currentPrice, setAPrice] = useState([]);
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

const handleColors = (newPrice, stockSymbol) => {
  
  const myNextList = [...currentPrice];
  if(myNextList.find(a=>a.symbol === stockSymbol) === undefined ){
    console.log(stockSymbol)
   
    currentPrice.push({ symbol: stockSymbol, price: newPrice })
      // Items after the insertion point:
      
   
  }else{
    console.log(currentPrice.length)
 
    const artwork = myNextList.find(a=>a.symbol === stockSymbol)
    if(artwork.symbol == stockSymbol) {
      if(artwork.price <= newPrice ){
        console.log(newPrice)
        artwork.price = newPrice
        console.log(artwork.price)
        return "green"
      }else{
        currentPrice.price = newPrice
        return "red";
      }
    }
  }

 
  


    // if(save.get(symbol) == 1){
    //   save.set(symbol, val)
    //   return "red";
    // }
    // if(save.get(symbol) == 0)
    //   return "green";
    // console.log("----------------------------")
    // console.log(save.get(symbol))
    // console.log("----------------------------")
    //   if(!(save.has(symbol,price)))
    //    save.set(symbol, price)
    
    //   if (price >= parseFloat(save.get(symbol))){
    //     save.set(symbol, val)
    //     console.log(save.size)
    //     console.log(symbol)
    //     console.log(save.get(symbol))
    //     return "green";
    //   }
    //   if(price < parseFloat(save.get(symbol))){
    //     save.set(symbol, val)
    //     return "red";
    //   } 

};

    
  return (

    <View style={styles.container}>
      <View style={styles.blackScreen}>
        <View style={styles.centered}>
          <Searchbar 
            style={{height: 40}}
            placeholder="enter symbol"
            type="text"
            value={searchQuery}
            onChangeText={onChangeSearch}
            onIconPress={ event =>event != "" ?  navigation.navigate('StockScreen',{
                otherParam: searchQuery,
              }) : ""}
          /> 
        </View>
      </View>

      <h1 style={{color: '#b2b5be', fontSize: 23, marginTop: 30, marginLeft: 30}}>  {market}</h1>

        <View style={styles.blackScreen}>
            <View style={{margin: 10, flex: 0.33}}>
              <Text style={styles.subTitle}>  Most Active  </Text>
              <Text style={{color: 'white', fontSize: 20, alignSelf: "center" }}> { Object.values(activeStocks).map(({ close, symbol }) => (
                <p key={close}> {symbol} : {close} </p>
                ))} 
              </Text>
            </View>
            
            <View style={{margin: 10, flex: 0.333}}>
              <Text style={styles.subTitle}>  Top Losers  </Text>
              <Text style={{ fontSize: 20, alignSelf: "center"}}> { Object.values(loserStocks).map(({ close, symbol }) => (
                <p key={close}> <Text style={{ color: 'white'}}>   {symbol} : </Text> <Text style={{ color: handleColors(close,symbol) }}> {close} </Text> </p>
                
                ))} 
              </Text>
            </View>

            <View style={{margin: 10, flex: 0.333}}>
              <Text style={styles.subTitle}>  Top Gainers  </Text>
              <Text style={{ color: 'white', fontSize: 20, alignSelf: "center" }}>  { Object.values(gainerStocks).map(({ close, symbol }) => (
                <p key={close}> {symbol} : {close} </p>
                ))}
              </Text>
            </View>

        </View>

      </View>
  );


}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#131722",
      paddingTop: StatusBar.currentHeight,
    },
    blackScreen: {
      flexDirection: "row",
      marginLeft:20
    },
    subTitle: {
      backgroundColor: "#307d7e",
      color: '#131822',
      borderRadius: 10,
      borderWidth: 3,
      borderColor: '#1e222d',
      fontSize: 25,
      fontWeight: 'bold',
      alignSelf: "center",
    },
    centered: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      marginTop: 50,
    },
  });
  

export default Home;
