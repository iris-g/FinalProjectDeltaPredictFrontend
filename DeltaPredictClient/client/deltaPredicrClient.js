

/** 
name: _onPressButtonLogin
Page: Welcome
Description: This function check if login details are correct in DB.
**/

export async function _onPressButtonLogin (email,password,navigation) {
    try {
    const res = await fetch('http://localhost:5000/authenticate', {
        method: 'POST', 
        headers: { 'Content-Type': 'application/json' }, 
        body: JSON.stringify({name: email, Password: password})
    })
    const json = await res.json()
    
    return json
    } catch (e) {
        console.log(e);
        return "Oops something is wrong"
    }
}

/** 
name: _onPressButtonsignUp
Page: SignUp
Description: This function add use to DB.
**/

export async function _onPressButtonsignUp (email,password,navigation) {
    try {
    const res = await fetch('http://localhost:5000/signnup', {
        method: 'POST', 
        headers: { 'Content-Type': 'application/json' }, 
        body: JSON.stringify({Email: email, Password: password})
    })
    const json = await res.json()
    
    return json
    } catch (e) {
        console.log(e);
        return "Oops something is wrong"
    }
}


/** 
name: fetch_from_server
Page: Home
Description: This function POST to server list of stock sector and receive the data abut the stocks.
**/

export  async  function fetch_from_server(type,url){
    try{
    const response = await fetch('http://localhost:5000/' + url, {
      method: type, 
      headers: { 'Content-Type': 'application/json' }, 
  })
  const json = await response.json()

    return json
    } catch (e) {
        console.log(e);
        return "Oops something is wrong"
    }
  }

/** 
name: fetch_clock
Page: Home
Description: This function POST to server list of stock sector and receive the data abut the stocks.
**/

export async function fetch_clock(){
    try{
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
    } catch (e) {
        console.log(e);
        return "Oops something is wrong"
    }
}

/** 
name: fetchData
Page: SectorStockScreen
Description: This function POST to server list of stock sector and receive the data abut the stocks.
**/

export async function fetchData(symbol){
    try{
    const response = await fetch('http://localhost:5000/fundamental', {
      method:  'POST', 
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({  Symbol:symbol  }) ,
    })
    const json = await response.json()

    return json
    } catch (e) {
        console.log(e);
        return "Oops something is wrong"
    }
}

/** 
name: fetcSectorData
Page: SectorStockScreen
Description: This function POST to server list of stock sector and receive the data abut the stocks.
**/

export async function fetcSectorData(sector){
    try{
    const response = await fetch('http://localhost:5000/getSectorStocks', {
        method:  'POST', 
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({  Sector:sector  }) 
    })
    const json = await response.json()

    return json
    } catch (e) {
        console.log(e);
        return "Oops something is wrong"
    }
}

/** 
name: fetchFavoritesData
Page: FavoriteStocks
Description: This function POST to server the email of the user and receive the user favorite list.
**/

export async function fetchFavoritesData(userEmail){
    try{
    const response = await fetch('http://localhost:5000/favoritesData', {
        method:  'POST', 
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({  email:userEmail  }) 
    })
    const json = await response.json()

    return json
    } catch (e) {
        console.log(e);
        return "Oops something is wrong"
    }
}

/** 
name: fetchSentimentData
Page: StockScreen
Description: This function POST to server the email of the user and receive the user favorite list.
**/

export async function fetchSentimentData(Symbol){
    try{
    const response = await fetch('http://localhost:5000/sentimentScore', {
        method:  'POST', 
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({  symbol:Symbol  }) 
    })
    const json = await response.json()

    return json
    } catch (e) {
        console.log(e);
        return "Oops something is wrong"
    }
  }

/** 
name: fetchMonteCarlo
Page: StockScreen
Description: This function POST to server the symbol of the stock. receive the Monte Carlo forecasting.
**/

  export async function fetchMonteCarlo(symbol,Signal){
    try{
    const response = await fetch('http://localhost:5000/monteCarloResults', {
        method:  'POST', 
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ Symbol: symbol }),
        signal: Signal,
    })
    const json = await response.json()
    
    return json
    } catch (e) {
        console.log(e);
        return "Oops something is wrong"
    }
}

/** 
name: fetchArima
Page: StockScreen
Description: This function POST to server the symbol of the stock. receive the Monte Carlo forecasting.
**/

export async function fetchArima(symbol,Signal){
    try{
    console.log(Signal["signal"])
    const response = await fetch('http://localhost:5000/arimaResults', {
        method:  'POST', 
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({  Symbol:symbol,signal:Signal["signal"]["aborted"]  }) ,
        signal: Signal["signal"],
    })
    const json = await response.json()

    return json
    } catch (e) {
        console.log(e);
        return "Oops something is wrong"
    }
}

/** 
name: addStockToFavoriteStockList
Page: StockScreen
Description: This function POST to server the symbol of the stock. receive the Monte Carlo forecasting.
**/

export async function addStockToFavoriteStockList(userEmail,symbol){
    try{
    fetch('http://localhost:5000/addStocktoFavoriteList', {
        method: 'POST', 
        headers: { 'Content-Type': 'application/json' }, 
        body: JSON.stringify({Email:userEmail, Symbol:symbol})
    })
    .then(res => res.json())
    // .then(data => { data.result === "true" ? navigation.navigate('Dashboard', {userParam: email,}) : alert("wrong details") });
    } catch (e) {
        console.log(e);
        return "Oops something is wrong"
    }
}

/** 
name: deletFromFavoriteStockList
Page: FavoriteStocks
Description: This function POST to server the user email and symbol of the stock and the server delete the stock from the favoriteStock.
**/

export async function deletFromFavoriteStockList(userEmail,symbol){
    try{
    console.log(userEmail)
    fetch('http://localhost:5000/deletStocktoFavoriteList', {
        method: 'POST', 
        headers: { 'Content-Type': 'application/json' }, 
        body: JSON.stringify({Email: userEmail, Symbol: symbol})
    })
    .then(res => res.json())
    // .then(data => { data.result === "true" ? navigation.navigate('Dashboard', {userParam: email,}) : alert("wrong details") });
    } catch (e) {
        console.log(e);
        return "Oops something is wrong"
    }
}
export async function sendResultsToMail(userEmail){
    try{
    fetch('http://localhost:5000/mail', {
        method: 'POST', 
        headers: { 'Content-Type': 'application/json' }, 
        body: JSON.stringify({Email: userEmail})
    })
    .then(res => res.json())
    // .then(data => { data.result === "true" ? navigation.navigate('Dashboard', {userParam: email,}) : alert("wrong details") });
    } catch (e) {
        console.log(e);
        return "Oops something is wrong"
    }
}


export default{_onPressButtonLogin,sendResultsToMail,_onPressButtonsignUp,fetch_from_server,fetch_clock,fetchData,fetcSectorData,fetchSentimentData,fetchFavoritesData,fetchMonteCarlo,fetchArima,addStockToFavoriteStockList,deletFromFavoriteStockList} ;


