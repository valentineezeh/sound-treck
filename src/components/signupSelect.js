import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Signup from "pages/auth/Signup";
import fan from "assets/img/fan.jpg";
import artist from "assets/img/musician.jpg";
import getUserRole from "../store/actions/selectRole";

export class SignupSelect extends React.Component {
  onClickRoleCard = userOption => {
    const { getUserRole } = this.props;
    getUserRole(userOption);
  };

  render() {
    const { userRole, success } = this.props.getUserRolePayLoad;

    if (success) {
      return <Signup userRole={userRole} />;
    }
    const signUpSelect = (
      <div className="signup__select">
        <div className="container">
          <div className="signup__select-header">
            <h3 className="signup__select-heading">
              What do you want to join the team as?
            </h3>

            <p className="paragraph">
              Or you already have an account?{" "}
              <a href="/login" className="signup__link">
                Login
              </a>
            </p>
          </div>

          <div className="row">
            <div className="col-md-5">
              <div
                className="signup__card"
                onClick={() => this.onClickRoleCard("fan")}
              >
                <div
                  className="signup__card--top"
                  style={{ backgroundImage: `url(${fan})` }}
                ></div>
                <p className="signup__card--bottom">Fan</p>
              </div>
            </div>

            <div className="signup__divider"></div>

            <div className="col-md-5">
              <div
                className="signup__card"
                onClick={() => this.onClickRoleCard("musician")}
              >
                <div
                  className="signup__card--top"
                  style={{ backgroundImage: `url(${artist})` }}
                ></div>
                <p className="signup__card--bottom">Musician</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
    return <>{signUpSelect}</>;
  }
}

SignupSelect.propTypes = {
  getUserRole: PropTypes.func,
  role: PropTypes.string,
  getUserRolePayLoad: PropTypes.shape({
    userRole: PropTypes.any,
    success: PropTypes.bool
  })
};

const mapStateToProps = state => ({
  getUserRolePayLoad: state.getUserRole
});

export default connect(
  mapStateToProps,
  {
    getUserRole
  }
)(SignupSelect);
