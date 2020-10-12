import isEmpty from "is-empty";
import {
  UPDATE_USER_ALBUM_SONG_SUCCESS,
  UPDATE_USER_ALBUM_SONG_ERROR,
  UPDATE_USER_ALBUM_SONG_ISLOADING,
  DELETE_UPDATE_USER_ALBUM_SONG_ERROR,
  UPLOAD_UPDATED_SONG_IN_ALBUM_ERROR,
  UPLOAD_UPDATED_SONG_IN_ALBUM_SUCCESS,
  UPLOAD_UPDATED_SONG_IN_ALBUM_ISLOADING,
  DELETE_UPLOAD_UPDATED_SONG_IN_ALBUM_ERROR,
  UPLOAD_UPDATED_SONG_COVER_IN_ALBUM_SUCCESS,
  UPLOAD_UPDATED_SONG_COVER_IN_ALBUM_ERROR,
  UPLOAD_UPDATED_SONG_COVER_IN_ALBUM_ISLOADING,
  DELETE_UPLOAD_UPDATED_SONG_COVER_IN_ALBUM_ERROR
} from "../actions/types.js";

const initialState = {
  updatedSongInAlbum: null,
  error: null,
  updatedSongInAlbumIsLoading: false,
  updatedSongInAlbumSuccess: false,
  uploadUserAlbumSong: null,
  uploadUserAlbumSongSuccess: false,
  uploadUserAlbumSongError: null,
  uploadUserAlbumSongIsLoading: false,

  uploadUserAlbumCoverSong: null,
  uploadUserAlbumSongCoverSuccess: false,
  uploadUserAlbumSongCoverError: null,
  uploadUserAlbumSongCoverIsLoading: false
};

const updateSongInAlbumByUser = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_USER_ALBUM_SONG_SUCCESS:
      return {
        ...state,
        updatedSongInAlbum: action.updatedSong,
        updatedSongInAlbumIsLoading: false,
        updatedSongInAlbumSuccess: !isEmpty(action.updatedSong)
      };
    case UPLOAD_UPDATED_SONG_IN_ALBUM_SUCCESS:
      return {
        ...state,
        uploadUserAlbumSong: action.newUpdateSong,
        uploadUserAlbumSongSuccess: !isEmpty(action.newUpdateSong),
        uploadUserAlbumSongIsLoading: false
      };
    case UPLOAD_UPDATED_SONG_COVER_IN_ALBUM_SUCCESS:
      return {
        ...state,
        uploadUserAlbumCoverSong: action.newUpdateSongCover,
        uploadUserAlbumSongCoverSuccess: !isEmpty(action.newUpdateSongCover),
        uploadUserAlbumSongCoverIsLoading: false
      };
    case UPDATE_USER_ALBUM_SONG_ERROR:
      return {
        ...state,
        updatedSongInAlbum: null,
        updatedSongInAlbumIsLoading: false,
        error: action.error
      };
    case UPLOAD_UPDATED_SONG_IN_ALBUM_ERROR:
      return {
        ...state,
        uploadUserAlbumSongError: action.error,
        uploadUserAlbumSongIsLoading: false
      };
    case UPLOAD_UPDATED_SONG_COVER_IN_ALBUM_ERROR:
      return {
        ...state,
        uploadUserAlbumSongCoverError: action.error,
        uploadUserAlbumSongCoverIsLoading: false
      };
    case UPDATE_USER_ALBUM_SONG_ISLOADING:
      return {
        ...state,
        updatedSongInAlbumIsLoading: true
      };
    case UPLOAD_UPDATED_SONG_IN_ALBUM_ISLOADING:
      return {
        ...state,
        uploadUserAlbumSongIsLoading: true
      };
    case UPLOAD_UPDATED_SONG_COVER_IN_ALBUM_ISLOADING:
      return {
        ...state,
        uploadUserAlbumSongCoverIsLoading: true
      };
    case DELETE_UPDATE_USER_ALBUM_SONG_ERROR:
      return {
        error: null,
        updatedSongInAlbumIsLoading: false
      };
    case DELETE_UPLOAD_UPDATED_SONG_IN_ALBUM_ERROR:
      return {
        ...state,
        uploadUserAlbumSongError: null,
        uploadUserAlbumSongIsLoading: false
      };
    case DELETE_UPLOAD_UPDATED_SONG_COVER_IN_ALBUM_ERROR:
      return {
        ...state,
        uploadUserAlbumSongCoverError: null,
        uploadUserAlbumSongCoverIsLoading: false
      };
    default:
      return state;
  }
};

export default updateSongInAlbumByUser;
