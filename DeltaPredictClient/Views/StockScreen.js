import {StyleSheet,Text,View,Button,TouchableOpacity,ActivityIndicator,StatusBar,TouchableHighlight,Image,Pressable, KeyboardAvoidingView} from 'react-native';
import React, { useRef } from "react";
import {fetchData,fetchArima} from "../client/deltaPredicrClient";
import {useEffect,useState } from 'react'
import { useInterval } from "react-use";
import { Paragraph } from 'react-native-paper';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend,} from 'chart.js';
ChartJS.register( CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);
import { Searchbar } from 'react-native-paper';
import Autocomplete from 'react-native-autocomplete-input';
import Icon from "react-native-vector-icons/Ionicons";
import { addStockToFavoriteStockList, fetchSentimentData, fetchMonteCarlo } from "../client/deltaPredicrClient"
import Papa from 'papaparse';
import { ListItem } from 'react-native-elements'


//get file with top 50 stocks

var topStocks = require('../assets/top50.csv');

function StockScreen({ route, navigation }) {
  const {otherParam, userParam} = route.params;
  const [data, setData] = useState(""); 
  const [sentiment, setSentiment] = useState(""); 
  const [loading, setLoad] = useState(true); 
  const [predictedPrices,setPredicted]=useState(""); 
  const [graphPredictedPrices,setgraphPredicted]=useState(""); 
  const [weeklyPredictedPrices,setWeeklyPredicted]=useState(""); 
  const [searchQuery, setSearchQuery] = React.useState(otherParam);
  const [dailyTimestamps, setStamps] = React.useState(otherParam);
  const [weeklyTimestamps, setweeklyStamps] = React.useState(otherParam);
  // For Filtered search Data
  const [filteredStocks, setFilteredStocks] = useState([]);
  let marketStatus;
  const [monteCarlo, setMonteCarlo] = React.useState('')
  const { exchange } = require('trading-calendar');
  const usa = exchange('new-york');
  const [parsedCsvData, setParsedCsvData] = useState([]);



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
              arr.push(obj)
            }
        setParsedCsvData(arr)
     
        
      
      },
    });
  };


  //read top50 stock csv file
  useEffect(() => {
    parseFile(topStocks);
  

  },  []
  
)


  //check if stock exchange is open and update text
  if(usa.isTradingNow()){
    marketStatus="NasdaqGS Real Time Price in USD"
    // market is open right now
  } else {
    // market is closed right now
    marketStatus="Price as of last close";
  }

  //handle graph button clicks- set the correct dataset
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
    //create a filtered stock list 
    if (query) {
      // Making a case insensitive regular expression
      const regex = new RegExp(`${query.trim()}`, 'i');
      const temp = query
      // Setting the filtered film array according the query
      const tempList = parsedCsvData.filter(item => {
        if (String(item).substring(0,temp.length).search(temp) >=0)
          return item

      })
      setFilteredStocks(tempList)
    
    } else {
      // If the query is null then return blank
      setFilteredStocks([]);
    }

    
  };


  const as = query => {
    sett(monteCarlo)

  };

 //predicted prices dataset
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




  // *** generate data lables for graph**
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


  let today = new Date();
  today.setHours(0, 0, 0, 0);
  let tomorrow =  new Date()
  tomorrow.setHours(0, 0, 0, 0);
  tomorrow.setDate(today.getDate() + 1)
  var nextweek = new Date(today.getFullYear(), today.getMonth(), today.getDate()+7);


  var getDateArray = function(start, end) {
  var arr = new Array();
  var  dt = new Date(start);
    while (dt <= end) {
      arr.push(formatDate(new Date(dt)));
      dt.setDate(dt.getDate() + 1);
    }

    return arr;

}

