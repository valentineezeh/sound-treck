import React, { lazy, Suspense } from "react";
import { Switch, Route } from "react-router-dom";
import { Loader } from "components";

const Dashboard = lazy(() => import("./Dashboard"));
const Albums = lazy(() => import("./Albums"));
const Artists = lazy(() => import("./Artists"));
const Genre = lazy(() => import("./Genre"));
const Songs = lazy(() => import("./Songs"));

const Guest = () => (
  <Switch>
    <Route
      exact
      path="/magic"
      render={routeProps => (
        <Suspense fallback={<Loader hide />}>
          <Dashboard {...routeProps} />
        </Suspense>
      )}
    />

    <Route
      exact
      path="/magic/albums"
      render={routeProps => (
        <Suspense fallback={<Loader hide />}>
          <Albums {...routeProps} />
        </Suspense>
      )}
    />

    <Route
      exact
      path="/magic/artists"
      render={routeProps => (
        <Suspense fallback={<Loader show />}>
          <Artists {...routeProps} />
        </Suspense>
      )}
    />

    <Route
      exact
      path="/magic/songs"
      render={routeProps => (
        <Suspense fallback={<Loader show />}>
          <Songs {...routeProps} />
        </Suspense>
      )}
    />

    <Route
      exact
      path="/magic/genres"
      render={routeProps => (
        <Suspense fallback={<Loader show />}>
          <Genre {...routeProps} />
        </Suspense>
      )}
    />
  </Switch>
);

export default Guest;
