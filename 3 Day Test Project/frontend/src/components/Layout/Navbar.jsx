import { Link, NavLink, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

function Nav() {
  const cart = useSelector((state) => state.cart);
  const { user, authLoading, error } = useSelector((state) => state.auth);
  if (authLoading) return null;

  return (
    <>
      <header>
        <div className="logosec">
          <div className="logo">
            <Link style={{ textDecoration: "none" }} to="/">
              <h4 id="nav-head">Foodiv</h4>
            </Link>
          </div>
          <img
            src="https://media.geeksforgeeks.org/wp-content/uploads/20221210182541/Untitled-design-(30).png"
            className="icn menuicn"
            id="menuicn"
            alt="menu-icon"
          />
        </div>

        <div className="searchbar">
          <input type="text" placeholder="Search" />
          <div className="searchbtn">
            <img
              src="https://media.geeksforgeeks.org/wp-content/uploads/20221210180758/Untitled-design-(28).png"
              className="icn srchicn"
              alt="search-icon"
            />
          </div>
        </div>

        <div className="message">
          {user ? (
            <>
              <li>
                <NavLink
                  className={({ isActive }) =>
                    isActive ? "nav-link active-link" : "nav-link"
                  }
                  to="/users/dashboard"
                >
                  Dashboard
                </NavLink>
              </li>

              <li>
                <NavLink
                  className={({ isActive }) =>
                    isActive ? "nav-link active-link" : "nav-link"
                  }
                  to="/users/profile"
                >
                  <img
                    src="https://cdn-icons-png.flaticon.com/128/3135/3135715.png"
                    alt=""
                  />
                  Profile
                </NavLink>
              </li>
              <li className="dropdown">
                <NavLink
                  className={({ isActive }) =>
                    isActive ? "nav-link active-link" : "nav-link"
                  }
                  to="/users/categories"
                >
                  Categories
                </NavLink>
              </li>
              <li>
                <Link to="/users/cart">
                  <img
                    src="https://cdn-icons-png.flaticon.com/128/2838/2838838.png"
                    alt=""
                  />
                  {cart.cartCount}
                </Link>
              </li>
              <li>
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
              <li>
                <NavLink
                  className={({ isActive }) =>
                    isActive ? "nav-link active-link" : "nav-link"
                  }
                  to="/"
                >
                  Home
                </NavLink>
              </li>

              <li>
                <NavLink
                  className={({ isActive }) =>
                    isActive ? "nav-link active-link" : "nav-link"
                  }
                  to="/users/sign-in"
                >
                  Sign-in
                </NavLink>
              </li>
              <li>
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
        </div>
      </header>

      <Outlet />
    </>
  );
}
export default Nav;
