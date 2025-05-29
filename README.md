# Playwright Test Project

This project uses [Playwright](https://playwright.dev/) for end-to-end testing.

---

## Running Tests

### 1. Running via Terminal

#### Run All Tests
```bash
npx playwright test
```

#### Run a Single Test File

- Run the login test:
  ```bash
  npx playwright test tests/crowdstrike2_login.spec.ts
  ```

- Run the navigation test:
  ```bash
  npx playwright test tests/crowdstrike3_navigation.spec.js
  ```

- Run the search test:
  ```bash
  npx playwright test tests/crowdstrike1_search.spec.js
  ```

- Run the Playwright example test:
  ```bash
  npx playwright test tests/example.spec.js
  ```

#### Run a Specific Test by Name
```bash
npx playwright test -g "check login works"
```
Replace `"check login works"` with the name or part of the name of your test.

---

### 2. Running via Visual Studio Code

#### Prerequisites
- Install the [Playwright Test for VSCode extension](https://marketplace.visualstudio.com/items?itemName=ms-playwright.playwright).

#### Run All Tests
- Open the Testing sidebar (`Ctrl+Shift+` ` or click the beaker icon).
- Click the **Run All Tests** button at the top.

#### Run a Single Test or Test File
- Open the test file (e.g., `crowdstrike2_login.spec.ts`) in the editor.
- Click the green triangle (▶️) next to the test or at the top of the file to run individual tests or the whole file.

---

## Additional Tips

- To run tests in headed mode (see the browser), use:
  ```bash
  npx playwright test --headed
  ```
- To view HTML reports after running tests:
  ```bash
  npx playwright show-report
  ```

---