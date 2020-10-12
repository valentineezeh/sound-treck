import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import { BottomNav, Footer, SideBar } from "components";
import Navigation from "./nav";
import MusicPlayer from "components/music-player";
import { ReactComponent as Arc } from "assets/img/svg/arc.svg";

export const PageLayout = props => {
  if (props.hasSidebar) {
    return (
      <>
        <div
          className={classnames("page", {
            "page--no-sidebar": !props.hasSidebar
          })}
        >
          <SideBar />

          <main className="page__body">
            <Navigation />

            <div className={`page__inner ${props.pageClass}`}>
              {props.children}
            </div>

            <Footer />

            <MusicPlayer />

            <BottomNav />
          </main>
        </div>
      </>
    );
  }

  return (
    <>
      <header
        className="header header__bg"
        style={{ backgroundImage: `url('${props.bgImage}')` }}
      >
        <Navigation isUserNav />

        {props.title ? (
          <div className="header--overlay">
            <div className="header__content">
              <h3 className="header__title">{props.title}</h3>
            </div>
          </div>
        ) : null}

        <div className="arc">
          <Arc className="img-fluid arc__image" fill={props.arcColor} />
        </div>
      </header>

      <main className={`page__body ${props.pageClass}`}>{props.children}</main>

      <Footer />

      <MusicPlayer />
    </>
  );
};

PageLayout.propTypes = {
  arcColor: PropTypes.string,
  bgImage: PropTypes.string,
  children: PropTypes.node,
  hasSidebar: PropTypes.bool,
  pageClass: PropTypes.string,
  title: PropTypes.string
};

PageLayout.defaultProps = {
  hasSidebar: false,
  arcColor: "#f8f8f8"
};
