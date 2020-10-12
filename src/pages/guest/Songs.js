import React, { useEffect, useState } from "react";
import { useDispatch, connect } from "react-redux";
import PropTypes from "prop-types";
import { PageLayout } from "layouts/page";
import { MusicList, Paginate } from "components";
import Loader from "react-loader-spinner";
import { getSongsByParameter } from "services/apiFunctions";
import { capitalizeFirstLetter } from "utils";
import { getAllSongs } from "../../store/actions/songs";

const Songs = props => {
  const [songs, setSongs] = useState([]);
  const [param, setParam] = useState("");
  const [val, setVal] = useState("");
  const [pageTitle, setPageTitle] = useState("");
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage, setPostPerPage] = useState(10);

  useEffect(() => {
    dispatch(getAllSongs(currentPage));
  }, [dispatch, currentPage]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let search = window.location.search;
        let params = new URLSearchParams(search);
        let parameter = params.get("by");
        let val = params.get("val");

        setParam(parameter);
        setVal(val);

        // setSongs(getSongsByParameter(parameter, val));

        switch (parameter) {
          case "genre":
            setPageTitle(capitalizeFirstLetter(val));
            break;
          case "trending":
            setPageTitle("Trending");
            break;
          default:
            setPageTitle("All");
            break;
        }
      } catch (error) {
        // TODO Display error properly
      }
    };

    fetchData();
  }, []);

  const paginate = pageNumber => {
    setCurrentPage(pageNumber);
    dispatch(getAllSongs(currentPage));
  };

  const songsArray = props.songs;

  return (
    <PageLayout hasSidebar pageClass="dashboard dashboard--guest">
      <section className="section">
        <div className="container">
          <div className="section__header">
            <h3 className="heading">{`${pageTitle} Songs`}</h3>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          {props.loading ? (
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
          ) : (
            <>
              <MusicList songs={songsArray} auth={props.auth} />
              <Paginate
                postPerPage={postPerPage}
                totalPosts={props.total}
                currentPage={currentPage}
                paginate={paginate}
              />
            </>
          )}
        </div>
      </section>
    </PageLayout>
  );
};

Songs.propTypes = {
  songs: PropTypes.shape([]),
  total: PropTypes.number,
  loading: PropTypes.bool,
  auth: PropTypes.bool
};

const mapStateToProps = state => ({
  songs: state.songs.data,
  total: state.songs.meta === null ? 0 : state.songs.meta.total,
  loading: state.songs.loading,
  auth: state.loginReducer.isAuthenticated
});

export default connect(
  mapStateToProps,
  null
)(Songs);
