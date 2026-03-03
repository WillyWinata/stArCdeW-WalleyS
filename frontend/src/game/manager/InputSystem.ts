import type { Observer } from "../utilities/interfaces/Observer";
import type { Subject } from "../utilities/interfaces/Subject";

export class InputSystem implements Subject {
  private static instance: InputSystem;

  private current: Record<string, boolean> = {};
  private previous: Record<string, boolean> = {};

  private observers: Observer[] = [];

  attach(observer: Observer): void {
    this.observers.push(observer);
  }

  detach(observer: Observer): void {
    this.observers.filter((obs) => obs != observer);
  }

  notify(): void {
    this.observers.forEach((observer) => observer.update());
  }

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
