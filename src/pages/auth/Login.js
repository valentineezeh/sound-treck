import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import { Link, Redirect } from "react-router-dom";
import { Button } from "reactstrap";
import { connect } from "react-redux";
import { AuthLayout, ErrorCard, FormInput, Loader } from "components";
import loginBackground from "assets/img/login-bg.png";
import { _isInputValid } from "utils";
import { validateUserLoginInput } from "validations";
import {
  userLoginRequest,
  deleteErrorMessages
} from "store/actions/auth/login";

class Login extends React.Component {
  state = {
    email: "",
    password: "",
    errors: {}
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
    const { UserLoginRequest } = this.props;
    if (this.isValid()) {
      this.setState({ errors: {} });
      UserLoginRequest(this.state);
    }
  };

  /**
   *
   * @param {*} event
   * @returns {*} - state
   */
  handleDelete = () => {
    const { DeleteErrorMessages } = this.props;
    DeleteErrorMessages();
  };

  isValid = () => {
    const { errors, isValid } = validateUserLoginInput(this.state);
    if (!isValid) {
      this.setState({ errors });
    }
    return isValid;
  };

  render() {
    const { email, password, errors } = this.state;

    const { isLoading, error, isAuthenticated } = this.props;

    const userId = localStorage.getItem("currentUser");

    if (isAuthenticated) {
      return <Redirect to={`/user/${userId}`} />;
    }

    // {`/user/${userId}`}

    const login = (
      <AuthLayout
        heading1="As a fan..."
        heading2="Discover, Stream & Share"
        description=" a constantly expanding mix of music from emerging and major artists
  around the world."
        background={loginBackground}
        title="Login"
      >
        <p className="login__heading">Welcome to GidiMediaCity</p>
        <p className="login__desc">Sign in or create an account</p>

        {error ? <ErrorCard error={error} onClose={this.handleDelete} /> : null}

        {isLoading ? <Loader /> : null}

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
          className="btn btn--primary auth__button"
          onClick={this.onSubmit}
        >
          Login
        </Button>

        <div className="login__links">
          <Link to="/forgot-password" className="login__link">
            Forgot Password?
          </Link>
          <Link to="/signup" className="login__link">
            Create Account?
          </Link>
        </div>
      </AuthLayout>
    );
    return <>{login}</>;
  }
}

const mapStateToProps = state => ({
  error: state.loginReducer.error,
  // isAuthenticated: state.auth.token !== null,
  isAuthenticated: state.loginReducer.isAuthenticated,
  isLoading: state.loginReducer.loading
});

Login.propTypes = {
  error: PropTypes.string,
  isAuthenticated: PropTypes.bool,
  isLoading: PropTypes.bool,
  UserLoginRequest: PropTypes.func,
  DeleteErrorMessages: PropTypes.func
};

export default connect(
  mapStateToProps,
  {
    UserLoginRequest: userLoginRequest,
    DeleteErrorMessages: deleteErrorMessages
  }
)(Login);
