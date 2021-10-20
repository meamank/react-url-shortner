import classes from "./Main.module.css";
import HeroImg from "../../assets/hero.svg";
import LinkForm from "../UI/LinkForm";
import { useRef, useState } from "react";

const Main = (props) => {
  const [shortLink, setShortLink] = useState(null);
  const [buttonText, setButtonText] = useState("Copy");

  const linkInputRef = useRef();


  const submitHandler = async (event) => {
    event.preventDefault();

    const enteredLink = linkInputRef.current.value;

    fetch(`https://api.shrtco.de/v2/shorten?url=${enteredLink}`)
      .then((response) => response.json())
      .then((result) => setShortLink(result.result))
      .catch((error) => console.log("error", error));
  };

  const copyClipboard = (text) => {
    navigator.clipboard.writeText(shortLink.short_link);
    setButtonText(text);
  };

  return (
    <main>
      <div className={classes.form_div}>
        <div className={classes.description}>
          <h1>
            <span>Long links</span> Make it shorter.
          </h1>
          <h2>
            A free URL Shortener to create a shortened link making it easy to
            use.
          </h2>
        </div>
        <div className={classes.form}>
          <LinkForm onClick={submitHandler} linkInput={linkInputRef} />
        </div>

        
        {shortLink && <div className={classes.result}>
          <p className="result_item">{shortLink.short_link}</p>
          <button className="copy" onClick={() => copyClipboard("copied")}>
            {buttonText}
          </button>
        </div>}
      
      </div>

      <div className={classes.hero}>
        <img src={HeroImg} alt="main hero" />
      </div>

      
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
  );
};

export default Main;
