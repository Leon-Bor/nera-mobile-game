import React from "react";
import { createRoot } from "react-dom/client";
import { App } from "./components/app";
import { Provider } from "./components/provider";
export const createUi = () => {
  const container = document.getElementById("ui");
  const root = createRoot(container!);

  root.render(
    <div id="ui-root">
      <Provider>
        <App />
      </Provider>
    </div>
  );
};
