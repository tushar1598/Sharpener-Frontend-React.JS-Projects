import "./Sign-in.css";
import { useState } from "react";
import { authActions } from "../../store/Auth-Slice";
import { useDispatch } from "react-redux";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function SignIn() {
  const dispatch = useDispatch();
  const nevigate = useNavigate();
  const [user, setUser] = useState({ email: "", password: "" });

  const SubmitHandler = async (e) => {
    e.preventDefault();
    let res = await axios.post(
      "http://localhost:9000/users/create-session",
      user
    );

    const response = await axios.get("http://localhost:9000/users/protected", {
      headers: { Authorization: `Bearer ${res.data.Token}` },
    });

    dispatch(authActions.setUser(response.data.user));

    if (res.data.user == false) {
      toast.error("user does't exists");
      setUser({ email: "", password: "" });
    } else if (res.data.password == false) {
      toast.error("Password is invalid");
      setUser({ email: "", password: "" });
    } else {
      toast.success("user logged-in successfully!!");
      localStorage.setItem("Token", res.data.Token);
      nevigate("/users/dashboard");
    }
  };

  const Handler = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <>
      <div id="sign-in-form">
        <form onSubmit={SubmitHandler}>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Email address
            </label>
            <input
              type="email"
              name="email"
              value={user.email}
              onChange={Handler}
              required
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Enter your username"
            />
            <div id="emailHelp" className="form-text">
              We'll never share your email with anyone else.
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={user.password}
              onChange={Handler}
              required
              className="form-control"
              id="exampleInputPassword1"
              placeholder="Enter password"
            />
          </div>
          <div>
            <Link
              id="forgot-password"
              style={{ textDecoration: "none" }}
              to="/users/reset-password-link-page"
            >
              Forgot Password
            </Link>
          </div>
          <button type="submit" className="btn btn-primary">
            Sign-in
          </button>
        </form>
      </div>
    </>
  );
}

export default SignIn;
