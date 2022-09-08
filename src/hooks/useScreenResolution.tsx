import Phaser from "phaser";
import React, { useEffect } from "react";
import { useState } from "react";
import { fromEvent, takeUntil } from "rxjs";
import { phaserGame } from "../utils/phaser";

export const useScreenResolution = () => {
  const { scaleManager } = phaserGame();
  const [scale, setScale] = useState(
    scaleManager.displaySize.width / scaleManager.baseSize.width
  );
  const [size] = useState(scaleManager.baseSize);

  useEffect(() => {
    scaleManager.on("resize", () => {
      setScale(scaleManager.displaySize.width / scaleManager.baseSize.width);
    });
  }, []);

  return { size, scale };
};
