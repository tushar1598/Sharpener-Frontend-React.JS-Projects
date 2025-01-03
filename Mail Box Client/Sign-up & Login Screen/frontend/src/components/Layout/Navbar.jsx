import { Link, NavLink, Outlet } from "react-router-dom";
import "./Navbar.css";
import { useSelector } from "react-redux";

function Nav() {
  const { user, authLoading, error } = useSelector((state) => state.auth);
  if (authLoading) return null;

  return (
    <>
      <nav className="navbar navbar-expand-lg">
        <div className="container-fluid">
          <Link style={{ textDecoration: "none" }} to="/">
            <h4 id="nav-head">Mail Box Client</h4>
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              {user ? (
                <>
                  <li className="nav-item">
                    <NavLink
                      className={({ isActive }) =>
                        isActive ? "nav-link active-link" : "nav-link"
                      }
                      to="/"
                    >
                      Home
                    </NavLink>
                  </li>

                  <li className="nav-item">
                    <NavLink
                      className={({ isActive }) =>
                        isActive ? "nav-link active-link" : "nav-link"
                      }
                      to="/users/profile"
                    >
                      Profile
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink
                      className={({ isActive }) =>
                        isActive ? "nav-link active-link" : "nav-link"
                      }
                      to="/users/Sign-out"
                    >
                      Log-out
                    </NavLink>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item">
                    <NavLink
                      className={({ isActive }) =>
                        isActive ? "nav-link active-link" : "nav-link"
                      }
                      to="/"
                    >
                      Home
                    </NavLink>
                  </li>

                  <li className="nav-item">
                    <NavLink
                      className={({ isActive }) =>
                        isActive ? "nav-link active-link" : "nav-link"
                      }
                      to="/users/sign-in"
                    >
                      Sign-in
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink
                      className={({ isActive }) =>
                        isActive ? "nav-link active-link" : "nav-link"
                      }
                      to="/users/sign-up"
                    >
                      Sign-up
                    </NavLink>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>

      <Outlet />
    </>
  );
}
export default Nav;
