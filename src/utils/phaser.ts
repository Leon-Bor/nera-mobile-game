export const phaserGame = () => {
  const game = (window as any).game as Phaser.Game;
  return {
    scaleManager: game.scale as Phaser.Scale.ScaleManager,
    sceneManager: game.scene as Phaser.Scenes.SceneManager,
    game: game,
  };
};
