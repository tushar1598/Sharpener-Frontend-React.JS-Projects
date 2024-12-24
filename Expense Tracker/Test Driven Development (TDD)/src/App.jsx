import { Routes, Route } from "react-router-dom";
import Layout from "./Components/Layout/Layout";
import UserProfile from "./Components/Profile/UserProfile";
import AuthPage from "./Pages/AuthPage";
import HomePage from "./Pages/HomePage";
import { BrowserRouter as Router } from "react-router-dom";
import { useContext } from "react";
import AuthProvider from "./Store/AuthProvider";
import AuthContext from "./Store/AuthContext";
import ForgetPassword from "./Components/Auth/ForgetPassword";
import ExpenseProvider from "./Store/ExpenseProvider";
import { useSelector } from "react-redux";

function App() {
  const authCtx = useContext(AuthContext);
  const isDarkMode = useSelector((state) => state.theme.isDark);

  return (
    <div className={`${isDarkMode ? "darkTheme" : ""}`}>
      <ExpenseProvider>
        <AuthProvider>
          <Router>
            <Layout>
              <Routes>
                <Route path="/" element={<HomePage />} />
                {!authCtx.isLoggedIn && (
                  <Route path="/auth" element={<AuthPage />} />
                )}
                <Route path="/profile" element={<UserProfile />} />
                <Route path="/forget-password" element={<ForgetPassword />} />
              </Routes>
            </Layout>
          </Router>
        </AuthProvider>
      </ExpenseProvider>
    </div>
  );
}

export default App;
