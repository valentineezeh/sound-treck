import { _isObjectEmpty, _isArrayEmpty } from "utils";
import * as actionTypes from "./types";

export const playTrack = () => ({
  type: actionTypes.PLAY_TRACK
});

export const pauseTrack = currentTime => ({
  type: actionTypes.PAUSE_TRACK,
  currentTime
});

export const hidePlayer = () => ({
  type: actionTypes.HIDE_PLAYER
});

export const createPlaylist = playlist => ({
  type: actionTypes.CREATE_PLAYLIST,
  playlist
});

export const setCurrentTrack = currentTrack => ({
  type: actionTypes.SET_CURRENT_TRACK,
  currentTrack
});

export const playSong = () => dispatch => {
  // play current song
  dispatch(playTrack());
};

export const setPlaylist = songArray => dispatch => {
  if (!_isArrayEmpty(songArray)) {
    // create playlist
    dispatch(createPlaylist(songArray));
  }
};

export const setSongToBePlayed = songObject => dispatch => {
  if (!_isObjectEmpty(songObject)) {
    // set current track
    dispatch(setCurrentTrack(songObject));
    // play current song
    dispatch(playTrack());
  }
};

export const pauseSong = currentTime => dispatch => {
  // pause current song
  dispatch(pauseTrack(currentTime));
};

export const hideMusicPlayer = () => dispatch => {
  dispatch(hidePlayer());
};
