import {StyleSheet, Text, View, TextInput, Button, Image, Pressable, TouchableHighlight, Platform } from "react-native";
import React, { useState, useEffect  } from "react";
import { sendResultsToMail } from "../client/deltaPredicrClient";
import Icon from "react-native-vector-icons/Ionicons";


function Recommendation({route, navigation}){
  const [input, setInput] = React.useState({email: ''});

  
    
  const handleOnchange = (text, input) => {
    setInput(text)
  };

  console.log(input)

  const requestRec = async () => {
    try { 
      const promise = new Promise((resolve, reject) => {
        resolve(sendResultsToMail(input))})
        promise.then((response) => {
          alert("mail sent!")
        })
    } catch (error) {} 
        
  };
    //   useEffect(() => {
    //     if(input!= "")
    //         requestRec(input)
    //     },  [input] // Delay in milliseconds or null to stop it
    // )

    return(

      <View style={styles.container}>
        <View style={{backgroundColor: "#131722"}}>
          <Text style={{color:"white", fontSize: 18, marginVertical: 10}}>Enter Your email to recieve a meail with a recommendation</Text>
          <View style={{backgroundColor: "#131722",marginVertical: 50}}>
            <View style={{backgroundColor: "#131722", flexDirection: 'row',marginTop: 250, marginHorizontal: "40%"}}>
            <Icon style={styles.iconInInputView} name="mail-outline" size={20} color={'white'}/>
              <TextInput style={styles.inputText}
                onChangeText={text => handleOnchange(text, 'email')}
                label="Email"
                placeholder="Enter your email address"
              />
            </View>
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
    marginTop: 100,
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