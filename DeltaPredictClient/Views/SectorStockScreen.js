
import { Text, View } from 'react-native';

import React from "react";
import {fetcSectorData} from "../client/deltaPredicrClient";
import {useEffect,useState,useReducer } from 'react'
import { StyleSheet,ActivityIndicator,Platform ,StatusBar, ScrollView, SafeAreaView, Pressable, FlatList} from 'react-native';
import { useInterval } from "react-use";
import { Badge,Button,Card  ,Paragraph } from 'react-native-paper';
import { Line } from 'react-chartjs-2';
import { useRoute } from '@react-navigation/native';
import { Searchbar } from 'react-native-paper';
import ScrollViewIndicator from 'react-native-scroll-indicator';

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
      
      
      <ScrollViewIndicator  shouldIndicatorHide={false} flexibleIndicator={false} scrollIndicatorStyle={{ backgroundColor: '#50535e' }} style={styles.flat}>
        <FlatList 
          data={Object.values(stockData).map(({ Ticker,Company, Price,Volume,Change }) => (
          <p  key={Ticker}> <View style={styles.spaceBetweenTextListItem}>{Ticker}</View> <View style={styles.spaceBetweenTextListItem}>{Company}</View> <View style={styles.spaceBetweenTextListItem}>{Price}</View> <View style={styles.spaceBetweenTextListItem}>{Volume}</View> <View style={styles.spaceBetweenTextListItem}>{Change}</View></p>
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
      marginLeft: 70,
      marginRight: 70,
      marginBottom: 70,
      
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
    },
    spaceBetweenTextListItem:{
      flex: 0.2,
      paddingRight: 200,

    },
    centeredSearch: {
      flex: 0.2,
      alignItems: "center",
      backgroundColor: "#131722",
      marginTop: 50,
    
    },
});


export default SectorStockScreen;