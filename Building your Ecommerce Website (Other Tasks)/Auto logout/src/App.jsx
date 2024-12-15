import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import { useContext } from "react";
import Layout from "./Components/Layout/Layout";
import UserProfile from "./Components/Profile/UserProfile";
import AuthPage from "./Pages/AuthPage";
import HomePage from "./Pages/HomePage";
import AuthContext from "./store/AuthContext";

function App() {
  const authContaxt = useContext(AuthContext);

  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          {!authContaxt.isLoggedIn && (
            <Route path="/auth" element={<AuthPage />} />
          )}
          {authContaxt.isLoggedIn && (
            <Route path="/profile" element={<UserProfile />} />
          )}
          <Route path="*" element={<HomePage />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
