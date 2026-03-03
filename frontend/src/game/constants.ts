export const GameConfiguration = {
  GAME: {
    CONTROLS: {
      MOVEMENT: {
        UP: "w",
        DOWN: "s",
        LEFT: "a",
        RIGHT: "d",
      },
    },
    PLAYER: {
      OFFSET: {
        LEGS: {
          x: 0,
          y: 0,
        },
        BODY: {
          x: -3,
          y: -13,
        },
      },
    },
    ASSETS: {
      PLAYER: {
        LEGS: {
          WALK: "/assets/game/journey-of-pk/player/legs/walk/walk_",
          IDLE: "/assets/game/journey-of-pk/player/legs/idle/idle_",
        },
        BODY: {
          UP: "/assets/game/journey-of-pk/player/body/body_up_",
          DOWN: "/assets/game/journey-of-pk/player/body/body_down_",
          LEFT: "/assets/game/journey-of-pk/player/body/body_left_",
          RIGHT: "/assets/game/journey-of-pk/player/body/body_right_",
        },
      },
    },
  },
  DEBUG_MODE: true,
};
