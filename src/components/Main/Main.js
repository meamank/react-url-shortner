import classes from "./Main.module.css";
import HeroImg from "../../assets/hero.svg";
import LinkForm from "../UI/LinkForm";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import CloseIcon from "@mui/icons-material/Close";
import { useRef, useState } from "react";
import { lightGreen } from "@mui/material/colors";

const Main = () => {
  const [shortLink, setShortLink] = useState(null);
  const [clipboardStatus, setClipboardStatus] = useState(false);

  const linkInputRef = useRef();

  const submitHandler = async (event) => {
    event.preventDefault();

    const enteredLink = linkInputRef.current.value;

    fetch(`https://api.shrtco.de/v2/shorten?url=${enteredLink}`)
      .then((response) => response.json())
      .then((result) => setShortLink(result.result))
      .catch((error) => console.log("error", error));
  };

  const copyClipboard = () => {
    navigator.clipboard.writeText(shortLink.short_link);
    setClipboardStatus(true);
  };

  // Get the existing data
  var existing = localStorage.getItem("link");

  // If no existing data, create an array
  // Otherwise, convert the localStorage string to an array
  existing = existing ? existing.split(",") : [];

  // Add new data to localStorage Array
  if (shortLink && existing.length <= 2) {
    existing.unshift(shortLink.short_link);
    // Save back to localStorage
    localStorage.setItem("link", existing.toString());
  } else if (shortLink && existing.length >= 3) {
    existing.pop();
    existing.unshift(shortLink.short_link);
    localStorage.setItem("link", existing.toString());
  }

  
    const removeExistingLinkHandler = (i) => {
      // existing.splice(i, 1);
      // localStorage.setItem("link", existing.toString());
      const updatedArr = existing.filter((item,index) => index !== i)
      existing = updatedArr
      localStorage.setItem("link", existing.toString());
      // console.log(i)
    };
  
  // localStorage.setItem("link", existing.toString());

  console.log(existing);

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
            <p className="result_item">{shortLink.short_link}</p>
            <button className="copy" onClick={() => copyClipboard("copied")}>
              {clipboardStatus ? (
                <DoneAllIcon sx={{ color: lightGreen[500] }} />
              ) : (
                <ContentCopyIcon />
              )}
            </button>
          </div>
        )}
        {existing &&
          existing.map((link, i) => (
            <div className={classes.result} key={i}>
              <p>{link}</p>
              <div className={classes.dual_btn}>
                <button
                  className="copy"
                  onClick={() => copyClipboard("copied")}
                >
                  {clipboardStatus ? (
                    <DoneAllIcon sx={{ color: lightGreen[500] }} />
                  ) : (
                    <ContentCopyIcon />
                  )}
                </button>
                <button  >
                  <CloseIcon onClick={() => removeExistingLinkHandler(i)} />
                </button>
              </div>
            </div>
          ))}
      </div>

      <div className={classes.hero}>
        <img src={HeroImg} alt="main hero" />
      </div>
    </main>
  );
};

export default Main;
