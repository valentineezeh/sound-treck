import React from "react";
import { NavLink } from "react-router-dom";
import { ReactComponent as AlbumIcon } from "assets/img/svg/cd.svg";
import { ReactComponent as ArtistIcon } from "assets/img/svg/artists.svg";
import { ReactComponent as MusicIcon } from "assets/img/svg/music.svg";
import { ReactComponent as GenreIcon } from "assets/img/svg/genre.svg";
import { ReactComponent as HomeIcon } from "assets/img/svg/home.svg";

export const BottomNav = () => {
  return (
    <div className="bottomNav">
      <div className="container-fluid h-100">
        <div className="row h-100">
          <div className="col h-100 p-0">
            <div className="bottomNav__item">
              <NavLink
                exact
                className="bottomNav__link"
                to="/magic"
                data-tip="home"
              >
                <HomeIcon className="bottomNav__icon" />
                <span className="bottomNav__text">Home</span>
              </NavLink>
            </div>
          </div>

          <div className="col h-100 p-0">
            <div className="bottomNav__item">
              <NavLink
                exact
                className="bottomNav__link"
                to="/magic/songs"
                data-tip="songs"
              >
                <MusicIcon className="bottomNav__icon" />
                <span className="bottomNav__text">Songs</span>
              </NavLink>
            </div>
          </div>

          <div className="col h-100 p-0">
            <div className="bottomNav__item">
              <NavLink
                exact
                className="bottomNav__link"
                to="/magic/albums"
                data-tip="albums"
              >
                <AlbumIcon className="bottomNav__icon" />
                <span className="bottomNav__text">Albums</span>
              </NavLink>
            </div>
          </div>

          <div className="col h-100 p-0">
            <div className="bottomNav__item">
              <NavLink
                exact
                className="bottomNav__link"
                to="/magic/artists"
                data-tip="artists"
              >
                <ArtistIcon className="bottomNav__icon" />
                <span className="bottomNav__text">Artists</span>
              </NavLink>
            </div>
          </div>

          <div className="col h-100 p-0">
            <div className="bottomNav__item">
              <NavLink
                exact
                className="bottomNav__link"
                to="/magic/genres"
                data-tip="genre"
              >
                <GenreIcon className="bottomNav__icon" />
                <span className="bottomNav__text">Genres</span>
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
