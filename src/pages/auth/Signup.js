import React from "react";
import classnames from "classnames";
import { Link, withRouter } from "react-router-dom";
import { Button } from "reactstrap";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { AuthLayout, ErrorCard, FormInput, Loader } from "components";
import loginBackground from "assets/img/login-bg.png";
import { _isInputValid } from "utils";
import {
  ValidateUserSignUpInput,
  validateUserNextSignUpInput
} from "validations";
import {
  userSignUpRequest,
  deleteErrorMessage
} from "store/actions/auth/signUp";

class Signup extends React.Component {
  state = {
    fullName: "",
    email: "",
    password: "",
    gender: "male",
    errors: {},
    country: "",
    city: "",
    state: "",
    address: "",
    next: false,
    role: ""
  };

  /**
   *
   *@param {*} event
   *@returns {*} - state
   */
  onChange = event => {
    const { errors } = this.state;
    if (errors[event.target.name]) {
      const newErrors = Object.assign({}, errors);
      delete newErrors[event.target.name];
      this.setState({
        [event.target.name]: event.target.value,
        errors: newErrors
      });
    } else {
      this.setState({
        [event.target.name]: event.target.value
      });
    }
  };

  onSubmit = () => {
    const { UserSignUpRequest, userRole } = this.props;
    const payLoad = {
      ...this.state,
      role: userRole.id
    };

    if (this.isValidSignup()) {
      this.setState({ errors: {} });
      UserSignUpRequest(payLoad);
    }
  };

  onCheckFirstStage = e => {
    e.preventDefault();
    if (this.isValid()) {
      this.setState({
        errors: {},
        next: true
      });
    }
  };

  /**
   *
   * @param {*} event
   * @returns {*} - state
   */
  handleDelete = () => {
    const { DeleteErrorMessage } = this.props;
    this.setState({
      next: false
    });
    DeleteErrorMessage();
  };

  isValid = () => {
    const { errors, isValid } = ValidateUserSignUpInput(this.state);
    if (!isValid) {
      this.setState({ errors });
    }
    return isValid;
  };

  isValidSignup = () => {
    const { errors, isValid } = validateUserNextSignUpInput(this.state);
    if (!isValid) {
      this.setState({ errors });
    }
    return isValid;
  };

  render() {
    const {
      fullName,
      email,
      password,
      errors,
      gender,
      country,
      state,
      city,
      address,
      next
    } = this.state;

    const { userRole, error, success, isLoading } = this.props;

    const userGender = ["male", "female"];

    if (success) {
      return (window.location.href = "/login");
    }

    const signUp = (
      <AuthLayout
        heading1={`'As a ${
          !userRole ? `Fan` : userRole.name
        }... Discover, Stream & Share'`}
        description=" a constantly expanding mix of music from emerging and major artists
around the world."
        background={loginBackground}
      >
        <p className="login__heading">Welcome to GidiMediaCity</p>
        <p className="login__desc">Kindly add Your Details</p>

        {error ? <ErrorCard error={error} onClose={this.handleDelete} /> : null}

        {isLoading ? <Loader /> : null}

        {!next ? (
          <>
            <FormInput
              id="fullName"
              type="fullName"
              label="full name"
              placeholder="full name"
              onChange={this.onChange}
              className={classnames({
                "is-invalid": (errors.fullName, "fullName")
              })}
              value={fullName}
              error={errors.fullName}
            />

            <FormInput
              id="gender"
              type="select"
              label="gender"
              placeholder=""
              onChange={this.onChange}
              className={classnames({
                "is-invalid": (errors.gender, "gender")
              })}
              value={gender}
              error={errors.gender}
              obj={userGender}
            />

            <FormInput
              id="email"
              type="email"
              label="email"
              placeholder="email"
              onChange={this.onChange}
              className={classnames({
                "is-invalid": _isInputValid(errors.email, "email")
              })}
              value={email}
              error={errors.email}
            />

            <FormInput
              id="password"
              type="password"
              label="password"
              placeholder="password"
              onChange={this.onChange}
              className={classnames({
                "is-invalid": _isInputValid(errors.password, "password")
              })}
              value={password}
              error={errors.password}
            />
            <Button
              className="btn btn--primary"
              onClick={this.onCheckFirstStage}
            >
              Next
            </Button>
          </>
        ) : (
          <>
            <FormInput
              id="country"
              type="country"
              label="Country"
              placeholder="country"
              onChange={this.onChange}
              className={classnames({
                "is-invalid": (errors.country, "country")
              })}
              value={country}
              error={errors.country}
            />

            <FormInput
              id="state"
              type="state"
              label="State"
              placeholder="state"
              onChange={this.onChange}
              className={classnames({ "is-invalid": (errors.state, "state") })}
              value={state}
              error={errors.state}
            />

            <FormInput
              id="city"
              type="city"
              label="City"
              placeholder="city"
              onChange={this.onChange}
              className={classnames({ "is-invalid": (errors.city, "city") })}
              value={city}
              error={errors.city}
            />

            <FormInput
              id="address"
              type="address"
              label="Address"
              placeholder="address"
              onChange={this.onChange}
              className={classnames({
                "is-invalid": (errors.address, "address")
              })}
              value={address}
              error={errors.address}
            />
            <Button className="btn btn--primary" onClick={this.onSubmit}>
              Signup
            </Button>
          </>
        )}

        <div className="signup__links">
          Already have an account?{" "}
          <Link to="/login" className="signup__link">
            Login
          </Link>
        </div>
      </AuthLayout>
    );

    return <>{signUp}</>;
  }
}

Signup.propTypes = {
  UserSignUpRequest: PropTypes.func,
  error: PropTypes.string,
  success: PropTypes.bool,
  DeleteErrorMessage: PropTypes.func,
  isLoading: PropTypes.bool,
  userRole: PropTypes.shape({
    name: PropTypes.string,
    id: PropTypes.string
  })
};

const mapStateToProps = state => ({
  isLoading: state.signupReducer.loading,
  success: state.signupReducer.isAuthenticated,
  error: state.signupReducer.error
});

export default withRouter(
  connect(
    mapStateToProps,
    {
      UserSignUpRequest: userSignUpRequest,
      DeleteErrorMessage: deleteErrorMessage
    }
  )(Signup)
);
