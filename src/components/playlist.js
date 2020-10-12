import React, { Component } from "react";
// import classnames from 'classnames';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import * as actions from "store/actions";

class PlaylistView extends Component {
  render() {
    return (
      <>
        <div className="playlist-block"></div>
      </>
    );
  }
}

PlaylistView.propTypes = {
  currentTrack: PropTypes.object,
  currentPlayingTime: PropTypes.number,
  isPlaying: PropTypes.bool,
  playlist: PropTypes.array,
  showPlayer: PropTypes.bool,
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
)(PlaylistView);
