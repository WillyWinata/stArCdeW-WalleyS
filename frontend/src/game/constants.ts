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
          WALK: {
            PATH: "/assets/game/journey-of-pk/player/legs/walk/walk_",
            FRAME: 2,
          },
          IDLE: {
            PATH: "/assets/game/journey-of-pk/player/legs/idle/idle_",
            FRAME: 1,
          },
        },
        BODY: {
          UP: {
            PATH: "/assets/game/journey-of-pk/player/body/body_up_",
            FRAME: 1,
          },
          DOWN: {
            PATH: "/assets/game/journey-of-pk/player/body/body_down_",
            FRAME: 1,
          },
          LEFT: {
            PATH: "/assets/game/journey-of-pk/player/body/body_left_",
            FRAME: 1,
          },
          RIGHT: {
            PATH: "/assets/game/journey-of-pk/player/body/body_right_",
            FRAME: 1,
          },
        },
      },
    },
  },
};
