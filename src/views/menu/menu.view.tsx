import React from "react";
import css from "./menu.module.scss";
import { Button } from "../../components/button/button.component";
import { GameConfig } from "../../game.config";
import { socket } from "../../app";
import { SocketMessage, SocketRoutes, SocketStatus } from "../../models/socket";
import { useDispatch, useSelector } from "../../hooks/useReduxHooks";
import { Scenes, setActiveScene } from "../../state/reducers/scene.reducer";

export const MenuView = () => {
  const dispatch = useDispatch();
  const scene = useSelector((s) => s.scene);

  return (
    <div className={css.view}>
      <div className={css.top}>
        <h1>{GameConfig.gameName}</h1>
      </div>
      <div className={css.bottom}>
        <Button
          className={css.playButton}
          fullWidth
          size="large"
          onClick={() => {
            socket.emit(
              SocketRoutes.CS_QUEUE_JOIN,
              (res: SocketMessage<undefined>) => {
                if (res.status === SocketStatus.Success) {
                  dispatch(
                    setActiveScene({ name: Scenes.Queue, scene: scene.scene })
                  );
                }
              }
            );
          }}
        >
          Play
        </Button>

        <Button fullWidth> Skills</Button>
        <Button fullWidth> Settings</Button>
        <Button fullWidth> Exit</Button>
      </div>
    </div>
  );
};
