import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import isEmpty from "is-empty";
import Loader from "react-loader-spinner";
import { Button, Modal, ModalHeader, ModalBody } from "reactstrap";
import Dropzone from "react-dropzone";
import { ErrorAlertNotification, ErrorCard, FormInput } from "components";
import { connect, useDispatch } from "react-redux";
import {
  setSongToBePlayed,
  pauseSong,
  deleteUploadSongErrorMessages
} from "store/actions";
import { _isObjectEmpty, _updateObject, _isInputValid } from "utils";
import {
  deletePostUserSongError,
  deleteUploadSongCoverArtError,
  uploadUserSong,
  uploadUserSongCover,
  updateUserSong,
  getMusicianSongs,
  deleteSongInAlbum,
  updateUserSongInAlbum,
  uploadUpdatedSongInAlbum,
  deleteUploadUpdatedSongInAlbumError,
  uploadUpdatedSongCoverInAlbum,
  deleteUploadUpdatedSongCoverInAlbumError
} from "store/actions";
import useEventListener from "services/useEventListener";
import { deleteSongHandler } from "store/actions/musician";
import { ReactComponent as SoundWave } from "assets/img/svg/sound-waves.svg";

const MusicItem = props => {
  const audioRef = React.createRef();
  const [playTime, setPlayTime] = useState({});
  const [duration, setDuration] = useState("");
  const [songUrl, setSongUrl] = useState("");
  const [updateSongCoverArt, setUpdateSongCoverArt] = useState(props);
  const [updateSongInAlbum, setUpdateSongInAlbum] = useState(props);
  const [currentTime, setCurrentTime] = useState(0);
  const dispatch = useDispatch();
  const [isMobile, setIsMobile] = useState(false);
  const [updateSongModal, setUpdateSongModal] = useState(false);
  const [userSong, setSong] = useState({
    title: "",
    music: {},
    coverArt: {}
  });
  const [errors, setErrors] = useState([]);
  const [modalType, setModalType] = useState("");

  const role =
    props.user === null || props.user === undefined ? "" : props.user.role;
  const creator =
    props.user === null || props.user === undefined ? "" : props.user._id;

  const toggleSongUpdateUpload = type => {
    setModalType(type);
    setUpdateSongModal(!updateSongModal);
  };

  // delete error when error occurs during song upload
  const DeletePostUserSongError = () => {
    dispatch(deletePostUserSongError());
  };

  // delete error when error occurs during song cover art upload
  const DeleteUploadSongCoverArtError = () => {
    if (modalType === "album") {
      dispatch(deleteUploadUpdatedSongCoverInAlbumError());
    } else {
      dispatch(deleteUploadSongCoverArtError());
      setSong({ ...userSong, coverArt: "" });
    }
  };

  // delete error when error occurs during single song upload
  const DeleteUploadSongErrorMessages = () => {
    dispatch(deleteUploadSongErrorMessages());
    setSong({ ...userSong, music: "" });
  };

  // This method upload a single song
  const onUploadSong = e => {
    e.preventDefault();
    const { song, albumId } = props;

    let musicData;

    if (modalType === "album") {
      musicData = {
        albumId,
        albumSongId: song._id,
        title: userSong.title,
        role,
        creator,
        musicUrl: props.uploadUserAlbumSong || song.musicUrl,
        coverArtUrl: props.uploadUserAlbumCoverSong || song.coverArtUrl
      };
    } else {
      musicData = {
        albumId,
        albumSongId: song._id,
        title: userSong.title,
        role,
        creator,
        musicUrl: props.uploadedSong || song.musicUrl,
        coverArtUrl: props.uploadSongCoverArt || song.coverArtUrl
      };
    }

    // a condition that upload either a single song or a song in an album
    if (modalType !== "album") {
      dispatch(updateUserSong(musicData));
    } else {
      dispatch(updateUserSongInAlbum(musicData));
    }
  };

  const onClose = () => {
    setErrors([]);
  };

  const onDropSongCoverArt = songCoverArt => {
    // upload song cover to digital ocean space
    const maxSize = 2097152;
    const { song } = props;
    const getOldSongCoverContent = song.coverArtUrl.split("/")[3];

    if (songCoverArt.length !== 0 && songCoverArt[0].size < maxSize) {
      if (modalType === "album") {
        const songImagePayload = {
          getOldSongCoverContent,
          newSongCoverContent: songCoverArt[0]
        };
        dispatch(uploadUpdatedSongCoverInAlbum(songImagePayload));
      } else {
        dispatch(uploadUserSongCover(songCoverArt[0]));
      }
    }
  };

  const onDropSong = music => {
    // upload music to digital ocean space
    const maxSize = 10485760;

    const { song } = props;

    const getOldSongContent = song.musicUrl.split("/")[3];

    setSong({ ...userSong, music: music[0] });
    if (music.length !== 0 && music[0].size < maxSize) {
      if (modalType === "album") {
        const musicPayload = {
          getOldSongContent,
          newSongContent: music[0]
        };
        dispatch(uploadUpdatedSongInAlbum(musicPayload));
      } else {
        dispatch(uploadUserSong(music[0]));
      }
    }
  };

  const updateWindowDimensions = () => {
    setIsMobile(window.innerWidth <= 600);
  };

  useEventListener("resize", updateWindowDimensions);

  useEffect(() => {
    updateWindowDimensions();
  }, []);

  useEffect(() => {
    setUpdateSongCoverArt(props);
    setUpdateSongInAlbum(props);
  }, [props]);

  const convertElapsedTime = inputSeconds => {
    let seconds = Math.floor(inputSeconds % 60);
    if (seconds < 10) {
      seconds = `0${seconds}`;
    }

    const minutes = Math.floor(inputSeconds / 60);
    return `${minutes}:${seconds}`;
  };

  let au = document.createElement("audio");
  au.src = props.song.musicUrl;
  au.addEventListener("loadedmetadata", () => {
    const duration = convertElapsedTime(au.duration);
    setDuration(duration);
  });

  // method to handle ============================
  const handlePlaySong = songItem => {
    const audio = new Audio();
    audio.src = songItem.musicUrl;
    audio.load();
    //  audio.play();
    //  audio.pause();

    if (props.isPlaying && props.song._id === props.selectedSong._id) {
      // dispatch(pauseSong(currentTime));
      audio.pause();
    } else if (props.isPlaying && props.song._id !== props.selectedSong._id) {
      dispatch(setSongToBePlayed(songItem));
      setSongUrl(songItem.musicUrl);
      props.selectSong(songItem);
    } else {
      dispatch(setSongToBePlayed(songItem));
      setSongUrl(songItem.musicUrl);
      props.selectSong(songItem);
    }
  };

  const onDeleteSongHandler = songId => {
    dispatch(deleteSongHandler(songId));
  };

  const onDeleteSongInAlbumHandler = songId => {
    dispatch(deleteSongInAlbum(songId));
  };

  const DeleteUploadUpdatedSongInAlbumError = () => {
    dispatch(deleteUploadUpdatedSongInAlbumError());
  };

  const delayReload = () => {
    window.location.reload();
  };

  const { song } = props;
  const loginUserId = localStorage.getItem("currentUser");
  const checkUserId = song.creator._id;

  if (props.updateSongIsSuccess) {
    setTimeout(delayReload, 2000);
  }

  if (props.updatedSongInAlbumSuccess) {
    setTimeout(delayReload, 2000);
  }

  if (isMobile) {
    return (
      <div
        className={classnames("music-item", {
          active:
            !_isObjectEmpty(props.selectedSong) &&
            props.song._id === props.selectedSong._id
        })}
        onClick={() => handlePlaySong(props.song)}
      >
        <div className="avatar">
          <img
            src={props.song.coverArtUrl}
            alt={props.song.title}
            className="avatar-image"
          />
          <div className="music-item__overlay">
            <i
              className={`far music-item__icon ${
                props.isPlaying &&
                !_isObjectEmpty(props.selectedSong) &&
                props.song._id === props.selectedSong._id
                  ? "fas fa-volume-up"
                  : "fa-play-circle"
              }`}
            ></i>
          </div>
        </div>
        <div className="music-item-list-details">
          <p className="music-item__title">{props.song.title}</p>
          <p className="music-item__text">{props.song.creator.fullName}</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <tr>
        <td
          className={classnames("music-item", {
            active:
              !_isObjectEmpty(props.selectedSong) &&
              props.song._id === props.selectedSong._id
          })}
          onClick={() => handlePlaySong(props.song)}
        >
          <div className="avatar">
            <img
              src={props.song.coverArtUrl}
              alt={props.song.title}
              className="avatar-image"
            />
            <div className="music-item__overlay">
              <i
                className={`far music-item__icon ${
                  props.isPlaying &&
                  !_isObjectEmpty(props.selectedSong) &&
                  props.song._id === props.selectedSong._id
                    ? "fas fa-volume-up"
                    : "fa-play-circle"
                }`}
              ></i>
            </div>
          </div>
        </td>
        <td>
          <p className="music-item__title">{props.song.title}</p>
        </td>
        {!props.minify && !props.noArtist ? (
          <td>
            <p className="music-item__text">{props.song.creator.fullName}</p>
          </td>
        ) : null}
        <td>
          <p className="music-item__text">
            {props.albumTitle || "Single Song"}
          </p>
        </td>
        {!props.minify ? (
          <td>
            <p className="music-item__text">{duration}</p>
          </td>
        ) : null}
        {!props.minify && props.songType === "single" ? (
          <td>
            {checkUserId === loginUserId ? (
              <div className="row md-4">
                <i
                  className="fa fa-trash"
                  aria-hidden="true"
                  onClick={() => onDeleteSongHandler(song._id)}
                  id="user-action"
                />
                &nbsp; &nbsp; &nbsp;
                <i
                  className="fa fa-edit"
                  id="user-action"
                  onClick={() => toggleSongUpdateUpload("singleSong")}
                />
              </div>
            ) : null}
          </td>
        ) : null}
        {!props.minify && props.songType === "album" ? (
          <td>
            {checkUserId === loginUserId ? (
              <div className="row md-4">
                <i
                  className="fa fa-trash"
                  aria-hidden="true"
                  onClick={() => onDeleteSongInAlbumHandler(song._id)}
                  id="user-action"
                />
                &nbsp; &nbsp; &nbsp;
                <i
                  className="fa fa-edit"
                  id="user-action"
                  onClick={() => toggleSongUpdateUpload("album")}
                />
              </div>
            ) : null}
          </td>
        ) : null}
      </tr>
      <Modal
        isOpen={updateSongModal}
        toggle={toggleSongUpdateUpload}
        centered
        className="upload-modal"
      >
        <ModalHeader toggle={toggleSongUpdateUpload}>
          Update Your Song
        </ModalHeader>
        <ModalBody>
          <div onSubmit={onUploadSong}>
            <div className="row">
              {errors.length ? (
                <div className="col-12">
                  <ErrorCard error={errors[0]} onClose={onClose} />
                </div>
              ) : null}

              {props.newSongError && (
                <ErrorAlertNotification
                  errors={props.newSongError}
                  onClick={DeletePostUserSongError}
                />
              )}

              <div className="col-12">
                <FormInput
                  isRequired={true}
                  type="text"
                  label="Title"
                  value={userSong.title || song.title}
                  onChange={e =>
                    setSong(_updateObject(userSong, { title: e.target.value }))
                  }
                  placeholder=""
                  className={classnames({
                    "is-invalid": _isInputValid("title")
                  })}
                />
              </div>

              <div className="col-12">
                <Dropzone
                  onDrop={onDropSongCoverArt}
                  accept="image/png, image/jpeg"
                  maxSize={2097152}
                >
                  {({
                    getRootProps,
                    getInputProps,
                    isDragActive,
                    rejectedFiles
                  }) => {
                    const maxSize = 2097152; //31457280
                    const isFileTooLarge =
                      rejectedFiles.length > 0 &&
                      rejectedFiles[0].size > maxSize;
                    let errorMsg =
                      "This file is too large. Required File is 2MB";
                    return (
                      <>
                        {isDragActive ? (errorMsg = "") : null}
                        {isFileTooLarge && (
                          <div className="text-danger mt-2">{errorMsg}</div>
                        )}
                        {props.uploadSongCoverArtError ||
                        props.uploadUserAlbumSongCoverError ? (
                          <ErrorAlertNotification
                            errors={
                              props.uploadSongCoverArtError ||
                              props.uploadUserAlbumSongCoverError
                            }
                            onClick={DeleteUploadSongCoverArtError}
                          />
                        ) : null}
                        <div {...getRootProps({ className: "dropzone" })}>
                          <input
                            {...getInputProps()}
                            type="file"
                            onChange={e => {
                              setSong({
                                ...song,
                                coverArt: e.target.files[0]
                              });
                              onDropSongCoverArt(e.target.files);
                            }}
                          />
                          {props.uploadSongCoverArtIsLoading ||
                          props.uploadUserAlbumSongCoverIsLoading ? (
                            <div className="col-12 justify-content-center">
                              <div className="text-center mr-5">
                                <Loader
                                  type="Circles"
                                  color="#d3ae3b"
                                  height={100}
                                  width={100}
                                />
                              </div>
                            </div>
                          ) : props.uploadSongCoverArt ||
                            props.uploadUserAlbumCoverSong ? (
                            <img
                              src={
                                props.uploadSongCoverArt ||
                                props.uploadUserAlbumCoverSong
                              }
                              alt=""
                              style={{
                                height: "100px",
                                width: "150px"
                              }}
                            />
                          ) : !isEmpty(song.coverArt) ? (
                            <p className="file__item">
                              {song.coverArt.name} - {song.coverArt.size} bytes
                            </p>
                          ) : (
                            "Drag n drop some files here, or click to upload a song cover art. Required size is 2MB"
                          )}
                        </div>
                      </>
                    );
                  }}
                </Dropzone>
              </div>

              <div className="col-12">
                <Dropzone
                  onDrop={onDropSong}
                  accept="audio/mp3, audio/wav"
                  maxSize={10485760}
                >
                  {({
                    getRootProps,
                    getInputProps,
                    isDragActive,
                    rejectedFiles
                  }) => {
                    const maxSize = 10485760;
                    const isFileTooLarge =
                      rejectedFiles.length > 0 &&
                      rejectedFiles[0].size > maxSize;
                    let errorMsg =
                      "This file is too large. Required size is 10MB";
                    return (
                      <>
                        {isDragActive ? (errorMsg = "") : null}
                        {isFileTooLarge && (
                          <div className="text-danger mt-2">{errorMsg}</div>
                        )}

                        {props.uploadSongError ||
                          (props.uploadUserAlbumSongError && (
                            <ErrorAlertNotification
                              errors={
                                props.uploadSongError ||
                                props.uploadUserAlbumSongError
                              }
                              onClick={
                                props.uploadSongError
                                  ? DeleteUploadSongErrorMessages
                                  : DeleteUploadUpdatedSongInAlbumError
                              }
                            />
                          ))}
                        <div {...getRootProps({ className: "dropzone" })}>
                          <input
                            {...getInputProps()}
                            onChange={e => {
                              setSong({
                                ...song,
                                music: e.target.files[0]
                              });
                              onDropSong(e.target.files);
                            }}
                          />
                          {props.uploadSongLoading ||
                          props.uploadUserAlbumSongIsLoading ? (
                            <div className="col-12 justify-content-center">
                              <div className="text-center mr-5">
                                <Loader
                                  type="Circles"
                                  color="#d3ae3b"
                                  height={100}
                                  width={100}
                                />
                              </div>
                            </div>
                          ) : props.uploadedSong ||
                            props.uploadUserAlbumSong ? (
                            <p className="file__item">
                              Song upload was successful
                            </p>
                          ) : !isEmpty(song.music) ? (
                            <p className="file__item">
                              {song.music.name} - {song.music.size} bytes
                            </p>
                          ) : (
                            "Drag n drop some files here, or click to upload a song mp3/wa formats. Required size is 10MB"
                          )}
                        </div>
                      </>
                    );
                  }}
                </Dropzone>
              </div>

              <div className="col-12">
                <div className="form__button">
                  <Button
                    type="submit"
                    block
                    className="btn btn--primary"
                    onClick={onUploadSong}
                    // disabled={user.isDisabled ? true : false}
                  >
                    {props.updatedSongIsLoading ||
                    props.updatedSongInAlbumIsLoading ? (
                      <i className="fa fa-spinner fa-spin" />
                    ) : null}
                    {"  "}
                    Update Song
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </ModalBody>
      </Modal>
    </>
  );
};

const mapStateToProps = state => ({
  currentTrack: state.musicPlayer.currentTrack,
  isPlaying: state.musicPlayer.isPlaying,
  currentTime: state.musicPlayer.currentTime,
  auth: state.loginReducer.isAuthenticated,
  user: state.musician.profile,
  deleteSongIsLoading: state.musician.deleteSongLoading,
  uploadedSong: state.userMusicUploader.musicUrl,
  uploadSongCoverArt: state.userSongCoverArt.coverArtUrl,
  uploadSongCoverArtIsLoading: state.userSongCoverArt.coverArtIsLoading,
  uploadSongLoading: state.userMusicUploader.isLoading,
  newSongIsLoading: state.postNewSong.newSongIsLoading,
  newSongError: state.postNewSong.error,
  uploadSongCoverArtError: state.userSongCoverArt.error,
  uploadSongError: state.userMusicUploader.error,
  updateSongIsSuccess: state.updateSongByUser.updatedSongSuccess,
  updatedSongIsLoading: state.updateSongByUser.updatedSongIsLoading,

  updatedSongError: state.updateSongByUser.error,
  updatedSongInAlbumSuccess:
    state.updateSongInAlbumByUser.updatedSongInAlbumSuccess,
  updatedSongInAlbumIsLoading:
    state.updateSongInAlbumByUser.updatedSongInAlbumIsLoading,

  uploadUserAlbumSong: state.updateSongInAlbumByUser.uploadUserAlbumSong,
  uploadUserAlbumSongError:
    state.updateSongInAlbumByUser.uploadUserAlbumSongError,
  uploadUserAlbumSongIsLoading:
    state.updateSongInAlbumByUser.uploadUserAlbumSongIsLoading,
  updatedSongInAlbum: state.updateSongInAlbumByUser.updatedSongInAlbum,

  uploadUserAlbumCoverSong:
    state.updateSongInAlbumByUser.uploadUserAlbumCoverSong,
  uploadUserAlbumSongCoverSuccess:
    state.updateSongInAlbumByUser.uploadUserAlbumSongCoverSuccess,
  uploadUserAlbumSongCoverError:
    state.updateSongInAlbumByUser.uploadUserAlbumSongCoverError,
  uploadUserAlbumSongCoverIsLoading:
    state.updateSongInAlbumByUser.uploadUserAlbumSongCoverIsLoading
});

MusicItem.propTypes = {
  index: PropTypes.number,
  isPlaying: PropTypes.bool,
  selectSong: PropTypes.func,
  minify: PropTypes.bool,
  noArtist: PropTypes.bool,
  song: PropTypes.object,
  selectedSong: PropTypes.object,
  artist: PropTypes.string,
  albumTitle: PropTypes.string,
  auth: PropTypes.bool,
  songType: PropTypes.string,
  deleteSongIsLoading: PropTypes.bool,
  user: PropTypes.object,
  uploadSongCoverArtIsLoading: PropTypes.bool,
  uploadSongCoverArt: PropTypes.string,
  uploadSongLoading: PropTypes.bool,
  uploadedSong: PropTypes.string,
  newSongIsLoading: PropTypes.bool,
  newSongError: PropTypes.string,
  uploadSongCoverArtError: PropTypes.string,
  uploadSongError: PropTypes.string,
  updateSongIsSuccess: PropTypes.bool,
  updatedSongIsLoading: PropTypes.bool,
  albumId: PropTypes.string,
  updatedSongInAlbumSuccess: PropTypes.bool,
  updatedSongInAlbumIsLoading: PropTypes.bool,
  uploadUserAlbumSongIsLoading: PropTypes.bool,
  uploadUserAlbumCoverSong: PropTypes.string,
  uploadUserAlbumSongError: PropTypes.string,
  uploadUserAlbumSongCoverIsLoading: PropTypes.bool,
  uploadUserAlbumSong: PropTypes.string,
  uploadUserAlbumSongCoverError: PropTypes.string
};

export default connect(mapStateToProps)(MusicItem);
