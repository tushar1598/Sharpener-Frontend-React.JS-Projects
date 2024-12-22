import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../Store/AuthContext";
import "./VerifyEmail.css";

const VerifyEmail = () => {
  const authCtx = useContext(AuthContext);
  const navigate = useNavigate();

  const VerifyEmailHandler = () => {
    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyBg05JJCLFn1hFQAsvpQqyIghUQs2SqRDc",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          requestType: "VERIFY_EMAIL",
          idToken: authCtx.token,
        }),
      }
    )
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);
        alert("Verification link sent to your email");
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="verify-email">
      <button onClick={VerifyEmailHandler}>Verify Email</button>
    </div>
  );
};

export default VerifyEmail;
