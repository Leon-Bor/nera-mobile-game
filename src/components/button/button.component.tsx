import classNames from "classnames";
import React from "react";
import css from "./button.module.scss";

export interface IButton {
  disabled?: boolean;
  onClick?: () => {};
  children: string;
  fullWidth?: boolean;
  size?: "normal" | "large";
  className?: string;
}

export const Button = ({
  children,
  disabled = false,
  fullWidth = false,
  size = "normal",
  className = "",
}: IButton): JSX.Element => {
  return (
    <button
      className={classNames(css.button, className, {
        [css.isDisabled]: disabled,
        [css.isFullWidth]: fullWidth,
        [css[size]]: true,
      })}
    >
      {children}
    </button>
  );
};
