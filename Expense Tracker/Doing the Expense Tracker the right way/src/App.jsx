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

function App() {
  const authCtx = useContext(AuthContext);

  return (
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
  );
}

export default App;
