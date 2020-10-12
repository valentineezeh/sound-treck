import React, { useCallback, useEffect, useState } from "react";
import Loader from "react-loader-spinner";
import { useDispatch, connect } from "react-redux";
import PropTypes from "prop-types";
import { PageLayout, GenreItem, SlickArrows } from "components";
import Slider from "react-slick";
import { Link } from "react-router-dom";
import { SLIDERSETTINGS, GENRES } from "utils/constants";
import SliderItem from "components/sliderItem";
import { getAllAlbums, getAllSongs, getMusicians } from "../../store/actions";
import { ReactComponent as Playlist } from "assets/img/svg/playlist.svg";
import { ReactComponent as Music } from "assets/img/svg/album.svg";
import { ReactComponent as Genre } from "assets/img/svg/genre.svg";
import { ReactComponent as Artist } from "assets/img/svg/artists.svg";

const GuestDashboard = props => {
  const songsSliderRef = React.createRef();
  const albumsSliderRef = React.createRef();
  const artistsSliderRef = React.createRef();
  const genresSliderRef = React.createRef();
  const playlistsSliderRef = React.createRef();

  const [slideIndex, setIndex] = useState(0);
  const dispatch = useDispatch();

  useEffect(() => {
    // code to run on component mount
    dispatch(getAllAlbums());
    dispatch(getAllSongs());
    dispatch(getMusicians());
  }, [dispatch]);

  const {
    albums,
    songs,
    artists,
    albumLoading,
    songLoading,
    artistLoading
  } = props;

  const songsArray = [...songs];
  const genresArray = [...GENRES];
  const albumsArray = [...albums];
  const artistsArray = [...artists];
  const playlistArray = [];

  const genreColors = [
    "rgba(242, 201, 76, 0.89)",
    "rgba(91, 219, 88, 0.89)",
    "rgba(113, 210, 226, 0.89)",
    "rgba(120, 131, 226, 0.89)",
    "rgba(255, 139, 139, 0.89)",
    "rgba(255, 139, 223, 0.89)"
  ];

  const generalSettings = {
    ...SLIDERSETTINGS,
    centerMode: false,
    slidesToShow: 6,
    afterChange: () => setIndex(slideIndex + 1)
  };

  const [windowWidth, setWindowWidth] = useState(0);

  const updateDimensions = useCallback(() => {
    const w = window;
    const d = document;
    const { documentElement } = d;
    const body = d.getElementsByTagName("body")[0];
    const width =
      w.innerWidth || documentElement.clientWidth || body.clientWidth;

    setWindowWidth(width);
  }, []);

  useEffect(() => {
    window.addEventListener("resize", updateDimensions());
  }, [updateDimensions]);

  const { userId } = props;

  return (
    <PageLayout hasSidebar pageClass="dashboard dashboard--guest">
      <section className="section">
        <div className="container">
          <div className="section__header">
            <h3 className="section__title">Home</h3>
          </div>

          <div className="section__header--alt">
            <h3 className="heading">trending</h3>
            <Link to="/magic/songs?by=trending" className="section__link">
              {songsArray.length === 0 ? null : (
                <>
                  see all
                  <i className="fas fa-angle-right ml-1"></i>
                </>
              )}
            </Link>
          </div>

          <div className="slick__slider">
            {windowWidth > 768 ? (
              songsArray.length !== 0 ? (
                <SlickArrows
                  {...props}
                  ref={songsSliderRef}
                  totalSlides={songsArray.length}
                  currentSlide={slideIndex}
                />
              ) : (
                ""
              )
            ) : null}
            {songLoading ? (
              <div className="col-12 justify-content-center">
                <div className="text-center mr-5">
                  <Loader
                    type="Circles"
                    color="#d3ae3b"
                    height={100}
                    width={100}
                  />
                </div>
              </div>
            ) : songsArray.length === 0 ? (
              <div className="w-100 d-flex justify-content-center mt-5">
                <div className="empty-list">
                  <Music className="empty-list-icon" />
                  <p className="paragraph mt-3">No Songs available</p>
                </div>
              </div>
            ) : (
              <Slider ref={songsSliderRef} {...generalSettings}>
                {songsArray.map((song, index) => (
                  <SliderItem key={index} item={song} type="song" />
                ))}
              </Slider>
            )}
          </div>
        </div>
      </section>

      <section className="section section__genre">
        <div className="container">
          <div className="section__header--alt">
            <h3 className="heading">genres</h3>
            <Link to="/magic/genres" className="section__link">
              {genresArray.length === 0 ? null : (
                <>
                  see all
                  <i className="fas fa-angle-right ml-1"></i>
                </>
              )}
            </Link>
          </div>

          <div className="slick__slider">
            {windowWidth > 768 ? (
              genresArray.length !== 0 ? (
                <SlickArrows
                  {...props}
                  ref={genresSliderRef}
                  totalSlides={genresArray.length}
                  currentSlide={slideIndex}
                />
              ) : (
                ""
              )
            ) : null}
            {genresArray.length === 0 ? (
              <div className="w-100 d-flex justify-content-center mt-5">
                <div className="empty-list">
                  <Genre className="empty-list-icon" />
                  <p className="paragraph mt-3">No Genres available</p>
                </div>
              </div>
            ) : (
              <Slider ref={genresSliderRef} {...generalSettings}>
                {genresArray.map((genre, index) => (
                  <GenreItem
                    key={index}
                    item={genre}
                    extraStyle={{ backgroundColor: genreColors[index] }}
                    page={`/magic/songs?by=genre&&val=${genre.title}`}
                  />
                ))}
              </Slider>
            )}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section__header--alt">
            <h3 className="heading">trending albums</h3>
            <Link to="/magic/albums" className="section__link">
              {albumsArray.length === 0 ? null : (
                <>
                  see all
                  <i className="fas fa-angle-right ml-1"></i>
                </>
              )}
            </Link>
          </div>

          <div className="slick__slider">
            {windowWidth > 768 ? (
              albumsArray.length !== 0 ? (
                <SlickArrows
                  {...props}
                  ref={albumsSliderRef}
                  totalSlides={albumsArray.length}
                  currentSlide={slideIndex}
                />
              ) : (
                ""
              )
            ) : null}
            {albumLoading ? (
              <div className="col-12 justify-content-center">
                <div className="text-center mr-5">
                  <Loader
                    type="Circles"
                    color="#d3ae3b"
                    height={100}
                    width={100}
                  />
                </div>
              </div>
            ) : albumsArray.length === 0 ? (
              <div className="w-100 d-flex justify-content-center mt-5">
                <div className="empty-list">
                  <Playlist className="empty-list-icon" />
                  <p className="paragraph mt-3">No albums available</p>
                </div>
              </div>
            ) : (
              <Slider ref={albumsSliderRef} {...generalSettings}>
                {albumsArray.map((album, index) => {
                  return (
                    <SliderItem
                      key={index}
                      item={album}
                      type="album"
                      page={`/magic/album/${album._id}`}
                    />
                  );
                })}
              </Slider>
            )}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section__header--alt">
            <h3 className="heading">artists of the week</h3>
            <a href="/magic/artists" className="section__link">
              {artistsArray.length === 0 ? null : (
                <>
                  see all
                  <i className="fas fa-angle-right ml-1"></i>
                </>
              )}
            </a>
          </div>

          <div className="slick__slider">
            {windowWidth > 768 ? (
              artistsArray.length !== 0 ? (
                <SlickArrows
                  {...props}
                  ref={artistsSliderRef}
                  totalSlides={artistsArray.length}
                  currentSlide={slideIndex}
                />
              ) : (
                ""
              )
            ) : null}
            {artistLoading ? (
              <div className="col-12 justify-content-center">
                <div className="text-center mr-5">
                  <Loader
                    type="Circles"
                    color="#d3ae3b"
                    height={100}
                    width={100}
                  />
                </div>
              </div>
            ) : artistsArray.length === 0 ? (
              <div className="w-100 d-flex justify-content-center mt-5">
                <div className="empty-list">
                  <Artist className="empty-list-icon" />
                  <p className="paragraph mt-3">No artists available</p>
                </div>
              </div>
            ) : (
              <Slider ref={artistsSliderRef} {...generalSettings}>
                {artistsArray.map((artist, index) => (
                  <SliderItem
                    key={index}
                    item={artist}
                    noArtist
                    type="artist"
                    page={`/user/${artist._id}`}
                  />
                ))}
              </Slider>
            )}
          </div>
        </div>
      </section>

      {/* {props.auth ? (
        <section className="section">
          <div className="container">
            <div className="section__header--alt">
              <h3 className="heading">My Playlist</h3>
              <a href={`/magic/playlist/${userId}`} className="section__link">
                {playlistArray.length === 0 ? null : (
                  <>
                    see all
                    <i className="fas fa-angle-right ml-1"></i>
                  </>
                )}
              </a>
            </div>
            <div className="slick__slider">
              {windowWidth > 768 ? (
                playlistArray.length !== 0 ? (
                  <SlickArrows
                    {...props}
                    ref={albumsSliderRef}
                    totalSlides={playlistArray.length}
                    currentSlide={slideIndex}
                  />
                ) : (
                  ''
                )
              ) : null}
              {albumLoading ? (
                <div className="col-12 justify-content-center">
                  <div className="text-center mr-5">
                    <Loader
                      type="Circles"
                      color="#d3ae3b"
                      height={100}
                      width={100}
                    />
                  </div>
                </div>
              ) : playlistArray.length === 0 ? (
                <div className="w-100 d-flex justify-content-center mt-5">
                  <div className="empty-list">
                    <Playlist className="empty-list-icon" />
                    <p className="paragraph mt-3">No playlist available</p>
                  </div>
                </div>
              ) : (
                <Slider ref={playlistsSliderRef} {...generalSettings}>
                  {playlistArray.map((playlist, index) => {
                    return (
                      <SliderItem
                        key={index}
                        item={playlist}
                        type="playlist"
                        page={`/magic/playlist`}
                      />
                    );
                  })}
                </Slider>
              )}
            </div>
          </div>
        </section>
      ) : null} */}
    </PageLayout>
  );
};

GuestDashboard.propTypes = {
  albums: PropTypes.shape({}),
  songs: PropTypes.shape({}),
  artists: PropTypes.shape({}),
  songLoading: PropTypes.bool,
  albumLoading: PropTypes.bool,
  artistLoading: PropTypes.bool,
  auth: PropTypes.bool,
  userId: PropTypes.string
};

const mapStateToProps = state => ({
  albums: state.albums.data,
  songs: state.songs.data,
  artists: state.musicians.data,
  songLoading: state.songs.loading,
  albumLoading: state.albums.loading,
  artistLoading: state.musicians.loading,
  userId: state.auth.user === null ? "" : state.auth.user._id,
  auth: state.auth.user
});

export default connect(
  mapStateToProps,
  null
)(GuestDashboard);
