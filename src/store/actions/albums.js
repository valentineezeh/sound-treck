import toastr from "toastr";
import * as actionTypes from "./types";
import { axios, _catchAxiosError } from "services/axios";

export const getAllAlbumsStart = () => ({
  type: actionTypes.GET_ALL_ALBUMS_START
});

export const deleteAlbum = albumId => ({
  type: actionTypes.DELETE_USER_ALBUM,
  albumId
});

export const deleteAlbumIsLoading = () => ({
  type: actionTypes.DELETE_USER_ALBUM_ISLOADING
});

export const getAllAlbumsSuccess = data => ({
  type: actionTypes.GET_ALL_ALBUMS_SUCCESS,
  data
});

export const getAllAlbumsFail = error => ({
  type: actionTypes.GET_ALL_ALBUMS_FAIL,
  error
});

export const uploadAlbumSuccess = album => ({
  type: actionTypes.UPLOAD_USER_ALBUM_SUCCESS,
  album
});

export const uploadAlbumError = error => ({
  type: actionTypes.UPLOAD_USER_ALBUM_ERROR,
  error
});

export const uploadAlbumIsLoading = () => ({
  type: actionTypes.UPLOAD_USER_ALBUM_ISLOADING
});

export const deleteUploadAlbumError = () => ({
  type: actionTypes.DELETE_UPLOAD_USER_ALBUM_ERROR
});

export const updateAlbumTitleAndCoverSuccess = updatedAlbumItem => ({
  type: actionTypes.UPDATE_ALBUM_TITLE_AND_COVER_SUCCESS,
  updatedAlbumItem
});

export const updateAlbumTitleAndCoverError = error => ({
  type: actionTypes.UPDATE_ALBUM_TITLE_AND_COVER_ERROR,
  error
});

export const updateAlbumTitleAndCoverIsLoading = () => ({
  type: actionTypes.UPDATE_ALBUM_TITLE_AND_COVER_ISLOADING
});

export const deleteUpdateAlbumTitleAndCoverError = () => ({
  type: actionTypes.DELETE_UPDATE_ALBUM_TITLE_AND_COVER_ERROR
});

export const getAllAlbums = (pageNumber, onError = false) => async dispatch => {
  dispatch(getAllAlbumsStart());

  try {
    const response = await axios({
      method: "get",
      url: `/api/albums`,
      params: { limit: 10, page: pageNumber }
    });

    const { data } = response;
    dispatch(getAllAlbumsSuccess(data.data));
  } catch (e) {
    _catchAxiosError(e, onError);

    dispatch(getAllAlbumsFail("Could not get albums, please try again"));
  }
};

export const uploadUserAlbum = (
  albumData,
  onError = false
) => async dispatch => {
  dispatch(uploadAlbumIsLoading());
  try {
    const response = await axios({
      method: "post",
      url: `/api/albums`,
      data: albumData
    });
    const { data } = response;
    dispatch(uploadAlbumSuccess(data));
    toastr.success("You have successfully posted a album.");
  } catch (e) {
    if (e.response === undefined) {
      dispatch(
        uploadAlbumError(
          "Ooops! something went wrong with your network. Please try again."
        )
      );
    } else {
      const { data } = e.response;
      _catchAxiosError(e, onError);
      dispatch(uploadAlbumError(data));
    }
  }
};

export const deleteAlbumHandler = (
  albumId,
  onError = false
) => async dispatch => {
  dispatch(deleteAlbumIsLoading());
  try {
    const response = await axios({
      method: "delete",
      url: `/api/albums/${albumId}`
    });
    const { data } = response;
    dispatch(deleteAlbum(albumId));
    toastr.success(data.message);
  } catch (e) {
    if (e.response === undefined) {
      toastr.error(
        "Ooops! something went wrong with your network. Please try again."
      );
    } else {
      _catchAxiosError(e, onError);
      toastr.error("Ooops something went wrong, when deleting this song.");
    }
  }
};

export const updateAlbumTitleAndCover = (
  payload,
  onError = false
) => async dispatch => {
  try {
    dispatch(updateAlbumTitleAndCoverIsLoading());
    const response = await axios({
      method: "put",
      url: `/api/albums/${payload.albumId}`,
      data: payload
    });
    const { data } = response;
    dispatch(updateAlbumTitleAndCoverSuccess(data));
    toastr.success(data.message);
  } catch (e) {
    if (e.response === undefined) {
      dispatch(
        uploadAlbumError(
          "Ooops! something went wrong with your network. Please try again."
        )
      );
    } else {
      const { data } = e.response;
      _catchAxiosError(e, onError);
      dispatch(uploadAlbumError(data));
    }
  }
};
