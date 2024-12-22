import { useState, useRef, useContext } from "react";
import AuthContext from "../../Store/AuthContext";
import styles from "./AuthForm.module.css";
import { useNavigate, Link } from "react-router-dom";
import VerifyEmail from "./VerifyEmail";

const AuthForm = () => {
  const navigate = useNavigate();
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const confirmPasswordInputRef = useRef();

  const authCtx = useContext(AuthContext);
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);
  const [error, setError] = useState();

  const swithcAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

    if (!isLogin) {
      const enteredPassword2 = confirmPasswordInputRef.current.value;
      if (
        enteredEmail &&
        enteredPassword &&
        enteredPassword2 &&
        enteredPassword === enteredPassword2
      ) {
        setIsFormValid(true);
      } else if (enteredPassword !== enteredPassword2) {
        setError("Passwords didn't match");
        console.log("Passwords didn't match");
      } else {
        setError("All Fields Are Required");
        console.log("All Fields Are Required");
      }
    }

    setIsLoading(true);
    let URL;

    if (isLogin) {
      URL =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBg05JJCLFn1hFQAsvpQqyIghUQs2SqRDc";
    } else if (isFormValid) {
      URL =
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBg05JJCLFn1hFQAsvpQqyIghUQs2SqRDc";
    }

    fetch(URL, {
      method: "POST",
      body: JSON.stringify({
        email: enteredEmail,
        password: enteredPassword,
        returnSecureToken: true,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        setIsLoading(false);
        if (res.ok) {
          console.log("user created");
          return res.json();
        } else {
          return res.json().then((data) => {
            let errorMessage = "Authentication failed!";
            throw new Error(errorMessage);
          });
        }
      })
      .then((data) => {
        authCtx.login(data.idToken);
        navigate("/");
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  return (
    <section className={styles.auth}>
      {authCtx.isLoggedIn ? (
        <VerifyEmail />
      ) : (
        <div>
          {error && (
            <p style={{ color: "red", textAlign: "start" }}>*{error}</p>
          )}
          <h1>{isLogin ? "Login" : "Sign Up"}</h1>
          <form onSubmit={submitHandler}>
            <div className={styles.control}>
              <label htmlFor="email">Email</label>
              <input type="email" id="email" required ref={emailInputRef} />
            </div>
            <div className={styles.control}>
              {isLogin && (
                <div>
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    id="password"
                    required
                    ref={passwordInputRef}
                  />
                  <Link to="/forget-password">
                    <span> Forgot-Password</span>
                  </Link>
                </div>
              )}
              {!isLogin && (
                <div>
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    id="password"
                    required
                    ref={passwordInputRef}
                  />
                  <label htmlFor="password">confirm Password</label>
                  <input
                    type="password"
                    id="confirmPassword"
                    required
                    ref={confirmPasswordInputRef}
                  />
                </div>
              )}
            </div>
            <div className={styles.actions}>
              {!isLoading && (
                <button>{isLogin ? "Login" : "Create Account"}</button>
              )}
              {isLoading && <p>Sending request...</p>}
              <button
                type="button"
                className={styles.toggle}
                onClick={swithcAuthModeHandler}
              >
                {isLogin ? "Create new account" : "have an account? Login"}
              </button>
            </div>
          </form>
        </div>
      )}
    </section>
  );
};

export default AuthForm;