// ***
  const  controller = useRef("");

  /*Monte Carlo calculation*/
  async function fetch_MonteCarlo(otherParam) {
      try { 
        const promise = new Promise((resolve, reject) => {
          resolve(fetchMonteCarlo(otherParam) )
        })
      
        promise.then((response) => {
          setMonteCarlo(response)
        })
        } catch (error) {} 
    }
  useEffect(() => {
    fetch_MonteCarlo(otherParam)
  },  [])
 


  //GET DATA FOR ARIMA PREDICTION
  async function fetch_Arima_Data() {
  
    try { 
      controller.current=new AbortController();
      let signal = controller.current.signal;
    // console.log(signal);

      const promise = new Promise((resolve, reject) => {
        resolve(fetchArima(otherParam,signal) )
        
      })
    
      promise.then((response) => {
        //console.log(response)
        var obj=null; 
        const dailyArimaData =new Array();
      

      // console.log(response)
        for(let i=0;i<Object.keys(response["daily"]["mean"]).length;i++)
        {
            obj= JSON.parse(response["daily"]["mean"][i])
            dailyArimaData.push(obj)
        }
        setgraphPredicted(dailyArimaData);
        //console.log(response["weekly"])
        setPredicted(dailyArimaData);
        setWeeklyPredicted(response["weekly"]["mean"]);
        setweeklyStamps((response["weekly"]["dates"]));
        
      })
    } catch (error) {
    } 
    }parsedCsvData
    

  //cancel arima fetch
  const cancelRequest= () => controller.current && controller.current.abort();

  

  //call function to get arima prediction and sentiment score  for the first time only
  useEffect(() => {
    setStamps(getDateArray(tomorrow,nextweek));
    console.log(parsedCsvData)
    console.log(parsedCsvData.includes(searchQuery)  )
    // if(parsedCsvData.includes(searchQuery) && searchQuery!= "" )
    // {
      //console.log("FETCH")
       fetch_sentiment_Data(searchQuery);
    //fetch_Arima_Data()
   // }
    

  },  []
  
  )
  useEffect(() => {

    //call function to get arima prediction  when a new search is being made
    setStamps(getDateArray(tomorrow,nextweek));
    if(parsedCsvData.includes(searchQuery) && searchQuery!= ""  )
    {
      fetch_sentiment_Data(searchQuery);
    //fetch_Arima_Data()
  }
   

  },  [searchQuery]

  )
  //handle price text color according to sign
  const handleColors = (value) => {
    let val =(parseFloat(value))
    if (val > 0) return "green";
    if (val < 0) return "red";
    
  };


