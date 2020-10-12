import React from "react";
import { PageLayout } from "layouts/page";
import { GenreItem } from "components";
import { GENRES } from "utils/constants";

const Genre = () => {
  const genreColors = [
    "rgba(242, 201, 76, 0.89)",
    "rgba(91, 219, 88, 0.89)",
    "rgba(113, 210, 226, 0.89)",
    "rgba(120, 131, 226, 0.89)",
    "rgba(255, 139, 139, 0.89)",
    "rgba(255, 139, 223, 0.89)"
  ];

  return (
    <PageLayout hasSidebar pageClass="dashboard dashboard--guest">
      <section className="section">
        <div className="container">
          <div className="section__header">
            <h3 className="heading">Genres</h3>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="row">
            {GENRES.map((genre, index) => (
              <div className="col-6 col-md-4 col-lg-3 mb-5" key={index}>
                <GenreItem
                  key={index}
                  item={genre}
                  extraStyle={{ backgroundColor: genreColors[index] }}
                  page={`/magic/songs?by=genre&&val=${genre.title}`}
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default Genre;
