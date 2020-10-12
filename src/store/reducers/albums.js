import { _updateObject } from "utils";
import * as actionTypes from "../actions/types";
import isEmpty from "is-empty";

const initialState = {
  error: null,
  loading: false,
  data: [],
  updateAlbumTitleAndCoverSuccess: false,
  updateAlbumTitleAndCoverIsLoading: false,
  updateAlbumTitleAndCoverError: null
};

const getAllAlbumsStart = state =>
  _updateObject(state, { error: null, loading: true });

const getAllAlbumsSuccess = (state, action) =>
  _updateObject(state, {
    error: null,
    loading: false,
    data: action.data
  });

const getAllAlbumsFail = (state, action) =>
  _updateObject(state, {
    error: action.error,
    loading: false
  });

const albumsReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_ALL_ALBUMS_START:
      return getAllAlbumsStart(state);
    case actionTypes.GET_ALL_ALBUMS_SUCCESS:
      return getAllAlbumsSuccess(state, action);
    case actionTypes.GET_ALL_ALBUMS_FAIL:
      return getAllAlbumsFail(state, action);
    case actionTypes.UPDATE_ALBUM_TITLE_AND_COVER_SUCCESS:
      return {
        ...state,
        updateAlbumTitleAndCoverSuccess: !isEmpty(action.updatedAlbumItem),
        updateAlbumTitleAndCoverIsLoading: false,
        updateAlbumTitleAndCoverError: null
      };
    case actionTypes.UPDATE_ALBUM_TITLE_AND_COVER_ERROR:
      return {
        ...state,
        updateAlbumTitleAndCoverError: action.error,
        updateAlbumTitleAndCoverIsLoading: false
      };
    case actionTypes.UPDATE_ALBUM_TITLE_AND_COVER_ISLOADING:
      return {
        ...state,
        updateAlbumTitleAndCoverIsLoading: true
      };
    case actionTypes.DELETE_UPDATE_ALBUM_TITLE_AND_COVER_ERROR:
      return {
        ...state,
        updateAlbumTitleAndCoverError: ""
      };
    default:
      return state;
  }
};

export default albumsReducer;
