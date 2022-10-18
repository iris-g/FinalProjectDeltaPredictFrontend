

import { Text, View } from 'react-native';
import { fetchData } from "../client/deltaPredicrClient";
import { useDebounce } from 'use-lodash-debounce'
import { useEffect,useState,useReducer } from 'react'


function StockScreen({ route, navigation }) {

  const [data, setData] = useState(""); 
  /* 2. Get the param */
  const {  otherParam } = route.params;
 
  async function fetch_Data(text) {
    try { 
      
      const promise = new Promise((resolve, reject) => {
        resolve(fetchData(text) )
      })
    
      promise.then((response) => {
        setData(response)
        
      })
    } catch (error) {
    } 
    }
    fetch_Data(otherParam)
    const debouncedSave = useDebounce(data, 7000);
  useEffect(() => {
   
  }, [debouncedSave]);
      

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>stock price: {JSON.stringify(data)}</Text>
    </View>
  );
}
export default StockScreen;