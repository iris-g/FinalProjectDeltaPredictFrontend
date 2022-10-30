import React, { useEffect,useState ,TouchableOpacity} from "react";
import {StyleSheet, Text, View, TextInput, Button, Image, ImageBackground, Pressable, Platform } from "react-native";
import { useNavigation } from '@react-navigation/native';
import Icon from "react-native-vector-icons/Ionicons";

//check if login details are correct in DB
function _onPressButton (email,password,navigation) {
    fetch('http://localhost:5000/authenticate', {
        method: 'POST', 
        headers: { 'Content-Type': 'application/json' }, 
        body: JSON.stringify({name: email, Password: password})
    })
    .then(res => res.json())
    .then(data => { data.result === "true" ? navigation.navigate('Dashboard', {otherParam: email,}) : alert("wrong details") });
    
}
export default function App({  })  {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    

    //get app navigation
    const navigation = useNavigation();
    
    return (
        
        <View style={styles.container}>

            <Pressable onPress={() => {navigation.navigate('Welcome')}} style={styles.backImage}>
                <Image
                source={require('../assets/icon.png')}
                style={{ flex: 1 }}
                resizeMode="contain"
                />
            </Pressable>   
            
                <View style={styles.blackScreen}>
                    <View style={styles.featuredDetails} > 
                        <View style={styles.welcomeImage} >
                            <Image
                                source={require('../assets/Welcome.png')}
                                style={{ flex: 1 }}
                                resizeMode="contain" />
                        </View>
                    </View>


                    <View style={styles.columnContainer}>
                            <Text style={styles.baseText}> Login </Text>
                                <View style={styles.inputView}>
                                <Icon style={{color: 'white', padding: 15, position: 'absolute',}} name="person-outline" size={20} color="#000"/>
                                <TextInput
                                style={styles.TextInput}
                                placeholder="Email."
                                placeholderTextColor="#fff"
                                onChangeText={(email) => setEmail(email)}
                                />
                                </View>

                                <View style={styles.inputView}>
                                <Icon style={{color: 'white' ,padding: 15, position: 'absolute',}} name="lock-closed-outline" size={20} color="#000"/>
                                <TextInput
                                style={styles.TextInput}
                                placeholder="Password."
                                placeholderTextColor="#fff"
                                secureTextEntry={true}
                                onChangeText={(password) => setPassword(password)}
                                />
                                </View>
                                <View style={styles.btnSignUp}>

                                <Button title ="Sign Up" color = "#131822"
                                onPress={() => navigation.navigate('SignUp')}
                                />
                                </View>
                                <View style={styles.btnStart}>
                                <Button title = "Start!" color = "#307D7E"
                                onPress={() => _onPressButton(email,password,navigation)}
                                />
                                </View>
                    </View>
                
                </View>
             
        </View>
                
    
    );

}

const PickerOS = () => {
    return Platform.OS === "android" ? (
        <Text >
           
        
        </Text>
    ) : (
        <Text style={styles.descriptionText}>Delta predict is a stock market prediction app. 
        Stock forecasts can be a helpful tool for making investment decisions. They can help you:{'\n'}dentify undervalued and overvalued stocks: when a stock's price is not in line with its fundamentals, it may be undervalued {'\n'}
        or overvalued. Why buy an overvalued stock when you can buy an undervalued stock for less? This is where stock price targets can be helpful.
        {'\n'}Make more informed investment decisions: it all comes down to making more informed investment decisions.{'\n'}
        Stock forecasts can help you do just that. A good stock forecast can help you separate the wheat from the chaff.{'\n'}
        With so many stocks to choose from, it can be challenging to know which ones are worth investing in.{'\n'}
        A stock forecast can help you narrow down your options and make more informed investment decisions.
        </Text>
    );
  };



const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#131822",
        justifyContent: 'flex-start',
        // ...Platform.select({
        //     android: {backgroundColor: '#FFFFFF',},

        // })
    },
    blackScreen: {
        flexDirection: "row",
        backgroundColor: "#131822",
        
    },
    columnContainer: {
        flex: 0.5,
        borderRadius: 10,
        justifyContent: 'flex-start',
        flexDirection: "column",
        ...Platform.select({
            android: {marginLeft: 40, width: 230, height: 300,},
        })
       
    },
    baseText: {
        color: '#ffffff',
        textShadowColor: 'black', 
        textShadowOffset: { width: -1, height: 0 },
        textShadowRadius: 10,
        margin: 10,
        marginLeft: 415,
        marginTop: 230,
        fontSize: 22,
        fontWeight: 'bold',
        ...Platform.select({
            android: {marginLeft: 75,},

        })
    },
    inputView: {
        backgroundColor: "#131722",
        flexDirection: "row",
        borderRadius: 10,
        marginTop: 20,
        marginRight: 450,
        marginLeft: 300,
        borderWidth: 2,
        borderColor: '#72bcc4',
       
    },
    screenContainer: {
        flex: 1,
        justifyContent: "right",
        padding: 10,
        position: "right",
        height: 50,
        marginLeft: 1400,
        marginBottom: 690,
    },
    TextInput: {
        height: 50,
        flex: 1,
        padding: 10,
        paddingLeft: 50,
        borderColor: "grey",
        color: 'white', 
        ...Platform.select({
            android: { color: 'white',flex: 0, height: 34, fontSize: 12,},

        })
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
    descriptionText: {
        marginTop: 50,
        textAlign: 'left',
        color: '#C9D6DF',
        fontWeight: 'bold',
        fontSize: 15,
        flex: 3
    },
    featuredDetails: {
        flex: 0.5,
         ...Platform.select({
            android: {backgroundColor: '#1e222d', marginHorizontal: 20, marginTop: 80,},

        })
    },
    appButtonContainer: {
        elevation: 8,
        backgroundColor: "#009688",
        borderRadius: 10,
        paddingVertical: 10,
        alignItems: "right",
        width: "30%",
        paddingHorizontal: 50,
    },
    appButtonText: {
        fontSize: 18,
        color: "#fff",
        fontWeight: "bold",
        alignSelf: "center",
        textTransform: "uppercase"
    },
    btnSignUp:{
        width: "10%",
        marginLeft: 520,
        marginTop: 10,
        color: "#1e222d",
        ...Platform.select({
            android: {width: 80, height: 80 , marginLeft: 235, marginTop: -130,},

        })
    },
    btnStart:{
        width: "16%",
        marginLeft: 373,
        marginTop: 35,
        ...Platform.select({
            android: {width: 130, height: 80 , marginLeft: 135, marginTop: -30,},

        })
    },
    backImage: {
        width: 350,
        height: 150,
        marginLeft: 25,

        ...Platform.select({
            android: {width: 5, height: 60, marginLeft: 8, marginTop: 50,},

        })
    },
    welcomeImage:{
        width: 1200,
        height: 800,
        
    },
});