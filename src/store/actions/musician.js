import toastr from "toastr";
import * as actionTypes from "./types";
import { axios, _catchAxiosError } from "services/axios";
import {
  getMusicianDetailsApi,
  // eslint-disable-next-line no-unused-vars
  getAllSongsApi,
  // eslint-disable-next-line no-unused-vars
  getAllAlbumsApi,
  getMusicianSongs,
  getMusicianAlbums
} from "controllers/music";

export const getMusicianDetailsStart = () => ({
  type: actionTypes.GET_MUSICIAN_DETAILS_START
});

export const getMusicianDetailsSuccess = (profile, songs, albums) => ({
  type: actionTypes.GET_MUSICIAN_DETAILS_SUCCESS,
  profile,
  songs,
  albums
});

export const getMusicianDetailsFail = error => ({
  type: actionTypes.GET_MUSICIAN_DETAILS_FAIL,
  error
});

export const deleteSong = songId => ({
  type: actionTypes.DELETE_SONG_SUCCESS,
  songId
});

export const deleteSongIsLoading = () => ({
  type: actionTypes.DELETE_SONG_ISLOADING
});

const deleteSongInAlbumSuccess = songId => ({
  type: actionTypes.DELETE_SONG_IN_ALBUM_SUCCESS,
  songId
});

const deleteSongInAlbumError = error => ({
  type: actionTypes.DELETE_SONG_IN_ALBUM_ERROR,
  error
});

const deleteSongInAlbumIsLoading = () => ({
  type: actionTypes.DELETE_SONG_IN_ALBUM_ISLOADING
});

export const deleteSongInAlbum = (
  songId,
  onError = false
) => async dispatch => {
  try {
    dispatch(deleteSongInAlbumIsLoading());
    const response = await axios({
      method: "delete",
      url: `/api/remove/album/music/${songId}`
    });
    const { data } = response;
    dispatch(deleteSongInAlbumSuccess(songId));
    toastr.success(data.message);
  } catch (e) {
    const { data } = e.response;
    _catchAxiosError(e, onError);
    dispatch(deleteSongInAlbumError(data));
    toastr.error("Ooops something went wrong, please try again");
  }
};

export const deleteSongHandler = (
  songId,
  onError = false
) => async dispatch => {
  dispatch(deleteSongIsLoading());
  try {
    const response = await axios({
      method: "delete",
      url: `/api/musics/${songId}`
    });
    const { data } = response;
    dispatch(deleteSong(songId));
    toastr.success(data.message);
  } catch (e) {
    _catchAxiosError(e, onError);
    toastr.error("Ooops something went wrong, please try again");
  }
};

export const getMusicianDetails = (
  userId,
  onError = false
) => async dispatch => {
  // get musician details
  // get musician songs
  // get musician albums

  dispatch(getMusicianDetailsStart());

  try {
    const profileResponse = await getMusicianDetailsApi(userId);

    let musicianSongs = await getMusicianSongs(userId);

    let musicianAlbum = await getMusicianAlbums(userId);

    const profileData = { ...profileResponse.data };

    if (musicianSongs.data.data.length === 0) {
      musicianSongs = [];
    } else {
      musicianSongs = musicianSongs.data.data;
    }

    if (musicianAlbum.data.data.length === 0) {
      musicianAlbum = [];
    } else {
      musicianAlbum = musicianAlbum.data.data;
    }

    const songData = [...musicianSongs];

    const albumData = [...musicianAlbum];

    dispatch(getMusicianDetailsSuccess(profileData, songData, albumData));
  } catch (e) {
    _catchAxiosError(e, onError);

    dispatch(
      getMusicianDetailsFail("Could not get musician info, please try again")
    );
  }
};

export const updateMusicianProfileStart = () => ({
  type: actionTypes.UPDATE_MUSICIAN_PROFILE_START
});

export const updateMusicianProfileSuccess = profile => ({
  type: actionTypes.UPDATE_MUSICIAN_PROFILE_SUCCESS,
  profile
});

export const updateMusicianProfileFail = error => ({
  type: actionTypes.UPDATE_MUSICIAN_PROFILE_FAIL,
  error
});

export const deleteUpdateMusicianProfileFail = () => ({
  type: actionTypes.DELETE_MUSICIAN_PROFILE_FAIL_ERROR
});

export const updateMusicianProfile = (
  userData,
  onError = false
) => async dispatch => {
  dispatch(updateMusicianProfileStart());
  const userId = localStorage.getItem("currentUser");
  try {
    const response = await axios({
      method: "put",
      url: `/api/users/${userId}`,
      data: userData
    });
    const { data } = response;
    dispatch(updateMusicianProfileSuccess(data));
    toastr.success("User profile has successfully been updated.");
  } catch (e) {
    _catchAxiosError(e, onError);
    dispatch(
      updateMusicianProfileFail("Could not update profile, please try again")
    );
  }
};
