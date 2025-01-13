import React, { useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./reset-password.css";

function Resetpassword() {
  const { id } = useParams();
  const nevigate = useNavigate();
  const [user, setUser] = useState({
    id: id,
    password: "",
    confirm_password: "",
  });
  const SubmitHandler = async (e) => {
    e.preventDefault();
    if (user.password === user.confirm_password) {
      let res = await axios.post(
        "http://localhost:9000/users/reset-password",
        user,
        {
          withCredentials: true,
        }
      );
      if (res.data.reset) {
        toast.success("Password updated successfully!!");
        nevigate("/users/sign-in");
      }
    } else {
      toast.error("Password does't match!!");
      setUser({ id: id, password: "", confirm_password: "" });
    }
  };

  const Handler = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <>
      <div id="Reset-password-parent">
        <h4 style={{ textAlign: "center", margin: "20px", color: "white" }}>
          Reset Your Password
        </h4>
        <div id="reset-password-form">
          <form onSubmit={SubmitHandler}>
            <div style={{ height: "40px" }}></div>
            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">
                New Password
              </label>
              <input
                type="password"
                name="password"
                value={user.password}
                onChange={Handler}
                required
                className="form-control"
                id="exampleInputPassword1"
                placeholder="Enter new password"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">
                Confirm New Password
              </label>
              <input
                type="password"
                name="confirm_password"
                value={user.confirm_password}
                onChange={Handler}
                required
                className="form-control"
                id="exampleInputPassword2"
                placeholder="Re-Enter new password"
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Reset Password
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
export default Resetpassword;
