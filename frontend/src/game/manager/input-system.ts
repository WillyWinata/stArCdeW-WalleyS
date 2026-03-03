export class InputSystem {
  private static instance: InputSystem;

  private current: Record<string, boolean> = {};
  private previous: Record<string, boolean> = {};

  constructor() {}

  static getInstance(): InputSystem {
    if (!InputSystem.instance) {
      InputSystem.instance = new InputSystem();
    }
    return InputSystem.instance;
  }

  addKey(key: string) {
    this.current[key] = true;
  }

  removeKey(key: string) {
    this.current[key] = false;
  }

  getKey(key: string): boolean {
    return !!this.current[key];
  }

  getKeyDown(key: string): boolean {
    return !this.previous[key] && !!this.current[key];
  }

  getKeyUp(key: string): boolean {
    return !!this.previous[key] && !this.current[key];
  }

  endFrame() {
    this.previous = { ...this.current };
  }
}
