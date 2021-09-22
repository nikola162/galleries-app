import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logout, selectActiveUser, selectIsAuthenticated } from "../store/auth";

export default function NavBar() {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const activeUser = useSelector(selectActiveUser);
  const dispatch = useDispatch();

  function handleLogout() {
    dispatch(logout());
  }

  return (
    <nav style={{display: 'flex', justifyContent: 'space-evenly'}}>
      {isAuthenticated ? <h5>Welcome {activeUser && activeUser.first_name}</h5> : <h5>Welcome Guest</h5>}
      <h5><Link to="/">All Galleries</Link></h5>
      {!isAuthenticated && (
      <h5 className="nav-link"><Link to="/register">Register</Link></h5>
      )}
      {!isAuthenticated && (
      <h5 className="nav-link"><Link to="/login">Login</Link></h5>
      )}
      {isAuthenticated && (
        <h5><Link to="/my-galleries">My Galleries</Link></h5>
      )}
      {isAuthenticated && (
        <h5><Link to="/create">Create Galleries</Link></h5>
      )}
      {isAuthenticated && (
        <button onClick={handleLogout}>Logout</button>
      )}
    </nav>
  );
}