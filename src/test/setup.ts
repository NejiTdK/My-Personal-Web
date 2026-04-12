import '@testing-library/jest-dom';
import { expect } from 'vitest';

// Extend Vitest matchers with Testing Library matchers
interface CustomMatchers<R = unknown> {
  toBeInTheDocument(): R;
  toHaveClass(className: string): R;
  toBeVisible(): R;
}

declare module 'vitest' {
  interface Assertion<T = any> extends CustomMatchers<T> {}
  interface AsymmetricMatchersContaining extends CustomMatchers {}
}
