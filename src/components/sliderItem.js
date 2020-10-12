import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import playButton from "assets/img/svg/play.svg";
import { Link } from "react-router-dom";
import toastr from "toastr";
import { _isObjectEmpty, _formatCharLength } from "utils";
import { connect, useDispatch } from "react-redux";
import { setPlaylist, setSongToBePlayed } from "store/actions";
import defaultImg from "assets/img/avatar.png";

const SliderItem = props => {
  const [item, setItem] = useState({ image: "", title: "", artist: "" });

  const dispatch = useDispatch();

  useEffect(() => {
    if (!_isObjectEmpty(props.item)) {
      setItem(props.item);
    }
  }, [props.item, item]);

  const handlePlaySong = () => {
    if (props.type === "album") {
      dispatch(setPlaylist(item.album));
      dispatch(setSongToBePlayed(item.album[0]));
    } else {
      dispatch(setSongToBePlayed(item));
    }
  };

  const showToast = () => {
    toastr.info("You need to login to access this page.");
  };

  const albumOwnerId =
    props.type === "album" ? (!item.creator ? "" : item.creator._id) : null;

  const songOwerId =
    props.type === "song" ? (!item.creator ? "" : item.creator._id) : null;

  const { userAuth } = props;

  const creatorName = !item.creator ? "" : item.creator.fullName;

  return (
    <div className={`slider-item ${props.extraClass || ""}`}>
      {props.type === "album" ? (
        <>
          <div
            className="slider-item__image"
            style={{
              backgroundImage: `url('${item.albumCoverUrl}')`
            }}
          >
            {!props.noArtist ? (
              <div className="slider-item__image--overlay">
                <span className="slider-item__button">
                  <Link to={`/magic/album/${item._id}`}>
                    <img className="img-fluid" src={playButton} alt="play" />
                  </Link>
                </span>
              </div>
            ) : null}
          </div>
          <div className="slider-item__details">
            <Link
              to={props.page || `/magic/album/${item._id}`}
              className="slider-item__title"
            >
              {_formatCharLength(item.title, 24)}
            </Link>
            {!props.noArtist ? (
              <p className="slider-item__artist">
                {userAuth ? (
                  <a href={`/user/${albumOwnerId}`}>{creatorName}</a>
                ) : (
                  <p onClick={showToast}>{creatorName}</p>
                )}
              </p>
            ) : null}
          </div>
        </>
      ) : null}
      {props.type === "song" ? (
        <>
          <div
            className="slider-item__image"
            style={{
              backgroundImage: `url('${item.coverArtUrl}')`
            }}
          >
            {!props.noArtist ? (
              <div className="slider-item__image--overlay">
                <span
                  className="slider-item__button"
                  onClick={() => handlePlaySong()}
                >
                  <img className="img-fluid" src={playButton} alt="play" />
                </span>
              </div>
            ) : null}
          </div>
          <div className="slider-item__details">
            <span className="slider-item__title">
              {_formatCharLength(item.title, 24)}
            </span>
            {!props.noArtist && userAuth ? (
              <p className="slider-item__artist">
                <a href={`/user/${songOwerId}`}>{creatorName}</a>
              </p>
            ) : (
              <p onClick={showToast} className="slider-item__artist">
                {creatorName}
              </p>
            )}
          </div>
        </>
      ) : null}

      {props.type === "home" ? (
        <>
          <div
            className="slider-item__image"
            style={{
              backgroundImage: `url('${item.coverArtUrl}')`
            }}
          >
            {!props.noArtist ? (
              <div className="slider-item__image--overlay">
                <span
                  className="slider-item__button"
                  onClick={() => handlePlaySong()}
                >
                  <img className="img-fluid" src={playButton} alt="play" />
                </span>
              </div>
            ) : null}
          </div>
          <div className="slider-item__details">
            <Link to={`/magic`} className="slider-item__title">
              {item.title}
            </Link>
            {!props.noArtist ? (
              <p className="slider-item__artist">{creatorName}</p>
            ) : null}
          </div>
        </>
      ) : null}

      {props.type === "artist" ? (
        <>
          <div
            className="slider-item__image"
            style={{
              backgroundImage: `url('${item.coverPicture || defaultImg}')`
            }}
          >
            {!props.noArtist ? (
              <div className="slider-item__image--overlay">
                <span
                  className="slider-item__button"
                  onClick={() => handlePlaySong()}
                >
                  <img className="img-fluid" src={playButton} alt="play" />
                </span>
              </div>
            ) : null}
          </div>
          <div className="slider-item__details">
            {userAuth ? (
              <Link
                to={props.page || `/user/${item._id}`}
                className="slider-item__title"
              >
                {item.title || item.fullName}
              </Link>
            ) : (
              <p onClick={showToast} className="slider-item__title">
                {item.title || item.fullName}
              </p>
            )}
            {!props.noArtist ? (
              <p className="slider-item__artist">
                {userAuth ? (
                  creatorName
                ) : (
                  <Link to={`/user/user-01`}>{creatorName}</Link>
                )}
              </p>
            ) : null}
          </div>
        </>
      ) : null}
    </div>
  );
};

SliderItem.propTypes = {
  extraClass: PropTypes.string,
  noArtist: PropTypes.bool,
  item: PropTypes.object,
  page: PropTypes.string,
  type: PropTypes.string,
  userAuth: PropTypes.bool
};

SliderItem.defaultProps = {
  noArtist: false,
  page: ""
};

const mapStateToProps = state => ({
  currentTrack: state.musicPlayer.currentTrack,
  userAuth: state.auth.isAuthenticated
});

export default connect(
  mapStateToProps,
  null
)(SliderItem);
