import {StyleSheet, Text, View, TextInput, Button, Image, Pressable, TouchableHighlight,Platform } from "react-native";
import React, { useState, useEffect  } from "react";
import { sendResultsToMail } from "../client/deltaPredicrClient";

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
         <View style={{paddingTop: 50, paddingHorizontal: 20}}>
        <Text style={{color:"white", fontSize: 18, marginVertical: 10}}>
          Enter Your email to recieve a meail with a recommendation
        </Text>
        <View style={{marginVertical: 50}}>
        <TextInput style={styles.inputText}
            onChangeText={text => handleOnchange(text, 'email')}
            label="Email"
            placeholder="Enter your email address"
          />
          <View style={styles.detailedBlock}>
          <Button style={ styles.btn } title="send" onPress={requestRec} />
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
    inputText: {
      backgroundColor: "#131722",
      color: '#ffffff',
      textShadowColor: 'black', 
      textShadowOffset: { width: -1, height: 0 },
      textShadowRadius: 10,
      margin: 10,
      marginTop: 220,
      fontSize: 22,
      fontWeight: 'bold',
  },
    detailedBlock: {
        backgroundColor: "#131722",
        margin: 50,
        marginTop: 100,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#1e222d',
      },
      btn:{
        width: "30%",
        height: 50,
        marginTop: 30,
        backgroundColor: "#FF1493",
        justifyContent: 'center',
        alignItems: 'center',
        textTransform: 'lowercase',
    },
    
});




export default Recommendation;