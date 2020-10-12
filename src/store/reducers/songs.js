import { _updateObject } from "utils";
import * as actionTypes from "../actions/types";

const initialState = {
  error: null,
  loading: false,
  data: [],
  meta: null,
  userSong: null
};

const getAllSongsStart = state =>
  _updateObject(state, { error: null, loading: true });

const getAllSongsSuccess = (state, action) =>
  _updateObject(state, {
    error: null,
    loading: false,
    data: action.data,
    meta: action.meta
  });

const getAllSongsFail = (state, action) =>
  _updateObject(state, {
    error: action.error,
    loading: false
  });

const songsReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_ALL_SONGS_START:
      return getAllSongsStart(state);
    case actionTypes.GET_ALL_SONGS_SUCCESS:
      return getAllSongsSuccess(state, action);
    case actionTypes.GET_ALL_SONGS_FAIL:
      return getAllSongsFail(state, action);
    case actionTypes.GET_SINGLE_USER_SONG:
      return {
        ...state,
        userSong: action.userSongs
      };
    default:
      return state;
  }
};

export default songsReducer;
