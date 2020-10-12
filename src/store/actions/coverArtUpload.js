import axios from "axios";
import toastr from "toastr";
import config from "services/config";
import {
  UPLOAD_SONG_COVER_SUCCESS,
  UPLOAD_SONG_COVER_ERROR,
  UPLOAD_SONG_COVER_IS_LOADING,
  DELETE_UPLOAD_SONG_COVER_ERROR,
  UPLOAD_ALBUM_COVER_SUCCESS,
  UPLOAD_ALBUM_COVER_ERROR,
  UPLOAD_ALBUM_COVER_IS_LOADING,
  DELETE_UPLOAD_ALBUM_COVER_ERROR
} from "./types";

const uploadSongCoverArt = coverArt => ({
  type: UPLOAD_SONG_COVER_SUCCESS,
  coverArt
});

const uploadSongCoverArtError = error => ({
  type: UPLOAD_SONG_COVER_ERROR,
  error
});

const uploadSongCoverArtIsLoading = () => ({
  type: UPLOAD_SONG_COVER_IS_LOADING
});

export const deleteUploadSongCoverArtError = () => ({
  type: DELETE_UPLOAD_SONG_COVER_ERROR
});

const uploadAlbumCoverArt = albumArt => ({
  type: UPLOAD_ALBUM_COVER_SUCCESS,
  albumArt
});

const uploadAlbumCoverArtError = error => ({
  type: UPLOAD_ALBUM_COVER_ERROR,
  error
});

const uploadAlbumCoverArtIsLoading = () => ({
  type: UPLOAD_ALBUM_COVER_IS_LOADING
});

export const deleteUploadAlbumCoverArtError = () => ({
  type: DELETE_UPLOAD_ALBUM_COVER_ERROR
});

export const uploadUserSongCover = coverArt => async dispatch => {
  const token = localStorage.getItem("token");
  try {
    dispatch(uploadSongCoverArtIsLoading());
    const formData = new FormData();
    formData.append("picture", coverArt);
    const response = await axios.post(
      `${config.apiUrl}/upload/picture`,
      formData,
      {
        headers: {
          Authorization: token
        }
      }
    );

    const { data } = response;
    dispatch(uploadSongCoverArt(data.data));
    toastr.success("Song cover upload was successful.");
    formData.delete("picture");
  } catch (e) {
    if (e.response === undefined) {
      dispatch(
        uploadSongCoverArtError(
          "Ooops! something went wrong with your network. Please try again."
        )
      );
    } else {
      const { data } = e.response;
      dispatch(uploadSongCoverArtError(data.message));
    }
  }
};

export const uploadUserAlbumCover = albumArt => async dispatch => {
  try {
    dispatch(uploadAlbumCoverArtIsLoading());
    const formData = new FormData();
    formData.append("picture", albumArt);
    const response = await axios.post(
      `${config.apiUrl}/upload/picture`,
      formData
    );
    const { data } = response;
    dispatch(uploadAlbumCoverArt(data.data));
    toastr.success("Album cover upload was successful.");
    formData.delete("picture");
  } catch (e) {
    if (e.response === undefined) {
      dispatch(
        uploadSongCoverArtError(
          "Ooops! something went wrong with your network. Please try again."
        )
      );
    } else {
      const { data } = e.response;
      dispatch(uploadAlbumCoverArtError(data));
    }
  }
};
