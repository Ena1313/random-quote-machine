import React, { useEffect, useState } from "react";
import './App.css';
import COLORS_ARRAY from "./colorsArray";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter, faFacebook } from "@fortawesome/free-brands-svg-icons";
import { faQ, faQuoteLeft } from "@fortawesome/free-solid-svg-icons";


//let quotesDatabase = "https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json";
let quotesAPI = "https://api.quotable.io/random";

function App() {
  const [quote, setQuote] = useState();
  const [author, setAuthor] = useState();
  const [randomNumber, setRandomNumber] = useState(0);
  const [quotesArray, setQuotesArray] = useState(null);
  const [color, setColor] = useState("#2Bc345");

  /*
  const fetchQuotes = async (url) => { //moze ici i quotesDatabase u zagradu
      const response = await fetch (url); //moze ici i quotesDatabase u zagradu
      const parsedJSON = await response.json();
      setQuotesArray(parsedJSON.quotes);
      console.log(parsedJSON);
    }
  
  useEffect (() => {
    fetchQuotes(quotesDatabase);
  
  }, [quotesDatabase]);
  
  const generateRandomQuote = () => {
    let randomNum = Math.floor(quotesArray.length*Math.random());
    setRandomNumber(randomNum);
    setQuote(quotesArray[randomNum].quote);
    setAuthor(quotesArray[randomNum].author);
  }*/

  const generateRandomColor = () => {
    let randomColor = Math.floor(COLORS_ARRAY.length * Math.random());
    setColor(COLORS_ARRAY[randomColor]);
  }

  const fetchRandomQuote = async (url) => {
    const response = await fetch(url);
    const quote = await response.json();

    setAuthor(quote.author);
    setQuote(quote.content);
    generateRandomColor();
  }

  useEffect(() => {
    fetchRandomQuote(quotesAPI);
  }, [quotesAPI]);


  return (
    <div className="App">

      <header className="App-header" style={{ backgroundColor: color, color: color }}>
        <div id="quote-box">
          <p id="text" style={{ color: color }}><FontAwesomeIcon icon={faQuoteLeft}/>  {quote}</p>

          <p id="author" style={{ color: color }}>- {author}</p>

          <button id="new-quote" style={{ backgroundColor: color }} onClick={() => fetchRandomQuote(quotesAPI)}>New Quote</button>

          <div className="button">
            <a title="Tweet quote" id="tweet-quote" style={{ backgroundColor: color }} target="_blank" href={encodeURI(`http://www.twitter.com/intent/tweet?text=${quote} -${author}`)}><FontAwesomeIcon icon={faTwitter}/></a>

            <a title="Post quote to Facebook" id="facebook-quote" style={{ backgroundColor: color }} target="_blank" href={encodeURI(`https://www.facebook.com/login/?text=${quote} -${author}`)}><FontAwesomeIcon icon={faFacebook}/></a>
          </div>
        </div>
      </header>

    </div>
  );
}

export default App;
