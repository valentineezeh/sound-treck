import React, { useEffect, useState, useRef, useCallback } from "react";
import { useDispatch, connect } from "react-redux";
import PropTypes from "prop-types";
import Loader from "react-loader-spinner";
import { PageLayout } from "layouts/page";
import SliderItem from "components/sliderItem";
import { getAllAlbums } from "../../store/actions/albums";
import { _isObjectEmpty } from "utils";
import { ReactComponent as AlbumIcon } from "assets/img/svg/album.svg";

const Albums = props => {
  const [pageNumber, setPageNumber] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [mainAlbums, setMainAlbums] = useState([]);
  const [hasMore, setHasMore] = useState(false);

  const observer = useRef();
  const dispatch = useDispatch();

  useEffect(() => {
    // // code to run on component mount
    // setIsLoading(props.loading);
    dispatch(getAllAlbums(pageNumber));
  }, [dispatch, pageNumber]);

  useEffect(() => {
    if (!_isObjectEmpty(props.albums)) {
      setHasMore(props.albums.length > 0);
      setMainAlbums(previousAlbum => {
        return [...new Set([...previousAlbum, ...props.albums])];
      });
    }
  }, [props.albums]);

  const lastAlbumElementRef = useCallback(
    node => {
      if (isLoading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver(payload => {
        if (payload[0].isIntersecting && hasMore) {
          setPageNumber(prevPageNumber => prevPageNumber + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [isLoading, hasMore]
  );

  return (
    <PageLayout hasSidebar pageClass="dashboard dashboard--guest">
      <section className="section">
        <div className="container">
          <div className="section__header">
            <h3 className="heading">Albums</h3>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="row">
            {mainAlbums.length === 0 && (
              <div className="col-12 justify-content-center">
                <div className="empty-list">
                  <AlbumIcon className="empty-list-icon" />
                  <p className="paragraph mt-3">No Album available</p>
                </div>
              </div>
            )}

            {mainAlbums.map((album, index) => {
              if (mainAlbums.length === index + 1) {
                return (
                  <div
                    className="col-6 col-md-4 col-lg-3 mb-5"
                    key={index}
                    ref={lastAlbumElementRef}
                  >
                    <SliderItem
                      key={index}
                      item={album}
                      type="album"
                      page={`/magic/album/${album._id}`}
                    />
                  </div>
                );
              }
              return (
                <div className="col-6 col-md-4 col-lg-3 mb-5" key={index}>
                  <SliderItem
                    key={index}
                    item={album}
                    type="album"
                    page={`/magic/album/${album._id}`}
                  />
                </div>
              );
            })}

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
            ) : null}
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

Albums.propTypes = {
  albums: PropTypes.shape({}),
  loading: PropTypes.bool
};

const mapStateToProps = state => ({
  albums: state.albums.data,
  loading: state.albums.loading
});

export default connect(
  mapStateToProps,
  null
)(Albums);
