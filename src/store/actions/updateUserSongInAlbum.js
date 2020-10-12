import axios from "axios";
import toastr from "toastr";
import config from "services/config";
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
} from "./types";

const updateUserAlbumSongSuccess = updatedSong => ({
  type: UPDATE_USER_ALBUM_SONG_SUCCESS,
  updatedSong
});

const updateUserAlbumSongError = error => ({
  type: UPDATE_USER_ALBUM_SONG_ERROR,
  error
});

const uploadUpdatedSongInAlbumError = error => ({
  type: UPLOAD_UPDATED_SONG_IN_ALBUM_ERROR,
  error
});

const uploadUpdatedSongCoverInAlbumError = error => ({
  type: UPLOAD_UPDATED_SONG_COVER_IN_ALBUM_ERROR,
  error
});

const uploadUpdatedSongInAlbumSuccess = newUpdateSong => ({
  type: UPLOAD_UPDATED_SONG_IN_ALBUM_SUCCESS,
  newUpdateSong
});

const uploadUpdatedSongCoverInAlbumSuccess = newUpdateSongCover => ({
  type: UPLOAD_UPDATED_SONG_COVER_IN_ALBUM_SUCCESS,
  newUpdateSongCover
});

const uploadUpdatedSongInAlbumIsLoading = () => ({
  type: UPLOAD_UPDATED_SONG_IN_ALBUM_ISLOADING
});

const uploadUpdatedSongCoverInAlbumIsLoading = () => ({
  type: UPLOAD_UPDATED_SONG_COVER_IN_ALBUM_ISLOADING
});

export const deleteUploadUpdatedSongInAlbumError = () => ({
  type: DELETE_UPLOAD_UPDATED_SONG_IN_ALBUM_ERROR
});

export const deleteUploadUpdatedSongCoverInAlbumError = () => ({
  type: DELETE_UPLOAD_UPDATED_SONG_COVER_IN_ALBUM_ERROR
});

const updateAlbumSongIsLoading = () => ({
  type: UPDATE_USER_ALBUM_SONG_ISLOADING
});

export const deleteUpdateSongError = () => ({
  type: DELETE_UPDATE_USER_ALBUM_SONG_ERROR
});

export const updateUserSongInAlbum = dataObj => async dispatch => {
  try {
    dispatch(updateAlbumSongIsLoading());
    // update the url to the main url

    const response = await axios.put(
      `${config.apiUrl}/album/${dataObj.albumId}/music/${dataObj.albumSongId}`,
      dataObj
    );
    const { data } = response;
    dispatch(updateUserAlbumSongSuccess(data));
    toastr.success("You have successfully updated your song.");
  } catch (e) {
    if (e.response === undefined) {
      dispatch(
        updateUserAlbumSongError(
          "Ooops! something went wrong with your network. Please try again."
        )
      );
    } else {
      const { data } = e.response;
      dispatch(updateUserAlbumSongError(data.message));
    }
  }
};

// method that handles song upload in an album
export const uploadUpdatedSongInAlbum = payload => async dispatch => {
  try {
    dispatch(uploadUpdatedSongInAlbumIsLoading());

    const formData = new FormData();
    formData.append("update", payload.newSongContent);
    formData.append("removeFileName", payload.getOldSongContent);

    const formObj = {};
    for (var pair of formData.entries()) {
      formObj[pair[0]] = pair[1];
    }

    const response = await axios({
      method: "put",
      url: `${config.apiUrl}/update/album/music`,
      data: formData,
      headers: {
        "content-Type": "multipart/form-data"
      }
    });
    const { data } = response;
    dispatch(uploadUpdatedSongInAlbumSuccess(data.data));
    toastr.success("Song Update was successful");
  } catch (e) {
    if (e.response === undefined) {
      dispatch(
        uploadUpdatedSongInAlbumError(
          "Ooops! something went wrong with your network. Please try again."
        )
      );
    } else {
      const { data } = e.response;
      dispatch(uploadUpdatedSongInAlbumError(data.message));
    }
  }
};

// Method that handles image update upload inside an album.
export const uploadUpdatedSongCoverInAlbum = payload => async dispatch => {
  try {
    dispatch(uploadUpdatedSongCoverInAlbumIsLoading());

    const formData = new FormData();
    formData.append("update", payload.newSongCoverContent);
    formData.append("removeFileName", payload.getOldSongCoverContent);

    const response = await axios({
      method: "put",
      url: `${config.apiUrl}/update/album/music`,
      data: formData,
      headers: {
        "content-Type": "multipart/form-data"
      }
    });

    const { data } = response;
    dispatch(uploadUpdatedSongCoverInAlbumSuccess(data.data));
    toastr.success("Song Cover Update was successful");
  } catch (e) {
    if (e.response === undefined) {
      dispatch(
        uploadUpdatedSongCoverInAlbumError(
          "Ooops! something went wrong with your network. Please try again."
        )
      );
    } else {
      const { data } = e.response;
      dispatch(uploadUpdatedSongCoverInAlbumError(data.message));
    }
  }
};
