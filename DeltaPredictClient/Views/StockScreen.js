
import { Text, View } from 'react-native';

import React from "react";
import {fetchData} from "../client/deltaPredicrClient";
import {useEffect,useState,useReducer } from 'react'
import { StyleSheet,ActivityIndicator,Platform ,StatusBar, Image, Pressable} from 'react-native';
import { useInterval } from "react-use";
import { Badge,Button,Card  ,Paragraph } from 'react-native-paper';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend,} from 'chart.js';
ChartJS.register( CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);
import { Searchbar } from 'react-native-paper';


function StockScreen({ route, navigation }) {

  const [data, setData] = useState(""); 
  const [loading, setLoad] = useState(true); 
  const [searchQuery, setSearchQuery] = React.useState('');

  const onChangeSearch = query => setSearchQuery(query);
  /* 2. Get the param */
  const {  otherParam } = route.params;
  console.log(otherParam)
  const prices = {
    labels: ["Jan", "Feb", "Mar"],
    datasets: [
      {
        label: "Predicted prise",
        data: [33, 53, 85],
        backgroundColor: "rgba(75,192,192,0.2)",
        borderColor: "rgba(75,192,192,1)",
        fill: false
      }
    ],
    borderWidth: 1 ,
  };

const options = {
  responsive: true,
  title: {
    display: true,
    text: 'Chart.js Line Chart'
  },
  tooltips: {
    mode: 'label'
  },
  hover: {
    mode: 'dataset'
  },
  scales: {
    xAxes: [
      {
        display: true,
        scaleLabel: {
          show: true,
          labelString: 'Month'
        }
      }
    ],
    yAxes: [
      {
        display: true,
        scaleLabel: {
          show: true,
          labelString: 'Value'
        },
        ticks: {
          suggestedMin: -10,
          suggestedMax: 250
        }
      }
    ]
  }
}
const handleColors = (value) => {
  let befor = value
  let val =(parseFloat(value))
  if (val > 0) return "green";
  if (val < 0) return "red";
  
};
const handleValue = (value) => {
  let val =(parseFloat(value))
  return ( val *100 ).toFixed(2).toString();

 };
  async function fetch_Data(text) {
    try { 
      
      const promise = new Promise((resolve, reject) => {
        resolve(fetchData(text) )
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

      fetch_Data(otherParam)
    },  3000// Delay in milliseconds or null to stop it
    
    )

  return (
    <View style={styles.container}> 
        <Pressable onPress={() => {navigation.navigate('Home')}} style={styles.backImage}>
              <Image
              source={require('../assets/icon.png')}
              style={{ flex: 1 }}
              resizeMode="contain"
              />
          </Pressable>   

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
            <ActivityIndicator size="large" color="#00ff00"  animating={loading}    hidesWhenStopped={true} /> 
            <Text style={styles.title}> {  
                <><p > {data["name"]} - {data["symbol"]} {'\n'} NasdaqGS Real Time Price in USD {data["close"]}
                    <Text style={{ color:handleColors(data["change"]) }}>  {data["change"]} </Text> 
                    <Text style={{ color:handleColors(data["regularMarketChange"]) }}>  {data["regularMarketChange"]}</Text> </p>
                </>}
            </Text> 
      <View style={{backgroundColor: '#131722'}}>

      
        <View style={styles.blackScreen}>
                <View style={styles.featuredDetails}>
                  <Text style={{ color: 'white', fontSize: 20, flex: 2 }}> {  
                    <><p>{'\n'} volume:   {data["volume"]} {'\n'} Average volume:   {data["averageVolume"]} {'\n'} Market cap:    {data["marketCap"]} {'\n'} 52 weeks high:   {data["fiftyTwoWeekHigh"]} {'\n'} 52 weeks low:   {data["fiftyTwoWeekLow"]} {'\n'} Industry:   {data["industry"]} {'\n'} Prev Close   {data["previousClose"]} {'\n'} recommendation:    {data["recommendation"]} {'\n'} P/C Ratio:    {data["P/C"]} {'\n'} P/E:   {data["peRatio"]} </p>
                    </>
                  } </Text> 
                </View>

                <View style={styles.graphContainer}>
                    <Line  data={prices}  width={100}  height={300} options={{
                      maintainAspectRatio: false, }}
                />
                </View>
            
              
        </View>
        <View style={styles.detailedBlock}>
              <Paragraph style={{color: 'white'}}>{data["info"]}</Paragraph>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#131722",
    justifyContent: "space-between",
    paddingTop: StatusBar.currentHeight,
  },
  stocksBlock: {
    flexDirection: "column",
    marginBottom: 10,
    marginLeft: 30,
  },
  featuredDetails: {
    flex: 0.4,
    alignItems: "Left",
    marginLeft: 50,
    marginVertical: 40,
    marginTop: 50,
     ...Platform.select({
        android: {backgroundColor: '#1e222d', marginHorizontal: 20, marginTop: 80,},

    })
  },
  title: {
    paddingTop: 2,
    color: "white",
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
  },
  detailedBlock: {
    backgroundColor: "#131722",
    margin: 50,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#1e222d',
    
  },
  paragraph: {
    fontSize: 16,
    fontWeight: 'italic',
    color: "white",
    textAlign: 'left',
    padding: 20
  },
  graphContainer: {
    flex: 0.6,
    width: 300,
    height: 600,
    alignItems: "center",
    margin: 20,
    marginRight: 150,
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  blackScreen: {
    flexDirection: "row",
    alignItems: "center",
  },
  backImage: {
    width: 350,
    height: 150,
    marginLeft: 25,
  },
});


export default StockScreen;