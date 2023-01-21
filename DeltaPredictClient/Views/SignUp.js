import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput, Button, Image, Pressable } from "react-native";
import { useNavigation } from '@react-navigation/native';
import Icon from "react-native-vector-icons/Ionicons";
import {_onPressButtonsignUp} from '../client/deltaPredicrClient'
import { GoogleLogin } from 'react-google-login';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';

export default function SignUp() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [answer1, setAnswer1] = useState("");
    const [answer2, setAnswer2] = useState("");
    const [answer3, setAnswer3] = useState("");
    const [answer4, setAnswer4] = useState("");
    const [signCheck, setCheck] = useState("");
    const [colorset, setColor] = useState("");
    const [colorInputText] = useState(['white', 'white', 'white']);
    let flag1, flag2 = false
    const navigation = useNavigation();
    

    /*Checking the input text.*/ 
    function cheackAnswer(){

        if(email === ""){
            setAnswer1("You must enter email address.")
            colorInputText[0]="#DC143C"
        }
        else{ 
            setAnswer1("")
            colorInputText[0]= "white"
        } 

        if(password === ""){
            setAnswer2("You must enter a password.")
            colorInputText[1]= "#DC143C"
        }
        else {setAnswer2("")
            colorInputText[1]= "white"
        } 
        
        if(/^(\d)(?!\1{7})\d{7}/g.test(password) === false)
            setAnswer4("The password must be eight characters or longer")
        else setAnswer4("")

        if(confirmPassword === ""){
            setAnswer3("You must confirm your password.")
            colorInputText[2]= "#DC143C"
        }
        else if (confirmPassword !== password){
            setAnswer3("Password and confirm password should be same.")
            colorInputText[2]= "#DC143C"
        }
        else {
            setAnswer3("")
            colorInputText[2]= "white"
            flag2=true
        }

        if(email !== ""){
            if ( /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/.test(email) === false) 
                setAnswer1("Your email is incorrect.")
            else{ setAnswer1(""), flag1=true}
        }

        if(email !== "" && password !== "" && confirmPassword !== "" && flag1 === true && flag2===true)
            setSignCheck(email, password, navigation)
    }
    


     /*Monte Carlo calculation*/
    async function setSignCheck(email, password, navigation) {
        try { 
        const promise = new Promise((resolve, reject) => {
            resolve(_onPressButtonsignUp(email, password, navigation) )
        })
        
        promise.then((response) => {
            if(response.result == "true"){
                setCheck("✔ Registration successful")
                setColor("#307D7E")
            }
            else if(response.result == "password"){
                setCheck("✘ Sorry, that password already exists!")
                setColor("#DC143C")
            }
            else{
                setCheck("✘ Sorry, that email already exists!")
                setColor("#DC143C")
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
        _onPressButtonsignUp(response.email, response.id, navigation )
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
                        <Icon style={{ padding: 15, position: 'absolute'}} name="mail-outline" size={20} color={colorInputText[0]}/>
                        <TextInput style={styles.TextInput}
                            numberOfLines={1}
                            placeholder="Email"
                            placeholderTextColor={colorInputText[0]}
                            onChangeText={(email) => setEmail(email)}>
                        </TextInput>
                    </View>
                    <Text style={{color: '#DC143C'}}>{answer1}</Text>
                    <View style={styles.inputView}>
                        <Icon style={styles.iconInInputView} name="lock-closed-outline" size={20} color={colorInputText[1]}/>
                        <TextInput style={styles.TextInput}
                            numberOfLines={1}
                            placeholder="Password"
                            placeholderTextColor={colorInputText[1]}
                            secureTextEntry={true}
                            onChangeText={(password) => setPassword(password)}>
                        </TextInput>
                    </View>
                    <Text style={{color: '#DC143C'}}>{answer2}</Text>
                    <Text style={{color: '#DC143C'}}>{answer4}</Text>
                    <View style={styles.inputView}>
                        <Icon style={styles.iconInInputView} name="lock-closed-outline" size={20} color={colorInputText[2]}/>
                        <TextInput style={styles.TextInput}
                            placeholder="Confirm Password"
                            placeholderTextColor={colorInputText[2]}
                            secureTextEntry={true}
                            onChangeText={(confirmPassword) => setConfirmPassword(confirmPassword)}>
                        </TextInput>
                    </View>
                    <Text style={{color: '#DC143C'}}>{answer3}</Text>
                    <View style={styles.btnSignUp}>
                        <Button style={styles.btnSignUpText} uppercase = {true} title ="Sign Up" color = "#01a37b"
                        onPress={() => cheackAnswer()}/>
                    </View>
                </View>
                <View style={styles.orView}>
                    <Text style={styles.orText}> ─ Or ─ </Text> 
                </View>
                <View style={styles.loginWithSocialNetworksView}>
                    <View style={styles.loginWithGoogleView}>
                        <GoogleLogin
                        clientId="658977310896-knrl3gka66fldh83dao2rhgbblmd4un9.apps.googleusercontent.com"
                        buttonText="Sing up with Google"
                        onSuccess={responseGoogle}
                        onFailure={responseGoogle}
                        cookiePolicy={'single_host_origin'}
                        render={renderProps => (
                        <button style={{backgroundColor: "#df4930",  alignItems: 'center', borderColor: "#df4930", borderRadius: 3, borderWidth: 1}} onClick={renderProps.onClick} disabled={renderProps.disabled}><Icon style ={{color: 'white'}} size={19} name="logo-google"></Icon><Text style = {{color: 'white', fontSize: 18, alignSelf: 'center'}}> ︳With Google</Text></button>)}
                        />
                    </View>
                    <View style={styles.loginWithFacebookView}>
                        <FacebookLogin
                            appId="5851953558159752"
                            autoLoad={false}
                            fields="email, name"
                            textButton = <Text style={{color: '#1569C7', fontSize: 18}}>︳With Facebook</Text>
                            size = "small"
                            cssClass ="lol"
                            icon = <Icon style ={{color: '#1569C7'}} size={19} name="logo-facebook"></Icon>
                            //onClick={componentClicked}
                            render={renderProps => (<button style={{backgroundColor: "#507cc0",  alignItems: 'center',borderColor: "#507cc0", borderRadius: 3, borderWidth: 1}} onClick={renderProps.onClick}><Icon style ={{color: 'white'}} size={19} name="logo-facebook"></Icon><Text style = {{color: 'white', fontSize: 18, alignSelf: 'center'}}> ︳With Facebook</Text> </button>)}
                            callback={responseFacebook} 
                            />
                    </View>
                </View>
                <View style={styles.viewAccount}>
                    <Text style={{alignSelf: "center", color: 'white',}}>Already have an account? </Text> <Pressable onPress={() => {navigation.navigate('Welcome')}}><Text style={{color: '#1569C7'}}> Sign in</Text></Pressable>
                </View>
                <View>
                    <Text style={{marginTop: 10, fontSize: 22, alignSelf: "center", color: colorset}}>{signCheck}</Text>   
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
        margin: 15,
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
    orView: {
        
        alignSelf: "center",
        alignItems: 'center',
        margin: 10,
        flexDirection: "row",
    },
    orText:{
        alignSelf: "center",
        color: 'white',
        marginTop: 20,
    },
    loginWithSocialNetworksView: {
        backgroundColor: "#131722",
        alignSelf: "center",
        alignItems: 'center',
        margin: 10,
        flexDirection: "row",
    },
    loginWithGoogleView: {
        backgroundColor: "#131722",
        margin: 8,
        marginLeft: 22,
    },
    loginWithFacebookView: {
        alignSelf: "center",
        backgroundColor: "#131722",
        margin: 8,
    },
    viewAccount: {
        backgroundColor: "#131722",
        alignSelf: "center",
        alignItems: 'center',
        margin: 12,
        flexDirection: "row",
    },

})