import { _updateObject } from "utils";
import * as actionTypes from "../actions/types";

const initialState = {
  currentTrack: null,
  currentTime: null,
  isPlaying: false,
  playlist: null,
  showPlayer: false
};

const playTrack = state =>
  _updateObject(state, {
    isPlaying: true,
    showPlayer: true
  });

const pauseTrack = (state, action) =>
  _updateObject(state, {
    isPlaying: false,
    currentTime: action.currentTime
  });

const createPlaylist = (state, action) =>
  _updateObject(state, {
    currentTrack: null,
    playlist: action.playlist
  });

const setCurrentTrack = (state, action) =>
  _updateObject(state, {
    currentTrack: action.currentTrack
  });

const hidePlayer = state =>
  _updateObject(state, {
    currentTrack: null,
    playlist: null,
    isPlaying: false,
    showPlayer: false
  });

const musicPlayerReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_CURRENT_TRACK:
      return setCurrentTrack(state, action);
    case actionTypes.CREATE_PLAYLIST:
      return createPlaylist(state, action);
    case actionTypes.PLAY_TRACK:
      return playTrack(state);
    case actionTypes.PAUSE_TRACK:
      return pauseTrack(state, action);
    case actionTypes.HIDE_PLAYER:
      return hidePlayer(state);
    default:
      return state;
  }
};

export default musicPlayerReducer;
