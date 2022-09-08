console.log("(window as any).game", (window as any).game);

export const phaserGame = () => {
  return {
    scaleManager: (window as any).game.scale as Phaser.Scale.ScaleManager,
  };
};
