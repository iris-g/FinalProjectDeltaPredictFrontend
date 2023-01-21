import {StyleSheet,Text,View,Button,TouchableOpacity,ActivityIndicator,StatusBar,TouchableHighlight,Image,Pressable,Dimensions} from 'react-native';
import React, { useRef, useState, useEffect, useCallback } from "react";
import {fetchData,fetchArima} from "../client/deltaPredicrClient";
import { useInterval } from "react-use";
import { Paragraph } from 'react-native-paper';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Colors} from 'chart.js';
ChartJS.register( CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);
import { AutocompleteDropdown } from 'react-native-autocomplete-dropdown';
import Icon from "react-native-vector-icons/Ionicons";
import { addStockToFavoriteStockList, fetchSentimentData, fetchMonteCarlo } from "../client/deltaPredicrClient"
import Papa from 'papaparse';
import  {StackedBarChart, XAxis, YAxis, Grid } from 'react-native-svg-charts'
import Feather from 'react-native-vector-icons/Feather'
Feather.loadFont()
import {useIsFocused} from '@react-navigation/native';
//get file with top 50 stocks
var topStocks = require('../assets/top50.csv');

function StockScreen({ route, navigation })  {
  const {otherParam, userParam} = route.params; // otherParam : "Symbol" , userParam: "mail"
  console.log(typeof otherParam)
  console.log(typeof userParam)
  const [data, setData] = useState(""); 
  const [sentiment, setSentiment] = useState(""); 
  const [loading, setLoad] = useState(true); 
  const [predictedPrices,setPredicted]=useState(""); 
  const [graphPredictedPrices,setgraphPredicted]=useState(""); 
  const [weeklyPredictedPrices,setWeeklyPredicted]=useState(""); 
  const [searchQuery, setSearchQuery] = React.useState(otherParam);
  const [dailyTimestamps, setStamps] = React.useState(otherParam);
  const [dailyTime, dailyTimes] = React.useState(otherParam);
  const [weeklyTimestamps, setweeklyStamps] = React.useState(otherParam);
  const onOpenSuggestionsList = useCallback(isOpened => {}, [])
  const dropdownController = useRef(null)
  const searchRef = useRef(null)
  // For Filtered search Data
  const [filteredStocks, setFilteredStocks] = useState([]);
  let marketStatus;
  const [monteCarlo, setMonteCarlo] = React.useState('')
  const { exchange } = require('trading-calendar');
  const usa = exchange('new-york');
  const [parsedCsvData, setParsedCsvData] = useState([]);
  const ref = React.useRef(null);
  const colors = ['#522526', '#255245']
  const keys =  ['Low', 'High']
  const abortController =new AbortController()
  const isFocused = useIsFocused();
  //reac csv file with top stocks into  an array
  const parseFile = file => {
    Papa.parse(file, {
      header: false,
      download: true,
      complete: results => {
        const arr =new Array();
            for(let i=0;i<Object.keys(results.data).length;i++)
            {
              const obj= (results.data[i][0])
              arr.push({"id": i ,"title": obj})  
            }
        setParsedCsvData(arr)

      },
    });
  };


  //read top50 stock csv file
  useEffect(() => {
    parseFile(topStocks);
    marketStatus="NasdaqGS Real Time Price in USD"
  },  [])


  const onClearPress = useCallback(() => {
    setFilteredStocks(null)
  }, [])

  function setSelectedItem(item){
    navigation.navigate('StockScreen',{otherParam: item, userParam: userParam})
  }
  // //check if stock exchange is open and update text
  // if(usa.isTradingNow()){
  //   marketStatus="NasdaqGS Real Time Price in USD"
  //   // market is open right now
  // } else {
  //   // market is closed right now
  //   marketStatus="Price as of last close";
  // }

  //handle graph button clicks- set the correct dataset
  const onWeekButtonPress = query => {
    console.log(graphPredictedPrices)
    setStamps(weeklyTimestamps)
    setgraphPredicted(weeklyPredictedPrices);

  };

  const onDailyButtonPress = query => {
    setStamps(dailyTime)
    setgraphPredicted(predictedPrices);

  };

 
  //Change borderColor chart and change label color. 
  //ChartJS.defaults.backgroundColor = 'white';
  ChartJS.defaults.borderColor = '#212430';
  ChartJS.defaults.color = '#f0f0f1';

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
      },
      {
        label: "Max price",
        data: [monteCarlo.Max,monteCarlo.Max,monteCarlo.Max,monteCarlo.Max,monteCarlo.Max,monteCarlo.Max,monteCarlo.Max,monteCarlo.Max,monteCarlo.Max,monteCarlo.Max],
        backgroundColor: "rgba(75,192,192,0.2)",
        borderColor: "rgba(75,192,192,1)",
        borderWidth: 3,
        borderDash: [ 5, 5 ],
        borderDashOffset: 2,
        fill: false
      },
      {
        label: "Min price",
        data: [monteCarlo.Min,monteCarlo.Min,monteCarlo.Min,monteCarlo.Min,monteCarlo.Min,monteCarlo.Min,monteCarlo.Min,monteCarlo.Min,monteCarlo.Min,monteCarlo.Min],
        backgroundColor: "rgba(75,192,192,0.2)",
        borderColor: "rgba(75,192,192,1)",
        borderWidth: 3,
        borderDash: [ 5, 5 ],
        borderDashOffset: 2,
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

  //Get date for the daily predict in the chart.
  var getDateArray = function(start, end) {
  var arr = new Array();
  var  dt = new Date(start);
    while (dt <= end) {
      arr.push(formatDate(new Date(dt)));
      dt.setDate(dt.getDate() + 1);
    }
    console.log(arr)
    dailyTimes(arr)
    return arr;

  }

  // ***
  //const  controller = useRef("");

  /*Monte Carlo calculation*/
  async function fetch_MonteCarlo(otherParam) {
    try { 
      ref.current= new AbortController;
      const signal = ref.current.signal;

      const promise = new Promise((resolve, reject) => {
        resolve(fetchMonteCarlo(otherParam,signal) )
      })
      
      promise.then((response) => {
        setMonteCarlo(response)
      })
      } catch (error) {} 
  }

  useEffect(() => {
    fetch_MonteCarlo(otherParam)
  }, [])
 

  
  //GET DATA FOR ARIMA PREDICTION
  async function fetch_Arima_Data() {
    console.log("???");
    try { 
      //abortController=new AbortController()
      ref.current= new AbortController;
      const signal = ref.current.signal;
      console.log("???");
      console.log(signal);

      const promise = new Promise((resolve, reject) => {
        resolve(fetchArima(otherParam,{signal}) )
        
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
  const cancelRequest= () => {ref.current.abort();console.log(ref.current.signal)}

  

  //call function to get arima prediction and sentiment score  for the first time only
  useEffect(() => {
    setStamps(getDateArray(tomorrow,nextweek));
    //abortController=new AbortController();
    fetch_sentiment_Data(otherParam);
    //fetch_Arima_Data()
   // }
  },  [])


  useEffect(() => {
    //call function to get arima prediction  when a new search is being made
    setStamps(getDateArray(tomorrow,nextweek));
    //if(parsedCsvData.includes(otherParam) && otherParam!= ""  )
    {
      fetch_sentiment_Data(otherParam);
      //abortController=new AbortController();
      fetch_Arima_Data()
    }
  }, [otherParam])


  //handle price text color according to sign.
  const handleColors = (value) => {
    let val =(parseFloat(value))
    if (val > 0) return "green";
    if (val < 0) return "red";
    
  };


//get stock live data from the server.
  async function fetch_Data(text) {
    try { 
      const promise = new Promise((resolve, reject) => {
        resolve(fetchData(text) )
      })
    
      promise.then((response) => {
        //console.log(response["symbol"] )
        if(response["symbol"] == otherParam)
          setData(response)
          setLoad(false)
      })

    } catch (error) {} 
    }


  useInterval(() => {
    //if(parsedCsvData.includes(otherParam) && otherParam!= "" )
      fetch_Data(otherParam)
  },  8000// Delay in milliseconds or null to stop it.
  )
 
  //get stocks monthly sentiment score.
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
    } catch (error) {} 
    }
    

 /*Data for the StackedBarChart. */
  const data1 = [
    {
      Low: 5-sentiment,
      High: sentiment,
    },
  ]

  //;navigation.navigate('Home')

  return (

    <View style={styles.container}> 
          <TouchableHighlight onPress={() => {navigation.navigate('Dashboard')}} style={styles.backImage}>
              <Image
              source={require('../assets/Photos/icon.png')}
              style={{ flex: 1 }}
              resizeMode="contain"
              />
          </TouchableHighlight>   

          <View style={styles.searchSection}>
            <Icon style={styles.iconInAutocomplete} name="search-sharp" size={22} color= "#777777"/>
            <AutocompleteDropdown 
                ref={searchRef}
                controller={controller => {dropdownController.current = controller}}
                // initialValue={'1'}
                // useFilter={false} // set false to prevent rerender twice
                dataSet={parsedCsvData} //Data set for suggestion list parsedCsvData = top50.csv
                // onChangeText={{onChangeSearch}}
                onSelectItem={item => {item && setSelectedItem(item.title)}}
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
                renderItem={(item, text) => <Text style={{ color: '#494849', padding: 15, zIndex: 1 }}>{item.title}</Text>}
                ChevronIconComponent={<Feather name="chevron-down" size={20} color="#434243" />} // Add icon to input container.
                ClearIconComponent={<Feather name="x" size={20} color="#434243" />} // Add icon to input container.
                inputHeight={38} // Change the input container height.
                showChevron={true} //
                closeOnBlur={false} //
                // showClear={false}
              />
          </View>


          <View style={{backgroundColor: "#131822", alignItems: "center", zIndex: -1}}>
            <Text style={styles.title}> {  
                <><p > {data["name"]} - {data["symbol"]} {'\n'} {marketStatus} {data["close"]}
                    <Text style={{ color:handleColors(data["change"]) }}>  {data["change"]} </Text> 
                    <Text style={{ color:handleColors(data["regularMarketChange"]) }}>  {data["regularMarketChange"]}</Text> </p>
                </>}
            </Text> 
          </View>

          <ActivityIndicator style={{backgroundColor: "#131822", zIndex: -1}} size="large" color="#307D7E" animating={loading} hidesWhenStopped={true} /> 
          
          <View style={{backgroundColor: '#131722'}}>
            <View style={styles.blackScreen}>
                <View style={styles.featuredDetails}>
                  <Text style={{fontSize: 18, alignSelf: "center", color: '#C9D6DF'}}>Monthly sentiment score: {sentiment}</Text>
                  <View style={ {alignSelf: "center", flexDirection: 'row'} }>
                    <Text style={{padding: 8, color: '#4c2223', fontSize: 20, fontWeight: "bold"}}>Low</Text>
                      <StackedBarChart
                        style={{ height: 15, width: "70%", alignSelf: 'center' }}
                        keys={keys}
                        colors={colors}
                        data={data1}
                        showGrid={false}
                        horizontal= {true}       
                      />
                      <XAxis
                        style={{ marginHorizontal: -10 }}
                        data={data1}
                        formatLabel={(value, index) => index}
                        contentInset={{ left: 10, right: 10 }}
                        svg={{ fontSize: 10, fill: 'black' }}
                        />
                      <YAxis
                        style={ { position: 'relative', top: 10, bottom: 10 }}
                        data={data1}
                        keys={keys}
                        contentInset={ { top: 10, bottom: 10 } }
                        svg={ {
                            fontSize: 18,
                            fill: 'red',
                            stroke: 'black',
                            strokeWidth: 0.2,
                            alignmentBaseline: 'baseline',
                            baselineShift: '3',
                        } }
                        />
                      <Text style={{padding: 9, color: '#224c4b', fontSize: 20, fontWeight: "bold",}}>High</Text>
                  </View>
                  <Text style={{ color: '#f0f0f1', fontSize: 20, flex: 2 }}> {  
                    <><Text>{'\n'} volume:   {data["volume"]} {'\n'} Average volume:   {data["averageVolume"]} {'\n'} Market cap:    {data["marketCap"]} {'\n'} 52 weeks high:   {data["fiftyTwoWeekHigh"]} {'\n'} 52 weeks low:   {data["fiftyTwoWeekLow"]} {'\n'} Industry:   {data["industry"]} {'\n'} Prev Close   {data["previousClose" ]} <Text style={{fontSize: 10, color: '#C9D6DF'}}>USD</Text></Text>

                    </>}
                  </Text> 
                  
                 <View style={{flexDirection: "row", backgroundColor: "#131822", alignSelf: "center", marginTop: 20}}>
                    <Pressable style={{flexDirection: "row", alignSelf: "center", borderRadius: 5, borderColor: '#1e3841', borderWidth: 2}} onPress={() => addStockToFavoriteStockList(userParam, otherParam)}>
                      <Icon style={{color: "#4bc0c0", fontWeight: 'bold', backgroundColor: "#1e3841"}} name="add-circle" size={20} color="#000"/>
                      <Text style={{color: "#4bc0c0", fontWeight: 'bold',fontSize: 17, backgroundColor: "#1e3841"}}> Add To Favorite </Text>
                    </Pressable>   
                  </View>
                  
                </View>

                <View style={styles.graphContainer}>
                  <Line style={{fontSize: 70,color: '#C9D6DF'}} data={prices}  width={100}  height={300} options={{maintainAspectRatio: false, responsive: true,  plugins: {legend: {display: true, data: {  color: 'rgb(255, 99, 132)'}}}}}/>
                  <View style={{ flexDirection:"row" ,alignItems:"top", margin: 15}}>
                    <TouchableOpacity style={{backgroundColor: '#1e3841', margin: 10, borderRadius: 5, borderWidth: 2}} onPress={() => onDailyButtonPress()}><Text style={{color:'#4bc0c0',fontSize: 15 }} >  Daily  </Text></TouchableOpacity>
                    <TouchableOpacity style={{backgroundColor: '#1e3841', margin: 10, borderRadius: 5, borderWidth: 2}} onPress={() => onWeekButtonPress()}><Text style={{color:'#4bc0c0',fontSize: 15}} >  Weekly  </Text> </TouchableOpacity>
                  </View> 
                </View>


            </View>
            
            <View style={styles.detailedBlock}>
              <Text style={{color: '#C9D6DF', fontSize: 20}}>Description{'\n'}</Text>
              <Paragraph style={{color: '#C9D6DF'}}>{data["info"]}</Paragraph>
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
  title: {
    flexDirection: "row", 
    paddingTop: 2,
    color: "#C9D6DF",
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
    marginTop: 100,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#1e222d',
  },
  paragraph: {
    fontSize: 16,
    fontWeight: 'italic',
    color: "#C9D6DF",
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
    marginRight: 50,
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

});


export default StockScreen;
