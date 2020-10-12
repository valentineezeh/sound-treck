import React from "react";
import PropTypes from "prop-types";
import Navigation from "./nav";

export const Header = props => (
  <header className="header">
    <Navigation isHomepage activeLink={props.pageTitle || ""} />
    {props.children}
  </header>
);

Header.propTypes = {
  children: PropTypes.node,
  pageTitle: PropTypes.string
};
