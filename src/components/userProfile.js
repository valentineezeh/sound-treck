import React from "react";
// import { _isArrayEmpty } from 'utils';
import PropTypes from "prop-types";
import Loader from "react-loader-spinner";

export const UserProfile = ({ user, musicianLoader }) => {
  const checkUserRole = user.role === undefined ? "" : user.role._id;
  return (
    <div className="card">
      {musicianLoader ? (
        <div className="col-12 justify-content-center">
          <div className="text-center mr-5">
            <Loader type="Circles" color="#d3ae3b" height="100" width="100" />
          </div>
        </div>
      ) : (
        <>
          <div className="card-row">
            <div className="card__col card__col--left">
              <p className="card__text card__text--small font-bold">BIO</p>
            </div>
            <div className="card__col card__col--right">
              <p className="card__text">{user.bio || "N/A"}</p>
            </div>
          </div>

          <div className="card-row">
            <div className="card__col card__col--left">
              <p className="card__text card__text--small font-bold">EMAIL</p>
            </div>
            <div className="card__col card__col--right">
              <p className="card__text">{user.email || "N/A"}</p>
            </div>
          </div>

          <div className="card-row">
            <div className="card__col card__col--left">
              <p className="card__text card__text--small font-bold">LOCATION</p>
            </div>
            <div className="card__col card__col--right">
              <p className="card__text">{user.state || "N/A"}</p>
            </div>
          </div>

          <div className="card-row">
            <div className="card__col card__col--left">
              <p className="card__text card__text--small font-bold">PHONE</p>
            </div>
            <div className="card__col card__col--right">
              <p className="card__text">{user.phoneNumber || "N/A"}</p>
            </div>
          </div>

          {checkUserRole === "5e24cb7cb027421dd992c3c7" ? null : (
            <div className="card-row">
              <div className="card__col card__col--left">
                <p className="card__text card__text--small font-bold">
                  BOOKING DETAILS
                </p>
              </div>
              <div className="card__col card__col--right">
                <p className="card__text">{user.bookingDetails || "N/A"}</p>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

UserProfile.propTypes = {
  user: PropTypes.object,
  musicianLoader: PropTypes.bool
};
