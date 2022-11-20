import React, { useState } from "react";
import {StyleSheet, Text, View, TextInput, Button, Image, Pressable, Platform } from "react-native";
import { useNavigation } from '@react-navigation/native';
import Icon from "react-native-vector-icons/Ionicons";
import { _onPressButtonLogin } from "../client/deltaPredicrClient"



export default function App()  {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState(""); 
    const [eyePress, setEyePress] = useState("eye-off-outline")
    const [changePasswordVisibility, setViisibility] = useState(true)
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
                        
                    
                    <View style={styles.rowContainer}>
                        <View style={styles.featuredDetails} > 
                            <View style={styles.welcomeImage} >
                                <Image
                                    source={require('../assets/Photos/Welcome.png')}
                                    style={{ flex: 1, backgroundColor: "#131722"}}
                                    resizeMode="contain"
                                />
                                <View style={styles.learnMoreContainer}>
                                    <Pressable onPress={() => navigation.navigate('LearnMoreScreen')}> <Text style={styles.learnMoreText}>  Learn more →  </Text></Pressable> 
                                </View>        
                            </View>
                        </View>

                        <View style={styles.columnContainer}>
                            <Text style={styles.loginText}> Login </Text>
                                <View style={styles.inputView}>
                                    <Icon style={styles.iconInInputView} name="person-outline" size={20} color="#000"/>
                                    <TextInput
                                    style={styles.TextInput}
                                    placeholder="Email"
                                    placeholderTextColor="#fff"
                                    onChangeText={(email) => setEmail(email)}
                                    />
                                </View>
                                <View style={styles.inputView}>
                                    <Pressable style={{ position: 'absolute', right: 0, flexDirection: "row"}} onPress={() => _onPressButtonEye()}> <Icon style={{ color: 'white' ,padding: 9,  position: 'absolute', right: 0}} name={eyePress} size={20} color="#000"/> </Pressable>
                                    <Icon style={styles.iconInInputView} name="lock-closed-outline" size={20} color="#000"/>
                                    <TextInput
                                    style={styles.TextInput}
                                    placeholder="Password"
                                    placeholderTextColor="#fff"
                                    secureTextEntry={changePasswordVisibility}
                                    onChangeText={(password) => setPassword(password)}
                                    />
                                </View>
                                <View style={styles.btnSignUp}>
                                    <Button title ="Sign Up" color = "#131822" onPress={() => navigation.navigate('SignUp')}/>
                                </View>
                                <View style={styles.btnStart}>
                                    <Button title = "Start  ➤" color = "#307D7E" onPress={() => _onPressButtonLogin(email,password,navigation)}/>
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
        marginTop: 35,
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