import React, { useState, useEffect, useCallback, useRef} from "react";
import { StyleSheet, Text, View ,ActivityIndicator,TouchableOpacity, Dimensions, StatusBar, Alert } from 'react-native';
import { useInterval } from "react-use";
import { fetch_clock,fetch_from_server } from "../client/deltaPredicrClient";
import Icon from "react-native-vector-icons/Ionicons";
import { AutocompleteDropdown } from 'react-native-autocomplete-dropdown';
import Papa from 'papaparse';
import Feather from 'react-native-vector-icons/Feather'
Feather.loadFont()

function Home({route, navigation}){
    const [activeStocks, setActive] = React.useState("");
    const [loserStocks, setLosers] = useState(""); 
    const [gainerStocks, setGainers] = useState(""); 
    const [market, setMarket] = useState(""); 
    const [currentPrice, setAPrice] = useState([]);   
    const [loading, setLoad] = useState(true); 
    const user = route.params;
    const [getUser, setUser] = useState(user);
    const [parsedCsvData, setParsedCsvData] = useState([]);
    const onOpenSuggestionsList = useCallback(isOpened => {}, [])
    const dropdownController = useRef(null)
    const searchRef = useRef(null)
   
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
                const  obj= (results.data[i][0])
                arr.push({"id": i ,"title": obj})
              }
          setParsedCsvData(arr)   
              
        },
      });
    };
  

    //Read top50 stock csv file once.
    useEffect(() => {
      parseFile(topStocks);
    },  [])


    // const onChangeSearch = query => {
    //   setSearchQuery(query);
    //    //create a filtered stock list 
    //   if (query) {
    //     const temp = query
    //      // Setting the filtered film array according the query
    //     const tempList = parsedCsvData.filter(item => {
    //       if (String(item).substring(0,temp.length).search(temp) >=0)
    //         return item
    //   })
    //      setFilteredStocks(tempList)
       
    //    } else {
    //      // If the query is null then return blank
    //      setFilteredStocks([]);
    //    }
    //  };
  
     const onClearPress = useCallback(() => {
      setFilteredStocks(null)
    }, [])


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

    const handleColors = (newPrice, stockSymbol) => {
      if(currentPrice.find(a=>a.symbol === stockSymbol) === undefined ){  
        currentPrice.push({ symbol: stockSymbol, price: newPrice })
          // Items after the insertion point:
      }else{
        const artwork = currentPrice.find(a=>a.symbol === stockSymbol)
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

    //get active stock data not more than once in 3000 ms
    useInterval(() => {
        getActive()
    },  3000   // Delay in milliseconds or null to stop it
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


    
  return (
 
    <View style={styles.container}>
      <View style={{backgroundColor: "#131722"}}>
        <View style={styles.searchSection}>
        <Icon style={styles.iconInAutocomplete} name="search-sharp" size={22} color= "#777777"/>
            <AutocompleteDropdown 
               
                ref={searchRef}
                controller={controller => {dropdownController.current = controller}}
                // initialValue={'1'}
                // useFilter={false} // set false to prevent rerender twice
                dataSet={parsedCsvData} //Data set for suggestion list parsedCsvData = top50.csv
                // onChangeText={{onChangeSearch}}
                onSelectItem={item => {item && setSelectedItem(item.id)}}
                debounce={600} 
                suggestionsListMaxHeight={Dimensions.get('window').height * 0.2}
                onClear={onClearPress}
                onOpenSuggestionsList={onOpenSuggestionsList}
                loading={loading}
                textInputProps={{placeholder: 'Enter the stock symbol', autoCorrect: false, autoCapitalize: 'none', style: {color: '#434243', paddingLeft: 50}}}
                rightButtonsContainerStyle={{right: 30, height: 30, alignSelf: 'center'}} // Style for x buttons container.
                inputContainerStyle={{alignSelf: 'center', width: '105%'}} // Style for input container.
                suggestionsListContainerStyle={{alignSelf: 'center', width: '105%'}} // Style for suggestions list container.
                containerStyle={{ flexGrow: 1, flexShrink: 1 }}
                renderItem={(item, text) => <TouchableOpacity onPress={() => {navigation.navigate('StockScreen',{otherParam: item.title, userParam: getUser})}}><Text style={{ color: '#494849', padding: 15, zIndex: 1 }}>{item.title}</Text></TouchableOpacity>}
                ChevronIconComponent={<Feather name="chevron-down" size={20} color="#434243" />} // Add icon to input container.
                ClearIconComponent={<Feather name="x" size={20} color="#434243" />} // Add icon to input container.
                inputHeight={38} // Change the input container height.
                showChevron={true} //
                closeOnBlur={false} //
                // showClear={false}
              />
              </View>

          <View style={styles.viewMarketTime}>
            <Icon name="time-outline" size={33} color="white"/>
            <Text style={styles.textMarketTime}>
              {market}
            </Text>
          </View>
       
          <View style={styles.blackScreen}>
              <View style={styles.viewSubTitle}> 
                <Text style={styles.subTitle}>  Most Active ↑↓ </Text>
                <Text style={styles.textStocks}> { Object.values(activeStocks).map(({ close, symbol }) => (
                  <p key={close}> <Text style={{ color: 'white'}}>   {symbol} : </Text> <Text style={{ color: handleColors(close,symbol) }}> {close} <Text style={{fontSize: 10, color: 'white'}}>USD</Text> </Text> </p>))} 
                </Text>
              </View>
              
              <View style={styles.viewSubTitle}>
                <Text style={styles.subTitle}>  Top Losers ↑↓  </Text>
                <Text style={styles.textStocks}> { Object.values(loserStocks).map(({ close, symbol }) => (
                  <p key={close}> <Text style={{ color: 'white'}}>   {symbol} : </Text> <Text style={{ color: handleColors(close,symbol) }}> {close} <Text style={{fontSize: 10, color: 'white'}}>USD</Text> </Text> </p>))} 
                </Text>
                <ActivityIndicator style={{backgroundColor: "#131722"}} size="large" color="#307D7E"  animating={loading} hidesWhenStopped={true} /> 
              </View>

              <View style={styles.viewSubTitle}>
                <Text style={styles.subTitle}>  Top Gainers ↑↓  </Text>
                <Text style={styles.textStocks}>  { Object.values(gainerStocks).map(({ close, symbol }) => (
                  <p key={close}> <Text style={{ color: 'white'}}> {symbol} : </Text> <Text style={{ color: handleColors(close,symbol) }}> {close} <Text style={{fontSize: 10, color: 'white'}}>USD</Text> </Text> </p>))}
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
    searchSection: {
      flexDirection: 'row',
      alignSelf: "center",
      alignItem: "center",
      justifyContent: 'center',
      marginTop: 30,
    },
    iconInAutocomplete:{
      left: 0,
      padding: 10,
      position: 'absolute',
      zIndex: 100,
    },
    viewMarketTime: {
      backgroundColor: "#131722",
      flexDirection: 'row',
      margin: 35,
      alignItem: "center",
      zIndex: -1,
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
      margin:20,
      zIndex: -1,
    },
    viewSubTitle: {
      backgroundColor: "#131722",
      margin: 10,
      flex: 0.333,
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
  });
  

export default Home;