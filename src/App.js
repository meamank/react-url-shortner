import { useState } from "react";
import { Fragment } from "react";
import "./App.css";
import LoginForm from "./components/Login/LoginForm";
import Header from "./components/Header/Header"
import Main from "./components/Main/Main";

function App() {
  const [isShown, setIsShown] = useState(false);


  const showLoginHandler = () => {
    setIsShown(true);
  };
  const closeLoginHandler = () => {
    setIsShown(false);
  };

  return (
    <Fragment>
      {isShown && <LoginForm onClose={closeLoginHandler} />}
      <div className="container">
        <Header onShowLogin = {showLoginHandler} />
        <section>
          <Main />
        </section>
      </div>
    </Fragment>
  );
}

export default App;
