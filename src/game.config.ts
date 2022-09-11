console.log(
  `Environment: ${ENVIRONMENT} ${GIT_VERSION} ${GIT_COMMIT_HASH} ${GIT_BRANCH}`
);

export const GameConfig = {
  gameName: "Unicellular Battle",
  debug: ENVIRONMENT === "production" ? false : true,
  playerHealth: 100,
  playerVelocity: 100, // 0-1000
  playerFireFrquency: 800, // in ms
  bulletVelocity: 600,
};
