import { SONGS } from "utils/constants";

export const getSongsByParameter = (parameter, value, songs) => {
  if (parameter === "trending") {
    return SONGS.slice(0, 10);
  }

  if (parameter && value) {
    return SONGS.filter(song => song[parameter] === value);
  }

  return SONGS;
};

export const getDataByMusician = (userId, arr) => {
  // return all songs by musician
  if (userId) {
    return arr.filter(item => item.creator === userId);
  }
};
