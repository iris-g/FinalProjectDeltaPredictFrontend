
import { Text, View } from 'react-native';

import React from "react";
import {fetcSectorData} from "../client/deltaPredicrClient";
import {useEffect,useState,useReducer } from 'react'
import { StyleSheet,ActivityIndicator,Platform ,StatusBar,ScrollView,SafeAreaView,Pressable,FlatList} from 'react-native';
import { useInterval } from "react-use";
import { Badge,Button,Card  ,Paragraph } from 'react-native-paper';
import { Line } from 'react-chartjs-2';
import { useRoute } from '@react-navigation/native';


import { Searchbar } from 'react-native-paper';


function SectorStockScreen({ route, navigation }) {

  const [stockData, setData] = useState(""); 
  const [loading, setLoad] = useState(true); 
  const [searchQuery, setSearchQuery] = React.useState('');
  const onChangeSearch = query => setSearchQuery(query);


const sector_name = useRoute();


  async function fetch_Data(text) {
    try { 
      
      const promise = new Promise((resolve, reject) => {
        resolve(fetcSectorData(text) )
      })
    
      promise.then((response) => {
        setData(response)
        setLoad(false)
        console.log(response)
        
      })
    } catch (error) {
    } 
    }
    useInterval(() => {

      fetch_Data(sector_name)
    },  7000// Delay in milliseconds or null to stop it
    
    )

    function _onPressButton (symbol) { // On press button its transition to stock page.
      console.log(symbol)
      navigation.navigate('StockScreen',{otherParam: symbol.key,}) 
  }

  return (
    <View style={styles.container}>
      
      <View style={styles.centeredSearch}>
          <Searchbar 
              style={{height: 40}}
              placeholder="enter symbol"
              type="text"
              justifyContent= "center"
              alignItems= "center"
              value={searchQuery}
              onChangeText={onChangeSearch}
              onIconPress={ event =>event != "" ?  navigation.navigate('StockScreen',{otherParam: searchQuery,}) : ""}
          /> 
      </View>
      
      
      
        <FlatList style={styles.flat}
          data={Object.values(stockData).map(({ Ticker,Company, Price,Volume,Change }) => (
          <p key={Ticker}> {Ticker},                  {Company},                 {Price},               {Volume},    {Change}</p>
          ))}
                renderItem={(stockData) => {
                return (
                <View style={styles.listItem}>
                <Pressable onPress={(item) => _onPressButton(stockData.item)}><Text style={styles.textList}>{stockData.item}</Text></Pressable>
                </View>
                );}}    
        
              />
      
      
      
    </View>
  );
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#131722",
      justifyContent: 'flex-start',
    },
    flat:{
      backgroundColor: "#131722",
      marginTop: 22,
      marginLeft: 50,
      marginRight:50,
      marginBottom:50,
    },
    listItem: {
      borderWidth: 1,
      marginTop: 20,
      backgroundColor: "#362b1d",
    },
    textList:{
      color: '#dc7518',
      fontSize: 25,
    },
    centeredSearch: {
      flex: 1,
      alignItems: "center",
      backgroundColor: "#131722",
      marginTop: 50,
      margin: 35,
    },
});


export default SectorStockScreen;