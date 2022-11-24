import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput, Button, Image, Pressable } from "react-native";
import { useNavigation } from '@react-navigation/native';
import Icon from "react-native-vector-icons/Ionicons";
import {_onPressButtonsignUp} from '../client/deltaPredicrClient'
import { GoogleLogin } from 'react-google-login';
import FacebookLogin from 'react-facebook-login';

export default function SignUp() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [answer1, setAnswer1] = useState("");
    const [answer2, setAnswer2] = useState("");
    const [answer3, setAnswer3] = useState("");
    const [redColor, setRedColor] = useState([])
    const navigation = useNavigation();
   

    function cheackAnswer(){

        if(email === ""){
            setAnswer1("You must enter email address.")
            setRedColor()
        }
        else{setAnswer1("") } 

        if(password === "")
            setAnswer2("You must enter a password.")
        else setAnswer2("")

        if(confirmPassword === "")
            setAnswer3("You must confirm your password.")
        else setAnswer3("")

        if ( /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/.test(email) === false) 
            setAnswer1("Your email is incorrect.")
        else setAnswer1("")

        if(email !== "" && password !== "" && confirmPassword !== "" )
            _onPressButtonsignUp(email, password, confirmPassword, navigation)
    }

    const responseGoogle = (response) => {
        console.log(response);
      }

    const responseFacebook = (response) => {
        console.log(response);
    }
    
    return (
        
        <View style={styles.container}>
            <View style={styles.colorContainer}>
                <Pressable onPress={() => {navigation.navigate('Welcome')}} style={styles.LogoImage}>
                    <Image
                    source={require('../assets/Photos/icon.png')}
                    style={{ flex: 1, backgroundColor: "#131722"}}
                    resizeMode="contain"
                    />
                </Pressable>    
            
                    
                <View style={styles.inputTextContainer}>
                    <View>
                        <Text style={styles.HeadLineText}> Sign Up to ΔPredict</Text>
                    </View>
                    
                    <View style={styles.inputView}>
                        <Icon style={{color: 'white', padding: 15, position: 'absolute'}} name="person-outline" size={20} color="#000"/>
                        <TextInput style={styles.TextInput}
                            numberOfLines={1}
                            placeholder="Email"
                            placeholderTextColor="#fff"
                            onChangeText={(email) => setEmail(email)}>
                        </TextInput>
                    </View>

                    <Text style={{color: 'red'}}>{answer1}</Text>

                    <View style={styles.inputView}>
                        <Icon style={styles.iconInInputView} name="lock-closed-outline" size={20} color="#000"/>
                        <TextInput style={styles.TextInput}
                            numberOfLines={1}
                            placeholder="Password"
                            placeholderTextColor="#fff"
                            secureTextEntry={true}
                            onChangeText={(password) => setPassword(password)}>
                        </TextInput>
                    </View>
 
                    <Text style={{color: 'red'}}>{answer2}</Text>

                    <View style={styles.inputView}>
                        <Icon style={styles.iconInInputView} name="lock-closed-outline" size={20} color="#000"/>
                        <TextInput style={styles.TextInput}
                            placeholder="Confirm Password"
                            placeholderTextColor="#fff"
                            secureTextEntry={true}
                            onChangeText={(confirmPassword) => setConfirmPassword(confirmPassword)}>
                        </TextInput>
                    </View>

                    <Text style={{color: 'red'}}>{answer3}</Text>
                    
                    <View style={styles.btnSignUp}>
                        <Button style={styles.btnSignUpText} uppercase = {true} title ="Sign Up" color = "#01a37b"
                        onPress={() => cheackAnswer()}/>
                    </View>
                </View>
                <View style={{ backgroundColor: "#131722", alignSelf: "center", alignItems: 'center', margin: 12, flexDirection: "row" }}>
                <Text style={{alignSelf: "center", color: 'white', marginTop: 10}}> ─ Or ─ </Text> 
                </View>
                
                <View style={{ backgroundColor: "#131722", alignSelf: "center", alignItems: 'center', margin: 12, flexDirection: "row" }}>

                    <View style={{ backgroundColor: "#131722",  margin: 8, marginLeft: 22}}>
                    <GoogleLogin
                    clientId="658977310896-knrl3gka66fldh83dao2rhgbblmd4un9.apps.googleusercontent.com"
                    buttonText="Sing up with Google"
                    onSuccess={responseGoogle}
                    onFailure={responseGoogle}
                    cookiePolicy={'single_host_origin'}
                    render={renderProps => (
                    <button style={{backgroundColor: "white",  alignItems: 'center', borderColor: "red", borderRadius: 3, borderWidth: 1.9}} onClick={renderProps.onClick} disabled={renderProps.disabled}><Icon style ={{color: 'red'}} size={19} name="logo-google"></Icon><Text style = {{color: 'red', fontSize: 18, alignSelf: 'center'}}>︳With Google</Text></button>
                    )}
                    />
                    </View>

                    <View style={{alignSelf: "center", backgroundColor: "#131722",  margin: 8, borderColor: "blue", borderRadius: 3, borderWidth: 1 }}>
                    
                    <FacebookLogin
                        appId="1088597931155576"
                        autoLoad={false}
                        fields="email"
                        textButton = <Text style={{color: '#1569C7', fontSize: 18}}>︳Wite Facebook</Text>
                        size = "small"
                        cssClass ="lol"
                        icon = <Icon style ={{color: '#1569C7'}} size={19} name="logo-facebook"></Icon>
                        //onClick={componentClicked}
                        //callback={responseFacebook} 
                        />
                        
                        
                        
                    </View>
                </View>
                <View style={{ backgroundColor: "#131722", alignSelf: "center", alignItems: 'center', margin: 12, flexDirection: "row" }}>
                <Text style={{alignSelf: "center", color: 'white',}}>Already have an account? </Text> <Pressable onPress={() => {navigation.navigate('Welcome')}}><Text style={{color: '#1569C7'}}> Sign in</Text></Pressable>
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
    colorContainer:{
        backgroundColor: "#131722",
    },
    HeadLineText: {
        fontSize: 35,
        margin: 20,
        color: 'white',
        justifyContent: 'center',
        alignSelf: 'center',
    },
    inputTextContainer: {
        marginTop: 60,
        flex: 1, 
        justifyContent: 'center',
        alignItems: 'center',
    },
    inputView: {
        flexDirection: "row",
        borderRadius: 10,
        marginTop: 20,
        borderWidth: 3,
        borderColor: '#72bcc4',
        justifyContent: 'flex-start',
        alignItems: 'center',
        alignSelf: "center",
        width: "18%",
        height: "14%",
    },
    TextInput: {
        height: 50,
        flex: 1,
        padding: 10,
        paddingLeft: 50,
        borderRadius: 10,
        borderColor: "grey",
        color: 'white',
        width: "18%",
        height: "100%",
    },
    iconInInputView:{
        color: 'white',
        padding: 15,
        position: 'absolute',
    },
    btnSignUp:{
        backgroundColor: "#131722",
        width: "100%",
        height: 50,
        marginTop: 30,
        justifyContent: 'center',
        alignItems: 'center',
        textTransform: 'lowercase',
    },
    btnSignUpText:{
        backgroundColor: "#131722",
        textTransform:'capitalize',
        width: 330,
        height: 150,
    },
    LogoImage: {
        backgroundColor: "#131722",
        justifyContent:"flex-start",
        flexDirection: "row",
        width: 275,
        height: 100 ,
        marginLeft: 25, 
        marginTop: 10
    },

})