import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Table } from "reactstrap";
import MusicItem from "./musicItem";
import { _isArrayEmpty } from "utils";
import useEventListener from "services/useEventListener";
import { ReactComponent as Playlist } from "assets/img/svg/playlist.svg";

export const MusicList = props => {
  const [isMobile, setIsMobile] = useState(false);
  const [selectedSong, setSelectedSong] = useState({});
  const selectSong = e => {
    setSelectedSong(e);
  };

  const updateWindowDimensions = () => {
    setIsMobile(window.innerWidth <= 600);
  };

  useEventListener("resize", updateWindowDimensions);

  useEffect(() => {
    updateWindowDimensions();
  }, []);

  const { auth } = props;

  if (_isArrayEmpty(props.songs)) {
    return (
      <div className="empty-list">
        <Playlist className="empty-list-icon" />
        <p className="paragraph mt-3">No songs available</p>
      </div>
    );
  }

  if (isMobile) {
    return (
      <div className="music-item-list">
        {!_isArrayEmpty(props.songs)
          ? props.songs.map((song, index) => (
              <MusicItem
                minify={props.minify}
                noArtist={props.noArtist}
                key={index}
                index={index}
                song={song}
                selectSong={e => selectSong(e)}
                selectedSong={selectedSong}
                auth={auth}
              />
            ))
          : null}
      </div>
    );
  }

  return (
    <Table>
      {!props.minify ? (
        !props.noArtist ? (
          <thead>
            <tr>
              <th></th>
              <th>Title</th>
              <th>Artist</th>
              <th>Album</th>
              <th>Duration</th>
              {props.loginUserId === undefined ? (
                <th />
              ) : props.creatorId === props.loginUserId ? (
                <th>Action</th>
              ) : null}
              {/* {props.creatorId === props.loginUserId ? (<th>Action</th>) : null} */}
            </tr>
          </thead>
        ) : (
          <thead>
            <tr>
              <th></th>
              <th>Title</th>
              <th>Album</th>
              <th>Duration</th>
              {props.creatorId === props.loginUserId ? <th>Action</th> : null}
            </tr>
          </thead>
        )
      ) : null}
      <tbody>
        {!_isArrayEmpty(props.songs)
          ? props.songs.map((song, index) =>
              isMobile ? null : (
                <MusicItem
                  minify={props.minify}
                  noArtist={props.noArtist}
                  key={index}
                  index={index}
                  song={song}
                  songType={props.songType}
                  albumTitle={props.albumTitle}
                  artist={props.artist}
                  selectSong={e => selectSong(e)}
                  selectedSong={selectedSong}
                  auth={auth}
                  albumId={props.albumId}
                />
              )
            )
          : null}
      </tbody>
    </Table>
  );
};

MusicList.propTypes = {
  minify: PropTypes.bool,
  noArtist: PropTypes.bool,
  songs: PropTypes.array,
  selectedSong: PropTypes.object,
  selectSong: PropTypes.func,
  albumTitle: PropTypes.string,
  artist: PropTypes.string,
  creatorId: PropTypes.string,
  loginUserId: PropTypes.string,
  songType: PropTypes.string,
  auth: PropTypes.object,
  albumId: PropTypes.string
};
