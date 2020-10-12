import React from "react";
import { Header, PageLayout } from "components";
import bgImage from "assets/img/headers/about.png";
import info from "assets/img/info.png";
import igwe from "assets/img/team/igwe.jpg";
import kayode from "assets/img/team/kayode.jpeg";
import tobi from "assets/img/team/tobi.jpeg";

const About = () => (
  <>
    <PageLayout
      pageClass="about"
      arcColor={`#ffffff`}
      bgImage={bgImage}
      title="About Us"
    >
      <section className="section intro">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-8">
              <p className="paragraph">
                Since 2006, ReverbNation has helped millions of emerging artists
                build their careers. We’ve connected artists to venues,
                festivals, brands, publishers, labels, and the fans themselves.
                ReverbNation’s mission puts Artists First.
              </p>

              <p className="paragraph">
                Our powerful career management and online marketing tools,
                combined with rapidly growing A&amp;R capabilities and broad
                industry relationships offer emerging artists from around the
                world access to the global music industry.
              </p>

              <p className="paragraph">The results speak for themselves.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section team">
        <div className="container">
          <div className="row">
            <div className="col-lg-6">
              <div className="team-info">
                <h3 className="heading">TEAM LEADS</h3>

                <p className="paragraph">
                  Since 2006, ReverbNation has helped millions of emerging
                  artists build their careers. We’ve connected artists to
                  venues, festivals, brands, publishers, labels, and the fans
                  themselves. ReverbNation’s mission puts Artists First.
                </p>

                <p className="paragraph">
                  Our powerful career management and online marketing tools,
                  combined with rapidly growing A&amp;R capabilities and broad
                  industry relationships os.
                </p>
              </div>
            </div>
            <div className="team-col">
              <div className="people">
                <a
                  href="https://www.linkedin.com/in/tobi-amodu/"
                  title="Tobi Amodu"
                  className="person person--1"
                >
                  <img src={tobi} alt="tobi amodu" />
                </a>

                <a
                  href="https://www.linkedin.com/in/onemole/"
                  title="Olusegun Omilabu"
                  className="person person--2"
                >
                  {/* <img src={onemole} alt="olusegun omilabu" /> */}
                </a>

                <a
                  href="https://www.linkedin.com/in/karosi12/"
                  title="Kayode Adeyemi"
                  className="person person--3"
                >
                  <img src={kayode} alt="kayode adeyemi" />
                </a>

                <a
                  href="https://www.linkedin.com/in/igwe-ojike-ii-5bba7679/"
                  title="Igwe Ojike"
                  className="person person--4"
                >
                  <img src={igwe} alt="igwe ojike" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section info">
        <div className="container-fluid pl-0 pr-0">
          <div className="row">
            <div className="col-md-6">
              <img src={info} className="info__image" alt="info" />
            </div>
            <div className="col-md-6">
              <div className="info__content">
                <p className="paragraph">
                  Since 2006, ReverbNation has helped millions of emerging
                  artists build their careers. We’ve connected artists to
                  venues, festivals, brands, publishers, labels, and the fans
                  themselves. ReverbNation’s mission puts Artists First.
                </p>

                <p className="paragraph">
                  Our powerful career management and online marketing tools,
                  combined with rapidly growing A&amp;R capabilities and broad
                  industry relationships offer emerging artists from around the
                  world access to the global music industry.
                </p>

                <p className="paragraph">The results speak for themselves.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  </>
);

export default About;
