import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect, useDispatch } from "react-redux";
import classnames from "classnames";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";
import logo from "assets/img/logo-white.svg";
import { _isObjectEmpty, _isUserMusician, _getUserName } from "utils";
import { logout } from "services/auth";

const Navigation = props => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSticky, setSticky] = useState(false);
  const dispatch = useDispatch();

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  const stickNav = () => {
    if (window.pageYOffset >= 10) {
      setSticky(true);
    } else {
      setSticky(false);
    }
  };

  useEffect(() => {
    window.onscroll = () => {
      stickNav();
    };
  }, []);

  return props.isHomepage ? (
    <div className="navigation">
      <Navbar
        className={classnames("fixed-top", { "bg-black": isSticky })}
        expand="lg"
      >
        <div className="container">
          <NavbarBrand href="/">
            <div className="logo">
              <img className="img-fluid" src={logo} alt="Gidimedia Logo" />
            </div>
          </NavbarBrand>

          <div className="mobile-icons">
            <NavbarToggler onClick={() => toggle()}>
              <i className={`fas ${isOpen ? "fa-times" : "fa-bars"}`}></i>
            </NavbarToggler>
          </div>

          <Collapse isOpen={isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink href="/magic">Magic</NavLink>
              </NavItem>

              <NavItem className={classnames({ active: props.activeLink })}>
                <NavLink href="/about">About</NavLink>
              </NavItem>

              {/* <NavItem className={classnames({ active: props.activeLink })}>
                <NavLink href="/contact">Say Hi</NavLink>
              </NavItem> */}

              {props.isAuthenticated ? (
                <UncontrolledDropdown nav inNavbar>
                  <DropdownToggle nav caret className="color-yellow">
                    {!_isObjectEmpty(props.user)
                      ? props.user.userName
                        ? props.user.userName
                        : _getUserName(props.user)
                      : null}
                  </DropdownToggle>
                  <DropdownMenu>
                    {_isUserMusician(props.user) ? (
                      <DropdownItem href={`/user/${props.user._id}`}>
                        Profile
                      </DropdownItem>
                    ) : null}
                    <DropdownItem href="#" onClick={() => dispatch(logout())}>
                      Logout
                    </DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
              ) : (
                <NavItem>
                  <NavLink href="/login">Login</NavLink>
                </NavItem>
              )}
            </Nav>
          </Collapse>
        </div>
      </Navbar>
    </div>
  ) : (
    <div className="navigation navigation--alt">
      <Navbar expand="md pr-0 pl-0">
        <div className="container">
          {props.isUserNav ? (
            <NavbarBrand href="/magic">
              <div className="logo">
                <img className="img-fluid" src={logo} alt="Gidimedia Logo" />
              </div>
            </NavbarBrand>
          ) : null}

          <Nav
            className={classnames({
              "ml-auto w-auto": props.isUserNav
            })}
            navbar
          >
            {!props.isUserNav ? (
              <NavItem className="navbar-form">
                <form className="form-inline form">
                  <div className="relative w-100">
                    <input
                      className="form-control"
                      type="search"
                      placeholder="Search for song, artist or album"
                      aria-label="Search"
                    />

                    <button className="navbar-form__button">
                      <i className="fas fa-search"></i>
                    </button>
                  </div>
                </form>
              </NavItem>
            ) : null}

            <NavItem
              className={classnames("profile", {
                profile__alt: props.isUserNav
              })}
            >
              {props.isAuthenticated ? (
                <a
                  className="profile--link "
                  href={!props.user ? "" : `/user/${props.user._id}`}
                >
                  {!_isObjectEmpty(props.user) ? props.user.userName : null}
                </a>
              ) : (
                <Link className="profile--link nav-link" to="/login">
                  Login / Register
                </Link>
              )}
            </NavItem>
          </Nav>
        </div>
      </Navbar>
    </div>
  );
};

Navigation.propTypes = {
  activeLink: PropTypes.string,
  isAuthenticated: PropTypes.bool,
  isHomepage: PropTypes.bool,
  isUserNav: PropTypes.bool,
  user: PropTypes.object
};

Navigation.defaultProps = {
  isHomepage: false
};

const mapStateToProps = state => ({
  isAuthenticated: state.loginReducer.token !== null,
  //state.auth.token !== null,
  loading: state.loginReducer.loading,
  user: state.auth.user
});

export default connect(mapStateToProps)(Navigation);
