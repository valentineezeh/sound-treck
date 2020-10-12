import {
  UPLOAD_SONG_COVER_SUCCESS,
  UPLOAD_SONG_COVER_ERROR,
  UPLOAD_SONG_COVER_IS_LOADING,
  DELETE_UPLOAD_SONG_COVER_ERROR,
  UPLOAD_ALBUM_COVER_SUCCESS,
  UPLOAD_ALBUM_COVER_ERROR,
  UPLOAD_ALBUM_COVER_IS_LOADING,
  DELETE_UPLOAD_ALBUM_COVER_ERROR
} from "store/actions/types";

const initialState = {
  coverArtUrl: null,
  albumArtUrl: null,
  albumUploadError: null,
  error: null,
  coverArtIsLoading: false,
  albumCoverArtIsLoading: false
};

const userSongCoverArt = (state = initialState, action) => {
  switch (action.type) {
    case UPLOAD_SONG_COVER_SUCCESS:
      return {
        ...state,
        coverArtUrl: action.coverArt,
        coverArtIsLoading: false
      };
    case UPLOAD_ALBUM_COVER_SUCCESS:
      return {
        ...state,
        albumArtUrl: action.albumArt,
        albumCoverArtIsLoading: false
      };
    case UPLOAD_SONG_COVER_ERROR:
      return {
        ...state,
        coverArtUrl: null,
        error: action.error,
        coverArtIsLoading: false
      };
    case UPLOAD_ALBUM_COVER_ERROR:
      return {
        ...state,
        albumArtUrl: null,
        albumUploadError: action.error,
        albumCoverArtIsLoading: false
      };
    case UPLOAD_SONG_COVER_IS_LOADING:
      return {
        ...state,
        coverArtIsLoading: true
      };
    case UPLOAD_ALBUM_COVER_IS_LOADING:
      return {
        ...state,
        albumCoverArtIsLoading: true
      };
    case DELETE_UPLOAD_SONG_COVER_ERROR:
      return {
        error: ""
      };
    case DELETE_UPLOAD_ALBUM_COVER_ERROR:
      return {
        albumUploadError: ""
      };
    default:
      return state;
  }
};

export default userSongCoverArt;
