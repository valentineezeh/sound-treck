import React, { Component } from "react";
import Router from "./Router";
import PropTypes from "prop-types";
import classnames from "classnames";
import { connect } from "react-redux";
import * as actions from "services/auth";
import { ToastContainer } from "react-toastify";
import { authCheckState } from "store/actions";
import { Loader } from "components";
import { _isUserMusician } from "utils";

class App extends Component {
  // componentDidCatch() {
  //   this.props.onTryAutoSignIn();
  // }

  componentDidMount() {
    const userId = localStorage.getItem("currentUser");
    if (userId) {
      return this.props.getCurrentUser(userId);
    }
  }

  render() {
    if (this.props.loading) {
      return <Loader />;
    }

    return (
      <>
        <ToastContainer
          className={classnames({ "is-invalid": this.props.errorToast })}
        />

        <Router
          isAuthenticated={this.props.isAuthenticated}
          user={this.props.user}
          isMusician={_isUserMusician(this.props.user)}
          loading={this.props.loading}
        />
      </>
    );
  }
}

App.propTypes = {
  errorToast: PropTypes.string,
  getCurrentUser: PropTypes.func,
  isAuthenticated: PropTypes.bool,
  loading: PropTypes.bool,
  logout: PropTypes.func,
  onTryAutoSignIn: PropTypes.func,
  user: PropTypes.object
};

const mapStateToProps = state => ({
  isAuthenticated: state.loginReducer.isAuthenticated,
  loading: state.loginReducer.loading,
  user: state.loginReducer.user
});

const mapDispatchToProps = dispatch => ({
  getCurrentUser: userId => dispatch(actions.setCurrentUser(userId)),
  logout: () => dispatch(actions.logout()),
  onTryAutoSignIn: dispatch(authCheckState())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
