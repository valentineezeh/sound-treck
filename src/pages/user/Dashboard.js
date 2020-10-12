import React, { useCallback, useState, useEffect } from "react";
import PropTypes from "prop-types";
import Dropzone from "react-dropzone";
import { Link, Redirect } from "react-router-dom";
import classnames from "classnames";
import isEmpty from "is-empty";
import toastr from "toastr";
import Loader from "react-loader-spinner";
import { Button, Form, Modal, ModalHeader, ModalBody } from "reactstrap";
import {
  PageLayout,
  MusicList,
  AlbumItem,
  FormInput,
  ErrorCard,
  UserProfile,
  ErrorAlertNotification
} from "components";
import avatar from "assets/img/avatar.png";
import { ReactComponent as Playlist } from "assets/img/svg/playlist.svg";
import {
  _isInputValid,
  _updateObject,
  _isArrayEmpty,
  _isObjectEmpty
} from "utils";
import SliderItem from "components/sliderItem";
import bgImage from "assets/img/headers/user.png";
import { connect, useDispatch } from "react-redux";
import {
  getMusicianDetails,
  uploadUserSong,
  deleteUploadSongErrorMessages,
  uploadUserSongCover,
  deleteUploadSongCoverArtError,
  postSong,
  uploadProfilePic,
  deleteUploadProfilePicErrorMessages,
  updateMusicianProfile,
  uploadUserAlbum,
  deleteUpdateMusicianProfileFail,
  deletePostUserSongError,
  deleteUploadAlbumError,
  uploadUserAlbumCover,
  deleteUploadAlbumCoverArtError
} from "store/actions";

