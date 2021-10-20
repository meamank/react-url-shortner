import { useContext } from "react";
import AuthContext from "../../store/auth-context";
import classes from "./Header.module.css";

const Header = (props) => {

  const authCtx = useContext(AuthContext)

  const logoutHandler = () => {
    authCtx.logout()
  }

  return (
    <div className={classes.header}>
      <p>Kutly</p>
      {authCtx.isLoggedIn ? (
        <button className= {`${classes.btn} ${classes.btn__primary}`} type="button" onClick={logoutHandler}>
          Logout
        </button>
      ) : (
        <button className= {`${classes.btn} ${classes.btn__primary}`} type="button" onClick={props.onShowLogin}>
          Login
        </button>
      )}
    </div>
  );
};

export default Header;
