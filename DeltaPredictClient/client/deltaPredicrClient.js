import { useState } from 'react';

export  async  function fetch_from_server(type,url){
      const response = await fetch('http://localhost:5000/' + url, {
        method: type, 
        headers: { 'Content-Type': 'application/json' }, 
    })
    const json = await response.json()

     return json
    }
  
    


export async function fetch_clock(){
    const request = require('request');
    const response = await  fetch('https://api.tradier.com/v1/markets/clock',{
        method: 'get',
        qs: {
            'delayed': 'true'
        },
        headers: {
            'Authorization': 'Bearer <TOKEN>',
            'Accept': 'application/json'
        }
        }, (error, response, body) => {
            //setTime(body);
            //body.substring(11,15) +" : "+ body.substring(18,28) +"      description: " +body.substring(45,60)
        });
        const json = await response.json()

        return json

}
export async function fetchData(symbol){
    const response = await fetch('http://localhost:5000/fundamental', {
        method:  'POST', 
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({  Symbol:symbol  }) 
    })
    const json = await response.json()

    return json
    


}
export default{fetch_from_server,fetch_clock,fetchData} ;