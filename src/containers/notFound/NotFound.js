import React, {useContext} from "react";
import "./NotFound.scss";
import {Fade} from "react-reveal";
import emoji from "react-easy-emoji";
import StyleContext from "../../contexts/StyleContext";
import Button from "../../components/button/Button";

export default function NotFound({path}) {
  const {isDark} = useContext(StyleContext);
  const base = (process.env.PUBLIC_URL || "").replace(/\/$/, "");
  const homeHref = base ? `${base}/` : "/";

  return (
    <Fade bottom duration={700} distance="12px">
      <div className="main not-found">
        <h1 className={isDark ? "dark-mode not-found-title" : "not-found-title"}>
          404
        </h1>
        <p className={isDark ? "dark-mode not-found-text" : "not-found-text"}>
          {emoji("You found a dead link. I probably refactored too aggressively.")}
        </p>
        {path ? (
          <p className={isDark ? "dark-mode not-found-path" : "not-found-path"}>
            <span className="not-found-path-label">Tried:</span>{" "}
            <code className="not-found-path-code">{path}</code>
          </p>
        ) : null}
        <div className="not-found-actions">
          <Button text="Back to home" className="not-found-button" href={homeHref} />
        </div>
      </div>
    </Fade>
  );
}

