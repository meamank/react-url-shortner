import classes from "./Main.module.css";
import HeroImg from "../../assets/hero.svg";
import LinkForm from "../UI/LinkForm";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import { useRef, useState } from "react";
import { lightGreen } from "@mui/material/colors";

const Main = () => {
  const [shortLink, setShortLink] = useState(null);
  const [clipboardStatus, setClipboardStatus] = useState(false);

  const linkInputRef = useRef();

  const submitHandler = (event) => {
    event.preventDefault();

    const enteredLink = linkInputRef.current.value;

    fetch(`https://api.shrtco.de/v2/shorten?url=${enteredLink}`)
      .then((response) => response.json())
      .then((result) => setShortLink(result.result))
      .catch((error) => console.log("error", error));
  //   const raw = {
  //     url: enteredLink
  //   }

  //   var requestOptions = {
  //     method: "POST",
  //     body: JSON.stringify(raw),
  //   };

  //   fetch("https://just.darshit.dev/shorten", requestOptions)
  //     .then((response) => response.text())
  //     .then((result) => setShortLink(result))
  //     .catch((error) => console.log("error", error));
};

  const copyClipboard = () => {
    navigator.clipboard.writeText(shortLink.short_link);
    setClipboardStatus(true);
  };

  console.log(shortLink)

  return (
    <main>
      <div className={classes.form_div}>
        <div className={classes.description}>
          <h1>
            <span>Long links</span> Make it shorter.
          </h1>
          <h2>
            A free URL shortener to create a shortened link making it easy to
            use.
          </h2>
        </div>
        <div className={classes.form}>
          <LinkForm onClick={submitHandler} linkInput={linkInputRef} />
        </div>

        {shortLink && (
          <div className={classes.result}>
            <p className="result_item">{shortLink.shortUrl}</p>
            <button className="copy" onClick={copyClipboard}>
              {clipboardStatus ? (
                <DoneAllIcon sx={{ color: lightGreen[500] }} />
              ) : (
                <ContentCopyIcon />
              )}
            </button>
          </div>
        )}
      </div>

      <div className={classes.hero}>
        <img src={HeroImg} alt="main hero" />
      </div>
    </main>
  );
};

export default Main;
