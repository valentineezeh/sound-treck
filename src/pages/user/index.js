import React, { lazy, Suspense } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { Loader } from "components";

const Dashboard = lazy(() => import("./Dashboard"));
const SingleAlbum = lazy(() => import("./SingleAlbum"));
const Songs = lazy(() => import("./Songs"));
const ErrorPage = lazy(() => import("pages/404"));

const User = () => (
  <Switch>
    <Route
      exact
      path="/user/:userId"
      render={routeProps => (
        <Suspense fallback={<Loader show />}>
          <Dashboard {...routeProps} />
        </Suspense>
      )}
    />

    <Route
      path="/user/:userId/songs/"
      render={routeProps => (
        <Suspense fallback={<Loader show />}>
          <Songs {...routeProps} />
        </Suspense>
      )}
    />

    <Route
      path="/user/:userId/album/:albumId"
      render={routeProps => (
        <Suspense fallback={<Loader show />}>
          <SingleAlbum {...routeProps} />
        </Suspense>
      )}
    />

    <Route
      path="/404"
      render={routeProps => (
        <Suspense fallback={<Loader show />}>
          <ErrorPage {...routeProps} />
        </Suspense>
      )}
    />

    <Route render={routeProps => <Redirect to="/404" {...routeProps} />} />
  </Switch>
);

export default User;