//get stock live data from the server
  async function fetch_Data(text) {
 
    try { 
      const promise = new Promise((resolve, reject) => {
        resolve(fetchData(text) )
      })
    
      promise.then((response) => {
        //console.log(response["symbol"] )
        if(response["symbol"] == searchQuery)
          setData(response)
          setLoad(false)
        
      })
    } catch (error) {
    } 
    }
    useInterval(() => {
      if(parsedCsvData.includes(searchQuery) && searchQuery!= "" )
        fetch_Data(searchQuery)
    },  8000// Delay in milliseconds or null to stop it
    
    )
 
      //get stocks monthly sentiment score
      async function fetch_sentiment_Data(text) {
 
        try { 
          //console.log(text)
          const promise = new Promise((resolve, reject) => {
            resolve(fetchSentimentData(text) )
          })
          promise.then((response) => {
            console.log(response)
          setSentiment(response)   
          })
        } catch (error) {
        } 
        }
     
  return (

    <View style={styles.container}> 
          <TouchableHighlight onPress={() => {navigation.navigate('Home');cancelRequest();}} style={styles.backImage}>
              <Image
              source={require('../assets/Photos/icon.png')}
              style={{ flex: 1 }}
              resizeMode="contain"
              />
          </TouchableHighlight>   

          <View style={styles.centered}>
            
            <View style={styles.searchSection}>
            <View style={{alignSelf: "center"}}>
              <Icon style={styles.iconInAutocomplete} name="search-sharp" size={20} color= "gray"/>
              
              <Autocomplete style={{ backgroundColor: 'white', color: 'gray', height: 40, flex: 1, padding: 10, paddingLeft: 50, borderRadius: 6, fontSize: 16}}
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
                    onPress={() => { setSearchQuery(item); setLoad("true"); setFilteredStocks([]);}}> 
            
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


          <View style={{backgroundColor: "#131822",alignItems: "center",  marginTop: -16}}>
            <Text style={styles.title}> {  
                <><p > {data["name"]} - {data["symbol"]} {'\n'} {marketStatus} {data["close"]}
                    <Text style={{ color:handleColors(data["change"]) }}>  {data["change"]} </Text> 
                    <Text style={{ color:handleColors(data["regularMarketChange"]) }}>  {data["regularMarketChange"]}</Text> </p>
                </>}
            </Text> 
          </View>

          <ActivityIndicator style={{backgroundColor: "#131822"}} size="large" color="#307D7E" animating={loading} hidesWhenStopped={true} /> 
          
          <View style={{backgroundColor: '#131722'}}>
            <View style={styles.blackScreen}>
                <View style={styles.featuredDetails}>
                  

                  <View style={{backgroundColor: '#131722', alignSelf: "center",alignItems: "center"}}>
                    <Text style={{ backgroundColor: '#1d415f', color:'#35a2eb', fontWeight: "bold", fontSize: 20, borderRadius: 5, borderWidth: 1 }} >  Monte Carlo  </Text>
                    <Text style={{ color:'#35a2eb', fontWeight: "bold", fontSize: 20 }} > {monteCarlo.Min} Mɪɴ ━━━━━━━━━━━━━ Mᴀx {monteCarlo.Max} </Text>
                  </View>

                  <Text style={{ color: 'white', fontSize: 20, flex: 2 }}> {  
                    <><p>{'\n'} monthly sentiment score:{sentiment} {'\n'} volume:   {data["volume"]} {'\n'} Average volume:   {data["averageVolume"]} {'\n'} Market cap:    {data["marketCap"]} {'\n'} 52 weeks high:   {data["fiftyTwoWeekHigh"]} {'\n'} 52 weeks low:   {data["fiftyTwoWeekLow"]} {'\n'} Industry:   {data["industry"]} {'\n'} Prev Close   {data["previousClose"]} </p>

                    </>}
                  </Text> 

                  <View style={{flexDirection: "row", backgroundColor: "#131822", alignSelf: "center"}}>
                    <Pressable style={{flexDirection: "row", alignSelf: "center", borderRadius: 5, borderColor: '#362b1d', borderWidth: 2}} onPress={() => addStockToFavoriteStockList(userParam, otherParam)}>
                      <Icon style={{color: "#35a2eb", fontWeight: 'bold', backgroundColor: "#1d415f"}} name="add-circle" size={20} color="#000"/>
                      <Text style={{color: "#35a2eb", fontWeight: 'bold',fontSize: 17, backgroundColor: "#1d415f"}}> Add To Favorite </Text>
                    </Pressable>   
                  </View>
                 
                </View>

                <View style={styles.graphContainer}>
                  <Line style={{fontSize: 70}} data={prices }  width={100}  height={300} options={{maintainAspectRatio: false, responsive: true}}/>
                  <View style={{ flexDirection:"row" ,alignItems:"top", margin: 15}}>
                    <TouchableOpacity style={{backgroundColor: '#1e3841', margin: 10, borderRadius: 5, borderWidth: 1}} onPress={() => onDailyButtonPress()}><Text style={{color:'#4bc0c0',fontSize: 15 }} >  Daily  </Text></TouchableOpacity>
                    <TouchableOpacity style={{backgroundColor: '#1e3841', margin: 10, borderRadius: 5, borderWidth: 1}} onPress={() => onWeekButtonPress()}><Text style={{color:'#4bc0c0',fontSize: 15}} >  Weekly  </Text> </TouchableOpacity>
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
    position: 'relative',
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
  itemText: {
    fontSize: 15,
    paddingTop: 5,
    paddingBottom: 5,
    margin: 2,
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
    zIndex: 1,
  },
  blackScreen: {
    flexDirection: "row",
    alignItems: "center",
  },
  backImage: {
    backgroundColor: "#131722",
    justifyContent:"flex-start",
    flexDirection: "row",
    width: 275,
    height: 100 ,
    marginLeft: 25, 
    marginTop: 10
  },
  searchSection: {
    flexDirection: 'row',
    marginLeft: '5%',
    marginRight: '5%',
  },
  autocompleteContainer: {
    borderWidth: 0,
    marginLeft: 10,
    marginRight: 10,
    paddingLeft: 15,
  },
  inputContainer: {
    minWidth: 330,
    width: "90%",
    backgroundColor: 'transparent',
    borderColor: 'transparent',
  },
  iconInAutocomplete:{
    paddingLeft: 35,
    padding: 10,
    position: 'absolute',
    zIndex: 100,
  },
});


export default StockScreen;