const UserDashboard = props => {
  const [profileModal, setProfileModal] = useState(false);
  const [uploadModal, setUploadModal] = useState(false);
  const [uploadAlbumModal, setUploadAlbumModal] = useState(false);
  const [user, setUser] = useState({ isDisabled: false });
  const [song, setSong] = useState({
    title: "",
    music: {},
    coverArt: {}
  });
  const [album, setAlbum] = useState({
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
  // const [slideIndex, setIndex] = useState(0);
  const role =
    props.user === null || props.user === undefined ? "" : props.user.role;
  const creator =
    props.user === null || props.user === undefined ? "" : props.user._id;
  const checkCreator =
    props.mainCreator === null || props.mainCreator === undefined
      ? ""
      : props.mainCreator._id;

  const [errors, setErrors] = useState([]);

  const [isGridView, setGridView] = useState(true);
  const [hasAdminRights, setHasAdminRights] = useState(false);
  const [socialMediaLinks, setSocialMediaLinks] = useState({
    facebook: "",
    instagram: "",
    twitter: ""
  });
  const dispatch = useDispatch();
  const [userId, setUserId] = useState("");
  // const [songs, setSongs] = useState([]);

  const toggleProfile = () => {
    setProfileModal(!profileModal);
  };

  const toggleUpload = () => {
    setUploadModal(!uploadModal);
  };

  const toggleUploadAlbum = () => {
    setUploadAlbumModal(!uploadAlbumModal);
  };

  const toggleGridView = () => {
    setGridView(!isGridView);
  };

  const [windowWidth, setWindowWidth] = useState(0);

  const updateDimensions = useCallback(() => {
    const w = window;
    const d = document;
    const { documentElement } = d;
    const body = d.getElementsByTagName("body")[0];
    const width =
      w.innerWidth || documentElement.clientWidth || body.clientWidth;

    setWindowWidth(width);
  }, []);

  useEffect(() => {
    window.addEventListener("resize", updateDimensions());
  }, [updateDimensions]);

  const validateForm = () => {
    setErrors([]);
    const { title, music } = song;
    const errorArray = [];
    if (!title) {
      errorArray.push("This title field is required.");
    }
    if (!music) {
      errorArray.push("Kindly upload a song.");
    }

    setErrors(errorArray);
    return !errorArray.length;
  };

  const validateAlbumForm = () => {
    setErrors([]);
    const { title, music, songTitle, coverArt, albumArt } = album;
    const { uploadSongCoverArt, uploadedSong } = props;
    const errorArray = [];
    if (!title) {
      errorArray.push("This title field is required.");
    }
    if (!songTitle) {
      errorArray.push("This title field is required.");
    }
    if (!uploadSongCoverArt && !coverArt) {
      errorArray.push("Kindly upload a song cover");
    }
    if (!albumArt) {
      errorArray.push("Kindly upload a album cover");
    }
    if (!uploadedSong && !music) {
      errorArray.push("Kindly upload a song.");
    }

    setErrors(errorArray);
    return !errorArray.length;
  };

  const validateProfileForm = () => {
    setErrors([]);
    const { email, state, phoneNumber, bio, address, userName } = user;
    const errorArray = [];
    if (!email || !state || !phoneNumber || !bio || !address || !userName) {
      errorArray.push("This field is required.");
    }
    setErrors(errorArray);
    return !errorArray.length;
  };

  const onUpdateProfile = e => {
    e.preventDefault();
    const {
      email,
      state,
      phoneNumber,
      bio,
      bookingDetails,
      address,
      userName
    } = user;
    const { facebook, instagram, twitter } = socialMediaLinks;
    const userData = {
      email,
      state,
      phoneNumber,
      bio,
      bookingDetails,
      address,
      userName,
      coverPicture: props.uploadProfilePicImgUploaded
        ? props.uploadProfilePicImgUploaded
        : props.user.coverPicture,
      facebook,
      instagram,
      twitter
    };
    dispatch(updateMusicianProfile(userData));
    setUser({ ...user, isDisabled: true });
  };

  // This method upload a single song
  const onUploadSong = e => {
    e.preventDefault();
    if (validateForm()) {
      const musicData = {
        title: song.title,
        role,
        creator,
        musicUrl: props.uploadedSong,
        coverArtUrl: props.uploadSongCoverArt
      };
      dispatch(postSong(musicData));
    }
  };

  // This endpoint upload an artist album
  const uploadAlbumSong = e => {
    e.preventDefault();
    const { songs } = album;
    const song = [...songs];
    if (validateAlbumForm()) {
      const musicData = {
        title: album.songTitle,
        role,
        creator,
        musicUrl: props.uploadedSong,
        coverArtUrl: props.uploadSongCoverArt
      };
      song.push(musicData);
    }
    setAlbum({
      ...album,
      songs: song,
      songTitle: "",
      music: "",
      coverArt: "",
      checkSongInput: true,
      checkSongImgInput: true,
      checkSongFileInput: true,
      titleDisable: true,
      albumCoverDisable: true
    });
  };

  // Upload User album
  const onUploadAlbum = e => {
    e.preventDefault();
    const { title, songs } = album;
    const { uploadAlbumArt } = props;
    const albumData = {
      title,
      album: songs,
      albumCoverUrl: uploadAlbumArt,
      creator
    };
    dispatch(uploadUserAlbum(albumData));
  };

  const onClose = () => {
    setErrors([]);
  };

  // delete error when error occurs during single song upload
  const DeleteUploadSongErrorMessages = () => {
    dispatch(deleteUploadSongErrorMessages());
    setSong({ ...song, music: "" });
  };

  // delete error when error occurs during song cover art upload
  const DeleteUploadSongCoverArtError = () => {
    dispatch(deleteUploadSongCoverArtError());
    setSong({ ...song, coverArt: "" });
  };

  const DeleteUploadAlbumCoverArtError = () => {
    dispatch(deleteUploadAlbumCoverArtError());
    setSong({ ...song, albumArt: "" });
  };

  // delete error when error occurs during profile image upload
  const DeleteUploadProfilePicErrorMessages = () => {
    dispatch(deleteUploadProfilePicErrorMessages());
    setUser({ ...user, profilePic: "" });
  };

  // delete error when error occurs during profile update
  const DeleteUpdateMusicianProfileFail = () => {
    dispatch(deleteUpdateMusicianProfileFail());
  };

  // delete error when error occurs during song upload
  const DeletePostUserSongError = () => {
    dispatch(deletePostUserSongError());
  };

  // delete error when error occurs during album upload
  const DeleteUploadAlbumError = () => {
    dispatch(deleteUploadAlbumError());
  };

  const onDropSong = music => {
    // upload music to digital ocean space
    const maxSize = 10485760;
    setSong({ ...song, music: music[0] });
    setAlbum({ ...album, checkSongFileInput: false });
    if (music.length !== 0 && music[0].size < maxSize) {
      dispatch(uploadUserSong(music[0]));
    }
  };

  const onDropSongCoverArt = songCoverArt => {
    // upload song cover to digital ocean space
    const maxSize = 2097152;
    if (songCoverArt.length !== 0 && songCoverArt[0].size < maxSize) {
      dispatch(uploadUserSongCover(songCoverArt[0]));
    }
    setAlbum({ ...album, checkSongImgInput: false });
  };

  const onDropAlbumCoverArt = albumCoverArt => {
    const maxSize = 2097152;
    if (albumCoverArt.length !== 0 && albumCoverArt[0].size < maxSize) {
      dispatch(uploadUserAlbumCover(albumCoverArt[0]));
    }
  };

  const onDropProfilePic = profilePic => {
    // upload profile pic to digital ocean space
    const maxSize = 2097152;
    if (profilePic.length !== 0 && profilePic[0].size < maxSize) {
      dispatch(uploadProfilePic(profilePic[0]));
    }
  };

  const updateTitleDisable = () => {
    setAlbum({
      ...album,
      titleDisable: false
    });
  };

  const mapSocialMediaLinks = useCallback(links => {
    let obj = { ...socialMediaLinks };

    if (!_isArrayEmpty(links)) {
      links.map(link =>
        Object.keys(obj).map(item => {
          if (link.includes(item)) {
            obj[item] = link;
          }
          return item;
        })
      );
    }

    return obj;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // get user details by id
  useEffect(() => {
    //   get current user from url
    const {
      match: { params }
    } = props;

    if (params.userId) {
      setUserId(params.userId);
      dispatch(getMusicianDetails(params.userId));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, props.match]);
  //dispatch, props.match

  useEffect(() => {
    if (!_isObjectEmpty(props.user)) {
      setUser(props.user);
      setHasAdminRights(props.user._id === userId);
    }
  }, [props.user, userId]);

  useEffect(() => {
    if (!_isObjectEmpty(props.user)) {
      setSocialMediaLinks(mapSocialMediaLinks(props.user.socialMediaLinks));
    }
  }, [mapSocialMediaLinks, props.user]);

  const delayReload = () => {
    window.location.reload();
  };

  if (props.postSongSuccess) {
    setTimeout(delayReload, 2000);
  }

  if (props.updateProfileSuccess) {
    setTimeout(delayReload, 2000);
  }

  if (props.postAlbumSuccess) {
    setTimeout(delayReload, 2000);
  }

  if (props.updateAlbumTitleAndCoverSuccess) {
    setTimeout(delayReload, 2000);
  }

  if (props.deleteAlbumSuccess) {
    setTimeout(delayReload, 2000);
  }

  const { songs, titleDisable, albumCoverDisable } = album;
  const songUploaded = songs.length;
  const checkUserRole = user.role === undefined ? "" : user.role._id;

  const loginUserId = localStorage.getItem("currentUser");

  if (!loginUserId) {
    toastr.success("Goodbye! come again soon");
    return <Redirect to="/" />;
  }

  return (
    <PageLayout
      pageClass="dashboard dashboard--user"
      bgImage={bgImage}
      user={props.user}
    >
      <>
        <section className="section">
          <div className="container">
            <div className="user-container">
              <div className="user-info">
                <div className="user__avatar">
                  {props.musicianLoading ? (
                    <div className="mt-5 mr-5 user__avatar-image">
                      <Loader
                        type="Circles"
                        color="#d3ae3b"
                        height={100}
                        width={100}
                      />
                    </div>
                  ) : (
                    <img
                      src={user.coverPicture || avatar}
                      alt="avatar"
                      className="user__avatar-image"
                    />
                  )}
                </div>

                <div className="user__details">
                  <h3 className="user__name">{user.fullName}</h3>
                  {checkUserRole === "5e24cb7cb027421dd992c3c7" ? null : (
                    <p>Monthly Listeners: 24,758</p>
                  )}
                </div>
              </div>

              {hasAdminRights ? (
                <div className="mb-3 mt-3">
                  {checkCreator === userId ? (
                    <button
                      className="btn btn--outline mr-2 mb-1"
                      onClick={() => toggleProfile()}
                    >
                      <i className="fas fa-user-edit mr-3"></i> Edit profile
                    </button>
                  ) : (
                    ""
                  )}
                  {checkUserRole === "5e24cb7cb027421dd992c3c7" ? null : (
                    <>
                      {checkCreator === userId ? (
                        <button
                          className="btn btn--primary"
                          onClick={() => toggleUpload()}
                        >
                          <i className="fas fa-plus mr-3"></i> Add new song
                        </button>
                      ) : (
                        ""
                      )}
                    </>
                  )}
                </div>
              ) : null}
            </div>
          </div>
        </section>

        <section className="section">
          <div className="container">
            <div className="row">
              <>
                <div className="col-md-7">
                  {checkUserRole === "5e24cb7cb027421dd992c3c7" ? (
                    <div className="card-block">
                      <h3 className="card__title">Listening</h3>
                      <div className="card justify-content-center">
                        <MusicList minify songs={props.songs.slice(0, 5)} />
                        <Link
                          // to={`/user/${userId}/songs`}
                          to={`/magic/songs`}
                          className="btn btn--outline"
                        >
                          Add To Playlist
                        </Link>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="user__buttons">
                        {checkCreator === userId ? (
                          <button
                            className="btn btn--outline2"
                            onClick={() => toggleUploadAlbum()}
                          >
                            <i className="fas fa-plus mr-3"></i> Add new Album
                          </button>
                        ) : (
                          ""
                        )}
                      </div>
                      <div className="card-block">
                        <h3 className="card__title">Top Songs</h3>
                        <div className="card justify-content-center">
                          <>
                            {props.musicianLoading ? (
                              <div className="justify-content-center">
                                <div className="text-center">
                                  <Loader
                                    type="Circles"
                                    color="#d3ae3b"
                                    height={100}
                                    width={100}
                                  />
                                </div>
                              </div>
                            ) : (
                              <>
                                <MusicList
                                  minify
                                  songType={"single"}
                                  songs={
                                    props.songs === undefined
                                      ? []
                                      : props.songs.slice(0, 5)
                                  }
                                />
                                <Link
                                  to={`/user/${userId}/songs`}
                                  className="btn btn--outline"
                                >
                                  View more
                                </Link>
                              </>
                            )}
                          </>
                        </div>
                      </div>
                    </>
                  )}
                </div>
                <div className="col-md-5">
                  <div className="card-block">
                    <h3 className="card__title">
                      {checkUserRole === "5e24cb7cb027421dd992c3c7"
                        ? "About Me"
                        : "About Artist"}
                    </h3>
                    <UserProfile
                      user={user}
                      musicianLoader={props.musicianLoading}
                    />
                  </div>
                </div>
              </>
            </div>
          </div>

          <Modal
            isOpen={profileModal}
            toggle={toggleProfile}
            size="lg"
            centered
            className="profile-modal"
          >
            <ModalHeader toggle={toggleProfile}>Update Profile</ModalHeader>
            {/* ------ start of update profile ------ */}
            <ModalBody>
              <Form onSubmit={onUpdateProfile}>
                <div className="row">
                  {errors.length ? (
                    <div className="col-12">
                      <ErrorCard error={errors[0]} onClose={onClose} />
                    </div>
                  ) : null}

                  {props.updateMusicianError && (
                    <ErrorAlertNotification
                      errors={props.updateMusicianError}
                      onClick={DeleteUpdateMusicianProfileFail}
                    />
                  )}

                  <div className="col-12 col-md-6">
                    <FormInput
                      isRequired={true}
                      type="email"
                      label="Email address"
                      value={user.email}
                      onChange={e =>
                        setUser(_updateObject(user, { email: e.target.value }))
                      }
                      placeholder=""
                      className={classnames({
                        "is-invalid": _isInputValid("email")
                      })}
                    />
                  </div>

                  <div className="col-12 col-md-6">
                    <FormInput
                      isRequired={true}
                      type="text"
                      label="Location"
                      value={user.state}
                      onChange={e =>
                        setUser(_updateObject(user, { state: e.target.value }))
                      }
                      placeholder=""
                      className={classnames({
                        "is-invalid": _isInputValid("state")
                      })}
                    />
                  </div>

                  <div className="col-12 col-md-6">
                    <FormInput
                      isRequired={true}
                      type="tel"
                      label="Phone Number"
                      value={user.phoneNumber}
                      onChange={e =>
                        setUser(
                          _updateObject(user, { phoneNumber: e.target.value })
                        )
                      }
                      placeholder=""
                      className={classnames({
                        "is-invalid": _isInputValid("phoneNumber")
                      })}
                    />
                  </div>

                  {checkUserRole === "5e24cb7cb027421dd992c3c7" ? null : (
                    <div className="col-12 col-md-6">
                      <FormInput
                        isRequired={true}
                        type="text"
                        label="Booking Details"
                        value={user.bookingDetails}
                        onChange={e =>
                          setUser(
                            _updateObject(user, {
                              bookingDetails: e.target.value
                            })
                          )
                        }
                        placeholder=""
                        className={classnames({
                          "is-invalid": _isInputValid("booking")
                        })}
                      />
                    </div>
                  )}

                  <div className="col-12 col-md-6">
                    <FormInput
                      isRequired={true}
                      type="text"
                      label="User Name"
                      value={user.userName}
                      onChange={e =>
                        setUser(
                          _updateObject(user, {
                            userName: e.target.value
                          })
                        )
                      }
                      placeholder=""
                      className={classnames({
                        "is-invalid": _isInputValid("userName")
                      })}
                    />
                  </div>

                  <div className="col-12 col-md-6">
                    <FormInput
                      isRequired={true}
                      type="text"
                      label="Address"
                      value={user.address}
                      onChange={e =>
                        setUser(
                          _updateObject(user, {
                            address: e.target.value
                          })
                        )
                      }
                      placeholder=""
                      className={classnames({
                        "is-invalid": _isInputValid("address")
                      })}
                    />
                  </div>

                  <div className="col-12">
                    <FormInput
                      isRequired={false}
                      type="textarea"
                      label="Bio"
                      value={user.bio}
                      onChange={e =>
                        setUser(_updateObject(user, { bio: e.target.value }))
                      }
                      placeholder=""
                      className={classnames({
                        "is-invalid": _isInputValid("bio")
                      })}
                    />
                  </div>

                  <div className="col-12">
                    <Dropzone
                      onDrop={onDropProfilePic}
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
                            {props.uploadProfilePicImgError && (
                              <ErrorAlertNotification
                                errors={props.uploadProfilePicImgError}
                                onClick={DeleteUploadProfilePicErrorMessages}
                              />
                            )}
                            <div {...getRootProps({ className: "dropzone" })}>
                              <input
                                {...getInputProps()}
                                onChange={e => {
                                  setUser(
                                    _updateObject(user, {
                                      coverPicture: e.target.files[0]
                                    })
                                  );
                                  onDropProfilePic(e.target.files);
                                }}
                              />
                              {props.uploadProfilePicImgIsLoading ? (
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
                              ) : props.uploadProfilePicImgUploaded ? (
                                <img
                                  src={props.uploadProfilePicImgUploaded}
                                  alt=""
                                  style={{
                                    height: "100px",
                                    width: "150px"
                                  }}
                                />
                              ) : !isEmpty(user.coverPicture) ? (
                                !isEmpty(user.coverPicture) ? (
                                  "Click me to upload a new profile picture. Required size is 2MB"
                                ) : (
                                  <p className="file__item">
                                    {user.coverPicture.name} -{" "}
                                    {user.coverPicture.size} bytes
                                  </p>
                                )
                              ) : (
                                "Click me to upload a profile picture. Required size is 2MB"
                              )}
                            </div>
                          </>
                        );
                      }}
                    </Dropzone>
                  </div>
                  <div className="col-12 col-md-4">
                    <FormInput
                      type="text"
                      label="Facebook"
                      value={socialMediaLinks.facebook}
                      onChange={e =>
                        setSocialMediaLinks(
                          _updateObject(socialMediaLinks, {
                            facebook: e.target.value
                          })
                        )
                      }
                      placeholder=""
                      className={classnames({
                        "is-invalid": _isInputValid("facebook")
                      })}
                    />
                  </div>

                  <div className="col-12 col-md-4">
                    <FormInput
                      type="text"
                      label="Twitter"
                      value={socialMediaLinks.twitter}
                      onChange={e =>
                        setSocialMediaLinks(
                          _updateObject(socialMediaLinks, {
                            twitter: e.target.value
                          })
                        )
                      }
                      placeholder=""
                      className={classnames({
                        "is-invalid": _isInputValid("twitter")
                      })}
                    />
                  </div>

                  <div className="col-12 col-md-4">
                    <FormInput
                      type="text"
                      label="Instagram"
                      value={socialMediaLinks.instagram}
                      onChange={e =>
                        setSocialMediaLinks(
                          _updateObject(socialMediaLinks, {
                            instagram: e.target.value
                          })
                        )
                      }
                      placeholder=""
                      className={classnames({
                        "is-invalid": _isInputValid("instagram")
                      })}
                    />
                  </div>

                  <div className="col-12">
                    <div className="form__button">
                      <Button
                        type="submit"
                        block
                        className="btn btn--primary"
                        onClick={onUpdateProfile}
                        disabled={user.isDisabled ? true : false}
                      >
                        {props.updateMusicianIsLoading ? (
                          <i className="fa fa-spinner fa-spin" />
                        ) : null}
                        {"  "}
                        Update Profile
                      </Button>
                    </div>
                  </div>
                </div>
              </Form>
            </ModalBody>
          </Modal>
          {/* ------ end of update profile ------ */}

          {/* upload of a single song  */}
          <Modal
            isOpen={uploadModal}
            toggle={toggleUpload}
            centered
            className="upload-modal"
          >
            <ModalHeader toggle={toggleUpload}>Add New Songs</ModalHeader>
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
                      value={song.title}
                      onChange={e =>
                        setSong(_updateObject(song, { title: e.target.value }))
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
                            {props.uploadSongCoverArtError && (
                              <ErrorAlertNotification
                                errors={props.uploadSongCoverArtError}
                                onClick={DeleteUploadSongCoverArtError}
                              />
                            )}
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
                              {props.uploadSongCoverArtIsLoading ? (
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
                              ) : props.uploadSongCoverArt ? (
                                <img
                                  src={props.uploadSongCoverArt}
                                  alt=""
                                  style={{
                                    height: "100px",
                                    width: "150px"
                                  }}
                                />
                              ) : !isEmpty(song.coverArt) ? (
                                <p className="file__item">
                                  {song.coverArt.name} - {song.coverArt.size}{" "}
                                  bytes
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

                            {props.uploadSongError && (
                              <ErrorAlertNotification
                                errors={props.uploadSongError}
                                onClick={DeleteUploadSongErrorMessages}
                              />
                            )}
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
                              {props.uploadSongLoading ? (
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
                              ) : props.uploadedSong ? (
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
                        disabled={user.isDisabled ? true : false}
                      >
                        {props.newSongIsLoading ? (
                          <i className="fa fa-spinner fa-spin" />
                        ) : null}
                        {"  "}
                        Upload Song
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </ModalBody>
          </Modal>

          {/* End of upload song */}

          {/* ------------ Upload Album -------- */}

          <Modal
            isOpen={uploadAlbumModal}
            toggle={toggleUploadAlbum}
            centered
            className="upload-modal"
          >
            <ModalHeader toggle={toggleUploadAlbum}>Add New Album</ModalHeader>
            <ModalBody>
              <div onSubmit={onUploadSong}>
                <div className="row">
                  {errors.length ? (
                    <div className="col-12">
                      <ErrorCard error={errors[0]} onClose={onClose} />
                    </div>
                  ) : null}

                  {props.postAlbumDetailsError && (
                    <ErrorAlertNotification
                      errors={props.postAlbumDetailsError}
                      onClick={DeleteUploadAlbumError}
                    />
                  )}

                  <div className="col-12">
                    <p style={{ color: "red" }}>
                      A minimum of 6 song upload is required to create an album
                    </p>
                    <p className="text-center" style={{ color: "green" }}>
                      You have uploaded {songUploaded} songs
                    </p>
                    <FormInput
                      isRequired={true}
                      type="text"
                      label="Album Title"
                      value={album.title}
                      isDisabled={titleDisable}
                      onChange={e =>
                        setAlbum(
                          _updateObject(album, { title: e.target.value })
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
                    <FormInput
                      isRequired={true}
                      type="text"
                      label="Song Title"
                      value={album.checkSongInput ? "" : album.songTitle}
                      onClick={() =>
                        setAlbum(
                          _updateObject(album, { checkSongInput: false })
                        )
                      }
                      onChange={e =>
                        setAlbum(
                          _updateObject(album, { songTitle: e.target.value })
                        )
                      }
                      placeholder=""
                      className={classnames({
                        "is-invalid": _isInputValid("title")
                      })}
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
                                <div className="text-danger mt-2">
                                  {errorMsg}
                                </div>
                              )}
                              {props.uploadAlbumArtError && (
                                <ErrorAlertNotification
                                  errors={props.uploadAlbumArtError}
                                  onClick={DeleteUploadAlbumCoverArtError}
                                />
                              )}
                              <div {...getRootProps({ className: "dropzone" })}>
                                <input
                                  {...getInputProps()}
                                  type="file"
                                  onChange={e => {
                                    setAlbum({
                                      ...album,
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
                                      album.checkSongImgInput
                                        ? "Drag n drop some files here, or click to upload a song cover art. Required size is 2MB"
                                        : props.uploadAlbumArt
                                    }
                                    alt=""
                                    style={{
                                      height: "100px",
                                      width: "150px"
                                    }}
                                  />
                                ) : !isEmpty(album.albumArt) ? (
                                  <p className="file__item">
                                    {album.albumArt.name} -{" "}
                                    {album.albumArt.size} bytes
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
                          "This file is too large. Required size is 2MB";
                        return (
                          <>
                            {isDragActive ? (errorMsg = "") : null}
                            {isFileTooLarge && (
                              <div className="text-danger mt-2">{errorMsg}</div>
                            )}
                            {props.uploadSongCoverArtError && (
                              <ErrorAlertNotification
                                errors={props.uploadSongCoverArtError}
                                onClick={DeleteUploadSongCoverArtError}
                              />
                            )}
                            <div {...getRootProps({ className: "dropzone" })}>
                              <input
                                {...getInputProps()}
                                type="file"
                                onChange={e => {
                                  setAlbum({
                                    ...album,
                                    coverArt: e.target.files[0]
                                  });
                                  onDropSongCoverArt(e.target.files);
                                }}
                              />
                              {props.uploadSongCoverArtIsLoading ? (
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
                              ) : props.uploadSongCoverArt ? (
                                <img
                                  src={
                                    album.checkSongImgInput
                                      ? "Drag n drop some files here, or click to upload a SONG cover art. Required size is 2MB"
                                      : props.uploadSongCoverArt
                                  }
                                  alt=""
                                  style={{
                                    height: "100px",
                                    width: "150px"
                                  }}
                                />
                              ) : !isEmpty(album.coverArt) ? (
                                <p className="file__item">
                                  {album.coverArt.name} - {album.coverArt.size}{" "}
                                  bytes
                                </p>
                              ) : (
                                "Drag n drop some files here, or click to upload a SONG cover art. Required size is 2MB"
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

                            {props.uploadSongError && (
                              <ErrorAlertNotification
                                errors={props.uploadSongError}
                                onClick={DeleteUploadSongErrorMessages}
                              />
                            )}
                            <div {...getRootProps({ className: "dropzone" })}>
                              <input
                                {...getInputProps()}
                                onChange={e => {
                                  setAlbum({
                                    ...album,
                                    music: e.target.files[0]
                                  });
                                  onDropSong(e.target.files);
                                }}
                              />
                              {props.uploadSongLoading ? (
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
                              ) : props.uploadedSong ? (
                                <p className="file__item">
                                  {album.checkSongFileInput
                                    ? "Drag n drop some files here, or click to upload a song mp3/wa formats. Required size 10MB"
                                    : "Song upload was successful"}
                                </p>
                              ) : !isEmpty(album.music) ? (
                                <p className="file__item">
                                  {album.music.name} - {album.music.size} bytes
                                </p>
                              ) : (
                                "Drag n drop some files here, or click to upload a song mp3/wa formats. Required size 10MB"
                              )}
                            </div>
                          </>
                        );
                      }}
                    </Dropzone>
                  </div>

                  <div className="col-6">
                    <div className="form__button">
                      <Button
                        type="submit"
                        block
                        className="btn btn--primary"
                        onClick={uploadAlbumSong}
                      >
                        {album.songs.length === 0
                          ? "Add A Song"
                          : "Add More Song"}
                      </Button>
                    </div>
                  </div>

                  <div className="col-6">
                    <div className="form__button">
                      <Button
                        type="submit"
                        block
                        className="btn btn--primary"
                        onClick={onUploadAlbum}
                        disabled={album.songs.length >= 6 ? false : true}
                      >
                        {props.postAlbumDetailsLoading ? (
                          <>
                            <i className="fa fa-spinner fa-spin" />
                            {"  "}
                          </>
                        ) : null}
                        Upload Album
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </ModalBody>
          </Modal>
        </section>

        <section className="section">
          <div className="container">
            {checkUserRole === "5e24cb7cb027421dd992c3c7" ? (
              ""
            ) : (
              <>
                <div className="section__header section__header--flex">
                  <h3 className="heading card__title mb-0">Albums</h3>

                  <div className="layout-view">
                    <div
                      className={classnames("layout-view__icon", {
                        active: isGridView
                      })}
                      onClick={() => toggleGridView()}
                    >
                      <i className="fas fa-th-list"></i>
                    </div>

                    <div
                      className={classnames("layout-view__icon", {
                        active: !isGridView
                      })}
                      onClick={() => toggleGridView()}
                    >
                      <i className="fas fa-th"></i>
                    </div>
                  </div>
                </div>

                <hr className="mb-4" />

                <div className="row">
                  {props.musicianLoading ? (
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
                  ) : !_isArrayEmpty(props.albums) ? (
                    props.albums.map((albumItem, index) =>
                      isGridView ? (
                        <div className="col-12" key={index}>
                          {!_isArrayEmpty(albumItem.album) ? (
                            <AlbumItem
                              album={albumItem}
                              userId={userId}
                              noArtist
                              songType={"album"}
                              creatorId={creator}
                              loginUserId={loginUserId}
                              deleteLoading={props.deleteAlbumLoading}
                              user={props.user}
                              uploadedSong={props.uploadedSong}
                              uploadSongCoverArt={props.uploadSongCoverArt}
                              updateAlbumTitleAndCoverIsLoading={
                                props.updateAlbumTitleAndCoverIsLoading
                              }
                              updateAlbumTitleAndCoverError={
                                props.updateAlbumTitleAndCoverError
                              }
                              uploadAlbumArtError={props.uploadAlbumArtError}
                            />
                          ) : null}
                        </div>
                      ) : (
                        <div
                          className="col-md-4 col-lg-3 col-xl-2 mb-5"
                          key={index}
                        >
                          {!_isArrayEmpty(albumItem.album) ? (
                            <SliderItem
                              key={index}
                              item={albumItem}
                              type="album"
                            />
                          ) : null}
                        </div>
                      )
                    )
                  ) : (
                    <div className="w-100 d-flex justify-content-center mt-5">
                      <div className="empty-list">
                        <Playlist className="empty-list-icon" />
                        <p className="paragraph mt-3">No albums available</p>
                      </div>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        </section>
      </>
    </PageLayout>
  );
};

UserDashboard.propTypes = {
  albums: PropTypes.array,
  loading: PropTypes.bool,
  match: PropTypes.object,
  songs: PropTypes.array,
  user: PropTypes.object,
  uploadProfilePicImgError: PropTypes.string,
  uploadedSong: PropTypes.string,
  uploadSongLoading: PropTypes.bool,
  uploadSongError: PropTypes.string,
  uploadSongCoverArt: PropTypes.string,
  uploadSongCoverArtIsLoading: PropTypes.bool,
  uploadSongCoverArtError: PropTypes.string,
  uploadProfilePicImgUploaded: PropTypes.string,
  uploadProfilePicImgIsLoading: PropTypes.bool,
  uploadUserSongCover: PropTypes.func,
  newSongIsLoading: PropTypes.bool,
  updateMusicianError: PropTypes.string,
  newSongError: PropTypes.string,
  updateMusicianIsLoading: PropTypes.bool,
  postAlbumSuccess: PropTypes.bool,
  postSongSuccess: PropTypes.bool,
  updateProfileSuccess: PropTypes.bool,
  postAlbumDetailsError: PropTypes.string,
  postAlbumDetailsLoading: PropTypes.bool,
  uploadAlbumArtError: PropTypes.string,
  uploadAlbumArt: PropTypes.string,
  albumCoverArtIsLoading: PropTypes.bool,
  musicianLoading: PropTypes.bool,
  mainCreator: PropTypes.string,
  deleteAlbumLoading: PropTypes.bool,
  userFan: PropTypes.bool,
  updateAlbumTitleAndCoverSuccess: PropTypes.bool,
  updateAlbumTitleAndCoverIsLoading: PropTypes.bool,
  updateAlbumTitleAndCoverError: PropTypes.string,
  deleteAlbumSuccess: PropTypes.bool
};

const mapStateToProps = state => ({
  albums: state.musician.albums,
  musicianLoading: state.musician.loading,
  songs: state.musician.songs,
  user: state.musician.profile,
  error: state.musician.error,
  deleteAlbumLoading: state.musician.deleteAlbumLoading,

  userFan: state.auth.user,

  // upload song
  uploadedSong: state.userMusicUploader.musicUrl,
  uploadSongLoading: state.userMusicUploader.isLoading,
  uploadSongError: state.userMusicUploader.error,

  // upload song cover art
  uploadSongCoverArt: state.userSongCoverArt.coverArtUrl,
  uploadSongCoverArtIsLoading: state.userSongCoverArt.coverArtIsLoading,
  uploadSongCoverArtError: state.userSongCoverArt.error,

  // upload album cover art
  uploadAlbumArtError: state.userSongCoverArt.albumUploadError,
  uploadAlbumArt: state.userSongCoverArt.albumArtUrl,
  albumCoverArtIsLoading: state.userSongCoverArt.albumCoverArtIsLoading,

  // upload profile image
  uploadProfilePicImgUploaded: state.userProfileUploader.profilePicUrl,
  uploadProfilePicImgIsLoading: state.userProfileUploader.profileImgLoading,
  uploadProfilePicImgError: state.userProfileUploader.error,

  // update musician details
  updateMusicianError: state.musician.error,
  updateMusicianIsLoading: state.musician.loading,
  updateProfileSuccess: state.musician.updateProfileSuccess,

  // post new song by user
  newSongIsLoading: state.postNewSong.newSongIsLoading,
  newSongError: state.postNewSong.error,
  postSongSuccess: state.postNewSong.postSongSuccess,

  // upload a new album
  postAlbumDetailsLoading: state.userUploadAlbum.postAlbumDetailsLoading,
  postAlbumDetailsError: state.userUploadAlbum.error,
  postAlbumSuccess: state.userUploadAlbum.postAlbumSuccess,
  mainCreator: state.auth.user,
  updateAlbumTitleAndCoverSuccess: state.albums.updateAlbumTitleAndCoverSuccess,
  updateAlbumTitleAndCoverIsLoading:
    state.albums.updateAlbumTitleAndCoverIsLoading,
  updateAlbumTitleAndCoverError: state.albums.updateAlbumTitleAndCoverError,
  deleteAlbumSuccess: state.musician.deleteAlbumSuccess
});

export default connect(
  mapStateToProps,
  null
)(UserDashboard);
