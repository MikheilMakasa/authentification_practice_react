import classes from "./ProfileForm.module.css";
import AuthContext from "../../store/auth-context";
import { useRef, useContext } from "react";
import { useHistory } from "react-router-dom";

const ProfileForm = () => {
  const history = useHistory();
  const authCtx = useContext(AuthContext);
  const passwordInputRef = useRef();

  const submitHandler = (event) => {
    event.preventDefault();
    const enteredNewPassword = passwordInputRef.current.value;

    // optional: add validation

    // sending request for changing password
    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyDwZbXNRhYOXMeAvrYuFZ-1ELTq0cwtu-0",
      {
        method: "POST",
        body: JSON.stringify({
          idToken: authCtx.token,
          password: enteredNewPassword,
          returnSecureToken: false,
        }),
        headers: { "Content-Type": "application/json" },
      }
    ).then((res) => {
      // assumption that it always succeeds!

      // redirecting to starting page
      history.replace("/");
    });
  };
  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <div className={classes.control}>
        <label htmlFor="new-password">New Password</label>
        <input
          type="password"
          id="new-password"
          minLength="7"
          ref={passwordInputRef}
        />
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
};

export default ProfileForm;
