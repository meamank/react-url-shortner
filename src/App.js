import { useContext, useRef, useState } from "react";
import { Fragment } from "react/cjs/react.production.min";
// import Logo from "./assets/logo.svg";
import HeroImg from "./assets/hero.svg";
import "./App.css";
import LoginForm from "./components/Login/LoginForm";
import AuthContext from "./store/auth-context";

function App() {
  const [shortLink, setShortLink] = useState(null);
  const [buttonText, setButtonText] = useState("Copy");
  const [isShown, setIsShown] = useState(false);
  const linkInputRef = useRef();

  const authCtx = useContext(AuthContext);

  const submitHandler = async (event) => {
    event.preventDefault();

    const enteredLink = linkInputRef.current.value;

    fetch(`https://api.shrtco.de/v2/shorten?url=${enteredLink}`)
      .then((response) => response.json())
      .then((result) => setShortLink(result.result))
      .catch((error) => console.log("error", error));
  };
  const showLoginHandler = () => {
    setIsShown(true);
  };
  const closeLoginHandler = () => {
    setIsShown(false);
  };
  const logoutHandler = () => {
    authCtx.logout();
  };

  const copyClipboard = (text) => {
    navigator.clipboard.writeText(shortLink.short_link);
    setButtonText(text);
  };

  console.log(shortLink)

  return (
    <Fragment>
      {isShown && <LoginForm onClose={closeLoginHandler} />}
      <div className="container">
        <div className="navbar">
          <p>Kutly</p>
          {authCtx.isLoggedIn ? (
            <button type="button" onClick={logoutHandler}>
              Logout
            </button>
          ) : (
            <button type="button" onClick={showLoginHandler}>
              Login
            </button>
          )}
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
                <p className="result_item">{shortLink.short_link}</p>
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
