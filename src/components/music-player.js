import React, { Component } from "react";
import classnames from "classnames";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import AudioPlayer from "react-h5-audio-player";
import { Button, Input, Modal, ModalHeader, ModalBody } from "reactstrap";
import "react-h5-audio-player/lib/styles.css";
import * as actions from "store/actions";
import { ReactComponent as Close } from "assets/img/svg/close.svg";
import { ReactComponent as VolumeIcon } from "assets/img/svg/volume.svg";
import { ReactComponent as MuteIcon } from "assets/img/svg/mute.svg";
import { ReactComponent as Playlist } from "assets/img/svg/playlist.svg";
import { ProgressBar } from "./progressBar";
import { ReactComponent as Plus } from "assets/img/svg/plus.svg";
import { ReactComponent as PlaylistSuccess } from "assets/img/svg/Vector.svg";

class MusicPlayer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      musicItem: {
        url: "",
        title: "",
        artist: "",
        image: ""
      },
      playlist: [],
      duration: "0.00",
      elapsedTime: "0.00",
      playedTime: 0,
      circumference: 0,
      isFullScreen: false,
      progress: 0,
      shuffle: false,
      repeat: 0, // none
      minValue: 0,
      maxValue: 10,
      step: 1,
      audioVolume: 5,
      setRewind: false,
      repeatSong: false,
      mute: false,
      playlistModal: false,
      playListForm: false,
      playListFormSuccess: false,
      playMinValue: 0,
      playMaxValue: 10,
      playStep: 1,
      playedTimeDuration: parseFloat("0.00"),
      meme: 0
    };

    this.audioRef = React.createRef();
    this.audioSourceRef = React.createRef();
    this.volumeProgressRef = React.createRef();
    this.volumeProgressHandleRef = React.createRef();

    this.play = this.play.bind(this);
    this.playPlaylist = this.playPlaylist.bind(this);
    this.pause = this.pause.bind(this);
    this.toggleFullScreen = this.toggleFullScreen.bind(this);
    this.onHandleVolume = this.onHandleVolume.bind(this);
    this.onTogglePlaylist = this.onTogglePlaylist.bind(this);
    this.onTogglePlaylistForm = this.onTogglePlaylistForm.bind(this);
    this.onTogglePlaylistFormSuccess = this.onTogglePlaylistFormSuccess.bind(
      this
    );
    this.mouseMove = this.mouseMove.bind(this);
    this.mouseDown = this.mouseDown.bind(this);
    this.mouseUp = this.mouseUp.bind(this);
  }

  onTogglePlaylist() {
    const { playlistModal } = this.state;
    this.setState({
      playlistModal: !playlistModal
    });
  }

  onTogglePlaylistForm() {
    const { playListForm } = this.state;
    this.setState({
      playlistModal: false,
      playListForm: !playListForm
    });
  }

  onTogglePlaylistFormSuccess() {
    const { playListFormSuccess } = this.state;
    this.setState({
      playListForm: false,
      playListFormSuccess: !playListFormSuccess
    });
  }

  toggleFullScreen() {
    this.setState(prevState => {
      return { isFullScreen: !prevState.isFullScreen };
    });
  }

  onHandleVolume = e => {
    document.getElementById("typeip");
    this.setState({
      audioVolume: e.currentTarget.value,
      mute: false
    });
    this.audioRef.current.audio.current.volume = this.state.audioVolume / 10;
  };

  onMuteSong = e => {
    e.preventDefault();
    if (!this.state.mute) {
      this.setState({
        mute: true
      });
      this.audioRef.current.audio.current.volume = 0;
    } else {
      this.audioRef.current.audio.current.volume = this.state.audioVolume / 10;
    }
  };

  unMuteSong = e => {
    e.preventDefault();
    this.setState({
      mute: false
    });
    this.audioRef.current.audio.current.volume = this.state.audioVolume / 10;
  };

  componentDidUpdate(prevProps) {
    if (this.props.currentTrack !== prevProps.currentTrack) {
      this.setState({ musicItem: this.props.currentTrack });
      this.play();
    }
    if (this.props.playlist !== prevProps.playlist) {
      this.setState({ playlist: this.props.playlist });
      this.playPlaylist(this.props.playlist, 0);
    }
  }

  play = () => {
    const { musicUrl } = this.props;
    this.audioRef.current.audio.current.src = musicUrl;
    this.audioRef.current.audio.current.load();
    this.audioRef.current.audio.current.volume = this.state.audioVolume / 10;

    this.props.playSong();
    this.audioRef.current.audio.current.currentTime =
      this.props.currentPlayingTime || 0.0;

    this.audioRef.current.audio.current.play();
  };

  playPlaylist(songArray, index) {
    // set global playlist

    this.props.setPlaylist(songArray);
    // then play song in playlist
    this.setState({ musicItem: songArray[index] });

    if (this.state.elapsedTime === this.state.duration) {
      // check if song index is less than song-length
      this.setState({ musicItem: songArray[index] });
      this.play();
    }
  }

  pause() {
    this.audioRef.current.audio.current.pause();
    this.props.pauseSong(this.state.playedTime);
  }

  mouseMove = e => {
    this.audioRef.current.currentTime =
      this.audioRef.current.currentTime === null
        ? 0.0
        : ((e.pageX - this.progressRef.current.offsetLeft) /
            this.progressRef.current.offsetWidth) *
          this.audioRef.current.duration;

    this.progressHandleRef.current.style.left = `${this.state.progress}%`;
  };

  mouseDown = e => {
    window.addEventListener("mousemove", this.mouseMove);
    window.addEventListener("mouseup", this.mouseUp);
  };

  mouseUp = e => {
    window.removeEventListener("mousemove", this.mouseMove);
    window.removeEventListener("mouseup", this.mouseUp);
  };

  render() {
    const { musicUrl, imageUrl, titleUrl, artistUrl } = this.props;

    const playList = [
      "Hip Hop Nigeria 2020",
      "Top 10 Elite Songs",
      "June Up and Upcoming Artist",
      "Yoruba Rappers"
    ];

    const { playlistModal, playListForm, playListFormSuccess } = this.state;

    return (
      <div
        className={classnames("music-player-block", {
          active: this.props.showPlayer,
          "music-player-full-screen-block": this.state.isFullScreen
        })}
      >
        {this.state.isFullScreen ? (
          <div className="music-player-full-screen">
            <div className="wave-container">
              <div className="wave -one"></div>
              <div className="wave -two"></div>
              <div className="wave -three"></div>
            </div>

            <div className="close-btn">
              <Close
                className="close-btn-icon"
                onClick={this.toggleFullScreen}
              />
            </div>

            <div className="music-player-info">
              <div className="container">
                <div className="row music-player-row">
                  <div className="music-player__avatar">
                    <img
                      src={this.state.musicItem.coverArtUrl || imageUrl}
                      className="music-player__avatar-image"
                      alt="avatar"
                    />
                  </div>

                  <div className="music-player__details">
                    <p className="music-player__title">
                      {this.state.musicItem.title || titleUrl}
                    </p>
                    <p className="music-player__artist">
                      {this.state.musicItem.artist || artistUrl}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="music-player-wrapper">
              <div className="music-player">
                <div className="container-fluid">
                  <div className="row justify-content-center mb-4">
                    <div className="col-12 col-md-6">
                      <AudioPlayer
                        src={
                          this.state.musicItem.musicUrl ||
                          this.state.musicItem.url ||
                          musicUrl
                        }
                        className="no-shadow-two"
                        ref={this.audioRef}
                        autoPlayAfterSrcChange={true}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="music-player">
            <div className="container-fluid">
              <div className="row">
                <div className="col-5 col-md-3" onClick={this.toggleFullScreen}>
                  <div className="music-player__item">
                    <div className="music-player__avatar">
                      <img
                        src={this.state.musicItem.coverArtUrl || imageUrl}
                        className="music-player__avatar-image"
                        alt="avatar"
                      />
                    </div>

                    <div className="music-player__details">
                      <p className="music-player__title">
                        {this.state.musicItem.title || titleUrl}
                      </p>
                      <p className="music-player__artist">
                        {this.state.musicItem.artist || artistUrl}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-7 col-md-6">
                  <AudioPlayer
                    src={musicUrl}
                    layout={"horizontal-reverse"}
                    customVolumeControls={[]}
                    className="no-shadow"
                    ref={this.audioRef}
                    autoPlayAfterSrcChange={true}
                  />
                </div>
                <div className="col-md-3">
                  <div className="music-player__item">
                    <div className="row button-style">
                      {/* <div className="">
                        <Plus
                          className="player-button-icon"
                          onClick={this.onTogglePlaylist}
                        />
                      </div> */}

                      <div className="ml-4">
                        <Playlist
                          className="player-button-icon ml-4"
                          onClick={this.toggleFullScreen}
                        />
                      </div>
                    </div>

                    <div className="music-player__volume">
                      {!this.state.mute ? (
                        <VolumeIcon
                          className="volume-icon"
                          onClick={this.onMuteSong}
                        />
                      ) : (
                        <MuteIcon
                          className="volume-icon"
                          onClick={this.unMuteSong}
                        />
                      )}
                      <div className="progressbar">
                        <ProgressBar
                          value={this.state.audioVolume}
                          name="audioVolume"
                          ref={{
                            volumeProgressRef: this.volumeProgressRef,
                            volumeProgressHandleRef: this
                              .volumeProgressHandleRef
                          }}
                          type="volume"
                          mouseDown={this.mouseDown}
                          mouseMove={e => this.mouseMove(e)}
                          minValue={this.state.minValue}
                          maxValue={this.state.maxValue}
                          step={this.state.step}
                          onChange={this.onHandleVolume}
                          id="typeip"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        <Modal
          isOpen={playlistModal}
          toggle={this.onTogglePlaylist}
          size="md"
          centered
        >
          <ModalHeader
            toggle={this.onTogglePlaylist}
            className="music-player-playlist-header"
          >
            Select a playlist to add a song to or create a new playlist
          </ModalHeader>
          <ModalBody>
            <div className="col-12">
              <div className="form__button">
                <Button
                  type="submit"
                  block
                  className="btn btn--primary"
                  onClick={this.onTogglePlaylistForm}
                >
                  Create Playlist
                </Button>
              </div>
              <div className="col-12">
                {playList.length === 0 ? null : (
                  <p className=" music-player-play-title mt-5 mr-5">
                    Playlists Available
                  </p>
                )}
                {playList.length === 0 ? (
                  <div className="col-12 mt-5 text-center music-player-empty-playlist">
                    <Playlist className="mb-2 music-player-playlist-icon" />
                    <p>You are yet to create a Playlist</p>
                  </div>
                ) : (
                  playList.map(i => (
                    <>
                      <div className="music-player-play-list mt-2">
                        <span className="music-player-side-patch"></span>
                        <span className="music-player-list-text">{i}</span>
                        {/* <Plus className="music-player-plus-button" /> */}
                      </div>
                    </>
                  ))
                )}
              </div>
            </div>
          </ModalBody>
        </Modal>
        <Modal
          isOpen={playListForm}
          toggle={this.onTogglePlaylistForm}
          size="md"
          centered
        >
          <ModalHeader
            toggle={this.onTogglePlaylistForm}
            className="music-player-playlist-header"
          >
            New Playlist
          </ModalHeader>
          <ModalBody>
            <div className="col-12">
              <Input placeholder="Enter Playlist Name" />
            </div>
            <div className="col-12 mt-5">
              <Button
                type="submit"
                block
                className="btn btn--primary"
                onClick={this.onTogglePlaylistFormSuccess}
              >
                Next
              </Button>
            </div>
          </ModalBody>
        </Modal>
        <Modal
          isOpen={playListFormSuccess}
          toggle={this.onTogglePlaylistFormSuccess}
          size="sm"
          centered
        >
          <ModalBody>
            <div className="col-12 text-center">
              <PlaylistSuccess className="mb-2 player-button-icon" />
              <br />
              <span className="music-player-empty-playlist">
                Playlist successfully created you can start adding songs
              </span>
            </div>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

MusicPlayer.propTypes = {
  currentTrack: PropTypes.object,
  currentPlayingTime: PropTypes.number,
  isPlaying: PropTypes.bool,
  playlist: PropTypes.array,
  setPlaylist: PropTypes.func,
  showPlayer: PropTypes.bool,
  pauseSong: PropTypes.func,
  playSong: PropTypes.func,
  musicUrl: PropTypes.string,
  titleUrl: PropTypes.string,
  imageUrl: PropTypes.string,
  artistUrl: PropTypes.string
};

const mapStateToProps = state => ({
  currentTrack: state.musicPlayer.currentTrack,
  currentPlayingTime: state.musicPlayer.currentTime,
  isPlaying: state.musicPlayer.isPlaying,
  playlist: state.musicPlayer.playlist,
  showPlayer: state.musicPlayer.showPlayer,
  musicUrl:
    state.musicPlayer.currentTrack === null
      ? null
      : state.musicPlayer.currentTrack.musicUrl,
  imageUrl:
    state.musicPlayer.currentTrack === null
      ? null
      : state.musicPlayer.currentTrack.coverArtUrl,
  titleUrl:
    state.musicPlayer.currentTrack === null
      ? null
      : state.musicPlayer.currentTrack.title,
  artistUrl:
    state.musicPlayer.currentTrack === null
      ? null
      : state.musicPlayer.currentTrack.creator.fullName
});

const mapDispatchToProps = dispatch => ({
  pauseSong: elapsedTime => dispatch(actions.pauseSong(elapsedTime)),
  playSong: () => dispatch(actions.playSong()),
  setPlaylist: songArray => dispatch(actions.setPlaylist(songArray))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MusicPlayer);
