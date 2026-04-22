import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import SCMProject from "./scmProject.jsx";

const redirectedPath = sessionStorage.getItem("redirectPath");

if (redirectedPath) {
  sessionStorage.removeItem("redirectPath");
  window.history.replaceState(null, "", redirectedPath);
}

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
