import axios from "axios";
import toastr from "toastr";
import config from "services/config";
import {
  UPDATE_USER_SONG_SUCCESS,
  UPDATE_USER_SONG_ERROR,
  UPDATE_USER_SONG_IS_LOADING,
  DELETE_UPDATE_USER_SONG_ERROR
} from "./types";

const updateUserSongSuccess = updatedSong => ({
  type: UPDATE_USER_SONG_SUCCESS,
  updatedSong
});

const updateUserSongError = error => ({
  type: UPDATE_USER_SONG_ERROR,
  error
});

const updateSongIsLoading = () => ({
  type: UPDATE_USER_SONG_IS_LOADING
});

export const deleteUpdateSongError = () => ({
  type: DELETE_UPDATE_USER_SONG_ERROR
});

export const updateUserSong = dataObj => async dispatch => {
  dispatch(updateSongIsLoading());
  try {
    const response = await axios.put(
      `${config.apiUrl}/musics/${dataObj.id}`,
      dataObj
    );
    const { data } = response;
    dispatch(updateUserSongSuccess(data));
    toastr.success("You have successfully updated your song.");
  } catch (e) {
    if (e.response === undefined) {
      dispatch(
        updateUserSongError(
          "Ooops! something went wrong with your network. Please try again."
        )
      );
    } else {
      const { data } = e.response;
      dispatch(updateUserSongError(data));
    }
  }
};
