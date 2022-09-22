console.log(`Environment: ${ENVIRONMENT} `);

export const GameConfig = {
  gameName: "Unicellular Battle",
  debug: ENVIRONMENT === "production" ? false : false,
  playerStopFireWhileMoving: false,
  playerHealth: 100,
  playerVelocity: 500, // 0-1000
  playerFireFrquency: 800, // in ms
  bulletVelocity: 500,
  bulletDamage: 0.1,
  bulletsPerPlayer: 10,
};
