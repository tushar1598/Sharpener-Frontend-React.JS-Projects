import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./password-reset-link.css";

function ForgotpasswordLink() {
  const [user, setUser] = useState({ email: "" });

  const SubmitHandler = async (e) => {
    e.preventDefault();
    let res = await axios.post(
      "http://localhost:9000/users/reset-password-link",
      user,
      {
        withCredentials: true,
      }
    );

    if (res.data.link) {
      toast.success("Password link has been sent successfully!!");
      setUser({ email: "" });
    } else {
      toast.error("user does't exists!!");
      setUser({ email: "" });
    }
  };

  const Handler = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <>
      <div id="reset-password-link-parent">
        <h4 style={{ textAlign: "center", margin: "20px", color: "white" }}>
          Reset Password Link
        </h4>
        <div id="reset-password-link-form">
          <form onSubmit={SubmitHandler}>
            <div style={{ height: "40px" }}></div>
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
                placeholder="Enter your registered email"
              />
              <div id="emailHelp" className="form-text">
                We'll never share your email with anyone else.
              </div>
            </div>
            <button type="submit" className="btn btn-primary">
              Send Link
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default ForgotpasswordLink;
