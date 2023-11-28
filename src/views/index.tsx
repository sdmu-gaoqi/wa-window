import React from "react";
import { createRoot } from "react-dom/client";

const Dom = () => {
  return <div>demo dom</div>;
};

const root = document.getElementById("root");
if (root) {
  createRoot(root).render(<Dom />);
}
