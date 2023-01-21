import React, { useState, useEffect, useCallback, useRef} from "react";
import {StyleSheet, Text, View, FlatList, Pressable, ActivityIndicator ,TouchableOpacity, Dimensions} from "react-native";
import { useInterval } from "react-use";
import { fetchFavoritesData } from "../client/deltaPredicrClient";
import { deletFromFavoriteStockList } from "../client/deltaPredicrClient";
import ScrollViewIndicator from 'react-native-scroll-indicator';
import { Table, Row } from 'react-native-table-component';
import Icon from "react-native-vector-icons/Ionicons";
import { AutocompleteDropdown } from 'react-native-autocomplete-dropdown';
import Papa from 'papaparse';
import Feather from 'react-native-vector-icons/Feather'
Feather.loadFont()


export default function FavoriteStocks({route, navigation}) {
    
  const [stocks, setData] = useState(''); 
  const [loading, setLoad] = useState(true); 
  const header = ['Price ↑↓', 'Symbol', 'Volume', 'Day Low', 'Day High', 'Remove']
  const user = route.params;
  const [parsedCsvData, setParsedCsvData] = useState([]);
  // For Filtered search Data
  const [filteredStocks, setFilteredStocks] = useState([]);
  const [getUser, setUser] = useState(user);
  const {otherParam, userParam} = route.params;
  const onOpenSuggestionsList = useCallback(isOpened => {}, [])
  const dropdownController = useRef(null)
  const searchRef = useRef(null)
    
    //get file with top 50 stocks
    var topStocks = require('../assets/top50.csv');
    //reac csv file with top stocks into  an array.
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

  // Read top50 stock csv file.
  useEffect(() => {
    parseFile(topStocks);
  },  [])


  const onClearPress = useCallback(() => {
    setFilteredStocks(null)
  }, [])
  //navigat to stock screen of the specific stock the user chose
  function setSelectedItem(item){
    navigation.navigate('StockScreen',{otherParam: item, userParam: user.otherParam})
  }
 //get favorite stocks financial data according to the list in DB
  async function fetch_Data(text) {
    try { 
      const promise = new Promise((resolve, reject) => {
          resolve(fetchFavoritesData(text))})
            promise.then((response) => {
              var obj=null; 
              const stocksData =new Array();
              for(let i=0;i<Object.keys(response).length;i++) {
                obj= JSON.parse(response[i])
                stocksData.push(obj)
              }
              setData(stocksData)
              setLoad(false)
            })
    } catch (error) {}  
  }

  //limit the number of fetches to 1 in every 5000 milliseconds 
  useInterval(() => {
    fetch_Data(user)
    },  5000 // Delay in milliseconds or null to stop it.
  )

  function _onPressButton (symbol) { // On press button its transition to stock page.
    navigation.navigate('StockScreen',{otherParam: symbol.key,}) 
  }


  const PickerOS = () => {
    if(loading === false && stocks.length === 0){
    
      return (
        <Text style={{alignSelf: 'center', color: '#C9D6DF'}}>
          Your favorite list is empty 
          {console.log("android")}
        </Text>
      )  
    } 
  };

  useEffect(() => {
    PickerOS();
  }, []);

  return (
      <View style={styles.container}>
        <View style={{backgroundColor: "#131722"}}>

            <View style={styles.searchSection}>
              <Icon style={styles.iconInAutocomplete} name="search-sharp" size={22} color= "#777777"/>
              <AutocompleteDropdown 
                  ref={searchRef}
                  controller={controller => {dropdownController.current = controller}}
                  dataSet={parsedCsvData} //Data set for suggestion list parsedCsvData = top50.csv
                  onSelectItem={item => {item && setSelectedItem(item.title)}}
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
                  renderItem={(item, text) => <Text style={{ color: '#494849', padding: 15, zIndex: 1 }}>{item.title}</Text>}
                  ChevronIconComponent={<Feather name="chevron-down" size={20} color="#434243" />} // Add icon to input container.
                  ClearIconComponent={<Feather name="x" size={20} color="#434243" />} // Add icon to input container.
                  inputHeight={38} // Change the input container height.
                  showChevron={true} //
                  closeOnBlur={false} //
                />
            </View>
            
            <View style={styles.viewTable}>
              <Table borderStyle={{ borderWidth: 3.5, borderColor: '#1e222d'}} style={{height: 32}}>
                  <Row textStyle={{color: '#C9D6DF', textAlign: 'center' , fontSize: 18, fontWeight: 'bold'}} flexArr={[1, 1, 1, 1, 1, 1]} style={{height: 30}} data={header} />        
              </Table> 
              <View style={{height: 500}}>
                <ScrollViewIndicator  shouldIndicatorHide={false} flexibleIndicator={false} scrollIndicatorStyle={{ backgroundColor: '#50535e'}} style={styles.flat}>
                {PickerOS()}
                    <FlatList
                        data={ Object.values(stocks).map(({ currentPrice, symbol, volume, dayLow, dayHigh }) => (
                          <p key={symbol}> 
                              <View style={{marginLeft: "5%", width: "5%"}}><Text>{currentPrice}</Text></View> 
                              <View style={{flex: 0.5, width: "30%", position: "absolute", flexDirection: "row", alignSelf: "center", marginLeft: "12.5%" }}><Text style={{ textAlign: 'center'}}>{symbol}</Text></View> 
                              <View style={{flex: 0.5, width: "30%", position: "absolute", flexDirection: "row", alignSelf: "center", marginLeft: "28.5%"}}><Text style={{ textAlign: 'center'}}>{volume}</Text></View> 
                              <View style={{flex: 0.5, width: "30%", position: "absolute", flexDirection: "row", alignSelf: "center", marginLeft: "46%"}}><Text style={{textAlign: 'center'}}>{dayLow}</Text></View>
                              <View style={{flex: 0.5, width: "30%", position: "absolute", flexDirection: "row", alignSelf: "center", marginLeft: "63%" }}><Text style={{ textAlign: 'center'}}>{dayHigh}</Text></View>
                              <View style={{flex: 0.5, width: "30%", position: "absolute", flexDirection: "row", alignSelf: "center", marginLeft: "80%" }}><Pressable onPress={() => deletFromFavoriteStockList(user,symbol)}><Icon style={{color: '#CB4335', flexDirection: "row"}} name="trash" size={26}/></Pressable></View>  
                          </p>))}
                          renderItem={(stocks) => {
                              return (
                                  <View style={styles.listItem}>
                                      <Pressable onPress={(item) => _onPressButton(stocks.item)}><Text style={styles.textList}>{stocks.item}</Text></Pressable>
                                  </View>
                          );}}
                    >  
                    </FlatList>
                        
                  </ScrollViewIndicator> 
                </View> 
                
                <ActivityIndicator style={{backgroundColor: "#131722"}} size="large" color="#307D7E"  animating={loading} hidesWhenStopped={true} /> 
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
    viewTable: {
      backgroundColor: "#131722",
      marginLeft: 150,
      marginRight: 150,
      marginTop: 60,
      flex: 0.8,
      zIndex: -1,
    },
    flat: {
      backgroundColor: "#131722",
      marginTop: 20,
      marginBottom: 10,
      },
    listItem: {
      borderWidth: 1,
      marginTop: 10,
      backgroundColor: "#1e222d",
      paddingLeft: 20,
    },
    textList:{
      color: '#faf9fb',
      fontSize: 20,
      flex: 0.2,
      alignItems: "center",
      justifyContent: 'center'
    },
});