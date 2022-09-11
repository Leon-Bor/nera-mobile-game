console.log(`Environment: ${ENVIRONMENT} `);

export const GameConfig = {
  gameName: "Unicellular Battle",
  debug: ENVIRONMENT === "production" ? false : true,
  playerStopFireWhileMoving: false,
  playerHealth: 100,
  playerVelocity: 100, // 0-1000
  playerFireFrquency: 800, // in ms
  bulletVelocity: 500,
  bulletDamage: 5,
  bulletsPerPlayer: 10,
};
