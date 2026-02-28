export class InputSystem {
  private static instance: InputSystem;
  private keys: Record<string, boolean>;

  constructor() {
    this.keys = {};
  }

  static getInstance(): InputSystem {
    if (!InputSystem.instance) {
      InputSystem.instance = new InputSystem();
    }
    return InputSystem.instance;
  }

  addKey(key: string) {
    this.keys[key] = true;
  }

  removeKey(key: string) {
    this.keys[key] = false;
  }

  getKey(key: string): boolean {
    return this.keys[key];
  }
}
