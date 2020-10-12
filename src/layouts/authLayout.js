import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Form } from "reactstrap";
import { _getWindowDimensions } from "utils";
import logo from "assets/img/logo.svg";

export const AuthLayout = props => {
  const [windowDimensions, setWindowDimensions] = useState(
    _getWindowDimensions()
  );

  useEffect(() => {
    const handleResize = () => {
      setWindowDimensions(_getWindowDimensions());
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [windowDimensions]);

  return (
    <div className="auth">
      <div
        className="auth__form-block"
        style={
          windowDimensions.width < 769
            ? { backgroundImage: `url('${props.background}')` }
            : null
        }
      >
        <div className="auth--overlay"></div>
        <Form className="auth__form">
          <a href="/" className="logo">
            <img src={logo} className="img-fluid" alt="logo" />
          </a>
          <h3 className="auth__form--title">{props.title}</h3>
          {props.children}
        </Form>
      </div>
      <div
        className="auth__content"
        style={{ backgroundImage: `url('${props.background}')` }}
      >
        <div className="auth--overlay"></div>
        <div className="auth__title-block">
          <h3 className="auth__heading">
            <span>{props.heading1}</span> <br />
            <span>{props.heading2}</span>
          </h3>
          <p className="auth__desc">{props.description}</p>
        </div>
      </div>
    </div>
  );
};

AuthLayout.propTypes = {
  background: PropTypes.string,
  children: PropTypes.node,
  description: PropTypes.string,
  heading1: PropTypes.string,
  heading2: PropTypes.string,
  title: PropTypes.string
};
