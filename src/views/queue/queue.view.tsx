import React from "react";
import { Button } from "../../components/button/button.component";
import css from "./queue.module.scss";

export const QueueView = () => {
  return (
    <div className={css.view}>
      <div className={css.top}>
        <h1>In queue</h1>
      </div>
      <div className={css.bottom}>
        <Button fullWidth> Leve queue</Button>
      </div>
    </div>
  );
};
