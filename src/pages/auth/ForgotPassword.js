import React, { useState } from "react";
import classnames from "classnames";
import { Link } from "react-router-dom";
import { Button } from "reactstrap";
import validator from "validator";
import PropTypes from "prop-types";
import { connect, useDispatch } from "react-redux";
import {
  AuthLayout,
  ErrorCard,
  FormInput,
  ErrorAlertNotification
} from "components";
import resetBackground from "assets/img/reset-bg.jpg";
import { _isInputValid } from "utils";
import { postForgetPassword, deleteForgetPasswordError } from "store/actions";

const ForgotPassword = props => {
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState([]);
  const dispatch = useDispatch();

  const { forgetPasswordError } = props;

  const validateForm = () => {
    setErrors([]);
    const errorArray = [];
    if (!email || email.trim().length === 0 || email === "") {
      errorArray.push("Please enter your email.");
    }
    if (email && !validator.isEmail(email)) {
      errorArray.push("Please enter a valid email.");
    }
    setErrors(errorArray);
    return !errorArray.length;
  };

  const onSubmit = e => {
    e.preventDefault();
    if (validateForm()) {
      const urlElements = window.location.href.split("/");
      const urlElement = `${urlElements[0]}//${urlElements[2]}`;

      const payload = {
        email,
        domain: urlElement
      };
      dispatch(postForgetPassword(payload));
    }
  };

  const DeleteForgetPasswordError = () => {
    dispatch(deleteForgetPasswordError());
  };

  const onClose = () => {
    setErrors([]);
  };

  return (
    <AuthLayout
      heading1="As a fan..."
      heading2="Discover, Stream & Share"
      description=" a constantly expanding mix of music from emerging and major artists
  around the world."
      background={resetBackground}
      title="Reset Password"
    >
      <p className="login__desc">Please enter your email address</p>

      {errors.length ? <ErrorCard error={errors[0]} onClose={onClose} /> : null}
      {forgetPasswordError && (
        <ErrorAlertNotification
          errors={forgetPasswordError}
          onClick={DeleteForgetPasswordError}
        />
      )}

      <FormInput
        id="email"
        type="email"
        label="email"
        placeholder="email"
        onChange={e => setEmail(e.target.value)}
        className={classnames({
          "is-invalid": _isInputValid(errors[0], "email")
        })}
        value={email}
      />

      <Button className="btn btn--primary auth__button" onClick={onSubmit}>
        {props.forgetPasswordIsLoading ? (
          <i className="fa fa-spinner fa-spin" />
        ) : null}
        {"  "}
        Send
      </Button>

      <div className="login__links mt-4">
        <Link to="/login" className="login__link">
          Back to Login?
        </Link>
        <span> Or </span>
        <Link to="/signup" className="login__link">
          Create Account?
        </Link>
      </div>
    </AuthLayout>
  );
};

const mapStateToProps = state => ({
  forgetPasswordSuccess: state.forgetPasswordReducer.forgetPasswordIsSuccessful,
  forgetPasswordError: state.forgetPasswordReducer.error,
  forgetPasswordIsLoading: state.forgetPasswordReducer.forgetPasswordIsLoading
});

ForgotPassword.propTypes = {
  forgetPasswordSuccess: PropTypes.bool,
  forgetPasswordError: PropTypes.string,
  forgetPasswordIsLoading: PropTypes.bool
};

export default connect(
  mapStateToProps,
  null
)(ForgotPassword);
