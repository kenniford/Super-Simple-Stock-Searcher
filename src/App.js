import React, { useState } from 'react'

import './App.css';

function App() {
  const [data, setData] = useState({})
  const [input, setInput] = useState('')
  const [intervalInput, setIntervalInput] = useState('')

  let stockSymbol = input;
  const key = `X3V80S6LVPP0WFCD`;
  const interval = intervalInput;
  const apiCall = `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${stockSymbol}&interval=${interval}min&apikey=${key}`;

  const inputTicker = () => {
    fetch(apiCall)
      .then(response => response.json())
      .then(responseData => {
        setData(responseData)
        console.log(responseData)
      })
  }

  const getDate = () => {
    if (data[`Time Series (${interval}min)`]) {
      return Object.keys(data[`Time Series (${interval}min)`]).map(dateTime => (
        <p key={dateTime}>{dateTime}</p>
      ));
    }
    return null;
  };

  const getOpen = () => {
    if (data[`Time Series (${interval}min)`]) {
      return Object.keys(data[`Time Series (${interval}min)`]).map(dateTime => (
        <p key={dateTime}>{Number(data[`Time Series (${interval}min)`][dateTime]['1. open']).toFixed(2)}</p>
      ));
    }
    return null;
  };

  // can't do [dateTime]['1. open'] because [datetime] returns a list of dates as opposed to the Time Series (5min) objects

  const getHigh = () => {
    if(data[`Time Series (${interval}min)`]) {
      return Object.keys(data[`Time Series (${interval}min)`]).map(dateTime => (
        <p key={dateTime}>{Number(data[`Time Series (${interval}min)`][dateTime]["2. high"]).toFixed(2)}</p>
      ));
    }
    return null;
  };

  const getLow = () => {
    if(data[`Time Series (${interval}min)`]) {
      return Object.keys(data[`Time Series (${interval}min)`]).map(dateTime => (
        <p key={dateTime}>{Number(data[`Time Series (${interval}min)`][dateTime]["3. low"]).toFixed(2)}</p>
      ));
    }
    return null;
  };

  const getClose = () => {
    if(data[`Time Series (${interval}min)`]) {
      return Object.keys(data[`Time Series (${interval}min)`]).map(dateTime => (
        <p key={dateTime}>{Number(data[`Time Series (${interval}min)`][dateTime]["4. close"]).toFixed(2)}</p>
      ))
    }
    return null;
  }

  const getVolume = () => {
    if(data[`Time Series (${interval}min)`]) {
      return Object.keys(data[`Time Series (${interval}min)`]).map(dateTime => (
        <p key={dateTime}>{Number(data[`Time Series (${interval}min)`][dateTime]["5. volume"]).toLocaleString("en-US")}</p>
      ))
    }
    return null;
  }

  const getSymbol = () => {
    if(data["Meta Data"]) {
      return data["Meta Data"]["2. Symbol"].toUpperCase()
    }
  }

  return (
    <div className="App">      
      <div className="stockBody">
        <h1>Stock Searcher</h1>
        <input 
          type='text'
          placeholder='Search Ticker...'
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if(e.key === 'Enter') {
              inputTicker();
            }
          }}          
        />        
        <select value={intervalInput} onChange={(e) => {setIntervalInput(e.target.value)}}>
          <option value={null}>Select Time Interval</option>
          <option value="1">1</option>           
          <option value="5">5</option>           
          <option value="15">15</option>           
          <option value="30">30</option>           
          <option value="60">60</option>           
        </select>
        <button onClick={inputTicker}>Search</button>
        <h1>{getSymbol()}</h1>
        <div className="stockInfo">
          <div className="dateColumn">
            Date/Time:
            {getDate()}
          </div>
          <div className="openColumn">
            Open:
            {getOpen()}
          </div>
          <div className="highColumn">
            High:
            {getHigh()}
          </div>
          <div className="lowColumn">
            Low:
            {getLow()}
          </div>
          <div className="closeColumn">
            Close:
            {getClose()}
          </div>
          <div className="volumeColumn">
            Volume:
            {getVolume()}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
