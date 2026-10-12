import React from "react";

export const SiteModalHeader = ({ title, titleId, toolbar, toolbarWrap = true }) => (
  <header className="site-modal-header">
    <h2 id={titleId} className="site-modal-title">{title}</h2>
    {toolbar
      ? toolbarWrap
        ? <div className="site-modal-toolbar">{toolbar}</div>
        : toolbar
      : null}
  </header>
);
