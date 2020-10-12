/* eslint-disable no-case-declarations */
import isEmpty from "is-empty";
import { _updateObject } from "utils";
import * as actionTypes from "../actions/types";

const initialState = {
  error: null,
  loading: false,
  profile: null,
  songs: [],
  albums: [],
  deleteSongLoading: false,
  deleteAlbumLoading: false,
  deleteAlbumSuccess: false
};

const getMusicianDetailsStart = state =>
  _updateObject(state, { error: null, loading: true });

const getMusicianDetailsSuccess = (state, action) => {
  return _updateObject(state, {
    error: null,
    loading: false,
    profile: action.profile,
    songs: action.songs,
    albums: action.albums
  });
};

const getMusicianDetailsFail = (state, action) =>
  _updateObject(state, {
    error: action.error,
    loading: false
  });

const updateMusicianProfileStart = state =>
  _updateObject(state, { error: null, loading: true });

const updateMusicianProfileSuccess = (state, action) =>
  _updateObject(state, {
    error: null,
    loading: false,
    profile: action.profile,
    updateProfileSuccess: !isEmpty(action.profile)
  });

const updateMusicianProfileFail = (state, action) =>
  _updateObject(state, {
    error: action.error,
    loading: false
  });

const deleteUpdateMusicianProfileFailError = state =>
  _updateObject(state, {
    error: null,
    loading: false
  });

const musicianReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_MUSICIAN_DETAILS_START:
      return getMusicianDetailsStart(state);
    case actionTypes.GET_MUSICIAN_DETAILS_SUCCESS:
      return {
        ...state,
        error: null,
        loading: false,
        profile: action.profile ? action.profile : null,
        songs: action.songs,
        albums: action.albums
      };
    //getMusicianDetailsSuccess(state, action)
    case actionTypes.DELETE_SONG_SUCCESS:
      const deleteSong = state.songs.filter(i => i._id !== action.songId);
      return {
        ...state,
        songs: deleteSong,
        deleteSongLoading: false
      };
    case actionTypes.DELETE_SONG_ISLOADING:
      return {
        ...state,
        deleteSongLoading: true
      };
    case actionTypes.DELETE_USER_ALBUM:
      const deleteAlbum = state.albums.filter(i => i._id !== action.albumId);
      return {
        ...state,
        albums: deleteAlbum,
        deleteAlbumLoading: false,
        deleteAlbumSuccess: true
      };
    case actionTypes.DELETE_SONG_IN_ALBUM_SUCCESS:
      const deleteSongInAlbumArray = state.albums.map(item => {
        const removeSong = item.album.filter(song => {
          return song._id !== action.songId;
        });
        return {
          ...item,
          album: removeSong
        };
      });
      return {
        ...state,
        albums: deleteSongInAlbumArray
      };
    case actionTypes.DELETE_USER_ALBUM_ISLOADING:
      return {
        ...state,
        deleteAlbumLoading: true
      };
    case actionTypes.GET_MUSICIAN_DETAILS_FAIL:
      return getMusicianDetailsFail(state, action);
    case actionTypes.UPDATE_MUSICIAN_PROFILE_START:
      return updateMusicianProfileStart(state);
    case actionTypes.UPDATE_MUSICIAN_PROFILE_SUCCESS:
      return updateMusicianProfileSuccess(state, action);
    case actionTypes.UPDATE_MUSICIAN_PROFILE_FAIL:
      return updateMusicianProfileFail(state, action);
    case actionTypes.DELETE_MUSICIAN_PROFILE_FAIL_ERROR:
      return deleteUpdateMusicianProfileFailError(state);
    default:
      return state;
  }
};

export default musicianReducer;
