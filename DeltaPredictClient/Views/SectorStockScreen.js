
import { Dimensions, Text, View } from 'react-native';

import React from "react";
import {fetcSectorData} from "../client/deltaPredicrClient";
import { useState,useEffect } from 'react'
import { StyleSheet, Platform, ActivityIndicator, ScrollView, Pressable, FlatList} from 'react-native';
import { useInterval } from "react-use";
import { Badge, Button, Card, Paragraph } from 'react-native-paper';
import { useRoute } from '@react-navigation/native';
import { Searchbar } from 'react-native-paper';
import ScrollViewIndicator from 'react-native-scroll-indicator';
import { Table, Row} from 'react-native-table-component';
import Icon from "react-native-vector-icons/Ionicons";
import Autocomplete from 'react-native-autocomplete-input';
import Papa from 'papaparse';
import { ListItem } from 'react-native-elements'
    // For Filtered search Data



function SectorStockScreen({ route, navigation }) {

  const [stockData, setData] = useState(""); 
  const [loading, setLoad] = useState(true); 
  const [searchQuery, setSearchQuery] = React.useState('');
  const [saveChange, setChange] = useState(""); 
  const [filteredStocks, setFilteredStocks] = useState([]);
  const sector_name = useRoute();
  const header = ['Symbol', 'Company', 'Price ↑↓', 'Volume', 'Change ٪']
    //get file with top 50 stocks
  var topStocks = require('../assets/top50.csv');
  const [parsedCsvData, setParsedCsvData] = useState([]);
  //reac csv file with top stocks into  an array
    const parseFile = file => {
    Papa.parse(file, {
    header: false, download: true,   complete: results => {
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

  /*Brings stocks data*/
  async function fetch_Data(text) {
    try { 
      
      const promise = new Promise((resolve, reject) => {
        resolve(fetcSectorData(text) )
      })
    
      promise.then((response) => {
        setData(response)
        setLoad(false)
        
      })
    } catch (error) {
    } 
    }
    
    useInterval(() => {

      fetch_Data(sector_name)
    },  5000// Delay in milliseconds or null to stop it
    
    )
    
    function _onPressButton (symbol) { // On press button its transition to stock page.
      console.log(parsedCsvData)
      if(parsedCsvData.includes(symbol.key))
        navigation.navigate('StockScreen',{otherParam: symbol.key,}) 
    }

    const handleColors = (value) => {
      let befor = value
      let val =(parseFloat(value))
      if (val > 0) return "green";
      if (val < 0) return "red";
      
    };
    const onChangeSearch = query => {
      setSearchQuery(query);
       //create a filtered stock list 
      if (query) 
      {
          const temp = query
          // Setting the filtered film array according the query
          const tempList = parsedCsvData.filter(item => {
          if (String(item).substring(0,temp.length).search(temp) >=0)
              return item
      })
          setFilteredStocks(tempList)}
      else {
         // If the query is null then return blank
      setFilteredStocks([])}};
  

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
                    onPress={() => { setSearchQuery(item); setFilteredStocks([]);  navigation.navigate('StockScreen',{otherParam: item, userParam: otherParam})}}> 
            
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
      <View style={styles.viewTable}>
        <Table borderStyle={{  borderWidth: 3.5, borderColor: '#1e222d'}} style={styles.tableHead}>
            <Row textStyle={{color: 'white', textAlign: 'center', fontSize: 18, fontWeight: 'bold'}} flexArr={[0.4, 2, 1.2, 1.1, 1]} style={styles.tableRow} data={header} />        
        </Table>
        
        <ScrollViewIndicator  shouldIndicatorHide={false}  scrollIndicatorStyle={{ backgroundColor: '#50535e'}} style={styles.flat}>
          <FlatList  
            data={Object.values(stockData).map(({ Ticker, Company, Price, Volume, Change }) => (
            <p key={Ticker}> <View style={{width: "5%"}}><Text>{Ticker}</Text></View>
              <View style={{flexDirection: "row", position: "absolute", marginLeft: "15%", alignSelf: "center", flex: 0.2,}}><Text style={{ textAlign: 'center'}}>{Company}</Text></View>
              <View style={{flex: 0.2, width: "30%", position: "absolute", flexDirection: "row", alignSelf: "center", marginLeft: "45%"}}><Text style={{ textAlign: 'center'}}>{Price}</Text></View> 
              <View style={{flex: 0.2, width: "30%", position: "absolute", flexDirection: "row", alignSelf: "center",marginLeft: "64%" }}><Text style={{textAlign: 'center'}}>{Volume}</Text></View>
              <View style={{flex: 0.2, width: "30%", position: "absolute", flexDirection: "row", alignSelf: "center", marginLeft: "84%" }}><Text style={{ textAlign: 'center', color: handleColors(Change)}}>{Change}</Text></View>
            
            </p>
            ))}
                  renderItem={(stockData) => {
                  return (
                  <View style={styles.listItem}>
                  <Pressable onPress={(item) => _onPressButton(stockData.item)}><Text style={styles.textList}>{stockData.item}</Text></Pressable>
                  </View>
                  );}}    
                />
        </ScrollViewIndicator>
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
    viewTable: {
      backgroundColor: "#131722",
      marginLeft: 150,
      marginRight: 150,
      marginTop: 20,
      flex: 0.8,
    },
    tableHead:{
      marginTop: 30,
      height: 32,
      width: '100%',
      alignSelf: 'center',
      flexDirection: "row",
      justifyContent: 'center',
    },
    tableRow:{
      flexDirection: "row",
      width: '100%',
      alignItems: 'center',
      justifyContent: 'center',
      height: 30,
    },
    flat:{
      backgroundColor: "#131722",
      marginTop: 10,
    },
    titles:{
      backgroundColor: "#131722",
      color: '#307d7e',
    },
    listItem: {
      backgroundColor: "#131722",
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
    centeredSearch: {
      alignSelf: "center",
      justifyContent: 'flex-start',
      backgroundColor: "#131722",
      marginTop: 50,
    },
    iconInAutocomplete:{
      paddingLeft: 35,
      padding: 10,
      position: 'absolute',
      zIndex: 100,
    },
  listItem: {
      borderWidth: 1,
      marginTop: 10,
      backgroundColor: "#1e222d",
      paddingLeft: 20,
  },
  centeredSearch: {
      alignSelf: "center",
      justifyContent: 'flex-start',
      backgroundColor: "#131722",
      marginTop: 50,
      margin: 35,
  },
  inputContainer: {
      minWidth: 330,
      width: "90%",
      backgroundColor: 'transparent',
      borderColor: 'transparent',
    },
    searchSection: {
      flexDirection: 'row',
      alignSelf: "center",
      marginLeft: '5%',
      marginRight: '5%',
    },
    autocompleteContainer: {
      borderWidth: 0,
      marginLeft: 10,
      marginRight: 10,
      paddingLeft: 15,
    },
});


export default SectorStockScreen;