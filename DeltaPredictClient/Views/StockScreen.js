
import { Text, View } from 'react-native';

import React from "react";
import {fetchData} from "../client/deltaPredicrClient";
import {useEffect,useState,useReducer } from 'react'
import { StyleSheet,ActivityIndicator,Platform ,StatusBar} from 'react-native';
import { useInterval } from "react-use";
import { Badge,Button,Card  ,Paragraph } from 'react-native-paper';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);
import { Searchbar } from 'react-native-paper';


function StockScreen({ route, navigation }) {

  const [data, setData] = useState(""); 
  const [loading, setLoad] = useState(true); 
  const [searchQuery, setSearchQuery] = React.useState('');

  const onChangeSearch = query => setSearchQuery(query);
  /* 2. Get the param */
  const {  otherParam } = route.params;


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
    <View style={styles.stocksBlock}>
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
    
    <Text style={styles.title}> {  
        <><p> {data["Company"]} - {data["symbol"]} {'\n'} NasdaqGS Real Time Price in USD {data["currentPrice"]}   {data["Change"]}   </p>
        </>
      } </Text> 
      <ActivityIndicator size="large" color="#00ff00"  animating={loading}    hidesWhenStopped={true} /> 
      <View style={styles.blackScreen}>
      <View style={styles.featuredDetails}>
      <Text style={{ color: 'white', fontSize: 20, flex: 2 }}> {  
            <><p>   {'\n'} volume : {data["volume"]} {'\n'} Average volume : {data["Avg Volume"]}  {'\n'} Market cap : {data["Market Cap"]} {'\n'} 
              P/C Ratio : {data["P/C"]}   {'\n'} 52 weeks high : {data["52W High"]}  {'\n'}52 weeks low : {data["52W Low"]} {'\n'}Industry : {data["Industry"]} {'\n'} P/E : {data["P/E"]}  {'\n'} Prev Close {data["Prev Close"]} {'\n'} 
</p>
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
      <Paragraph style={styles.featuredDetails}>{data["info"]}</Paragraph>
          </View>
          </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1e222d",
    justifyContent: "space-between",
    paddingTop: StatusBar.currentHeight,
  },
  stocksBlock: {
    flexDirection: "column",
    marginBottom: 10,
    margainLeft: 10,
    backgroundColor: "#1e222d",
    flex: 8,
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
  graphContainer: {
    width: 850,
    height: 590,
    justifyContent: 'flex-start',
    marginTop: 10,
    marginBottom: 5,
    marginLeft: 250,
    flexDirection: "column",
    
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
  marginTop: 50,
},
  blackScreen: {
      flexDirection: "row",
      alignItems: 'left',
      backgroundColor: "#1e222d",
      
  },
});


export default StockScreen;