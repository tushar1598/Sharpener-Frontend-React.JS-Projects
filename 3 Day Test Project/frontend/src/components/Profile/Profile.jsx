import "./Profile.css";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Profile() {
  const { user, authLoading, error } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    restaurantName: "",
    country: "India",
    phoneNumber: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  useEffect(() => {
    if (user) {
      setFormData({
        restaurantName: user.restaurantName || "",
        country: user.country || "India",
        phoneNumber: user.phoneNumber || "",
        email: user.email || "",
        password: "",
        confirmPassword: "",
      });
    }
  }, [user]);

  const SubmitHandler = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      const res = await axios.put(
        `http://localhost:9000/users/update-user/?id=${user._id}`,
        formData
      );

      if (res.data.user) {
        toast.success("Profile updated successfully!");
      } else {
        toast.error("Failed to update profile");
      }
    } catch (err) {
      toast.error("An error occurred while updating the profile");
      console.error(err);
    }
  };

  const ChangeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="profile-form">
      <h2>Profile</h2>
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
        />
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={formData.confirmPassword}
          onChange={ChangeHandler}
        />
        <button type="submit">Update Profile</button>
      </form>
    </div>
  );
}

export default Profile;
