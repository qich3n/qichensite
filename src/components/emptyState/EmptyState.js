import React, {useContext} from "react";
import "./EmptyState.scss";
import StyleContext from "../../contexts/StyleContext";
import Button from "../button/Button";

export default function EmptyState({title, description, action}) {
  const {isDark} = useContext(StyleContext);

  return (
    <div className={isDark ? "dark-mode empty-state" : "empty-state"}>
      {title ? <h2 className="empty-state-title">{title}</h2> : null}
      {description ? (
        <p className={isDark ? "dark-mode empty-state-text" : "empty-state-text"}>
          {description}
        </p>
      ) : null}
      {action?.href && action?.text ? (
        <Button
          className="empty-state-action"
          href={action.href}
          newTab={action.newTab}
          text={action.text}
        />
      ) : null}
    </div>
  );
}

