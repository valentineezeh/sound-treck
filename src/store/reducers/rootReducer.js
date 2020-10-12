import { combineReducers } from "redux";
import albums from "./albums";
import musician from "./musician";
import musicPlayer from "./musicPlayer";
import auth from "./auth";
import songs from "./songs";
import getUserRole from "./selectRole";
import signupReducer from "./auth/signUp";
import loginReducer from "./auth/login";
import userMusicUploader from "./musicUpload";
import userSongCoverArt from "./coverArtUpload";
import userProfileUploader from "./uploadProfileImg";
import postNewSong from "./uploadUserSong";
import forgetPasswordReducer from "./auth/forgetPassword";
import resetPasswordReducer from "./auth/resetPassword";
import userUploadAlbum from "./uploadAlbum";
import musicians from "./allMusician";
import updateSongByUser from "./updateUserSong";
import updateSongInAlbumByUser from "./updateUserSongInAlbum";

export default combineReducers({
  albums,
  auth,
  musician,
  musicPlayer,
  songs,
  getUserRole,
  signupReducer,
  loginReducer,
  userMusicUploader,
  userSongCoverArt,
  userProfileUploader,
  postNewSong,
  forgetPasswordReducer,
  resetPasswordReducer,
  userUploadAlbum,
  musicians,
  updateSongByUser,
  updateSongInAlbumByUser
});
