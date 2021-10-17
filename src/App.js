import { useRef, useState } from "react";
import { Fragment } from "react/cjs/react.production.min";
// import Logo from "./assets/logo.svg";
import HeroImg from "./assets/hero.svg";
import "./App.css";

function App() {
  const [shortLink, setShortLink] = useState(null);
  const linkInputRef = useRef();
  let links = [];
  const submitHandler = async (event) => {
    event.preventDefault();

    const enteredLink = linkInputRef.current.value;

    const response = await fetch(
      `https://api.shrtco.de/v2/shorten?url=${enteredLink}`
    );
    const data = await response.json();

    console.log(data);

    if (data.ok === true) {
      setShortLink(data.result);
    }
  };

  if (shortLink && localStorage.getItem("link")) {
    links.push(shortLink.full_short_link);
  }
  if (shortLink && !localStorage.getItem("link")) {
    localStorage.setItem("link", shortLink.full_short_link);
  }
  console.log(links);

  return (
    <Fragment>
      <div className="container">
        <nav>
          <p>Kutly</p>
        </nav>
        <main>
          <div className="hero_header">
            <h1>A simple and free URL shortner</h1>
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
              <p className="result_item">{shortLink.full_short_link}</p>
            </div>
          )}
          {/* {links &&
            links.map((link) => (
              <div className="saved_link">
                <p className="result_item">{link}</p>
              </div>
            ))} */}
        </main>
      </div>
    </Fragment>
  );
}

export default App;
