import { authActions } from "./Auth-Slice";
import axios from "axios";

export const fetchUserHandler = () => {
  return async (dispatch) => {
    const token = localStorage.getItem("Token");
    dispatch(authActions.setAuthLoading(true));
    if (!token) {
      dispatch(authActions.setAuthLoading(false));
      return;
    }
    try {
      const response = await axios.get(
        "http://localhost:9000/users/protected",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      dispatch(authActions.setUser(response.data.user));
    } catch (error) {
      console.error("Error fetching profile:", error);
      dispatch(authActions.setError("Failed to fetch user data"));
    } finally {
      dispatch(authActions.setAuthLoading(false));
    }
  };
};

export const logoutHandler = () => {
  return (dispatch) => {
    dispatch(authActions.logout());
  };
};
