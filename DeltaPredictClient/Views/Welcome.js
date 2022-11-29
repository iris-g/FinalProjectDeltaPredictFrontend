import React, { useState } from "react";
import {StyleSheet, Text, View, TextInput, Button, Image, Pressable,TouchableHighlight,TouchableOpacity,  Platform } from "react-native";
import { useNavigation } from '@react-navigation/native';
import Icon from "react-native-vector-icons/Ionicons";
import { _onPressButtonLogin } from "../client/deltaPredicrClient"
import { GoogleLogin } from 'react-google-login';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';


export default function App()  {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState(""); 
    const [eyePress, setEyePress] = useState("eye-off-outline")
    const [changePasswordVisibility, setViisibility] = useState(true)
    const [answer1, setAnswer1] = useState("");
    const [answer2, setAnswer2] = useState("");
    //get app navigation
    const navigation = useNavigation();

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


    function cheackAnswer(){

        if(email === "")
            setAnswer1("You must enter email address.")
        else setAnswer1("")

        if(password === "")
            setAnswer2("You must enter a password.")
        else setAnswer2("")

        if(email !== "" && password !== "")
            _onPressButtonLogin(email,password,navigation)
    }


    const responseGoogle = (response) => {
        console.log(response);
      }

    const responseFacebook = (response) => {
        console.log(response);

        _onPressButtonsignUp(response.email, response.id, navigation )
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
                                <View style={styles.inputView}>
                                    <Icon style={styles.iconInInputView} name="person-outline" size={20} color="#000"/>
                                    <TextInput
                                    style={styles.TextInput}
                                    placeholder= "Email"
                                    placeholderTextColor="#fff"
                                    onChangeText={(email) => setEmail(email)}
                                    />
                                </View>
                                <Text style={{color: 'red'}}>{answer1}</Text>
                                <View style={styles.inputView}>
                                    <Pressable style={{ position: 'absolute', right: 0, flexDirection: "row"}} onPress={() => _onPressButtonEye()}> <Icon style={{ color: 'white' ,padding: 9,  position: 'absolute', right: 0}} name={eyePress} size={20} color="#000"/> </Pressable>
                                    <Icon style={styles.iconInInputView} name="lock-closed-outline" size={20} color="#000"/>
                                    <TextInput
                                    style={styles.TextInput}
                                    placeholder= "Password"
                                    placeholderTextColor="#fff"
                                    secureTextEntry={changePasswordVisibility}
                                    onChangeText={(password) => setPassword(password)}
                                    />
                                </View>
                                <Text style={{color: 'red'}}>{answer2}</Text>
                                <View style={styles.btnSignUp}>
                                    <Button title ="Sign Up" color = "#131822"  onPress={() => navigation.navigate('SignUp')}/>
                                </View>
                                <View style={styles.btnStart}>
                                    <Button title = "Start  ►" color = "#307D7E"  onPress={() => cheackAnswer()}/>
                                </View>

                                <Text style={{alignSelf: "center", color: 'white', marginTop: 25}}> ────  Or login with  ──── </Text> 

                                <View style={{ backgroundColor: "#131722", alignSelf: "center", alignItems: 'center', flexDirection: "row",  marginTop: 15}}>

                                    <View style={{ backgroundColor: "#131722",  marginRight: 8}}>
                                    <GoogleLogin
                                        clientId="658977310896-knrl3gka66fldh83dao2rhgbblmd4un9.apps.googleusercontent.com"
                                        buttonText="Sing up with Google"
                                        onSuccess={responseGoogle}
                                        onFailure={responseGoogle}
                                        cookiePolicy={'single_host_origin'}
                                        render={renderProps => (
                                        <button style={{backgroundColor: "#df4930",  alignItems: 'center', borderColor: "#df4930", borderRadius: 3, borderWidth: 1}} onClick={renderProps.onClick} disabled={renderProps.disabled}><Icon style ={{color: 'white'}} size={13} name="logo-google"></Icon><Text style = {{color: 'white', fontSize: 13, alignSelf: 'center'}}>︳Google</Text></button>
                                        )}
                                    />
                                    </View>

                                    <View style={{alignSelf: "center", backgroundColor: "#131722" }}>
                                    
                                    <FacebookLogin
                                        appId="5851953558159752"
                                        autoLoad={false}
                                        fields="email, name"
                                        //textButton = <Text style={{color: '#1569C7', fontSize: 13}}>︳Facebook</Text>
                                        size = "-10"
                                        //cssClass ="lol"
                                        //icon = <Icon style ={{color: '#1569C7'}} size={13} name="logo-facebook"></Icon>
                                        //onClick={componentClicked}
                                        callback={responseFacebook} 
                                        render={renderProps => (<button style={{backgroundColor: "#507cc0",  alignItems: 'center',borderColor: "#507cc0", borderRadius: 3, borderWidth: 1}} onClick={renderProps.onClick}><Icon style ={{color: 'white'}} size={13} name="logo-facebook"></Icon><Text style = {{color: 'white', fontSize: 13, alignSelf: 'center'}}>︳Facebook</Text> </button>)}
                                    />
                                        
                                    </View>
                                </View>
                        </View>
                    </View>     
            </View>   
        </View>
        
    );

}

// const PickerOS = () => {
//     return Platform.OS === "android" ? (
//         <Text >
           
        
//         </Text>
//     ) : (
//         <Text style={styles.descriptionText}>Delta predict is a stock market prediction app. 
//         Stock forecasts can be a helpful tool for making investment decisions. They can help you:{'\n'}dentify undervalued and overvalued stocks: when a stock's price is not in line with its fundamentals, it may be undervalued {'\n'}
//         or overvalued. Why buy an overvalued stock when you can buy an undervalued stock for less? This is where stock price targets can be helpful.
//         {'\n'}Make more informed investment decisions: it all comes down to making more informed investment decisions.{'\n'}
//         Stock forecasts can help you do just that. A good stock forecast can help you separate the wheat from the chaff.{'\n'}
//         With so many stocks to choose from, it can be challenging to know which ones are worth investing in.{'\n'}
//         A stock forecast can help you narrow down your options and make more informed investment decisions.
//         </Text>
//     );
//   };


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#131722",
        justifyContent: 'flex-start',
        alignItem: "center",
        // ...Platform.select({
        //     android: {backgroundColor: '#FFFFFF',},
        // })
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
        // ...Platform.select({
        //     android: {marginLeft: 40, width: 230, height: 300,},
        // })
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
        // ...Platform.select({
        //     android: {marginLeft: 75,},
        // })
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
        color: 'white',
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
        //  ...Platform.select({
        //     android: {backgroundColor: '#1e222d', marginHorizontal: 20, marginTop: 80,},
        //  })
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
});