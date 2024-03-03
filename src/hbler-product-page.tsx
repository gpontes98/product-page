import React from "react";
import ReactDOM from "react-dom";
import singleSpaReact from "single-spa-react";
import Root from "./root.component";
import ProductPage from "./ProductPage";

const lifecycles = singleSpaReact({
  React,
  ReactDOM,
  rootComponent: ProductPage,
  errorBoundary(err, info, props) {
    // Customize the root error boundary for your microfrontend here.
    return null;
  },
});

export const { bootstrap, mount, unmount } = lifecycles;
