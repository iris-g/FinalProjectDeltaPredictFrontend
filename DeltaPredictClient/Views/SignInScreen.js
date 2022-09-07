import React, { useEffect,useState ,TouchableOpacity} from "react";
import {StyleSheet, Text, View, TextInput, Button} from "react-native";
import { useNavigation } from '@react-navigation/native';

export default function App({  })  {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState('User'); 

    //get app navigation
    const navigation = useNavigation();
    useEffect(() => {
    fetch('http://localhost:5000/home', {
        method: 'POST', 
        headers: { 'Content-Type': 'application/json' }, 
        body: JSON.stringify({  name: 'Iris', })
    })
    .then(res => res.json())
    .then(data => { setUsername(data.name) }); 
    })
    return (
    <View style={styles.container}>
        <h1>{ username }</h1>
    <Text style={styles.myState}>
        Welcome to delta predict
    <Text style={styles.innerText}> </Text>
        </Text>
        <View style={styles.featuredDetails}>
        <Text style={styles.descriptionText}>Delta predict is a stock market prediction app. 
        Stock forecasts can be a helpful tool for making investment decisions. They can help you:  {'\n'} 
        dentify undervalued and overvalued stocks: when a stock's price is not in line with its fundamentals, it may be undervalued or overvalued. Why buy an overvalued stock when you can buy an undervalued stock for less? This is where stock price targets can be helpful.
        {'\n'} Make more informed investment decisions: it all comes down to making more informed investment decisions. Stock forecasts can help you do just that. A good stock forecast can help you separate the wheat from the chaff. With so many stocks to choose from, it can be challenging to know which ones are worth investing in. A stock forecast can help you narrow down your options and make more informed investment decisions.
    </Text>
        
    <View style={styles.columnContainer}>
    <Text style={styles.baseText}>Login </Text>
    <View style={styles.inputView}>
    
        <TextInput
        style={styles.TextInput}
        placeholder="User name."
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
    <View style={styles.btnStart}>
        <Button title ="start!"
        onPress={() => navigation.navigate('Dashboard')}
      />
    </View>
    </View>
    
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 2,
        backgroundColor: "#131722",
        justifyContent: 'flex-start',
    },
    columnContainer: {
        flex: 2,
        justifyContent: 'flex-start',
        marginBottom: 10,
        margin:10,
        flexDirection: "column"
    
    },
    inputView: {
        backgroundColor: "#1e222d",
        borderRadius: 10,
        width: "60%",
        height: 45,
        marginTop: 100,
        marginLeft:50,
        marginRight:50,
        alignItems: "left",
        flex:2,
        bordercolor: "#50535e"
        
    },
    screenContainer: {
        flex: 1,
        justifyContent: "right",
        padding:10,
        position: "right",
        height: 50,
        marginLeft:1400,
        marginBottom: 690,
    },
    TextInput: {
        height: 50,
        flex: 1,
        padding: 10,
        flex:1
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
    myState: {
        marginTop: 1,
        textAlign: 'center',
        color: '#50535e',
        fontWeight: 'bold',
        fontSize: 40
    },
    descriptionText: {
        marginTop: 19,
        textAlign: 'left',
        color: '#C9D6DF',
        fontWeight: 'bold',
        fontSize: 15,
        flex:3
    },
    featuredDetails: {
        position: "relative",
        flexDirection: "row",
        marginLeft: 25,
        marginVertical:40,
        marginTop: 50,
        marginBottom: 8,
    },
        appButtonContainer: {
        elevation: 8,
        backgroundColor: "#009688",
        borderRadius: 10,
        paddingVertical: 10,
        alignItems: "right",
        width: "30%",
        paddingHorizontal: 50
    },
    appButtonText: {
        fontSize: 18,
        color: "#fff",
        fontWeight: "bold",
        alignSelf: "center",
        textTransform: "uppercase"
    },
    btnStart:{
        width: "10%",
        height: 45,
        marginTop: 100,
        marginLeft: 1340,
        marginRight:50,
        alignItems: "left",
    }

    });