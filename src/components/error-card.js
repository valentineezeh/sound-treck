import React from "react";
import PropTypes from "prop-types";

export const ErrorCard = props => {
  const { error } = props;
  return (
    <div className="alert alert-danger" role="alert">
      <button type="button" className="close" onClick={props.onClose}>
        <span aria-hidden="true">&times;</span>
      </button>
      <strong>{error}</strong>
    </div>
  );
};

ErrorCard.propTypes = {
  error: PropTypes.string,
  onClose: PropTypes.func
};
