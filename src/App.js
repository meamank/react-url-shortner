import { useRef, useState } from "react";
import { Fragment } from "react/cjs/react.production.min";
// import Logo from "./assets/logo.svg";
import HeroImg from "./assets/hero.svg";
import "./App.css";

function App() {
  const [shortLink, setShortLink] = useState(null);
  const [buttonText, setButtonText] = useState("Copy");
  const linkInputRef = useRef();
  let links = [];
  const submitHandler = async (event) => {
    event.preventDefault();

    const enteredLink = linkInputRef.current.value;

    // const response = await fetch("https://just.darshit.dev/shorten", {
    //   body: value,
    //   mode: "no-cors",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   method: "POST",
    //   redirect: 'follow'
    // });
    // const data = await response;

    

    var myHeaders = new Headers();
    myHeaders.append("Accept", "*/*");

    var raw = JSON.stringify({
      url: enteredLink,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(
      "https://53eb4870-2ef0-4458-9140-b7e9781e81a7.mock.pstmn.io/shorten",
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => setShortLink(result))
      .catch((error) => console.log("error", error));
  };



  if (shortLink && localStorage.getItem("link")) {
    links.push(shortLink.shortUrl);
  }
  if (shortLink && !localStorage.getItem("link")) {
    localStorage.setItem("link", shortLink.shortUrl);
  }

  const copyClipboard = (text) => {
    navigator.clipboard.writeText(shortLink.shortUrl)
    setButtonText(text)
  }
  console.log(links);

  return (
    <Fragment>
      <div className="container">
        <div className="navbar">
          <p>Kutly</p>
        </div>
        <section>
          <main>
            <div className="hero_header">
              <h1>
                <span>Long links</span> Make it shorter.
              </h1>
              <h2>
                A free URL Shortener to create a shortened link making it easy
                to use.
              </h2>
            </div>
            <div className="hero">
              <img src={HeroImg} alt="main hero" />
            </div>
            <div className="form">
              <form onSubmit={submitHandler}>
                <input
                  type="text"
                  placeholder="Paste your link here.."
                  ref={linkInputRef}
                />
                <button>Shorten it</button>
              </form>
            </div>
            {shortLink && (
              <div className="result">
                <p className="result_item">{shortLink.shortUrl}</p>
                <button
                  className="copy"
                  onClick={() => copyClipboard("copied")}
                >
                  {buttonText}
                </button>
              </div>
            )}
            {/* {links &&
              links.map((link) => (
                <div className="result">
                  <p className="result_item">{link}</p>
                  <button
                    className="copy"
                    onClick={() => navigator.clipboard.writeText(link)}
                  >
                    Copy
                  </button>
                </div>
              ))} */}
          </main>
        </section>
      </div>
    </Fragment>
  );
}

export default App;
