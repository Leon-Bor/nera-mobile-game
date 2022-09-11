import classNames from "classnames";
import React from "react";
import css from "./healthBar.module.scss";

export interface IHealthBar {
  current: number;
  max: number;
  position: "top" | "bottom";
}
export const HealthBar = ({
  current,
  max,
  position,
}: IHealthBar): JSX.Element => {
  return (
    <div className={classNames(css.healthBar, css[position])}>
      {current} / {max}
    </div>
  );
};
