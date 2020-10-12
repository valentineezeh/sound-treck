import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "reactstrap";
import { connect, useDispatch } from "react-redux";
import PropTypes from "prop-types";
import {
  AuthLayout,
  ErrorCard,
  FormInput,
  ErrorAlertNotification
} from "components";
import {
  postResetPassword,
  deleteResetPasswordError,
  verifyPasswordToken
} from "store/actions";
import resetBackground from "assets/img/reset-bg.jpg";

const Reset = props => {
  const [errors, setErrors] = useState([]);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const dispatch = useDispatch();
  const {
    resetPasswordIsSuccessful,
    resetPasswordError,
    resetPasswordIsLoading
  } = props;

  const validateForm = () => {
    setErrors([]);
    const errorArray = [];
    if (!password || !confirmPassword) {
      errorArray.push("Please enter new password");
    } else if (password !== confirmPassword) {
      errorArray.push("Passwords do not match");
    }
    setErrors(errorArray);
    return !errorArray.length;
  };

  const urlElements = window.location.href.split("/");
  const getToken = `${urlElements[4]}`;

  useEffect(() => {
    dispatch(verifyPasswordToken(getToken));
  }, []);

  const onSubmit = e => {
    e.preventDefault();
    const userData = {
      password,
      email: localStorage.getItem("email"),
      resetToken: getToken
    };
    if (validateForm()) {
      dispatch(postResetPassword(userData));
    }
  };

  const DeleteResetPasswordError = () => {
    dispatch(deleteResetPasswordError());
  };

  const onClose = () => {
    setErrors([]);
  };

  if (resetPasswordIsSuccessful) {
    return (window.location.href = "/login");
  }

  return (
    <AuthLayout
      heading1="As a fan..."
      heading2="Discover, Stream & Share"
      description=" a constantly expanding mix of music from emerging and major artists
  around the world."
      background={resetBackground}
      title="Reset"
    >
      <p className="login__desc">Please enter your new password</p>

      {errors.length ? <ErrorCard error={errors[0]} onClose={onClose} /> : null}

      {resetPasswordError && (
        <ErrorAlertNotification
          errors={resetPasswordError}
          onClick={DeleteResetPasswordError}
        />
      )}

      <FormInput
        id="newPassword"
        type="password"
        label="new password"
        placeholder="new password"
        onChange={e => setPassword(e.target.value)}
        value={password}
      />

      <FormInput
        id="confirmPassword"
        type="password"
        label="confirm new password"
        placeholder="confirm new password"
        onChange={e => setConfirmPassword(e.target.value)}
        value={confirmPassword}
      />

      <Button
        className="btn btn--primary auth__button"
        onClick={e => onSubmit(e)}
      >
        {resetPasswordIsLoading ? (
          <i className="fa fa-spinner fa-spin" />
        ) : null}
        {"   "}
        Reset
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

Reset.propTypes = {
  resetPasswordIsSuccessful: PropTypes.bool,
  resetPasswordError: PropTypes.string,
  resetPasswordIsLoading: PropTypes.bool,
  verifyPasswordIsSuccessful: PropTypes.bool
};

const mapStateToProps = state => ({
  resetPasswordIsSuccessful:
    state.resetPasswordReducer.resetPasswordIsSuccessful,
  resetPasswordError:
    state.resetPasswordReducer.error === null
      ? ""
      : state.resetPasswordReducer.error.message,
  resetPasswordIsLoading: state.resetPasswordReducer.resetPasswordIsLoading,
  verifyPasswordIsSuccessful:
    state.resetPasswordReducer.verifyPasswordIsSuccessful
});

export default connect(
  mapStateToProps,
  null
)(Reset);
