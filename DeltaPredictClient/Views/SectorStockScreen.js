import React, { useState, useEffect, useCallback, useRef} from "react";
import { Text, View, StyleSheet, Platform, ActivityIndicator, Dimensions, Pressable, FlatList, TouchableOpacity } from 'react-native';
import { useInterval } from "react-use";
import {fetcSectorData} from "../client/deltaPredicrClient";
import { useRoute } from '@react-navigation/native';
import ScrollViewIndicator from 'react-native-scroll-indicator';
import { Table, Row} from 'react-native-table-component';
import Icon from "react-native-vector-icons/Ionicons";
import { AutocompleteDropdown } from 'react-native-autocomplete-dropdown';
import Papa from 'papaparse';
import Feather from 'react-native-vector-icons/Feather'
Feather.loadFont()
import {useIsFocused} from '@react-navigation/native';


function SectorStockScreen({ route, navigation }) {
  const user = route.params;
  const [stockData, setData] = useState(""); 
  const [loading, setLoad] = useState(true); 
  const [searchQuery, setSearchQuery] = React.useState('');
  const [saveChange, setChange] = useState(""); 
  const [filteredStocks, setFilteredStocks] = useState([]);
  const [parsedCsvData, setParsedCsvData] = useState([]);
  const sector_name = useRoute();
  const header = ['Symbol', 'Company', 'Price ↑↓', 'Volume', 'Change ٪']
  const onOpenSuggestionsList = useCallback(isOpened => {}, [])
  const dropdownController = useRef(null)
  const searchRef = useRef(null)
  const isFocused = useIsFocused();

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

     const onClearPress = useCallback(() => {
      setFilteredStocks(null)
    }, [])


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
      console.log(error)
    } 
    }
    
    useInterval(() => {
      //fetch only if the current screen is active
      if(isFocused)
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
              renderItem={(item, text) => <TouchableOpacity onPress={() => {navigation.navigate('StockScreen',{otherParam: item.title, userParam: user.otherParam})}}><Text style={{ color: '#494849', padding: 15, zIndex: 1 }}>{item.title}</Text></TouchableOpacity>}
              ChevronIconComponent={<Feather name="chevron-down" size={20} color="#434243" />} // Add icon to input container.
              ClearIconComponent={<Feather name="x" size={20} color="#434243" />} // Add icon to input container.
              inputHeight={38} // Change the input container height.
              showChevron={true} //
              closeOnBlur={false} //
              // showClear={false}
            />
            </View>

      <View style={styles.viewTable}>
        <View>
        <Table borderStyle={{  borderWidth: 3.5, borderColor: '#1e222d'}} style={{height: 32}}>
            <Row textStyle={{color: '#C9D6DF', textAlign: 'center', fontSize: 18, fontWeight: 'bold'}} flexArr={[0.4, 2, 1.2, 1.1, 1]} style={styles.tableRow} data={header} />        
        </Table>
        </View>
   
        <View style={{height: 500}}>
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
      zIndex: -1,
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
    listItem: {
      borderWidth: 1,
      marginTop: 10,
      backgroundColor: "#1e222d",
      paddingLeft: 20,
  },
});


export default SectorStockScreen;