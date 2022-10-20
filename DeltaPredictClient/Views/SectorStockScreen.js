
import { Text, View } from 'react-native';

import React from "react";
import {fetcSectorData} from "../client/deltaPredicrClient";
import {useEffect,useState,useReducer } from 'react'
import { StyleSheet,ActivityIndicator,Platform ,StatusBar,ScrollView,SafeAreaView,FlatList} from 'react-native';
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
    },  9000// Delay in milliseconds or null to stop it
    
    )

  return (
    <View style={styles.container}> 
    <View style={styles.blackScreen}>
    <View style={styles.centered}>
    <Searchbar 
        style={{height: 40}}
        placeholder="enter symbol"
        type="text"
        justifyContent= "center"
        alignItems= "center"
        value={searchQuery}
          onChangeText={onChangeSearch}
          onIconPress={ event =>event != "" ?  navigation.navigate('StockScreen',{
            otherParam: searchQuery,
          }) : ""}
      />
      </View>
        </View>
      <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
      <Text style={{ color: 'white', fontSize: 20, flex: 4 }}> COMPANY               PRICE           VOLUME      CHANGE </Text>
      <FlatList 
              data={Object.values(stockData).map(({ Company, Price,Volume,Change }) => (
        <p key={Company}> {Company},                 {Price},               {Volume},    {Change}</p>
      ))}
              renderItem={(data) => {
                return (
                <View style={styles.listItem}>
                <Text>{data.item}</Text>
                </View>
                );}}    
            />


      {/* <Text style={{ color: 'white', fontSize: 20, flex: 4 }}> COMPANY               PRICE           VOLUME      CHANGE </Text>
        <Text style={{ color: 'white', fontSize: 20, flex: 4 }}> {  Object.values(stockData).map(({ Company, Price,Volume,Change }) => (
        <p key={Company}> {Company},         {Price},         {Volume},    {Change}</p>
      ))} </Text> */}
      <ActivityIndicator size="large" color="#00ff00"  animating={loading}    hidesWhenStopped={true} /> 
      </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1e222d",
    justifyContent: "space-between",
  },
  stocksBlock: {
    flexDirection: "column",
    marginBottom: 10,
    margainLeft: 10,
    backgroundColor: "#1e222d",
    flex: 8,
  },
  listItem: {
    backgroundColor: "grey",
    borderWidth: 1,
    borderColor: "#333",
    padding: 25,
  },
  row: {
    flexDirection: "row",
    marginBottom: 10,
    justifyContent: "space-between",
    margainLeft: 10,
    backgroundColor: "#1e222d",
    flex: 2,
  },
  featuredDetails: {
    flexDirection: "row",
    backgroundColor: "#1e222d",
    flexDirection: "row",
    marginLeft: 25,
    marginVertical: 40,
    marginTop: 50,
    marginBottom: 200,
     ...Platform.select({
        android: {backgroundColor: '#1e222d', marginHorizontal: 20, marginTop: 80,},

    })
},
scrollView: {
  backgroundColor: '#1e222d"',
  marginHorizontal: 20,
},
  title: {
    paddingTop: 5,
    color: "white",
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
  },
  detailedBlock: {
    flex: 5,
    backgroundColor: "#1e222d",
    justifyContent: "space-between",
  },
  paragraph: {
    fontSize: 16,
    fontWeight: 'italic',
    color: "white",
    textAlign: 'left',
    padding: 20
  },

  featuredDetails: {
    flexDirection: "row",
    backgroundColor: "#1e222d",
    color: "white",
    flexDirection: "row",
    marginRight: 100,
    marginVertical: 40,
    marginTop: 50,
    marginBottom: 200,

},
  centered: {
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "#1e222d",
  marginTop: 20,
},
  blackScreen: {
      flexDirection: "row",
      alignItems: 'left',
      backgroundColor: "#1e222d",
      
  },
});


export default SectorStockScreen;