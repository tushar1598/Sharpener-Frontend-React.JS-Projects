import "./Sign-up.css";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function SignUp() {
  const nevigate = useNavigate();
  const [formData, setFormData] = useState({
    restaurantName: "",
    country: "India",
    phoneNumber: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const SubmitHandler = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    let res = await axios.post(
      "http://localhost:9000/users/create-user",
      formData
    );

    if (res.data.user) {
      toast.success("user created successfully");
      nevigate("/users/sign-in");
    } else {
      toast.error("user already founded!!");
      setFormData(data);
    }
  };

  const ChangeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="signup-form">
      <h2>Signup</h2>
      <form onSubmit={SubmitHandler}>
        <input
          type="text"
          name="restaurantName"
          placeholder="Restaurant name"
          value={formData.restaurantName}
          onChange={ChangeHandler}
          required
        />
        <select
          name="country"
          value={formData.country}
          onChange={ChangeHandler}
          required
        >
          <option value="India">India</option>
        </select>
        <input
          type="tel"
          name="phoneNumber"
          placeholder="+91 Mobile Number"
          value={formData.phoneNumber}
          onChange={ChangeHandler}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Enter Mail Address"
          value={formData.email}
          onChange={ChangeHandler}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Enter Password"
          value={formData.password}
          onChange={ChangeHandler}
          required
        />
        <input
          type="password"
          name="confirmPassword"
          placeholder="Enter Confirm Password"
          value={formData.confirmPassword}
          onChange={ChangeHandler}
          required
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default SignUp;
