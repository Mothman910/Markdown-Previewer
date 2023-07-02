// Import our custom CSS
import "../scss/styles.scss";

// Import React
import React from "react";
import { createRoot } from "react-dom/client";

// Import Components
import MarkdownPreviewer from "./App/MarkdownPreviewer.jsx";

const root = createRoot(document.getElementById("markdown-previever"));
root.render(
  <>
    <MarkdownPreviewer />
  </>
);
