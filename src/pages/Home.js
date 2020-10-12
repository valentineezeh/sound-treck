/* eslint-disable no-undef */
import React, { Component } from "react";
import { Header, Footer } from "components";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import beats from "assets/img/svg/beats.svg";
import video from "assets/img/video.png";
import wassup from "assets/img/wassup-team.png";
import headphones from "assets/img/svg/headset.svg";
import speaker from "assets/img/svg/speaker.svg";
import equalizer from "assets/img/svg/equalizer.svg";
import efb from "assets/img/clients/efb.png";
import ohafia from "assets/img/clients/ohafia.png";
import playButton from "assets/img/svg/play.svg";
import { SLIDERSETTINGS } from "utils/constants";
import SliderItem from "components/sliderItem";
import { getAllSongs } from "../store/actions/songs";

class Home extends Component {
  // Get all songs
  componentDidMount = () => {
    const { GetAllSongs } = this.props;
    GetAllSongs();
  };

  render() {
    const { isAuthenticated } = this.props;
    const sliderRef = React.createRef();
    const { songs } = this.props;

    const musicArray = songs.slice(0, 10);
    const sliderSettings = {
      ...SLIDERSETTINGS,
      autoplay: true,
      autoplaySpeed: 3000
    };

    return (
      <>
        <Header>
          <div className="hero home__hero">
            <div className="home__hero--overlay"></div>
            <div className="container h-100">
              <div className="home-container">
                <div className="home__hero-content">
                  <div className="home__hero--title-block">
                    <h3 className="home__hero--title">
                      GidiMediaCity is where Entertainment lives!
                    </h3>
                    <div className="home__hero--desc">
                      Naija’s own online media platfrom. Fans rock to awesome
                      content and artists get paid for creating good music. It’s
                      totally awesome!
                    </div>
                  </div>

                  <div className="home__hero--action">
                    <p className="paragraph color-gold">
                      Dont dull it! Join the coolest thing in town now!
                    </p>
                    <div className="home__hero--buttons">
                      {isAuthenticated ? null : (
                        <>
                          <Link to="/signup" className="btn btn--primary">
                            Join
                          </Link>
                        </>
                      )}
                    </div>

                    <button className="home__hero--scroll">
                      <i className="fas fa-angle-down"></i>
                    </button>
                  </div>
                </div>
              </div>

              <div className="beats">
                <img src={beats} className="img-fluid" alt="beats" />
              </div>
            </div>
          </div>
        </Header>

        <main className="home">
          <section className="section home__about">
            <div className="container">
              <div className="row align-items-center mb-5">
                <div className="col-lg-5">
                  <div className="section__title home__title">
                    Rock to great music
                  </div>
                  <div className="section__desc home__desc">
                    Listen, Watch, Steam and download awesome content from your
                    favourite acts at the comfort of your devices...
                  </div>
                </div>

                <div className="filler"></div>

                <div className="col-lg-5">
                  <div className="video-image home-image">
                    <img
                      src={video}
                      className="img-fluid"
                      alt="rock to great music"
                    />
                    <button className="play-button">
                      <div className="play-icon">
                        <img
                          className="img-fluid"
                          src={playButton}
                          alt="play"
                        />
                      </div>
                    </button>
                  </div>
                </div>
              </div>

              <div className="row align-items-center beats-margin">
                <div className="col-lg-5 reorder-md-3">
                  <div className="home-image">
                    <img src={wassup} className="img-fluid" alt="wassup team" />
                  </div>
                </div>

                <div className="filler reorder-md-2"></div>

                <div className="col-lg-5 reorder-md-1">
                  <div className="section__title home__title">
                    The watsup team!
                  </div>
                  <div className="section__desc home__desc">
                    Join the coolest clique in town and follow every update of
                    theirs. Your stars are just click away!
                  </div>
                </div>
              </div>
            </div>

            <div className="beats beats--transform-top">
              <img src={beats} className="img-fluid" alt="beats" />
            </div>
          </section>

          <section className="section home__popular">
            <div className="container">
              <p className="home__popular--title">Popular demand this week..</p>
            </div>
            <div className="home__slider">
              <Slider ref={sliderRef} {...sliderSettings}>
                {musicArray.map((item, index) => (
                  <SliderItem
                    key={index}
                    extraClass="slider-item--home"
                    item={item}
                    type="home"
                  />
                ))}
              </Slider>
            </div>
          </section>
          <section className="beats-margin" style={{ position: "relative" }}>
            <div className="beats beats--transform-bottom">
              <img src={beats} className="img-fluid" alt="beats" />
            </div>
          </section>
          <section className="section" style={{ position: "relative" }}>
            <div className="container" style={{ marginBottom: "5rem" }}>
              <div className="row">
                <div className="col-md-4">
                  <div className="home__col">
                    <div className="home__col--icon">
                      <img
                        src={headphones}
                        className="img-fluid"
                        alt="headphones"
                      />
                    </div>
                    <div className="home__col--text">
                      Join the Naija’s most diverse community of creators, from
                      those sharing their first track ` to A-list stars.
                    </div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="home__col">
                    <div className="home__col--icon">
                      <img
                        src={equalizer}
                        className="img-fluid"
                        alt="headphones"
                      />
                    </div>
                    <div className="home__col--text">
                      Join the Naija’s most diverse community of creators, from
                      those sharing their first track ` to A-list stars.
                    </div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="home__col">
                    <div className="home__col--icon">
                      <img
                        src={speaker}
                        className="img-fluid"
                        alt="headphones"
                      />
                    </div>
                    <div className="home__col--text">
                      Join the Naija’s most diverse community of creators, from
                      those sharing their first track ` to A-list stars.
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="beats beats--transform-top">
              <img src={beats} className="img-fluid" alt="beats" />
            </div>
          </section>

          <section className="section call-to-action">
            <div className="container">
              <div className="call-to-action-inner">
                <p className="call-to-action__heading">
                  JOIN THE GIDI MOVEMENT
                </p>
                <p className="call-to-action__desc">
                  Share your tracks anywhere on the web. Get to know and connect
                  with your audience. Everything you need, all in one place,
                  FREE!.
                </p>
                {isAuthenticated ? null : (
                  <Link className="btn btn--primary" to="/signup">
                    JOIN THE FAMILY
                  </Link>
                )}
              </div>
            </div>
          </section>

          <section className="beats-margin" style={{ position: "relative" }}>
            <div className="beats beats--transform-bottom">
              <img src={beats} className="img-fluid" alt="beats" />
            </div>
          </section>

          <section className="section clients">
            <div className="container">
              <div className="client__heading">Some of our personal people</div>
              <div className="row align-items-center">
                <div className="col">
                  <a
                    target="_blank"
                    href="http://efbindustrieslimited.com/"
                    rel="noopener noreferrer"
                    className="client__image"
                  >
                    <img src={efb} className="img-fluid" alt="efb" />
                  </a>
                </div>
                <div className="col">
                  <a
                    target="_blank"
                    href="http://ohafiamicrofinancebankplc.com/"
                    rel="noopener noreferrer"
                    className="client__image"
                  >
                    <img src={ohafia} className="img-fluid" alt="ohafia" />
                  </a>
                </div>
              </div>
            </div>
          </section>

          <section className="section subscribe">
            <div className="container">
              <div className="subscribe__heading">
                Keep up with the rave on social media
              </div>
              <div className="subscribe__form">
                <div className="form-group subscribe__form-group">
                  <input
                    className="form-control subscribe__form-input"
                    placeholder="email address to recieve hottest buzz"
                  />
                </div>
                <button className="btn btn--primary">subscribe</button>
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </>
    );
  }
}

Home.propTypes = {
  isAuthenticated: PropTypes.bool,
  GetAllSongs: PropTypes.func,
  songs: PropTypes.shape({})
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.token !== null,
  songs: state.songs.data
});

export default connect(
  mapStateToProps,
  {
    GetAllSongs: getAllSongs
  }
)(Home);
