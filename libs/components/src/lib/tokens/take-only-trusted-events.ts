import { InjectionToken } from '@angular/core';

/**
 * @description:
 * The isTrusted read-only property of the Event interface is a boolean value that is true
 * when the event was generated by a user action, and false when the event was created or
 * modified by a script or dispatched via EventTarget.dispatchEvent().
 */
export const PRIZM_TAKE_ONLY_TRUSTED_EVENTS: InjectionToken<boolean> = new InjectionToken<boolean>(
  'This token need for override behavior the `prizmPressedObservable` function',
  {
    factory: (): boolean => true,
  }
);
