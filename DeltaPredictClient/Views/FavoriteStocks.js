import React, { useState, useEffect  } from "react";
import {StyleSheet, Text, View, FlatList, Pressable, ActivityIndicator ,TouchableOpacity} from "react-native";
import { Searchbar } from 'react-native-paper';
import { useInterval } from "react-use";
import { fetchFavoritesData } from "../client/deltaPredicrClient";
import { deletFromFavoriteStockList } from "../client/deltaPredicrClient";
import ScrollViewIndicator from 'react-native-scroll-indicator';
import { Table, Row } from 'react-native-table-component';
import Icon from "react-native-vector-icons/Ionicons";
import Autocomplete from 'react-native-autocomplete-input';
import Papa from 'papaparse';
import { ListItem } from 'react-native-elements'

export default function FavoriteStocks({route, navigation}) {
    
    const [searchQuery, setSearchQuery] = React.useState('');
    const [stocks, setData] = useState(''); 
    const [loading, setLoad] = useState(true); 
    const header = ['Price ↑↓', 'Symbol', 'Volume', 'Day Low', 'Day High', 'Remove']
    const user = route.params;
    const [parsedCsvData, setParsedCsvData] = useState([]);
    // For Filtered search Data
    const [filteredStocks, setFilteredStocks] = useState([]);
    const [getUser, setUser] = useState(user);
    const {otherParam, userParam} = route.params;
    
    console.log(otherParam)
  //get file with top 50 stocks
    var topStocks = require('../assets/top50.csv');
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
    


    async function fetch_Data(text) {
        try { 
        const promise = new Promise((resolve, reject) => {
            resolve(fetchFavoritesData(text))})
                promise.then((response) => {
                var obj=null; 
                const stocksData =new Array();
                for(let i=0;i<Object.keys(response).length;i++)
                {
                    obj= JSON.parse(response[i])
                    stocksData.push(obj)
                }
                setData(stocksData)
                setLoad(false)
             })
        } catch (error) {} 
    
    }
     useInterval(() => {
        fetch_Data(user)
        },  5000 // Delay in milliseconds or null to stop it
    )

    function _onPressButton (symbol) { // On press button its transition to stock page.
        navigation.navigate('StockScreen',{otherParam: symbol.key,}) 
    }

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
            
                <View style={{backgroundColor: "#131722",marginLeft: 150, marginRight: 150, marginTop: 20, flex: 0.9,}}>
                <Table borderStyle={{ borderWidth: 3.5, borderColor: '#1e222d'}} style={{height: 32}}>
                    <Row textStyle={{color: 'white', textAlign: 'center' , fontSize: 18, fontWeight: 'bold'}} flexArr={[1, 1, 1, 1, 1, 1]} style={{height: 30}} data={header} />        
                </Table>
                
                <ScrollViewIndicator  shouldIndicatorHide={false} flexibleIndicator={false} scrollIndicatorStyle={{ backgroundColor: '#50535e'}} style={styles.flat}>
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
    iconInAutocomplete:{
        paddingLeft: 35,
        padding: 10,
        position: 'absolute',
        zIndex: 100,
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