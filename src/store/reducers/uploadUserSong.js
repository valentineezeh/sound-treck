import isEmpty from "is-empty";
import {
  POST_USER_SONG_SUCCESS,
  POST_USER_SONG_ERROR,
  POST_USER_SONG_IS_LOADING,
  DELETE_POST_USER_SONG_ERROR
} from "../actions/types";

const initialState = {
  newSong: null,
  error: null,
  newSongIsLoading: false,
  postSongSuccess: false
};

const postNewSong = (state = initialState, action) => {
  switch (action.type) {
    case POST_USER_SONG_SUCCESS:
      return {
        ...state,
        newSong: action.postSong,
        newSongIsLoading: false,
        postSongSuccess: !isEmpty(action.postSong)
      };
    case POST_USER_SONG_ERROR:
      return {
        ...state,
        newSong: null,
        newSongIsLoading: false,
        error: action.error
      };
    case POST_USER_SONG_IS_LOADING:
      return {
        ...state,
        newSongIsLoading: true
      };
    case DELETE_POST_USER_SONG_ERROR:
      return {
        error: ""
      };
    default:
      return state;
  }
};

export default postNewSong;
