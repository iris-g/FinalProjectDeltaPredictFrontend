

import { Text, View ,Button } from 'react-native';

import React from "react";
import {fetchData,fetchArima} from "../client/deltaPredicrClient";
import {useEffect,useState } from 'react'
import { StyleSheet,ActivityIndicator,Platform ,StatusBar, Image, Pressable} from 'react-native';
import { useInterval } from "react-use";
import { Paragraph } from 'react-native-paper';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend,} from 'chart.js';
ChartJS.register( CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);
import { Searchbar } from 'react-native-paper';
import Icon from "react-native-vector-icons/Ionicons";
import { addStockToFavoriteStockList } from "../client/deltaPredicrClient"


function StockScreen({ route, navigation }) {
  const {  otherParam, userParam } = route.params;
  console.log(userParam)
 // console.log("other =" + otherParam)
  const [data, setData] = useState(""); 
  const [loading, setLoad] = useState(true); 
  const [predictedPrices,setPredicted]=useState(""); 
  const [graphPredictedPrices,setgraphPredicted]=useState(""); 
  const [weeklyPredictedPrices,setWeeklyPredicted]=useState(""); 
  const [searchQuery, setSearchQuery] = React.useState(otherParam);
  const [dailyTimestamps, setStamps] = React.useState(otherParam);
  const [weeklyTimestamps, setweeklyStamps] = React.useState(otherParam);
  let controller;
  let marketStatus;
  const { exchange } = require('trading-calendar');
  const usa = exchange('new-york');

//check if stock exchange is open and update text
if(usa.isTradingNow()){
  marketStatus="NasdaqGS Real Time Price in USD"
  // market is open right now
} else {
  // market is closed right now
  marketStatus="Price as of last close";
}

const onWeekButtonPress = query => {
  console.log(graphPredictedPrices)
  setStamps(weeklyTimestamps)
  setgraphPredicted(weeklyPredictedPrices);

};
const onDailyButtonPress = query => {
  setStamps(dailyTimestamps)
  setgraphPredicted(predictedPrices);

};

  const onChangeSearch = query => {
    setSearchQuery(query);
    setPredicted("");
    
    try{
    if (controller) {

          controller.abort();
          console.log("Download aborted");
        }

    }catch( error) {
      if (error.name === "AbortError") {
        console.log("Operation timed out");
      } else {
        console.error(err);
      }

 
}};


 
  const prices = {
    labels: dailyTimestamps,
    datasets: [
      {
        label: "Predicted price",
        data: graphPredictedPrices,
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
let newDate = new Date()
newDate.setHours(0, 0, 0, 0);
// ✅ Format a date to YYYY-MM-DD (or any other format)
function padTo2Digits(num) {
  return num.toString().padStart(2, '0');
}

function formatDate(date) {
  return [
    date.getFullYear(),
    padTo2Digits(date.getMonth() + 1),
    padTo2Digits(date.getDate()),
  ].join('-');
}

  // 👇️ 2022-01-18 (yyyy-mm-dd)
  let today = new Date();
  today.setHours(0, 0, 0, 0);
  let tomorrow =  new Date()
  tomorrow.setHours(0, 0, 0, 0);
  tomorrow.setDate(today.getDate() + 1)
  var nextweek = new Date(today.getFullYear(), today.getMonth(), today.getDate()+7);
 // console.log(formatDate(nextweek));
  // date array
  var getDateArray = function(start, end) {
  var arr = new Array();
  var  dt = new Date(start);
    while (dt <= end) {
      arr.push(formatDate(new Date(dt)));
      dt.setDate(dt.getDate() + 1);
    }

    return arr;

}

//GET DATA FOR ARIMA PREDICTION
async function fetch_Arima_Data() {
  try { 

    const promise = new Promise((resolve, reject) => {
      resolve(fetchArima(otherParam) )
      
    })
  
    promise.then((response) => {
      //console.log(response)
      var obj=null; 
      const dailyArimaData =new Array();
      const weeklyArimaData =new Array();
      //console.log(response)
      for(let i=0;i<Object.keys(response["daily"]["mean"]).length;i++)
      {
          obj= JSON.parse(response["daily"]["mean"][i])
          dailyArimaData.push(obj)
      }
      setgraphPredicted(dailyArimaData);
      console.log(response["weekly"])
      setPredicted(dailyArimaData);
      setWeeklyPredicted(response["weekly"]["mean"]);
      setweeklyStamps((response["weekly"]["dates"]));
      
    })
  } catch (error) {
  } 
  }

  //call function to get arima prediction  for the first time only
  useEffect(() => {
    setStamps(getDateArray(tomorrow,nextweek));
    fetch_Arima_Data()

  },  []
  
  )
const handleColors = (value) => {
  let befor = value
  let val =(parseFloat(value))
  if (val > 0) return "green";
  if (val < 0) return "red";
  
};

  async function fetch_Data(text) {
   controller = new AbortController();
    const signal = controller.signal;
    try { 
      //console.log(text)
      const promise = new Promise((resolve, reject) => {
        resolve(fetchData(text,signal) )
      })
    
      promise.then((response) => {
        console.log(searchQuery)
        if(response["symbol"] == searchQuery)
          setData(response)
          setLoad(false)
        
      })
    } catch (error) {
    } 
    }
    useInterval(() => {

      fetch_Data(searchQuery)
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
                onIconPress={ event =>{event != "" ?  navigation.navigate('StockScreen',{otherParam: searchQuery, userParam: userParam}) : "";setLoad(true);}}
              /> 
          </View>

          <ActivityIndicator style={{backgroundColor: "#131822"}} size="large" color="#00ff00"  animating={loading} hidesWhenStopped={true} /> 

          <View style={{backgroundColor: "#131822",alignItems: "center"}}>
            <Text style={styles.title}> {  
                <><p > {data["name"]} - {data["symbol"]} {'\n'} NasdaqGS Real Time Price in USD {data["close"]}
                    <Text style={{ color:handleColors(data["change"]) }}>  {data["change"]} </Text> 
                    <Text style={{ color:handleColors(data["regularMarketChange"]) }}>  {data["regularMarketChange"]}</Text> </p>
                </>}
            </Text> 
          </View>

          <View style={{backgroundColor: '#131722'}}>
            <View style={styles.blackScreen}>
                <View style={styles.featuredDetails}>
                  <View style={{flexDirection: "row", backgroundColor: "#131822", alignSelf: "center" }}>
                    <Pressable style={{flexDirection: "row", alignSelf: "center", borderRadius: 5, borderColor: '#1e3841', borderWidth: 2}} onPress={() => addStockToFavoriteStockList(userParam, otherParam)}>
                      <Icon style={{color: "#4bc0c0", fontWeight: 'bold', backgroundColor: "#1e3841"}} name="add-circle" size={20} color="#000"/>
                      <Text style={{color: "#4bc0c0", fontWeight: 'bold',fontSize: 20, backgroundColor: "#1e3841"}}> Add To Favorite </Text>
                    </Pressable>   
                  </View>

                  <Text style={{ color: 'white', fontSize: 20, flex: 2 }}> {  
                    <><p>{'\n'} volume:   {data["volume"]} {'\n'} Average volume:   {data["averageVolume"]} {'\n'} Market cap:    {data["marketCap"]} {'\n'} 52 weeks high:   {data["fiftyTwoWeekHigh"]} {'\n'} 52 weeks low:   {data["fiftyTwoWeekLow"]} {'\n'} Industry:   {data["industry"]} {'\n'} Prev Close   {data["previousClose"]} </p>

                    </>}
                  </Text> 

                </View>

                <View style={styles.graphContainer}>
                  <Line  data={prices}  width={100}  height={300} options={{maintainAspectRatio: false}}/>
                  <View style={{ flexDirection:"row" ,alignItems:"top", margin: 15}}>
                    <Button   uppercase = {true}  color="#131722" title ="daily" 
                        onPress={() => onDailyButtonPress()}/>
                    <Button   uppercase = {true}  color="#131722"  title ="weekly"
                        onPress={() => onWeekButtonPress()}/>
                  </View> 
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
    backgroundColor: "#131822",
    justifyContent: 'flex-start',
    alignItem: "center",
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
  },
  btnSignUpText:{
    textTransform:'capitalize',
    width: 330,
    height: 150,
    color:"white",
},
  title: {
    flexDirection: "row", 
    paddingTop: 2,
    color: "white",
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    justifyContent: "flex-start",
    alignSelf: "center",
  },
  btnSignUp:{
    width: "100%",
    height: 50,
    marginTop: 30,
    justifyContent: 'center',
    alignItems: 'center',
    textTransform: 'lowercase',
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
    alignSelf: "center",
    alignItems: "center",
    margin: 20,
    marginRight: 150,
  },
  centered: {
    alignSelf: "center",
    justifyContent: 'flex-start',
    backgroundColor: "#131722",
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
