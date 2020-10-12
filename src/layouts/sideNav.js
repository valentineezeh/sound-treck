import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import ReactTooltip from "react-tooltip";
import classnames from "classnames";
import { ReactComponent as AlbumIcon } from "assets/img/svg/cd.svg";
import { ReactComponent as ArtistIcon } from "assets/img/svg/artists.svg";
import { ReactComponent as MusicIcon } from "assets/img/svg/music.svg";
import { ReactComponent as GenreIcon } from "assets/img/svg/genre.svg";
import { ReactComponent as Playlist } from "assets/img/svg/playlist.svg";
import { ReactComponent as HomeIcon } from "assets/img/svg/home.svg";
import { ReactComponent as ExpandIcon } from "assets/img/svg/long-arrow-left.svg";
import userIcon from "assets/img/svg/user.svg";
import logo from "assets/img/logo-mini.png";

export const SideBar = () => {
  const [expand, setExpand] = useState(false);
  const userId = localStorage.getItem("currentUser");

  return (
    <div className="sidebar">
      <div
        className={classnames("sidebar__inner", {
          "sidebar__inner--expanded": expand
        })}
      >
        <div className="sidebar-expand" onClick={() => setExpand(!expand)}>
          <ExpandIcon className="sidebar-menu__icon" />
        </div>

        <div className="sidebar__logo">
          <NavLink to="/">
            <img src={logo} className="img-fluid" alt="logo" />
          </NavLink>
        </div>

        <ul className="sidebar-menu">
          <li className="sidebar-menu__item">
            <NavLink
              exact
              className="sidebar-menu__link"
              to="/magic"
              data-tip="home"
            >
              <HomeIcon className="sidebar-menu__icon" />
              <span className="sidebar-menu__text">Home</span>
            </NavLink>
            <ReactTooltip place="top" type="dark" effect="float" />
          </li>

          <li className="sidebar-menu__item">
            <NavLink
              exact
              className="sidebar-menu__link"
              to="/magic/songs"
              data-tip="songs"
            >
              <MusicIcon className="sidebar-menu__icon" />
              <span className="sidebar-menu__text">Songs</span>
            </NavLink>
            <ReactTooltip place="top" type="dark" effect="float" />
          </li>

          <li className="sidebar-menu__item">
            <NavLink
              exact
              className="sidebar-menu__link"
              to="/magic/albums"
              data-tip="albums"
            >
              <AlbumIcon className="sidebar-menu__icon" />
              <span className="sidebar-menu__text">Albums</span>
            </NavLink>
            <ReactTooltip place="top" type="dark" effect="float" />
          </li>

          <li className="sidebar-menu__item">
            <NavLink
              exact
              className="sidebar-menu__link"
              to="/magic/artists"
              data-tip="artists"
            >
              <ArtistIcon className="sidebar-menu__icon" />
              <span className="sidebar-menu__text">Artists</span>
            </NavLink>
            <ReactTooltip place="top" type="dark" effect="float" />
          </li>

          <li className="sidebar-menu__item">
            <NavLink
              exact
              className="sidebar-menu__link"
              to="/magic/genres"
              data-tip="genre"
            >
              <GenreIcon className="sidebar-menu__icon" />
              <span className="sidebar-menu__text">Genres</span>
            </NavLink>
            <ReactTooltip place="top" type="dark" effect="float" />
          </li>

          {/* {userId ? (
            <li className="sidebar-menu__item">
              <NavLink
                exact
                className="sidebar-menu__link"
                to={`/magic/playlist/${userId}`}
                data-tip="playlist"
              >
                <Playlist className="sidebar-menu__icon" />
                <span className="sidebar-menu__text">Playlist</span>
              </NavLink>
              <ReactTooltip place="top" type="dark" effect="float" />
            </li>
          ) : null} */}

          {userId ? (
            <div className="sidebar__profile">
              {userId ? (
                <a href={`/user/${userId}`} data-tip="view profile">
                  <img src={userIcon} className="img-fluid" alt="profile" />
                  <span className="sidebar-menu__text">View Profile</span>
                </a>
              ) : null}
              <ReactTooltip place="top" type="dark" effect="float" />
            </div>
          ) : null}
        </ul>
      </div>
    </div>
  );
};
