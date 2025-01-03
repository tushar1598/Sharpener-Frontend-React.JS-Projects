import "./Sign-up.css";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function SignUp() {
  const nevigate = useNavigate();

  let data = {
    name: "",
    email: "",
    phone: "",
    password: "",
    confirm_password: "",
    avatar: null,
  };

  const [user, setUser] = useState(data);

  const SubmitHandler = async (e) => {
    e.preventDefault();

    if (user.password !== user.confirm_password) {
      toast.error("password does't match");
      setUser(data);
    } else {
      const formData = new FormData();
      formData.append("name", user.name);
      formData.append("email", user.email);
      formData.append("phone", user.phone);
      formData.append("password", user.password);
      formData.append("avatar", user.avatar);

      let res = await axios.post(
        "http://localhost:9000/users/create-user",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (res.data.user) {
        toast.success("user created successfully");
        nevigate("/users/sign-in");
      } else {
        toast.error("user already founded!!");
        setUser(data);
      }
    }
  };

  const ChangeHandler = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setUser({ ...user, avatar: e.target.files[0] });
  };

  return (
    <>
      <div id="sign-up-form">
        <form onSubmit={SubmitHandler} encType="multipart/form-data">
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Name
            </label>
            <input
              type="text"
              className="form-control"
              name="name"
              value={user.name}
              id="exampleInputPassword1"
              onChange={ChangeHandler}
              required
              placeholder="Enter name"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              id="exampleInputEmail2"
              name="email"
              value={user.email}
              aria-describedby="emailHelp"
              onChange={ChangeHandler}
              required
              placeholder="Enter email"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Phone
            </label>
            <input
              type="number"
              className="form-control"
              name="phone"
              value={user.phone}
              id="exampleInputPassword3"
              onChange={ChangeHandler}
              required
              placeholder="Enter phone"
            />
          </div>
          <div className="password">
            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                name="password"
                value={user.password}
                id="exampleInputPassword4"
                onChange={ChangeHandler}
                required
                placeholder="Enter password"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">
                Confirm Password
              </label>
              <input
                type="password"
                className="form-control"
                name="confirm_password"
                value={user.confirm_password}
                id="exampleInputPassword5"
                onChange={ChangeHandler}
                required
                placeholder="Enter confirm password"
              />
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Profile Photo
            </label>
            <input
              type="file"
              className="form-control"
              name="avatar"
              accept="image/*"
              onChange={handleImageChange}
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Sign-up
          </button>
        </form>
      </div>
    </>
  );
}

export default SignUp;
