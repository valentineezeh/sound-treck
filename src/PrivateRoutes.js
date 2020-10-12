import React, { Suspense } from "react";
import { Route, Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import { Loader } from "components";
import { _getAuthRedirectionUrl, _isObjectEmpty } from "utils";

export const AuthRoute = ({
  component: Component,
  isAuthenticated,
  loading,
  ...rest
}) => (
  <Route
    {...rest}
    render={props =>
      isAuthenticated ? (
        <Suspense fallback={<Loader show />}>
          <Component {...props} />
        </Suspense>
      ) : loading ? (
        <Redirect
          to={{
            pathname: "/login",
            state: { from: props.location.pathname }
          }}
        />
      ) : null
    }
  />
);

export const MusicianAuthRoute = ({
  component: Component,
  isAuthenticated,
  isMusician,
  ...rest
}) => (
  <Route
    {...rest}
    render={props =>
      isAuthenticated && isMusician ? (
        <Suspense fallback={<Loader show />}>
          <Component {...props} />
        </Suspense>
      ) : (
        <Redirect
          to={{
            pathname: "/login",
            state: { from: props.location.pathname }
          }}
        />
      )
    }
  />
);

export const NonauthRoute = ({
  component: Component,
  isAuthenticated,
  allowRedirect,
  ...rest
}) => (
  <Route
    {...rest}
    render={props =>
      isAuthenticated && allowRedirect ? (
        <Redirect to={props.location.state ? props.location.state.from : "/"} />
      ) : (
        <Suspense fallback={<Loader show />}>
          <Component {...props} />
        </Suspense>
      )
    }
  />
);

export const SpecialRoute = ({
  component: Component,
  isAuthenticated,
  user,
  ...rest
}) => (
  <Route
    {...rest}
    render={props =>
      !isAuthenticated ? (
        <Suspense fallback={<Loader show />}>
          <Component {...props} />
        </Suspense>
      ) : !_isObjectEmpty(user) && _getAuthRedirectionUrl(user) ? (
        <Redirect
          to={{
            pathname: _getAuthRedirectionUrl(user)
          }}
        />
      ) : null
    }
  />
);

AuthRoute.propTypes = {
  component: PropTypes.object,
  location: PropTypes.object,
  isAuthenticated: PropTypes.bool,
  loading: PropTypes.bool
};

MusicianAuthRoute.propTypes = {
  component: PropTypes.object,
  location: PropTypes.object,
  isAuthenticated: PropTypes.bool,
  isMusician: PropTypes.bool
};

NonauthRoute.propTypes = {
  component: PropTypes.object,
  isAuthenticated: PropTypes.bool,
  location: PropTypes.object,
  allowRedirect: PropTypes.bool
};

NonauthRoute.defaultProps = {
  allowRedirect: false
};

SpecialRoute.propTypes = {
  component: PropTypes.object,
  location: PropTypes.object,
  isAuthenticated: PropTypes.bool,
  user: PropTypes.object
};
