export const GameConfiguration = {
  GAME: {
    COLLIDER: {
      COLLIDER_COLOR: "red",
      DEBUG_MODE: true,

      PLAYER: {
        HURT_BOX: {
          OFFSET: {
            X: 0,
            Y: -9,
          },
          SIZE: {
            WIDTH: 10,
            HEIGHT: 12,
          },
        },

        COLLISION_BOX: {
          OFFSET: {
            X: -3,
            Y: -13,
          },
          SIZE: {
            WIDTH: 15,
            HEIGHT: 16,
          },
        },
      },
    },
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
};
