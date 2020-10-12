import React, { Component } from "react";
import classnames from "classnames";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import * as actions from "store/actions";
import { ReactComponent as Close } from "assets/img/svg/close.svg";
import { ReactComponent as PlayBtn } from "assets/img/svg/play-button.svg";
import { ReactComponent as PauseBtn } from "assets/img/svg/pause-button.svg";
import { ReactComponent as PlaylistArrow } from "assets/img/svg/next.svg";
import { ReactComponent as Shuffle } from "assets/img/svg/shuffle.svg";
import { ReactComponent as Repeat } from "assets/img/svg/repeat.svg";
import { ProgressBar } from "./progressBar";

class FullScreenPlayer extends Component {
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
      progress: 0
    };

    this.audioRef = React.createRef();
    this.audioSourceRef = React.createRef();
    this.progressRef = React.createRef();
    this.progressHandleRef = React.createRef();
    this.volumeProgressRef = React.createRef();
    this.volumeProgressHandleRef = React.createRef();

    this.play = this.play.bind(this);
    this.pause = this.pause.bind(this);
    this.toggleFullScreen = this.toggleFullScreen.bind(this);
  }

  getProgessCircle() {
    this.progressCircle = document.querySelector(".progressCircle");
    const radius = this.progressCircle.r.baseVal.value;
    const circumference = radius * 2 * Math.PI;

    this.setState({ circumference: circumference });

    this.progressCircle.style.strokeDasharray = `${circumference} ${circumference}`;
    this.progressCircle.style.strokeDashoffset = circumference;
  }

  toggleFullScreen() {
    this.setState(prevState => {
      return { isFullScreen: !prevState.isFullScreen };
    });
  }

  componentDidMount() {
    this.audioRef.current.addEventListener("loadedmetadata", () => {
      const songDuration = this.convertElapsedTime(
        this.audioRef.current.duration
      );
      this.setState({ duration: songDuration });
    });

    this.audioRef.current.addEventListener("timeupdate", () => {
      const currentTime = this.convertElapsedTime(
        this.audioRef.current.currentTime
      );
      this.setState({
        elapsedTime: currentTime,
        playedTime: this.audioRef.current.currentTime
      });

      this.getProgessCircle();

      const currentProgress =
        this.convertTimeToNumber(this.state.elapsedTime) /
        this.convertTimeToNumber(this.state.duration);

      if (!Number.isNaN(currentProgress)) {
        this.setState({ progress: currentProgress * 100 });
        const offset =
          this.state.circumference - currentProgress * this.state.circumference;
        this.progressCircle.style.strokeDashoffset = offset;
      }
    });
  }

  componentDidUpdate(prevProps) {
    if (this.props.currentTrack !== prevProps.currentTrack) {
      this.setState({ musicItem: this.props.currentTrack });

      this.play();
    }

    if (this.props.playlist !== prevProps.playlist) {
      this.setState({ playlist: this.props.playlist });
    }
  }

  componentWillUnmount() {
    // eslint-disable-next-line no-empty-function
    this.audioRef.current.removeEventListener("loadedmetadata", () => {});
    // eslint-disable-next-line no-empty-function
    this.audioRef.current.removeEventListener("timeupdate", () => {});
  }

  play() {
    this.audioSourceRef.current.src = this.state.musicItem.url;
    this.audioRef.current.load();
    this.props.playSong();
    this.audioRef.current.currentTime = this.props.currentPlayingTime || 0;
    this.audioRef.current.play();
  }

  pause() {
    this.audioRef.current.pause();
    this.props.pauseSong(this.state.playedTime);
  }

  convertElapsedTime(inputSeconds) {
    let seconds = Math.floor(inputSeconds % 60);
    if (seconds < 10) {
      seconds = `0${seconds}`;
    }

    const minutes = Math.floor(inputSeconds / 60);
    return `${minutes}:${seconds}`;
  }

  convertTimeToNumber(str) {
    const arr = str.split(":");
    // console.log(parseFloat(arr.join('.')));
    return parseFloat(arr.join("."));
  }

  mouseMove = () => {
    // positionHandle(e.pageX);
    // console.log(e.pageX);
    // audioRef.current.currentTime =
    //   (e.pageX / progressRef.current.offsetWidth) * audioRef.current.duration;
    this.progressHandleRef.current.style.left = `${this.state.progress}%`;
  };

  mouseDown = () => {
    window.addEventListener("mousemove", this.mouseMove);
    window.addEventListener("mouseup", this.mouseUp);
  };

  mouseUp = () => {
    window.removeEventListener("mousemove", this.mouseMove);
    window.removeEventListener("mouseup", this.mouseUp);
  };

  render() {
    return (
      <div
        className={classnames(
          "music-player-block music-player-full-screen-block",
          {
            active: this.props.showFullScreen
          }
        )}
      >
        <audio ref={this.audioRef} controls>
          <source
            ref={this.audioSourceRef}
            src={this.state.musicItem.url}
            type="audio/mpeg"
          />
          Your browser does not support the audio element.
        </audio>

        <div className="music-player-full-screen">
          <div className="wave-container">
            <div className="wave -one"></div>
            <div className="wave -two"></div>
            <div className="wave -three"></div>
          </div>

          <div className="close-btn">
            <Close className="close-btn-icon" onClick={this.toggleFullScreen} />
          </div>

          <div className="music-player-info">
            <div className="container">
              <div className="row music-player-row">
                <div className="music-player__avatar">
                  <img
                    src={this.state.musicItem.image}
                    className="music-player__avatar-image"
                    alt="avatar"
                  />
                </div>

                <div className="music-player__details">
                  <p className="music-player__title">
                    {this.state.musicItem.title}
                  </p>
                  <p className="music-player__artist">
                    {this.state.musicItem.artist}
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
                    <div className="music-player__item">
                      <div className="progressbar">
                        <div className="progressbar__text">
                          {this.state.elapsedTime}
                        </div>
                        <ProgressBar
                          value={this.state.progress}
                          ref={{
                            progressRef: this.progressRef,
                            progressHandleRef: this.progressHandleRef
                          }}
                          mouseDown={this.mouseDown}
                          mouseMove={e => this.mouseMove(e)}
                        />
                        <div className="progressbar__text">
                          {this.state.duration}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="row justify-content-center">
                  <div className="col-8 col-md-6">
                    <div className="d-flex align-items-center justify-content-around">
                      <div className="player-button player-button--small prev">
                        <Shuffle className="player-button-icon" />
                      </div>

                      <div className="player-buttons">
                        <div className="player-button player-button--small prev">
                          <PlaylistArrow className="player-button-icon" />
                        </div>
                        <div className="player-button--bg">
                          <PlayBtn
                            className={classnames(
                              "player-button-icon play-icon",
                              {
                                active: !this.props.isPlaying
                              }
                            )}
                            onClick={() => this.play()}
                          />

                          <PauseBtn
                            className={classnames(
                              "player-button-icon pause-icon",
                              {
                                active: this.props.isPlaying
                              }
                            )}
                            onClick={() => this.pause()}
                          />
                        </div>

                        <div className="player-button player-button--small">
                          <PlaylistArrow className="player-button-icon" />
                        </div>
                      </div>

                      <div className="player-button player-button--small prev">
                        <Repeat className="player-button-icon" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

FullScreenPlayer.propTypes = {
  currentTrack: PropTypes.object,
  currentPlayingTime: PropTypes.number,
  isPlaying: PropTypes.bool,
  playlist: PropTypes.array,
  showPlayer: PropTypes.bool,
  showFullScreen: PropTypes.bool,
  pauseSong: PropTypes.func,
  playSong: PropTypes.func
};

const mapStateToProps = state => ({
  currentTrack: state.musicPlayer.currentTrack,
  currentPlayingTime: state.musicPlayer.currentTime,
  isPlaying: state.musicPlayer.isPlaying,
  playlist: state.musicPlayer.playlist,
  showPlayer: state.musicPlayer.showPlayer
});

const mapDispatchToProps = dispatch => ({
  pauseSong: elapsedTime => dispatch(actions.pauseSong(elapsedTime)),
  playSong: () => dispatch(actions.playSong())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FullScreenPlayer);
