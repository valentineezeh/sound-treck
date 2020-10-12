import { axios } from "services/axios";

const token = localStorage.getItem("token");

export const getAllSongsApi = () => {
  return axios({
    method: "get",
    url: `/api/musics`
  });
};

export const getAllAlbumsApi = () => {
  return axios({
    method: "get",
    url: `/api/albums`
  });
};

export const getMusicianDetailsApi = userId => {
  return axios({
    method: "get",
    url: `/api/users/${userId}`
  });
};

export const getMusicianSongs = id => {
  return axios({
    method: "get",
    url: `/api/musics/${id}`
  });
};

export const getMusicianAlbums = id => {
  return axios({
    method: "get",
    url: `/api/albums/${id}/artist`
  });
};
