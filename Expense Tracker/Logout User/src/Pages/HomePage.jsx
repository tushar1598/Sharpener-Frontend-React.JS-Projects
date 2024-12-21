import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../Store/AuthContext";
import styles from "./HomePage.module.css";

const HomePage = () => {
  const authCtx = useContext(AuthContext);
  const navigate = useNavigate();

  const profileHandler = () => {
    navigate("./profile");
  };

  return (
    <>
      {authCtx.isLoggedIn ? (
        <section className={styles.starting}>
          <p>Welcome to Expense Tracker!!!</p>
          <div className="styles.profile">
            <p>Your profile is incomplete.</p>
            <button onClick={profileHandler}>Complete Now</button>
          </div>
        </section>
      ) : (
        <h1>Welcome to Expense Tracker!!!</h1>
      )}
    </>
  );
};

export default HomePage;
