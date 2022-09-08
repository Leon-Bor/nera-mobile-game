import Phaser from "phaser";
import React, { useEffect } from "react";
import { useState } from "react";
import { fromEvent, takeUntil } from "rxjs";

export const useScreenResolution = () => {
  const scaleManager: Phaser.Scale.ScaleManager = (window as any).game.scale;
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
