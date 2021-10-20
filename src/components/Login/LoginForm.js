import { useContext, useRef, useState } from "react";
import AuthContext from "../../store/auth-context";
import Modal from "../UI/Modal";
import classes from "./Login.module.css";

const LoginForm = (props) => {

  const [isLogin, setIsLogin] = useState(true)
  const [error, setError] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const emailInputRef = useRef()
  const passwordInputRef = useRef()

  const authCtx = useContext(AuthContext)

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  }

  const submitHandler = async (event) => {
    event.preventDefault()

    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

    let url;

    if (isLogin) {
      url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.REACT_APP_API_KEY}`
    } else {
      url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${process.env.REACT_APP_API_KEY}`
    }
    fetch(
      url,
      {
        method: "POST",
        body: JSON.stringify({
          email: enteredEmail,
          password: enteredPassword,
          returnSecureToken: true,
        }),
        headers: {
          "content-type": "application/json",
        },
      }
    ).then((res) => {
      setIsLoading(false);
      if (res.ok) {
        return res.json()
      } else {
        return res.json().then((data) => {
          // let errorMessage = "Authentication failed"
          throw new Error(data.error.message)
        });
      }
    })
    .then((data) => {
      const expirationTime = new Date((new Date().getTime() + (+data.expiresIn * 1000)))
      authCtx.login(data.idToken, expirationTime)
      // history.replace('/')
    }).catch((err) => {
      // console.log(err)
      setError(err.message)
    })
  };




  return (
    <>
    {!authCtx.isLoggedIn && <Modal onClose= {props.onClose}>
      <div className={classes.auth}>
        <h1>{isLogin ? "Login" : "Sign Up"}</h1>
        <form onSubmit={submitHandler}>
          <div className={classes.control}>
            <label htmlFor="email">Your Email</label>
            <input type="email" id="email" required ref={emailInputRef} />
          </div>
          <div className={classes.control}>
            <label htmlFor="password">Your Password</label>
            <input
              type="password"
              id="password"
              required
              ref={passwordInputRef}
            />
          </div>
          {error && <p>{error}</p>}

          <div className={classes.actions}>
            {!isLoading && (
              <button className= {`${classes.btn} ${classes.btn__primary}`} >{isLogin ? "Login" : "Create Account"}</button>
            )}
            {isLoading && <p>sending....</p>}
            <button
              type="button"
              className={classes.toggle}
              onClick={switchAuthModeHandler}
            >
              {isLogin ? "Create new account" : "Login with existing account"}
            </button>
          </div>
        </form>
      </div>
    </Modal>}
    </>
  );
};

export default LoginForm;
