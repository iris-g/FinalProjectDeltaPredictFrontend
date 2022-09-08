import React from "react";
import { StyleSheet, Text, View,Button ,Pressable} from 'react-native';
import {useEffect} from 'react'


function Home(){
    useEffect(()=>{
        const ws = new WebSocket('wss://streamer.finance.yahoo.com');

        ws.onopen = function open() {
        console.log('connected');
        ws.send(JSON.stringify({
            subscribe: ['MSFT']
        }));
        };

        ws.onclose = function close() {
        console.log('disconnected');
        };

        ws.onmessage = function incoming(message) {
        console.log('comming message')
        console.log(massage.data)
        };
    })
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Home Screen</Text>
        </View>
    );


}

export default Home;










