import React, { useEffect, useState } from "react";
import { useScreenResolution } from "./hooks/useScreenResolution";
import { useSelector } from "./hooks/useReduxHooks";
import { useObservable } from "./hooks/useObserver";
import { HealthBar } from "./components/healthBar/healthBar.component";
import css from "./app.module.scss";
import { GameConfig } from "./game.config";
import { MenuView } from "./views/menu/menu.view";

export const App = () => {
  const { size, scale } = useScreenResolution();
  // Declare a new state variable, which we'll call "count"
  const [count, setCount] = useState(0);
  console.log("size", scale);
  const { enemy, player } = useSelector((s) => s.game);

  const enemyHealth = useObservable(enemy?.health, enemy?.health.value);
  const playerHealth = useObservable(player?.health, player?.health.value);

  return (
    <div className={css.ui}>
      <div
        className={css.container}
        style={{
          width: size.width,
          height: size.height,
          transform: `scale3d(${scale}, ${scale},1)`,
        }}
      >
        {/* <MenuView /> */}
        {/* 
        <HealthBar
          position="top"
          current={enemyHealth || 0}
          max={GameConfig.playerHealth}
        />
        <HealthBar
          position="bottom"
          current={playerHealth || 0}
          max={GameConfig.playerHealth}
        /> */}
      </div>
    </div>
  );
};
