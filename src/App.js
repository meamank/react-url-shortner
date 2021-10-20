import { useContext, useRef, useState } from "react";
import { Fragment } from "react/cjs/react.production.min";
// import Logo from "./assets/logo.svg";
import "./App.css";
import LoginForm from "./components/Login/LoginForm";
import AuthContext from "./store/auth-context";
import Header from "./components/Header/Header"
import Main from "./components/Main/Main";

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

  console.log(shortLink);

  return (
    <Fragment>
      {isShown && <LoginForm onClose={closeLoginHandler} />}
      <div className="container">
        <Header onShowLogin = {showLoginHandler} onLogout= {logoutHandler} />
        <section>
          <Main onClick= {submitHandler} linkInput= {linkInputRef} />
        </section>
      </div>
    </Fragment>
  );
}

export default App;
