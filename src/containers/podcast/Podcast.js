import React, {useContext} from "react";
import "./Podcast.scss";
import {podcastSection} from "../../portfolio";
import {Fade} from "react-reveal";
import StyleContext from "../../contexts/StyleContext";
import EmptyState from "../../components/emptyState/EmptyState";

export default function Podcast() {
  const {isDark} = useContext(StyleContext);

  if (!podcastSection)
    console.error("podcastSection object for Podcast section is missing");

  if (!podcastSection.display) {
    return null;
  }
  const podcasts = podcastSection.podcast || [];
  return (
    <Fade bottom duration={1000} distance="20px">
      <div className="main">
        <div className="podcast-header">
          <h1 className="podcast-header-title">{podcastSection.title}</h1>
          <p
            className={
              isDark
                ? "dark-mode podcast-header-subtitle"
                : "subTitle podcast-header-subtitle"
            }
          >
            {podcastSection.subtitle}
          </p>
        </div>
        <div className="podcast-main-div">
          {podcasts.length > 0 ? (
            podcasts.map((podcastLink, i) => {
              if (!podcastLink) {
                console.log(
                  `Podcast link for ${podcastSection.title} is missing`
                );
              }
              return (
                <div key={i}>
                  <iframe
                    className="podcast"
                    src={podcastLink}
                    frameBorder="0"
                    scrolling="no"
                    title="Podcast"
                  ></iframe>
                </div>
              );
            })
          ) : (
            <EmptyState
              title="No podcast episodes listed."
              description="I’ll drop links here when there’s an episode I’m proud of (or when a host convinces me to talk)."
            />
          )}
        </div>
      </div>
    </Fade>
  );
}
