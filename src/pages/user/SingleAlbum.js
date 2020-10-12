/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import { useDispatch, connect } from "react-redux";
import { PageLayout, AlbumItem } from "components";
import PropTypes from "prop-types";
import { getAllAlbums } from "../../store/actions/albums";

const SingleAlbum = props => {
  const [selectedAlbum, setAlbum] = useState({});
  const dispatch = useDispatch();

  useEffect(() => {
    // code to run on component mount
    dispatch(getAllAlbums());
  }, [dispatch]);

  useEffect(() => {
    const {
      match: { params }
    } = props;

    const { albums } = props;

    if (params.id) {
      const check = albums.filter(albumItem => albumItem._id === params.id)[0];
      setAlbum(check);
    }
  }, [props, selectedAlbum]);

  const creator =
    props.user === null || props.user === undefined ? "" : props.user._id;
  const loginUserId = localStorage.getItem("currentUser");

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

          <div>
            <AlbumItem
              album={selectedAlbum}
              creatorId={creator}
              loginUserId={loginUserId}
            />
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

SingleAlbum.propTypes = {
  albums: PropTypes.shape({}),
  match: PropTypes.shape({}),
  params: PropTypes.shape({}),
  id: PropTypes.shape({}),
  user: PropTypes.shape({})
};

const mapStateToProps = state => ({
  albums: state.albums.data,
  user: state.musician.profile
});

export default connect(
  mapStateToProps,
  null
)(SingleAlbum);
