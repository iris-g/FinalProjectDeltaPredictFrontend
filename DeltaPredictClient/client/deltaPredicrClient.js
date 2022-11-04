import { useState } from 'react';



/** 
 name: fetch_from_server
 Page: Home
 Description: This function POST to server list of stock sector and receive the data abut the stocks.
**/

export  async  function fetch_from_server(type,url){
      const response = await fetch('http://localhost:5000/' + url, {
        method: type, 
        headers: { 'Content-Type': 'application/json' }, 
    })
    const json = await response.json()

     return json
    }
  
/** 
 name: fetch_clock
 Page: Home
 Description: This function POST to server list of stock sector and receive the data abut the stocks.
**/

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

/** 
 name: fetchData
 Page: SectorStockScreen
 Description: This function POST to server list of stock sector and receive the data abut the stocks.
**/

export async function fetchData(symbol,Signal){
    const response = await fetch('http://localhost:5000/fundamental', {
        method:  'POST', 
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({  Symbol:symbol  }) ,
        signal:Signal,
    })
    const json = await response.json()

    return json
}

/** 
 name: fetcSectorData
 Page: SectorStockScreen
 Description: This function POST to server list of stock sector and receive the data abut the stocks.
**/

export async function fetcSectorData(sector){
    const response = await fetch('http://localhost:5000/getSectorStocks', {
        method:  'POST', 
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({  Sector:sector  }) 
    })
    const json = await response.json()

    return json
}

/** 
 name: fetchFavoritesData
 Page: FavoriteStocks
 Description: This function POST to server the email of the user and receive the user favorite list.
**/

export async function fetchFavoritesData(userEmail){
    const response = await fetch('http://localhost:5000/favoritesData', {
        method:  'POST', 
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({  email:userEmail  }) 
    })
    const json = await response.json()

    return json
}
export async function fetchArima(symbol){
    const response = await fetch('http://localhost:5000/arimaResults', {
        method:  'POST', 
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({  Symbol:symbol  }) 
    })
    const json = await response.json()

    return json
}



export default{fetch_from_server,fetch_clock,fetchData,fetcSectorData,fetchFavoritesData,fetchArima} ;