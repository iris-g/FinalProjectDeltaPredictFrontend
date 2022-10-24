import React, { useEffect,useState ,TouchableOpacity} from "react";
import {StyleSheet, Text, View, TextInput, Button, Image, Pressable} from "react-native";
import { useNavigation } from '@react-navigation/native';




export default function SignUp()    {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
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
        
                
            <View style={styles.inputTextContainer}>
                <View>
                    <Text style={styles.HaedLineText}> Sign Up to ΔPredict</Text>
                </View>
                <View style={styles.inputView}>
                    <TextInput style={styles.TextInput}
                        placeholder="Email."
                        placeholderTextColor="#fff"
                        onChangeText={(email) => setEmail(email)}>
                    </TextInput>
                </View>

                <View style={styles.inputView}>
                    <TextInput style={styles.TextInput}
                        placeholder="Password."
                        placeholderTextColor="#fff"
                        secureTextEntry={true}
                        onChangeText={(password) => setPassword(password)}>
                    </TextInput>
                </View>
                
                <View style={styles.inputView}>
                    <TextInput style={styles.TextInput}
                        placeholder="Confirm Password."
                        placeholderTextColor="#fff"
                        secureTextEntry={true}
                        onChangeText={(password) => setPassword(password)}>
                    </TextInput>


                </View>
                    <View style={styles.btnSignUp}>
                        <Button style={styles.btnSignUpText} uppercase = {true} title ="Sign Up" color = "#01a37b"
                        onPress={() => _onPressButton(email, password,navigation)}/>
                    </View>
            </View>
        </View>

    );

}

function _onPressButton (email,password,navigation) {
    fetch('http://localhost:5000/signnup', {
        method: 'POST', 
        headers: { 'Content-Type': 'application/json' }, 
        body: JSON.stringify({Email: email, Password: password})
    })
    .then(res => res.json())
    .then(data => { data.result === "true" ? navigation.navigate('Welcome') : alert("wrong details") });
    
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: "#131722",
        justifyContent: 'flex-start',
    },

    HaedLineText: {
        marginBottom: 45,
        margin: 'auto',
        fontSize: 30,
        fontWeight: "bold",
        color: 'white',
        justifyContent: 'flex-start',
    },
    inputTextContainer: {
        flex: 1, 
        width: "100%",
        height: "100%",
        justifyContent: 'center',
        alignItems: 'center',
    },
    inputView: {
        backgroundColor: "#131722",
        borderRadius: 10,
        marginTop: 20,
        borderWidth: 3,
        borderColor: '#50535e',
        width: "18%",
        height: "4.5%",
    },
    TextInput: {
        height: 50,
        flex: 1,
        padding: 10,
        borderColor: "grey",
        color: 'white',
    },
    btnSignUp:{
        width: "100%",
        height: 50,
        marginTop: 30,
        justifyContent: 'center',
        alignItems: 'center',
        textTransform: 'lowercase',
    },
    btnSignUpText:{
        textTransform:'capitalize',
        width: 330,
        height: 150,

    },
    backImage: {
        width: 350,
        height: 150,
        marginLeft: 25,
    },

})