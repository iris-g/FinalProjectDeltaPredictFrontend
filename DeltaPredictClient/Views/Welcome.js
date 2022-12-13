import React, { useState } from "react";
import {StyleSheet, Text, View, TextInput, Button, Image, Pressable,TouchableHighlight,Platform } from "react-native";
import { useNavigation } from '@react-navigation/native';
import Icon from "react-native-vector-icons/Ionicons";
import { _onPressButtonLogin } from "../client/deltaPredicrClient"
import { GoogleLogin } from 'react-google-login';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';


export default function Welcome()  {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState(""); 
    const [eyePress, setEyePress] = useState("eye-off-outline")
    const [changePasswordVisibility, setViisibility] = useState(true)
    const [answer1, setAnswer1] = useState("");
    const [answer2, setAnswer2] = useState("");
    const [signCheck, setCheck] = useState("");
    const [colorset, setColor] = useState("");
    const [colorInputText] = useState(['white', 'white']);
    const navigation = useNavigation(); //get app navigation

    /*A function that shows the password to the user.*/
    function _onPressButtonEye(){
        console.log(eyePress)
        if(eyePress == "eye-off-outline"){
            setEyePress("eye-outline") 
            setViisibility(false)
        }
        else{
            setEyePress("eye-off-outline")
            setViisibility(true)
            console.log(changePasswordVisibility)
       }
    }

    /*Checking the input text.*/
    function cheackAnswer(){

        if(email === ""){
            setAnswer1("You must enter email address.")
            colorInputText[1] = "#DC143C"
        }
        else{ 
            setAnswer1("")
            colorInputText[1] = "white"
        }

        if(password === ""){
            setAnswer2("You must enter a password.")
            colorInputText[0] = "#DC143C"
        }
        else{ setAnswer2("")
        colorInputText[0] = "white"
        }

        if(email !== "" && password !== "")
            setSignCheck(email,password,navigation)
    }


     /*Monte Carlo calculation*/
     async function setSignCheck(email, password, navigation) {
        try { 
        const promise = new Promise((resolve, reject) => {
            resolve(_onPressButtonLogin(email,password,navigation))
        })
        
        promise.then((response) => {
            if(response.result == "true"){
                navigation.navigate('Dashboard',{otherParam: email})
                
            }
            else if(response.result == "password"){
                setCheck("✘ Wrong password")
                setColor("#DC143C")
                colorInputText[0] = "#DC143C"
            }
            else{
                setCheck("✘ Incorrect email")
                setColor("#DC143C")
                colorInputText[1] = "#DC143C"
            }
        })
        } catch (error) {} 
    }


    /*Login with Google response */ 
    const responseGoogle = (response) => {
        //console.log(response);
      }

    /*Login with Faceboik response */ 
    const responseFacebook = (response) => {
        //console.log(response);
        setSignCheck(response.email, response.id, navigation)
    }

    return (
       
        <View style={styles.container}>
            <View style={styles.colorContainer}>

                <TouchableHighlight onPress={() => {navigation.navigate('Welcome')}} style={styles.LogoImage}>
                    <Image
                        source={require('../assets/Photos/icon.png')}
                        style={{ flex: 1, backgroundColor: "#131722"}}
                        resizeMode="contain"
                        />
                </TouchableHighlight>   
                        
                    
                <View style={styles.rowContainer}>
                    <View style={styles.featuredDetails} > 
                        <View style={styles.welcomeImage} >
                            <Image
                                source={require('../assets/Photos/Welcome.png')}
                                style={{ flex: 1, backgroundColor: "#131722"}}
                                resizeMode="contain"
                                />
                            <View style={styles.learnMoreContainer}>
                                <Pressable  onPress={() => navigation.navigate('LearnMoreScreen')}> <Text style={styles.learnMoreText}>  Learn more →  </Text> </Pressable>   
                            </View>        
                        </View>
                    </View> 
                       
                    <View style={styles.columnContainer}>
                        <Text style={styles.loginText}> Login </Text>
                            <View style={styles.inputView }>
                                <Icon style={styles.iconInInputView} name="mail-outline" size={20} color={colorInputText[1]}/>
                                <TextInput
                                    style={styles.TextInput}
                                    placeholder= "Email"
                                    placeholderTextColor={colorInputText[1]}
                                    onChangeText={(email) => setEmail(email)}
                                    />
                            </View>
                            <Text style={{color: '#DC143C'}}>{answer1}</Text>
                            <View style={styles.inputView}>
                                <Pressable style={{ position: 'absolute', right: 0, flexDirection: "row"}} onPress={() => _onPressButtonEye()}> <Icon style={{ padding: 9,  position: 'absolute', right: 0}} name={eyePress} size={20} color={colorInputText[0]}/> </Pressable>
                                <Icon style={styles.iconInInputView} name="lock-closed-outline" size={20} color= {colorInputText[0]}/>
                                <TextInput
                                    style={styles.TextInput}
                                    placeholder= "Password"
                                    placeholderTextColor= {colorInputText[0]}
                                    secureTextEntry={changePasswordVisibility}
                                    onChangeText={(password) => setPassword(password)}
                                    />
                            </View>

                            <Text style={{color: '#DC143C'}}>{answer2}</Text>

                            <View style={styles.btnSignUp}>
                                <Button title ="Sign Up" color = "#131822"  onPress={() => navigation.navigate('SignUp')}/>
                            </View>

                            <View style={styles.btnStart}>
                                <Button title = "Start  ►" color = "#307D7E"  onPress={() => cheackAnswer()}/>
                            </View>

                            <Text style={styles.orLogin}> ────  Or login with  ──── </Text> 

                            <View style={styles.loginWithSocialNetworksView}>
                                <View style={styles.loginWithGoogleView}>
                                    <GoogleLogin
                                        clientId="96384931447-ni484afarfecl7b3bvpdjd1iuh4hhqbd.apps.googleusercontent.com"
                                        buttonText="Sing up with Google"
                                        onSuccess={responseGoogle}
                                        onFailure={responseGoogle}
                                        cookiePolicy={'single_host_origin'}
                                        render={renderProps => (
                                        <button style={{backgroundColor: "#df4930",  alignItems: 'center', borderColor: "#df4930", borderRadius: 3, borderWidth: 1}} onClick={renderProps.onClick} disabled={renderProps.disabled}><Icon style ={{color: 'white'}} size={13} name="logo-google"></Icon><Text style = {{color: 'white', fontSize: 13, alignSelf: 'center'}}>︳Google</Text></button>)}
                                        />
                                </View>

                                <View style={styles.loginWithFacebookView}>
                                    <FacebookLogin
                                        appId="5851953558159752"
                                        autoLoad={false}
                                        fields="email, name"
                                        //onClick={componentClicked}
                                        callback={responseFacebook} 
                                        render={renderProps => (<button style={{backgroundColor: "#507cc0",  alignItems: 'center',borderColor: "#507cc0", borderRadius: 3, borderWidth: 1}} onClick={renderProps.onClick}><Icon style ={{color: 'white'}} size={13} name="logo-facebook"></Icon><Text style = {{color: 'white', fontSize: 13, alignSelf: 'center'}}>︳Facebook</Text> </button>)}
                                        />    
                                </View>
                            </View>
                            <View>
                                <Text style={{marginTop: 10, fontSize: 15, alignSelf: "center", color: colorset}}>{signCheck}</Text>   
                            </View>     
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
    colorContainer:{
        backgroundColor: "#131722",
    },
    rowContainer: {
        backgroundColor: "#131722",
        flexDirection: "row",
        alignItem: "center",
        marginBottom: 15,
    },
    columnContainer: {
        backgroundColor: "#131722",
        flex: 0.5,
        alignItems: "center",
        borderRadius: 10,
        justifyContent: 'flex-start',
        flexDirection: "column",
    },
    loginText: {
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
    inputView: {
        backgroundColor: "#131722",
        borderRadius: 10,
        marginTop: 20,
        width: "33%",
        borderWidth: 2,
        borderColor: '#72bcc4',
        alignSelf: "center",
    },
    TextInput: {
        height: 50,
        flex: 1,
        padding: 10,
        paddingLeft: 50,
        borderRadius: 10,
        borderColor: "grey",
        color: 'white', 
    },
    iconInInputView:{
        padding: 8,
        position: 'absolute',
    },
    loginBtn: {   
        width: "30%",
        borderRadius: 25,
        height: 50,
        alignItems: "right",
        justifyContent: "right",
        marginTop: 40,
        backgroundColor: "#FF1493",
    },
    featuredDetails: {
        backgroundColor: "#131722",
        flex: 0.5,
        flexDirection: "row",
    },
    learnMoreContainer:{
        backgroundColor: "#1e3841",
        position: "absolute",
        alignItems: "center",
        alignSelf: "center",
        marginTop: 590,
        borderColor: '#1e3841',
        borderWidth: 1,
        borderRadius: 8,
        textShadowColor: 'black',
        textShadowOffset: { width: -1, height: 0 },
        textShadowRadius: 10,
    },
    learnMoreText:{
        color:'#76c4cc',
        textAlign: 'center',
        fontSize: 20
    },
    btnSignUp:{
        backgroundColor: "#131722",
        alignSelf: "center",
        marginLeft: '20%',
        marginTop: 10,
        color: "#1e222d",
        flexDirection: "row",
    },
    btnStart:{
        backgroundColor: "#131722",
        alignSelf: "center",
        marginTop: 10,
        flexDirection: "row",
    },
    LogoImage: {
        backgroundColor: "#131722",
        justifyContent:"flex-start",
        flexDirection: "row",
        width: 275,
        height: 100 ,
        marginLeft: 23.5, 
        marginTop: 10
    },
    welcomeImage:{
        backgroundColor: "#131722",
        width: '100%',
        height: 700,
    },
    orLogin: {
        alignSelf: "center",
        color: 'white',
        marginTop: 25,
    },
    loginWithSocialNetworksView: {
        backgroundColor: "#131722",
        alignSelf: "center",
        alignItems: 'center',
        flexDirection: "row",
        marginTop: 15,
    },
    loginWithGoogleView: {
        backgroundColor: "#131722",
         marginRight: 8,
    },
    loginWithFacebookView: {
        alignSelf: "center",
        backgroundColor: "#131722",
    },
});