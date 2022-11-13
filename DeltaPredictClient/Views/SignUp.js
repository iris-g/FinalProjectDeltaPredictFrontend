import React, { useState } from "react";
import {StyleSheet, Text, View, TextInput, Button, Image, Pressable} from "react-native";
import { useNavigation } from '@react-navigation/native';
import Icon from "react-native-vector-icons/Ionicons";
import {_onPressButtonsignUp} from '../client/deltaPredicrClient'


export default function SignUp()    {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigation = useNavigation();
    return (
        
        <View style={styles.container}>
            <Pressable onPress={() => {navigation.navigate('Welcome')}} style={styles.backImage}>
                <Image
                source={require('../assets/icon.png')}
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
                        placeholder="Email."
                        placeholderTextColor="#fff"
                        onChangeText={(email) => setEmail(email)}>
                    </TextInput>
                </View>

                <View style={styles.inputView}>
                    <Icon style={{color: 'white' ,padding: 15, position: 'absolute'}} name="lock-closed-outline" size={20} color="#000"/>
                    <TextInput style={styles.TextInput}
                        numberOfLines={1}
                        placeholder="Password."
                        placeholderTextColor="#fff"
                        secureTextEntry={true}
                        onChangeText={(password) => setPassword(password)}>
                    </TextInput>
                </View>
                
                <View style={styles.inputView}>
                    <Icon style={{color: 'white' ,padding: 15, position: 'absolute'}} name="lock-closed-outline" size={20} color="#000"/>
                    <TextInput style={styles.TextInput}
                        placeholder="Confirm Password."
                        placeholderTextColor="#fff"
                        secureTextEntry={true}
                        onChangeText={(password) => setPassword(password)}>
                    </TextInput>
                </View>
                 
                    <View style={styles.btnSignUp}>
                        <Button style={styles.btnSignUpText} uppercase = {true} title ="Sign Up" color = "#01a37b"
                        onPress={() => _onPressButtonsignUp(email, password,navigation)}/>
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
    HeadLineText: {
        fontSize: 20,
        fontWeight: "bold",
        color: 'white',
        justifyContent: 'center',
        alignSelf: 'center',
    },
    inputTextContainer: {
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
    backImage: {
        backgroundColor: "#131722",
        width: 350,
        height: 150,
        marginLeft: 25,
    },

})