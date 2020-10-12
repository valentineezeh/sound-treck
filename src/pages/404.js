import React from "react";
import { Link } from "react-router-dom";
import Error from "assets/img/svg/404-image.svg";

const ErrorPage = () => (
  <div className="error">
    <div className="error__inner">
      <div className="error__content">
        <h3 className="error__heading">Just Chilling!</h3>
        <p className="error__desc">Oh! lost as well? hmmm....</p>
        <Link to="/" className="btn btn--primary">
          Let&apos;s go home
        </Link>
      </div>
      <div className="error__image">
        <img src={Error} className="img-fluid" alt="404" />
      </div>
    </div>
  </div>
);

export default ErrorPage;
