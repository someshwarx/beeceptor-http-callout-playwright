# Beeceptor Playwright Automation

A robust, end-to-end Playwright automation suite for testing the Beeceptor HTTP Callout functionalities.

## 🚀 Overview
This project validates the core features of the Beeceptor mock server platform, specifically focusing on HTTP Callouts, Routing Rules, and Dashboard interactions. It simulates real user behaviors to ensure the reliability and correctness of endpoint creation, rule configuration, and request validation.

## 🛠 Tech Stack
- **Framework:** [Playwright](https://playwright.dev/)
- **Language:** JavaScript (Node.js)
- **Configuration:** dotenv (for environment variable management)

## 📁 Project Structure
```text
├── pages/                  # Page Object Model (POM) classes for UI interactions
│   ├── HomePage.js         # Methods for landing page actions
│   └── DashboardPage.js    # Methods for mock server dashboard actions
├── tests/                  # Playwright test specifications
│   └── homepage.spec.js    # E2E test flows for Beeceptor callouts
├── utils/                  # Helper functions and utilities
├── test-data/              # Data files for parameterized testing
├── playwright.config.js    # Playwright framework configuration
├── .env.example            # Template for environment variables
└── package.json            # Project dependencies and scripts
```

## 📋 Prerequisites
- **Node.js** (v18 or newer recommended)
- **npm** (comes with Node.js)

## ⚙️ Setup Instructions
1. **Install Dependencies:**
   ```bash
   npm install
   ```

2. **Environment Configuration:**
   Copy the provided `.env.example` file to create your own `.env` file:
   ```bash
   cp .env.example .env
   ```
   Open the `.env` file and configure the variables (ensure you replace placeholders with your actual endpoint details):
   ```env
   BASE_URL=https://beeceptor.com
   ENDPOINT_NAME=your_endpoint_name_here
   ```

## 💻 Running the Tests
The project includes predefined scripts in `package.json` for convenience:

- **Run tests in headless mode (default):**
  ```bash
  npm run test
  ```
- **Run tests in headed mode (visible browser):**
  ```bash
  npm run test:headed
  ```
- **Run tests with Playwright UI:**
  ```bash
  npm run test:ui
  ```
- **View HTML Test Report:**
  ```bash
  npm run report
  ```

## 🔄 End-to-End Test Flow
1. **Initialize:** Navigate to the Beeceptor homepage.
2. **Setup:** Create a new custom endpoint or navigate to an existing dashboard.
3. **Configure:** Define mock routing rules and HTTP responses.
4. **Trigger:** Execute HTTP callouts (GET/POST/PUT/DELETE) to the configured endpoint.
5. **Assert:** Validate that the dashboard registers the correct requests, payloads, and responds with the mocked data.

## 🧹 Cleanup and Idempotency
- Tests are designed to run independently.
- Where applicable, teardown steps are included to clean up created endpoints or mock rules, ensuring subsequent test runs are not affected by leftover state.
- Test data uniqueness (like appending timestamps to endpoint names) helps maintain idempotent test executions.

## 📊 Test Report & Screenshots
*(Add screenshots of test execution or HTML reports here)*
- (#screenshot_taken.png)
- (#screenshot.png)

## 🚀 Future Improvements
- Integrate with CI/CD pipelines (e.g., GitHub Actions).
- Expand test coverage to include more complex API mocking scenarios (e.g., latency, failure injection).
- Implement visual regression testing using Playwright's built-in capabilities.
- Add support for multiple environments (staging, production).
