import {StyleSheet, Text, View, TextInput, Button, Image, Pressable, TouchableHighlight, Platform } from "react-native";
import React, { useState, useEffect  } from "react";
import { sendResultsToMail } from "../client/deltaPredicrClient";
import Icon from "react-native-vector-icons/Ionicons";
import {useIsFocused} from '@react-navigation/native';


function Recommendation({route, navigation}){
  const [input, setInput] = React.useState({email: ''});
  const [colorInputText, setColorInputText] = useState("white");
  const [answer , setAnswer] = useState('')
  const isFocused = useIsFocused();
  let flag = true
    

    //
  const handleOnchange = (text, input) => {
    setInput(text)
  };

  console.log(input)
  
  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setAnswer('')
      setColorInputText("white")
    });
  }, [navigation]);

  const requestRec = async () => {
    if(input === ""){
      setColorInputText("#DC143C")
      setAnswer("You must enter email address.")
    }
    else{
      if ( /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/.test(input) === false) {
        console.log("Your email is incorrect.")
        flag = false
        setColorInputText("#DC143C")
      }
      else {
        try { 
          const promise = new Promise((resolve, reject) => {
            resolve(sendResultsToMail(input))})
            promise.then((response) => {
               alert("mail sent!")
              console.log("send")
              setColorInputText("white")
            })
        } catch (error) {} 
      }
    }   
  };


    return(

      <View style={styles.container}>
        <View style={{backgroundColor: "#131722"}}>
          <View style={{alignItem: "center", alignSelf: 'center', marginTop: 100}}>
            <Text style={{color:'#C9D6DF', fontSize: 18}}>
                Enter your email to receive an email with a recommendation on the best 5 seconds to invest today.{'\n'}{'\n'}
                Note!{'\n'}
                The email arrives within half an hour to your email account because it takes the algorithm to check which stocks to invest in.{'\n'}
            </Text>
          </View>
          <View style={{backgroundColor: "#131722",marginVertical: 50}}>
            <View style={{backgroundColor: "#131722", flexDirection: 'row',marginTop: 220, marginHorizontal: "40%"}}>
            <Icon style={styles.iconInInputView} name="mail-outline" size={20} color={colorInputText}/>
              <TextInput style={styles.inputText}
                onChangeText={text => handleOnchange(text, 'email')}
                label="Email"
                placeholder="Enter your email address"
                placeholderTextColor={colorInputText}
              />
            </View>
            <View style={{alignItem: "center", alignSelf: 'center', marginTop: 20}}><Text style={{color: colorInputText}}>{answer}</Text></View>
            <View style={styles.detailedBlock}>
              <Button  style={ styles.btn } color= "#307d7e" title="  send  " onPress={requestRec} />
            </View>
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
  iconInInputView:{
    padding: 11.5,
    position: 'absolute',
  },
  inputText: {
    backgroundColor: "#131722",
    color: '#ffffff',
    alignSelf: 'center',
    width: "100%",
    padding: 10,
    paddingLeft: 42,
    fontSize: 14.5,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#72bcc4',
  },
  detailedBlock: {
    backgroundColor: "#131722",
    flexDirection: 'row',
    alignSelf: 'center',
    marginTop: 80,
  },
  btn:{
    width: "30%",
    height: 50,
    backgroundColor: "#131722",
    justifyContent: 'center',
    alignItems: 'center',
    textTransform: 'lowercase',
  },
    
});




export default Recommendation;