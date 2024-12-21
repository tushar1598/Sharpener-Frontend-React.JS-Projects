import { Routes, Route } from "react-router-dom";
import Layout from "./Components/Layout/Layout";
import UserProfile from "./Components/Profile/UserProfile";
import AuthPage from "./Pages/AuthPage";
import HomePage from "./Pages/HomePage";
import { BrowserRouter as Router } from "react-router-dom";
import { useContext } from "react";
import AuthProvider from "./Store/AuthProvider";
import AuthContext from "./Store/AuthContext";

function App() {
  const authCtx = useContext(AuthContext);

  return (
    <AuthProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            {!authCtx.isLoggedIn && (
              <Route path="/auth" element={<AuthPage />} />
            )}
            <Route path="/profile" element={<UserProfile />} />
          </Routes>
        </Layout>
      </Router>
    </AuthProvider>
  );
}

export default App;
