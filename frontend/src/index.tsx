import App from "./App";
import { ProvideAuth } from "./hooks/useAuth";

import * as React from "react";
import ReactDOM from "react-dom/client";

import "./styles/index.css";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <ProvideAuth>
      <App />
    </ProvideAuth>
  </React.StrictMode>
);
