import React, { useEffect, useState } from "react";
import { useScreenResolution } from "./hooks/useScreenResolution";
import { useDispatch, useSelector } from "./hooks/useReduxHooks";
import { useObservable } from "./hooks/useObserver";
import { HealthBar } from "./components/healthBar/healthBar.component";
import css from "./app.module.scss";
import { GameConfig } from "./game.config";
import { MenuView } from "./views/menu/menu.view";
import { usePlayerId } from "./hooks/usePlayerId";

import io from "socket.io-client";
import { ClientRoutes, SocketRoutes } from "./models/socket";
import { Scenes, setActiveScene } from "./state/reducers/scene.reducer";
import { QueueView } from "./views/queue/queue.view";
import { Scene } from "phaser";

export const socket = io("http://localhost:3000");

export const App = () => {
  const { size, scale } = useScreenResolution();

  // Declare a new state variable, which we'll call "count"
  const [count, setCount] = useState(0);
  const { enemy, player } = useSelector((s) => s.game);
  const scene = useSelector((s) => s.scene);
  const dispatch = useDispatch();
  const playerId = usePlayerId();

  const enemyHealth = useObservable(enemy?.health, enemy?.health.value);
  const playerHealth = useObservable(player?.health, player?.health.value);

  useEffect(() => {
    let latency = 50;

    socket.on(ClientRoutes.CONNECT, () => {
      console.log("Socket connected");
      socket.emit(SocketRoutes.CS_CONNECTED, playerId);
    });

    socket.on(ClientRoutes.DISCONNECT, () => {
      console.log("Socket disconnected");
    });

    socket.on(ClientRoutes.SC_PING, (time) => {
      latency = Date.now() - time;
      console.log(`Pong ${latency}ms`);
    });

    socket.on(ClientRoutes.SC_QUEUE_FOUND_ENEMY, (time) => {});

    socket.on(ClientRoutes.SC_QUEUE_LEAVE, () => {
      dispatch(setActiveScene({ name: Scenes.Menu, scene: scene.scene }));
    });

    setInterval(() => {
      const time = Date.now();
      socket.emit(SocketRoutes.CS_PING, time);
    }, 5000);
  }, []);

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
        {Scenes.Menu === scene.name && <MenuView />}

        {Scenes.Queue === scene.name && <QueueView />}

        {Scenes.Game === scene.name && (
          <>
            <HealthBar
              position="top"
              current={enemyHealth || 0}
              max={GameConfig.playerHealth}
            />
            <HealthBar
              position="bottom"
              current={playerHealth || 0}
              max={GameConfig.playerHealth}
            />
          </>
        )}
      </div>
    </div>
  );
};
