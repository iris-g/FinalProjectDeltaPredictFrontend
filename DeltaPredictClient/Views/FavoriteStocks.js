import React, { useState } from "react";
import {StyleSheet, Text, View, FlatList, Pressable } from "react-native";
import { Searchbar } from 'react-native-paper';
import { useInterval } from "react-use";
import {fetchFavoritesData} from "../client/deltaPredicrClient";
import ScrollViewIndicator from 'react-native-scroll-indicator';
import { Table, Row} from 'react-native-table-component';


export default function FavoriteStocks({route, navigation}) {
    
    const [searchQuery, setSearchQuery] = React.useState('');
    const onChangeSearch = query => setSearchQuery(query);
    const [stocks, setData] = useState(''); 
    const header = ['Price', 'Symbol', 'Volume', 'dayLow', 'dayHigh']
    const user = route.params;


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
             })
        } catch (error) {} 
    
    }
     useInterval(() => {
        fetch_Data(user)
        },  7000 // Delay in milliseconds or null to stop it
    )

    function _onPressButton (symbol) { // On press button its transition to stock page.
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

            <Table borderStyle={{ borderWidth: 3.5, borderColor: '#1e222d'}} style={{marginTop: 50, height: 32}}>
                <Row textStyle={{color: 'white', textAlign: 'center' , fontSize: 20, fontWeight: 'bold'}} flexArr={[0.5, 2, 1, 1, 1]} style={{height: 30}} data={header} />
                
            </Table>
              
        <ScrollViewIndicator  shouldIndicatorHide={false} flexibleIndicator={false} scrollIndicatorStyle={{ backgroundColor: '#50535e'}} style={styles.flat}>
            <FlatList 
                data={ Object.values(stocks).map(({ currentPrice, symbol, volume, dayLow, dayHigh }) => (
                <p key={symbol}> 
                    <View style={{width:150}}><Text>{currentPrice}</Text></View> 
                    <View style={{ flexDirection: "row", position: "absolute", marginLeft: 150, alignSelf: "center", flex: 0.2, }}><Text style={{ textAlign: 'center'}}>{symbol}</Text></View> 
                    <View style={{flex: 0.2, width: 150, flexDirection: "row", alignSelf: "center", marginLeft: 500}}><Text style={{ textAlign: 'center'}}>{volume}</Text></View> 
                    <View style={{flex: 0.2, width: 150, flexDirection: "row", alignSelf: "center",marginLeft:150 }}><Text style={{textAlign: 'center'}}>{dayLow}</Text></View>
                    <View style={{flex: 0.2, width: 150, flexDirection: "row", alignSelf: "center", marginLeft:150 }}><Text style={{ textAlign: 'center'}}>{dayHigh}</Text></View>  
                </p>))}
                renderItem={(stocks) => {
                    return (
                        <View style={styles.listItem}>
                            <Pressable onPress={(item) => _onPressButton(stocks.item)}><Text style={styles.textList}>{stocks.item}</Text></Pressable>
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
    flat: {
        backgroundColor: "#131722",
        marginTop: 20,
        marginLeft: 20,
        marginRight: 20,
        marginBottom: 50,
        alignSelf: "center",
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
        flex: 1,
        alignItems: "center",
        backgroundColor: "#131722",
        marginTop: 50,
        margin: 35,
        
      },
});