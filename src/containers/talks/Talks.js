import React, {useContext} from "react";
import "./Talks.scss";
import TalkCard from "../../components/talkCard/TalkCard";
import {talkSection} from "../../portfolio";
import {Fade} from "react-reveal";
import StyleContext from "../../contexts/StyleContext";
import EmptyState from "../../components/emptyState/EmptyState";

export default function Talks() {
  const {isDark} = useContext(StyleContext);
  if (!talkSection.display) {
    return null;
  }
  const talks = talkSection.talks || [];
  return (
    <Fade bottom duration={1000} distance="20px">
      <div className="main" id="talks">
        <div className="talk-header">
          <h1 className="talk-header-title">{talkSection.title}</h1>
          <p
            className={
              isDark
                ? "dark-mode talk-header-subtitle"
                : "subTitle talk-header-subtitle"
            }
          >
            {talkSection.subtitle}
          </p>
          {talks.length > 0 ? (
            talks.map((talk, i) => {
              return (
                <TalkCard
                  key={i}
                  talkDetails={{
                    title: talk.title,
                    subtitle: talk.subtitle,
                    slides_url: talk.slides_url,
                    event_url: talk.event_url,
                    image: talk.image,
                    isDark
                  }}
                />
              );
            })
          ) : (
            <EmptyState
              title="No talks on the calendar."
              description="If you’re looking for slides or recordings, ping me—I might have something not listed here yet."
            />
          )}
        </div>
      </div>
    </Fade>
  );
}
