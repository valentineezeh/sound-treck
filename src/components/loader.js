import React from "react";
import loaderSvg from "assets/img/svg/loader.svg";

export const Loader = () => (
  <div className="loader">
    <img src={loaderSvg} className="loader-image" alt="loading" />
  </div>
);
