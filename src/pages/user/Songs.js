import React, { useEffect, useState } from "react";
import { connect, useDispatch } from "react-redux";
import PropTypes from "prop-types";
import { PageLayout } from "layouts/page";
import { MusicList, Paginate } from "components";
import { getSingleSong } from "store/actions";

const UserSongs = props => {
  const [selectedArtist, setArtist] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage, setPostPerPage] = useState(10);
  const dispatch = useDispatch();

  useEffect(() => {
    const {
      match: { params }
    } = props;

    if (params.userId) {
      setArtist(params.userId);
    }
  }, [props, selectedArtist]);

  const paginate = pageNumber => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    const loginUserId = localStorage.getItem("currentUser");
    dispatch(getSingleSong(loginUserId));
  }, []);

  const checkSong = props.userSong === null ? [] : props.userSong.data;
  const checkPreSong = props.songs === undefined ? [] : props.songs;

  const indexOfLastPost = currentPage * postPerPage;
  const indexOfFirstPost = indexOfLastPost - postPerPage;
  const songs =
    checkPreSong.length === 0
      ? checkSong.slice(indexOfFirstPost, indexOfLastPost)
      : checkPreSong.slice(indexOfFirstPost, indexOfLastPost);

  return (
    <PageLayout pageClass="dashboard dashboard--user">
      <section className="section">
        <div className="container">
          <div className="mb-4">
            <button
              className="btn btn--outline"
              onClick={() => props.history.goBack()}
            >
              <i className="fas fa-angle-left mr-2"></i> Back
            </button>
          </div>

          <div className="section__header">
            <h3 className="heading">All Songs</h3>
          </div>

          {/* <MusicList noArtist songs={[]} /> */}
          <MusicList
            auth={props.auth}
            noArtist
            songs={songs}
            songType={"single"}
          />
          <Paginate
            postPerPage={postPerPage}
            totalPosts={props.songs === undefined ? 1 : props.songs.length}
            paginate={paginate}
          />
        </div>
      </section>
    </PageLayout>
  );
};

UserSongs.propTypes = {
  match: PropTypes.object,
  songs: PropTypes.array,
  auth: PropTypes.bool,
  userSong: PropTypes.object
};

const mapStateToProps = state => ({
  songs: state.musician.songs,
  total: state.songs.meta === null ? 0 : state.songs.meta.total,
  auth: state.loginReducer.isAuthenticated,
  userSong: state.songs.userSong
});

export default connect(
  mapStateToProps,
  null
)(UserSongs);
