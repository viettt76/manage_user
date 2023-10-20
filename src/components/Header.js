import { useContext } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import { Link, NavLink } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import logo from "../assets/images/logo.svg";
import "./Header.scss";
import { UserContext } from "../userContext/UserProvider";
import { toast } from "react-toastify";

function Header() {
  const { user, logout } = useContext(UserContext);

  const handleLogout = () => {
    logout();
    if (localStorage.getItem("token")) {
      localStorage.removeItem("token");

      toast.success("logout successful");
    }
  };

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Link to="/" className="navbar-brand">
          <img className="logo" src={logo} alt="logo" width={30} />
          <span>Manager Users App</span>
        </Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <NavLink to="/" className="nav-link">
              Home
            </NavLink>

            <NavLink to="/users" className="nav-link">
              Manager Users
            </NavLink>
          </Nav>
          <Nav>
            {user && user.auth && (
              <span className="nav-link">Welcome {user.email}</span>
            )}
            <NavDropdown
              title="Setting"
              id="basic-nav-dropdown"
              className="justify-content-end"
            >
              {!(user && user.auth) ? (
                <NavDropdown.Item
                  as={Link}
                  to="/login"
                  className="dropdown-item"
                >
                  Login
                </NavDropdown.Item>
              ) : (
                <NavDropdown.Item
                  as={Link}
                  to="/"
                  className="dropdown-item"
                  onClick={handleLogout}
                >
                  Logout
                </NavDropdown.Item>
              )}
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
