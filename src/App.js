import { useEffect, useState } from "react";
import Footer from "./components/Footer";
import Nav from "./components/Nav";
import Quote from "./components/Quote";
import "./css/App.css";
import { MdTrendingFlat } from "react-icons/md";

function App() {
  const [flagQuote, setFlagQuote] = useState(true);
  const [singleQuote, setSingleQuote] = useState("");
  const [listQuoteByAuthor, setListQuoteByAuthor] = useState([]);

  useEffect(() => {
    getRandomQuote();
  }, []);

  // GET RANDOM QUOTE
  const getRandomQuote = async () => {
    const data = await fetch(
      "https://quote-garden.herokuapp.com/api/v3/quotes"
    );
    const quote = await data.json();
    setSingleQuote(quote.data[Math.floor(Math.random() * 10)]);
    setListQuoteByAuthor([]);
    setFlagQuote(true);
  };

  // GET QUOTE BY AUTHOR
  const getQuoteByAuthor = async (author) => {
    const data = await fetch(
      `https://quote-garden.herokuapp.com/api/v3/quotes?author=${author}`
    );
    const quote = await data.json();
    setListQuoteByAuthor(quote.data);
  };

  return (
    <div className="App">
      <Nav getRandomQuote={getRandomQuote} />
      <div className="quote-container">
        {flagQuote ? (
          <div className="single-quote-container">
            <Quote quote={singleQuote} />
            <button
              className="btn-author"
              onClick={() => {
                setFlagQuote(false);
                getQuoteByAuthor(singleQuote.quoteAuthor);
              }}
            >
              <div className="author-info">
                <p className="author-info-name">{singleQuote.quoteAuthor}</p>
                <p className="author-info-genre">{singleQuote.quoteGenre}</p>
              </div>

              <MdTrendingFlat />
            </button>
          </div>
        ) : (
          <div>
            <h2 className="heading-2">{singleQuote.quoteAuthor}</h2>
            {listQuoteByAuthor.map((quote) => {
              return <Quote key={quote._id} quote={quote} />;
            })}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default App;
