import React, { useState } from "react";
import PropTypes from "prop-types";
import datetime from "node-datetime";
import { useDispatch } from "react-redux";
import classnames from "classnames";
import { Button, Modal, ModalHeader, ModalBody } from "reactstrap";
import Loader from "react-loader-spinner";
import isEmpty from "is-empty";
import Dropzone from "react-dropzone";
import { Link } from "react-router-dom";
import { MusicList } from "./musicList";
import { deleteAlbumHandler } from "store/actions/albums";
import { ErrorAlertNotification, ErrorCard, FormInput } from "components";
import { _isObjectEmpty, _updateObject, _isInputValid } from "utils";
import {
  uploadUserAlbumCover,
  deleteUploadAlbumCoverArtError,
  updateAlbumTitleAndCover,
  deleteUpdateAlbumTitleAndCoverError
} from "store/actions";

export const AlbumItem = props => {
  const [selectedSong, setSelectedSong] = useState({ id: "" });
  const [errors, setErrors] = useState([]);
  const [userSong, setSong] = useState({
    title: "",
    music: {},
    coverArt: {}
  });
  const [userAlbum, setAlbum] = useState({
    title: "",
    coverArt: "",
    albumArt: "",
    music: "",
    songTitle: "",
    songs: [],
    checkSongInput: false,
    checkSongImgInput: false,
    checkSongFileInput: false,
    titleDisable: false,
    albumCoverDisable: false
  });

  const dispatch = useDispatch();
  const selectSong = e => {
    setSelectedSong(e);
  };

  const [uploadUpdateAlbumModal, setUploadUpdateAlbumModal] = useState(false);

  const [deleteAlbumModal, setDeleteAlbumModal] = useState(false);

  const toggleUpdateUploadAlbum = () => {
    setUploadUpdateAlbumModal(!uploadUpdateAlbumModal);
  };

  const toggleDeleteAlbumModal = () => {
    setDeleteAlbumModal(!deleteAlbumModal);
  };

  const onClose = () => {
    setErrors([]);
  };

  const onDeleteAlbum = albumId => {
    dispatch(deleteAlbumHandler(albumId));
    // setDeleteAlbumModal(false)
  };

  // This endpoint upload an artist album
  const onUploadAlbumTitleAndCover = e => {
    e.preventDefault();
    const { title } = userAlbum;
    const { uploadAlbumArt, album } = props;
    const payload = {
      albumId: props.album._id,
      title: title || album.title,
      albumCoverUrl: uploadAlbumArt || album.albumCoverUrl
    };
    // dispatch an action
    dispatch(updateAlbumTitleAndCover(payload));
  };

  const onDropAlbumCoverArt = albumCoverArt => {
    const maxSize = 2097152;
    if (albumCoverArt.length !== 0 && albumCoverArt[0].size < maxSize) {
      dispatch(uploadUserAlbumCover(albumCoverArt[0]));
    }
  };

  const updateTitleDisable = () => {
    setAlbum({
      ...userAlbum,
      titleDisable: false
    });
  };

  const DeleteUploadAlbumCoverArtError = () => {
    dispatch(deleteUploadAlbumCoverArtError());
    setSong({ ...userSong, albumArt: "" });
  };

  const DeleteUpdateAlbumTitleAndCoverError = () => {
    dispatch(deleteUpdateAlbumTitleAndCoverError());
  };

  const { titleDisable, albumCoverDisable } = userAlbum;

  const {
    updateAlbumTitleAndCoverIsLoading,
    updateAlbumTitleAndCoverError,
    uploadAlbumArtError
  } = props;

  if (!_isObjectEmpty(props.album)) {
    return (
      <>
        <div className="album-item">
          <div className="album-item__header">
            <div className="avatar">
              <img
                src={props.album.albumCoverUrl}
                alt={props.album.title}
                className="avatar__image"
              />
            </div>

            <div className="album-item__details">
              <div>
                <p className="paragraph album-item__date">
                  {datetime.create(props.album.createdAt).format("m/d/y") ||
                    2019}
                </p>
                <div className="row">
                  <h3 className="album-item__title">
                    <Link to={`/user/${props.userId}/album/${props.album._id}`}>
                      {props.album.title}
                    </Link>
                  </h3>
                  &nbsp; &nbsp;
                  {props.creatorId === props.loginUserId ? (
                    <i
                      className="fa fa-edit mr-2 mt-1"
                      onClick={() => toggleUpdateUploadAlbum()}
                      style={{ cursor: "pointer" }}
                    />
                  ) : null}
                </div>

                {!props.noArtist ? (
                  <p className="paragraph album-item__date">
                    {props.album.artist}
                  </p>
                ) : null}
              </div>

              <div className="row">
                <button className="btn btn--primary">
                  <i className="fa fa-play mr-2"></i> play
                </button>
                &nbsp; &nbsp; &nbsp;
                {props.creatorId === props.loginUserId ? (
                  <button
                    className="btn btn--danger"
                    onClick={() => toggleDeleteAlbumModal()}
                  >
                    <i className="fa fa-trash mr-2" />
                    delete
                  </button>
                ) : null}
              </div>
            </div>
          </div>

          <div className="album-item__body">
            <MusicList
              songs={props.album.album}
              albumTitle={props.album.title}
              albumId={props.album._id}
              artist={props.album.creator.fullName}
              selectedSong={selectedSong}
              selectSong={e => selectSong(e)}
              songType={props.songType}
            />
          </div>
        </div>
        {/* ----------------------------------------------------------------------- */}
        <Modal
          isOpen={uploadUpdateAlbumModal}
          toggle={toggleUpdateUploadAlbum}
          centered
          className="upload-modal"
        >
          <ModalHeader toggle={toggleUpdateUploadAlbum}>Edit Album</ModalHeader>
          <ModalBody>
            <div>
              <div className="row">
                {errors.length ? (
                  <div className="col-12">
                    <ErrorCard error={errors[0]} onClose={onClose} />
                  </div>
                ) : null}

                {updateAlbumTitleAndCoverError && (
                  <ErrorAlertNotification
                    errors={updateAlbumTitleAndCoverError}
                    onClick={DeleteUpdateAlbumTitleAndCoverError}
                  />
                )}

                <div className="col-12">
                  <FormInput
                    isRequired={true}
                    type="text"
                    label="Album Title"
                    value={
                      !userAlbum.title ? props.album.title : userAlbum.title
                    }
                    isDisabled={titleDisable}
                    onChange={e =>
                      setAlbum(
                        _updateObject(userAlbum, { title: e.target.value })
                      )
                    }
                    onClick={updateTitleDisable}
                    placeholder=""
                    className={classnames({
                      "is-invalid": _isInputValid("title")
                    })}
                    edit={true}
                  />
                </div>

                <div className="col-12">
                  {albumCoverDisable ? (
                    ""
                  ) : (
                    <Dropzone
                      onDrop={onDropAlbumCoverArt}
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
                          "This file is too large. Required size is 2MB";
                        return (
                          <>
                            {isDragActive ? (errorMsg = "") : null}
                            {isFileTooLarge && (
                              <div className="text-danger mt-2">{errorMsg}</div>
                            )}
                            {uploadAlbumArtError && (
                              <ErrorAlertNotification
                                errors={uploadAlbumArtError}
                                onClick={DeleteUploadAlbumCoverArtError}
                              />
                            )}
                            <div {...getRootProps({ className: "dropzone" })}>
                              <input
                                {...getInputProps()}
                                type="file"
                                onChange={e => {
                                  setAlbum({
                                    ...userAlbum,
                                    albumArt: e.target.files[0]
                                  });
                                  onDropAlbumCoverArt(e.target.files);
                                }}
                              />
                              {props.albumCoverArtIsLoading ? (
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
                              ) : props.uploadAlbumArt ? (
                                <img
                                  src={
                                    userAlbum.checkSongImgInput
                                      ? "Drag n drop some files here, or click to upload a song cover art. Required size is 2MB"
                                      : props.uploadAlbumArt
                                  }
                                  alt=""
                                  style={{
                                    height: "100px",
                                    width: "150px"
                                  }}
                                />
                              ) : !isEmpty(userAlbum.albumArt) ? (
                                <p className="file__item">
                                  {userAlbum.albumArt.name} -{" "}
                                  {userAlbum.albumArt.size} bytes
                                </p>
                              ) : (
                                "Drag n drop some files here, or click to upload an ALBUM cover art. Required size is 2MB"
                              )}
                            </div>
                          </>
                        );
                      }}
                    </Dropzone>
                  )}
                </div>
                <div className="col-12">
                  <div className="form__button">
                    <Button
                      className="btn btn--primary"
                      onClick={onUploadAlbumTitleAndCover}
                    >
                      {updateAlbumTitleAndCoverIsLoading ? (
                        <>
                          <i className="fa fa-spinner fa-spin" />
                          {"  "}
                        </>
                      ) : null}
                      Update Album
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </ModalBody>
        </Modal>

        {/* ------------------------------------------------------------------ */}
        <Modal
          isOpen={deleteAlbumModal}
          toggle={toggleDeleteAlbumModal}
          centered
          className="upload-modal"
        >
          <ModalHeader toggle={toggleDeleteAlbumModal}>
            Warning Alert
          </ModalHeader>
          <ModalBody>
            <div className="col-12 text-center">
              <span className="music-player-empty-playlist">
                You are about to delete this album to confirm click the button
                below
              </span>
              <br />

              <div className="form__button mt-5">
                <Button
                  type="submit"
                  block
                  className="btn btn--primary"
                  onClick={() => onDeleteAlbum(props.album._id)}
                >
                  {props.deleteLoading ? (
                    <i className="fa fa-spinner fa-spin mr-2" />
                  ) : (
                    <i className="fa fa-trash mr-2" />
                  )}
                  Delete Album
                </Button>
              </div>
            </div>
          </ModalBody>
        </Modal>
      </>
    );
  }

  return <div></div>;
};

AlbumItem.propTypes = {
  album: PropTypes.object,
  noArtist: PropTypes.bool,
  userId: PropTypes.string,
  loginUserId: PropTypes.string,
  creatorId: PropTypes.string,
  songType: PropTypes.string,
  deleteLoading: PropTypes.bool,
  user: PropTypes.object,
  albumCoverArtIsLoading: PropTypes.bool,
  uploadAlbumArt: PropTypes.string,
  uploadAlbumArtError: PropTypes.string,
  updateAlbumTitleAndCoverIsLoading: PropTypes.bool,
  updateAlbumTitleAndCoverError: PropTypes.string
};

AlbumItem.defaultProps = {
  noArtist: false
};
