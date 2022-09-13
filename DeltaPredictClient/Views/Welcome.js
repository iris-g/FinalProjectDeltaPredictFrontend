import React, { useEffect,useState ,TouchableOpacity} from "react";
import {StyleSheet, Text, View, TextInput, Button, Image, ImageBackground} from "react-native";
import { useNavigation } from '@react-navigation/native';
import SignUp from "./SignUp";
import { color } from "react-native-reanimated";


//check if login details are correct in DB
function _onPressButton (username,password,navigation) {
    fetch('http://localhost:5000/authenticate', {
        method: 'POST', 
        headers: { 'Content-Type': 'application/json' }, 
        body: JSON.stringify({  name: username,Password:password })
    })
    .then(res => res.json())
    .then(data => { data.result === "true" ? navigation.navigate('Dashboard') : alert("wrong details") });
    
}
export default function App({  })  {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    

    //get app navigation
    const navigation = useNavigation();
    
    return (
    <View style={styles.container}>
        <View style={styles.backImage} >
         <Image
            source={require('../assets/icon.png')}
            style={{ flex: 1 }}
            resizeMode="contain"
    />      </View>
       

        <View style={styles.blackScreen}>

        <View style={styles.featuredDetails}>
        <Text style={styles.descriptionText}>Delta predict is a stock market prediction app. 
        Stock forecasts can be a helpful tool for making investment decisions. They can help you:{'\n'}dentify undervalued and overvalued stocks: when a stock's price is not in line with its fundamentals, it may be undervalued {'\n'}
        or overvalued. Why buy an overvalued stock when you can buy an undervalued stock for less? This is where stock price targets can be helpful.
        {'\n'}Make more informed investment decisions: it all comes down to making more informed investment decisions.{'\n'}
        Stock forecasts can help you do just that. A good stock forecast can help you separate the wheat from the chaff.{'\n'}
        With so many stocks to choose from, it can be challenging to know which ones are worth investing in.{'\n'}
        A stock forecast can help you narrow down your options and make more informed investment decisions.
        </Text>
        </View>

        <View style={styles.columnContainer}>
        <Text style={styles.baseText}> Login </Text>
        <View style={styles.inputView}>
            <TextInput
            style={styles.TextInput}
            placeholder="Email."
            placeholderTextColor="#fff"
            
            onChangeText={(email) => setEmail(email)}
            />
        </View>
        <View style={styles.inputView}>
        <TextInput
            style={styles.TextInput}
            placeholder="Password."
            placeholderTextColor="#fff"
            secureTextEntry={true}
            onChangeText={(password) => setPassword(password)}
            />
        </View>
        </View>
        
        </View>
        <View style={styles.btnSignUp}>
        <Button title ="Sign Up" color = "#1e222d"
        onPress={() => navigation.navigate('SignUp')}
        />
    </View>
    <View style={styles.btnStart}>
        <Button title = "Start!" color = "#01a37b"
        onPress={() => _onPressButton(email,password,navigation)}
    />
    </View>
    </View>
    
    );

}

//secureTextEntry={true}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#131722",
        justifyContent: 'flex-start',
    },
    blackScreen: {
        marginTop: 75,
        flexDirection: "row",
        backgroundColor: "#1e222d",
        
    },
    columnContainer: {
        width: 350,
        height: 190,
        borderRadius: 10,
        justifyContent: 'flex-start',
        marginTop: 50,
        marginBottom: 5,
        marginLeft: 225,
        flexDirection: "column",
    },
    baseText: {
        color: '#5B738B',
        margin: 10,
        marginLeft: 135,
        fontSize: 22,
        fontWeight: 'bold',
    },
    inputView: {
        backgroundColor: "#131722",
        borderRadius: 10,
        marginTop: 20,
        borderWidth: 2,
        borderColor: '#50535e',
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
        borderColor: "grey",
        color: 'white',
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
        flexDirection: "row",
        backgroundColor: "#1e222d",
        //position: "s",
        flexDirection: "row",
        marginLeft: 25,
        marginVertical: 40,
        marginTop: 50,
        marginBottom: 200,
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
        width: "5%",
        height: 45,
        marginTop: -210,
        marginLeft: 1500,
        marginRight: 50, 
        alignItems: "left",
        color: "#131722",
    },
    btnStart:{
        width: "10%",
        height: 45,
        marginTop: 10,
        marginLeft: 1330,
        marginRight: 50,  
        alignItems: "left",
    },
    backImage: {
        width: 330,
        height: 150,
        marginLeft: 22,
    },

});