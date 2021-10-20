import classes from "./Main.module.css";
import HeroImg from "../../assets/hero.svg";
import LinkForm from "../UI/LinkForm";

const Main = (props) => {
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
          <LinkForm onClick={props.onClick} linkInput={props.linkInput} />
        </div>
      </div>

      <div className={classes.hero}>
        <img src={HeroImg} alt="main hero" />
      </div>

      {/* {shortLink && (
        <div className="result">
          <p className="result_item">{shortLink.short_link}</p>
          <button className="copy" onClick={() => copyClipboard("copied")}>
            {buttonText}
          </button>
        </div>
      )} */}
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
