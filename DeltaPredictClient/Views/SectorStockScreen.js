
import { Dimensions, Text, View } from 'react-native';

import React from "react";
import {fetcSectorData} from "../client/deltaPredicrClient";
import { useState } from 'react'
import { StyleSheet, Platform, ActivityIndicator, ScrollView, Pressable, FlatList} from 'react-native';
import { useInterval } from "react-use";
import { Badge, Button, Card, Paragraph } from 'react-native-paper';
import { useRoute } from '@react-navigation/native';
import { Searchbar } from 'react-native-paper';
import ScrollViewIndicator from 'react-native-scroll-indicator';
import { Table, Row} from 'react-native-table-component';
import Icon from "react-native-vector-icons/Ionicons";


function SectorStockScreen({ route, navigation }) {

  const [stockData, setData] = useState(""); 
  const [loading, setLoad] = useState(true); 
  const [searchQuery, setSearchQuery] = React.useState('');
  const [saveChange, setChange] = useState(""); 
  const onChangeSearch = query => setSearchQuery(query);
  const sector_name = useRoute();
  const header = ['Symbol', 'Company', 'Price ↑↓', 'Volume', 'Change ٪']
 
  /*Brings data stocks*/
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
      navigation.navigate('StockScreen',{otherParam: symbol.key,}) 
    }

    const handleColors = (value) => {
      let befor = value
      let val =(parseFloat(value))
      if (val > 0) return "green";
      if (val < 0) return "red";
      
    };

  return (
    
    <View style={styles.container}>
      <View style={{backgroundColor: "#131722"}}>
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
});


export default SectorStockScreen;