console.log(`Environment: ${ENVIRONMENT}`);

export const GameConfig = {
  gameName: "Unicellular Battle",
  debug: ENVIRONMENT === "production" ? false : true,
  playerHealth: 100,
  playerVelocity: 100, // 0-1000
  playerFireFrquency: 800, // in ms
  bulletVelocity: 600,
};
