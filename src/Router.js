/* eslint-disable object-curly-newline */
import React, { lazy, Suspense, useEffect } from "react";
import { Redirect, Router, Route, Switch, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { Loader } from "components";
import hashHistory from "./history";
import { AuthRoute, NonauthRoute, SpecialRoute } from "PrivateRoutes";
import SingleAlbum from "./pages/user/SingleAlbum";

// pages
const About = lazy(() => import("pages/About"));
const ErrorPage = lazy(() => import("pages/404"));
const Home = lazy(() => import("pages/Home"));
const Login = lazy(() => import("pages/auth/Login"));
const ForgotPassword = lazy(() => import("pages/auth/ForgotPassword"));
const Reset = lazy(() => import("pages/auth/Reset"));
const SignupOption = lazy(() => import("components/signupSelect"));

// guests
const Guest = lazy(() => import("pages/guest"));

// users
const UserDashboard = lazy(() => import("pages/user"));

const Scroll = props => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [props.location]);

  return props.children;
};

Scroll.propTypes = {
  location: PropTypes.object,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
};

const ScrollToTop = withRouter(Scroll);

const RouterComponent = props => {
  return (
    <Router history={hashHistory}>
      <ScrollToTop>
        <Switch>
          <NonauthRoute
            isAuthenticated={props.isAuthenticated}
            path="/"
            component={Home}
            exact
          />

          <SpecialRoute
            allowRedirect={true}
            isAuthenticated={props.isAuthenticated}
            user={props.user}
            path="/login"
            component={Login}
          />

          {/* <NonauthRoute
          allowRedirect={true}
          isAuthenticated={props.isAuthenticated}
          path="/login"
          component={Login}
        /> */}

          {/* SingleAlbum */}
          <NonauthRoute
            allowRedirect={true}
            // isAuthenticated={props.isAuthenticated}
            path="/magic/album/:id"
            component={SingleAlbum}
          />

          <NonauthRoute
            isAuthenticated={props.isAuthenticated}
            path="/signup"
            component={SignupOption}
          />

          <NonauthRoute
            isAuthenticated={props.isAuthenticated}
            path="/forgot-password"
            component={ForgotPassword}
          />

          <NonauthRoute
            isAuthenticated={props.isAuthenticated}
            path="/change-password"
            component={Reset}
          />

          {/* guests */}

          <NonauthRoute
            isAuthenticated={props.isAuthenticated}
            path="/magic"
            component={Guest}
          />

          {/* users */}

          <AuthRoute
            isAuthenticated={props.isAuthenticated}
            loading={props.loading}
            path="/user/:userId"
            component={UserDashboard}
          />

          <NonauthRoute
            isAuthenticated={props.isAuthenticated}
            path="/about"
            component={About}
          />

          <Route
            exact
            path="/404"
            render={routeProps => (
              <Suspense fallback={<Loader show />}>
                <ErrorPage {...routeProps} />
              </Suspense>
            )}
          />

          <Route
            render={routeProps => (
              <Suspense fallback={<Loader show />}>
                <Redirect to="/404" {...routeProps} />
              </Suspense>
            )}
          />
        </Switch>
      </ScrollToTop>
    </Router>
  );
};

RouterComponent.propTypes = {
  loading: PropTypes.bool,
  isAuthenticated: PropTypes.bool,
  isMusician: PropTypes.bool,
  user: PropTypes.object
};

export default RouterComponent;
