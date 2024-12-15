import styles from "./ProfileForm.module.css";
import { useContext, useRef } from "react";
import AuthContext from "../../store/AuthContext";
import { useNavigate } from "react-router-dom";

const ProfileForm = () => {
  const nevigate = useNavigate();
  const authContaxt = useContext(AuthContext);
  const newPasswordInputRef = useRef();

  const submitHandler = (event) => {
    event.preventDefault();
    const enteredNewPassword = newPasswordInputRef.current.value;
    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyBlPQjENh-QQ4chEcnifoeWEvfOA3kFxiU",
      {
        method: "POST",
        body: JSON.stringify({
          idToken: authContaxt.token,
          password: enteredNewPassword,
          returnSecureToken: false,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    ).then((res) => {
      console.log(res.json());
      nevigate("/");
    });
  };

  return (
    <form className={styles.form} onSubmit={submitHandler}>
      <div className={styles.control}>
        <label htmlFor="new-password">New Password</label>
        <input
          type="password"
          id="new-password"
          minLength="7"
          ref={newPasswordInputRef}
        />
      </div>
      <div className={styles.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
};

export default ProfileForm;
