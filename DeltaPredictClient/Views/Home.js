import React from "react";
import { StyleSheet, Text, View ,ActivityIndicator,TouchableOpacity, StatusBar, Alert } from 'react-native';
import { useState, useEffect } from 'react'
import { fetch_clock,fetch_from_server } from "../client/deltaPredicrClient";
import { Searchbar } from 'react-native-paper';
import Icon from "react-native-vector-icons/Ionicons";
import { useInterval } from "react-use";
import Autocomplete from 'react-native-autocomplete-input';
import Papa from 'papaparse';
import { ListItem } from 'react-native-elements'
    

function Home({route, navigation}){
    const [activeStocks, setActive] = React.useState("");
    const [loserStocks, setLosers] = useState(""); 
    const [gainerStocks, setGainers] = useState(""); 
    const [market, setMarket] = useState(""); 
    const [searchQuery, setSearchQuery] = React.useState('');
    const [currentPrice, setAPrice] = useState([]);   
    const [loading, setLoad] = useState(true); 
    const user = route.params;
    const [getUser, setUser] = useState(user);
    const [parsedCsvData, setParsedCsvData] = useState([]);
      // For Filtered search Data
    const [filteredStocks, setFilteredStocks] = useState([]);
  
    //get file with top 50 stocks
    var topStocks = require('../assets/top50.csv');
    //reac csv file with top stocks into  an array
    const parseFile = file => {
      Papa.parse(file, {
        header: false,
        download: true,
        complete: results => {
          const arr =new Array();
              for(let i=0;i<Object.keys(results.data).length;i++)
              {
                const  obj= (results.data[i ][0])
                arr.push(obj)
              }
          setParsedCsvData(arr)   
              
        },
      });
    };
  
  
    //read top50 stock csv file
    useEffect(() => {
      parseFile(topStocks);
    
  
    },  [])
  
    async function getMarketData() {
        try { 
          const promise = new Promise((resolve, reject) => {
            resolve(fetch_clock() )
          })
          promise.then((response) => {
            setMarket(response["clock"].date+" , "+  response["clock"].description+  " next change: "+ response["clock"].next_change)
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
            setLoad(false)
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
          artwork.price = newPrice
          return '#1f8779';
        }
        else if (artwork.price > newPrice ){
          
          currentPrice.price = newPrice
          return '#af2d3a';
        }
        else{
            return "white";
        }
      }
    }
  };
  const onChangeSearch = query => {
    setSearchQuery(query);
     //create a filtered stock list 
    if (query) {
      const temp = query
       // Setting the filtered film array according the query
      const tempList = parsedCsvData.filter(item => {
        if (String(item).substring(0,temp.length).search(temp) >=0)
          return item
    })
       setFilteredStocks(tempList)
     
     } else {
       // If the query is null then return blank
       setFilteredStocks([]);
     }
   };

    
  return (
 
    <View style={styles.container}>
      <View style={{backgroundColor: "#131722"}}>
      <View style={styles.centered}>
            <View style={styles.searchSection}>
            <View style={{alignSelf: "center"}}>
              <Icon style={styles.iconInAutocomplete} name="search-sharp" size={20} color= "gray"/>
              <Autocomplete style={{ backgroundColor: 'white', color: 'gray', height: 40, flex: 1, padding: 10, paddingLeft: 50, borderRadius: 6, fontSize: 16,}}
                containerStyle={styles.autocompleteContainer}
                inputContainerStyle={styles.inputContainer}
                autoCorrect={false}
                autoCapitalize="none"
                data={filteredStocks}
                value={searchQuery}
                onChangeText={onChangeSearch}
                placeholder="Enter the stock symbol"
                flatListProps={{ keyExtractor: (_, idx) => idx, renderItem: ({ item ,index}) =>  (
                  <TouchableOpacity
                    key={index.toString()} 
                    onPress={() => { setSearchQuery(item); setFilteredStocks([]); console.log(getUser); navigation.navigate('StockScreen',{otherParam: item, userParam: getUser})}}> 
            
                    <ListItem bottomDivider >
                    <ListItem.Content>
                    <ListItem.Title>{item}</ListItem.Title>
                    </ListItem.Content>
                    <ListItem.Chevron />
                    </ListItem>
                  </TouchableOpacity>)}}/> 
                </View> 
            </View>    
          </View>

        <View style={{backgroundColor: "#131722"}}>
          <View style={styles.viewMarketTime}>
            <Icon name="time-outline" size={33} color="white"/>
            <Text style={styles.textMarketTime}>
              {market}
            </Text>
          </View>
        </View>

        <View style={{backgroundColor: "#131722"}}>
        
          <View style={styles.blackScreen}>

              <View style={styles.viewSubTitle}> 
                <Text style={styles.subTitle}>  Most Active ↑↓ </Text>
                <Text style={styles.textStocks}> { Object.values(activeStocks).map(({ close, symbol }) => (
                  <p key={close}> <Text style={{ color: 'white'}}>   {symbol} : </Text> <Text style={{ color: handleColors(close,symbol) }}> {close} </Text> </p>))} 
                </Text>
              </View>
              
              <View style={styles.viewSubTitle}>
                <Text style={styles.subTitle}>  Top Losers ↑↓  </Text>
                <Text style={styles.textStocks}> { Object.values(loserStocks).map(({ close, symbol }) => (
                  <p key={close}> <Text style={{ color: 'white'}}>   {symbol} : </Text> <Text style={{ color: handleColors(close,symbol) }}> {close} </Text> </p>))} 
                </Text>
                <ActivityIndicator style={{backgroundColor: "#131722"}} size="large" color="#307D7E"  animating={loading} hidesWhenStopped={true} /> 
              </View>

              <View style={styles.viewSubTitle}>
                <Text style={styles.subTitle}>  Top Gainers ↑↓  </Text>
                <Text style={styles.textStocks}>  { Object.values(gainerStocks).map(({ close, symbol }) => (
                  <p key={close}> <Text style={{ color: 'white'}}> {symbol} : </Text> <Text style={{ color: handleColors(close,symbol) }}> {close} </Text> </p>))}
                </Text>
              </View>

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
    iconInAutocomplete:{
      paddingLeft: 35,
      padding: 10,
      position: 'absolute',
      zIndex: 100,
    },
    viewMarketTime: {
      backgroundColor: "#131722",
      flexDirection: 'row',
      margin: 35,
      alignItem: "center",
    },
    textMarketTime: {
      color: 'white',
      marginLeft: 15,
      fontSize: 25,
      fontWeight: 'bold',
    },
    blackScreen: {
      alignItem: "center",
      backgroundColor: "#131722",
      flexDirection: "row",
      margin:20
    },
    inputContainer: {
      minWidth: 330,
      width: "90%",
      backgroundColor: 'transparent',
      borderColor: 'transparent',
    },
    viewSubTitle: {
      backgroundColor: "#131722",
      margin: 10,
      flex: 0.333,
    },
    searchSection: {
      flexDirection: 'row',
      marginLeft: '5%',
      marginRight: '5%',
    },
    autocompleteContainer: {
      borderWidth: 0,
      marginLeft: 10,
      marginRight: 10,
      paddingLeft: 15,
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
    textStocks: {
      fontSize: 20,
      alignSelf: "center",
    },
    centered: {
      alignSelf: "center",
      justifyContent: 'flex-start',
      backgroundColor: "#131722",
      marginTop: 50,
      marginRight: 50,
    },
  });
  

export default Home;