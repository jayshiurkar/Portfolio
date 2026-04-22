import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import SCMProject from "./scmProject.jsx";

const path = window.location.pathname;

function RootRouter() {
  if (path.includes("/projects/scmprj")) {
    return <SCMProject />;
  }

  return <App />;
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RootRouter />
  </React.StrictMode>
);
