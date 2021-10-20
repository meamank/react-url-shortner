import classes from "./LinkForm.module.css";

const LinkForm = (props) => {
  return (
    <form onSubmit={props.onClick}>
      <input
        type="text"
        placeholder="Paste your link here.."
        ref={props.linkInput}
      />
      <button className= {`${classes.btn} ${classes.btn__primary}`}>Shorten it</button>
    </form>
  );
};

export default LinkForm;
