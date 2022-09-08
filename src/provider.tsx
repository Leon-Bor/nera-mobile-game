import React from "react";
import { Provider as ReduxProvider } from "react-redux";
import { store } from "./state/store";

export interface IProvider {
  children: JSX.Element;
}
export const Provider = ({ children }: IProvider): JSX.Element => {
  return <ReduxProvider store={store}> {children}</ReduxProvider>;
};
