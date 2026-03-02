---
name: testing-strategy
description: Expert guide for implementing and maintaining a robust testing suite for React/Vite applications. Focuses on pragmatic testing with Vitest and React Testing Library, ensuring high confidence with minimal friction.
---

This skill defines the strategy and best practices for automated testing within the project. It focuses on maintaining a fast, reliable, and maintainable test suite that provides high confidence in the application's correctness.

## Project Setup

Before creating any tests in a new project, follow these steps to ensure a consistent and centralized environment:

1.  **Create the Tests Folder**: All test files must be stored in a root-level `tests/` directory to keep the `src/` folder clean and focused only on production code.
2.  **Install Dependencies**: Run the following command to set up the necessary testing tools:
    `npm install -D vitest @testing-library/react @testing-library/jest-dom jsdom @testing-library/user-event`
3.  **Configure Vite**: Ensure `vite.config.ts` includes the `test` property with the `jsdom` environment and a `vitest.setup.ts` file.

## Principles

1.  **Centralized Testing**: Always store test files in the root `tests/` directory, mirroring the structure of `src/` for easy navigation.
2.  **Test Behavior, Not Implementation**: Focus on what the user sees and interacts with, rather than internal component logic.
3.  **Accessibility First**: Use queries that reflect how users find elements (e.g., `getByRole`, `getByLabelText`) to ensure both the app and its tests are accessible.
4.  **Fast Feedback**: Keep tests fast by using Vitest for unit/integration tests and avoiding excessive dependencies in component tests.

## Folder Structure

Tests must be kept in the centralized `tests/` directory:
- **Component Tests**: `tests/[ComponentName].test.tsx` (mirroring the component location in `src/`).
- **Logic Tests**: `tests/[FileName].test.ts` for utilities, hooks, or repositories.
- **Integration Tests**: `tests/integration/` for multi-component flows.

## Testing Patterns

### 1. Component Testing (RTL)

Follow the **AAA** pattern:
- **Arrange**: Set up the component and its props/mocks.
- **Act**: Simulate user interaction (clicks, typing).
- **Assert**: Verify the expected outcome in the DOM.

```tsx
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Button } from './Button';

test('calls onClick when clicked', async () => {
  const handleClick = vi.fn();
  render(<Button onClick={handleClick}>Click Me</Button>);
  
  await userEvent.click(screen.getByRole('button', { name: /click me/i }));
  
  expect(handleClick).toHaveBeenCalledTimes(1);
});
```

### 2. Hook Testing

Use `renderHook` from `@testing-library/react` to test custom hooks in isolation.

```tsx
import { renderHook, act } from '@testing-library/react';
import { useCounter } from './useCounter';

test('increments counter', () => {
  const { result } = renderHook(() => useCounter());
  act(() => {
    result.current.increment();
  });
  expect(result.current.count).toBe(1);
});
```

### 3. Mocking Dependencies

Use `vi.mock` to isolate the code under test from external dependencies like APIs or complex libraries.

```tsx
vi.mock('./api', () => ({
  fetchData: vi.fn(() => Promise.resolve({ data: 'success' })),
}));
```

## AI Testing Tasks

When asking for tests:
- "Write a test for [Component] following the testing-strategy skill."
- "Refactor [TestFile] to improve its reliability and readability."
- "Create a set of tests for [Feature] including success and error states."

Always ensure all tests pass by running `npm test` before concluding a task.
