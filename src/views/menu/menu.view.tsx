import React from "react";
import css from "./menu.module.scss";
import { Button } from "../../components/button/button.component";
import { GameConfig } from "../../game.config";

export const MenuView = () => {
  return (
    <div className={css.menuView}>
      <div className={css.top}>
        <h1>{GameConfig.gameName}</h1>
      </div>
      <div className={css.bottom}>
        <Button className={css.playButton} fullWidth size="large">
          Play
        </Button>

        <Button fullWidth> Skills</Button>
        <Button fullWidth> Settings</Button>
        <Button fullWidth> Exit</Button>
      </div>
    </div>
  );
};
