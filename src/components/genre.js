import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { _isObjectEmpty } from "utils";

export const GenreItem = props => {
  const [item, setItem] = useState({ image: "", title: "" });

  useEffect(() => {
    if (!_isObjectEmpty(props.item)) {
      setItem(props.item);
    }
  }, [props.item, item]);

  return (
    <Link to={props.page} className="genre">
      <div
        className="genre__image"
        style={{
          backgroundImage: `url('${item.image}')`
        }}
      >
        <div className="genre__image--overlay" style={props.extraStyle}>
          <p className="genre__title">{item.title}</p>
        </div>
      </div>
    </Link>
  );
};

GenreItem.propTypes = {
  extraStyle: PropTypes.object,
  item: PropTypes.object,
  page: PropTypes.string
};

GenreItem.defaultProps = {
  page: ""
};
