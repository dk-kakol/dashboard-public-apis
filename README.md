# Dashboard Public APIs

## 📚 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Technology Stack](#️-technology-stack)
- [Development Conventions](#-development-conventions)
- [Future Enhancements](#-future-enhancements)
- [Development & Setup](#️-development--setup)
- [Folder Structure](#-folder-structure)

## 📖 Overview

This is my personal **portfolio project**, showcasing my approach to programming and the technologies I use daily. It highlights my coding style, best practices, and key development principles that matter to me:

- **Responsive Design** is more than just breakpoints—it's about creating adaptive components that respond to their environment.
- **Attention to Detail** – I focus on UI/UX aesthetics, ensuring an intuitive and visually appealing interface.
- **Semantic & Accessible Code** – I prioritize proper HTML structure and adhere to accessibility best practices.
- **Continuous Learning** – I stay up to date with new trends and technologies, always open to experimentation and innovation.

🌐 **Live Application**: [Explore the project here](https://portfolio.kakol.in/about)

## ✨ Features

- **Dashboard Page** – Retrieves and displays API applications with:
  - Search, filtering, and pagination.
  - A clean and intuitive UI.
  - Multi-language support (Polish & English) via Vue I18n.
  - Storybook – Every component is documented with Storybook for better visualization and testing. Explore the live Storybook library here: [Storybook Library](https://67cecac7536e9d35b796a09d-utbktymejk.chromatic.com)
- **About Page** – Uses creative technologies like **GSAP** and **THREE.js** to dynamically present me and the project.
- **Custom Backend** – I developed my own backend for fetching and filtering the API list, ensuring independence from external services. The backend is available here: [Dashboard Public APIs Backend](https://github.com/dk-kakol/dashboard-public-apis-backend).

## 🛠️ Technology Stack

- **Vue.js 3** – Core framework providing a reactive, component-based structure.
- **Vite** – A fast and modern build tool for development and production.
- **Vue Router** – Handles client-side routing.
- **Pinia** – Global state management.
- **Axios** – API requests handling.
- **Vee-Validate with Zod** – Form validation.
- **Vuetify & Vite Plugin Vuetify** – Material Design UI components.
- **Vue I18n** – Multi-language support (Polish & English).
- **Storybook** – UI component development in isolation.
- **Vitest & Cypress** – Unit and end-to-end testing.

## 📌 Development Conventions

- **ABEM Methodology** – For structured and maintainable CSS class naming.
- **Code Consistency** – Enforced with ESLint & Prettier.
- **JSDoc for Documentation** – Enhances code clarity.
- **Responsive Design** – Ensures usability across all devices.
- **Accessibility** – Adheres to best practices for inclusivity.
- **Git for Version Control** – Regular code reviews to maintain quality.

## 🚀 Future Enhancements

- **CI/CD Integration** – Automate builds, testing, and deployment with GitHub Actions.
- **Error Tracking with Sentry** – For real-time issue monitoring and resolution.
- **Performance Optimization** – Further improvements using Vite's bundle optimizer.
- **Comprehensive Testing** – Expand unit test coverage for the About Page and implement additional end-to-end tests with Cypress.
- **Dependency Management** – Implement Dependabot for automated dependency updates.
- **Code Quality Monitoring** – Integrate SonarQube for static code analysis.

## 🏗️ Development & Setup

To get started with the project, follow these steps:

### 1️⃣ Clone the repository

```sh
git clone https://github.com/dk-kakol/dashboard-public-apis.git
cd dashboard-public-apis
```

### 2️⃣ Install dependencies

```sh
docker compose run --rm node-dashboard-public-apis yarn install
```

### 3️⃣ Run the development server

```sh
docker compose up -d --build
```

### 4️⃣ Explicit commands:

- Init husky: `docker compose exec node-dashboard-public-apis yarn prepare-husky`
- Storybook: `docker compose exec node-dashboard-public-apis yarn storybook`
- Publish storybook: `docker compose exec node-dashboard-public-apis yarn chromatic --project-token=YOUR_TOKEN`
- E2E tests: `docker compose exec node-dashboard-public-apis yarn test:e2e`
- Unit tests: `docker compose exec node-dashboard-public-apis yarn test:unit`
- Watch unit tests: `docker compose exec node-dashboard-public-apis yarn test:unit-watch`
- Type check: `docker compose exec node-dashboard-public-apis yarn type-check`
- Lint: `docker compose exec node-dashboard-public-apis yarn lint`
- Prettier: `docker compose exec node-dashboard-public-apis yarn format`
- Stylelint: `docker compose exec node-dashboard-public-apis yarn stylelint`

### 5️⃣ Build for production

```sh
docker compose exec node-dashboard-public-apis yarn build
```

## 📂 Folder Structure

```
├── __mocks__           # Mocks for unit testing
│   ├── http            # Mocks for HTTP requests
├── .docker             # Docker configuration files
├── .husky              # Git hooks managed by Husky
├── .storybook          # Configuration files for Storybook
├── .vscode             # VS Code- settings and configurations
├── .yarn               # Yarn configuration and cache files
├── .cypress            # Cypress config and end-to-end tests
├── public              # Static assets served directly
├── src
│   ├── assets          # Assets
│   ├── components      # Reusable Vue components & ATOMIC design
│   │   ├── atoms
│   │   ├── molecules
│   │   ├── organisms
│   │   ├── pages
│   │   ├── templates
│   ├── composables     # Reusable Vue 3 Composition API functions
│   ├── directives      # Custom Vue directives
│   ├── helpers         # Utility functions
│   ├── locales         # Localization files
│   ├── plugins         # Plugins configurations
│   ├── router          # Vue Router configuration
│   ├── schemas         # Zod Schemas
│   ├── services        # API service modules
│   ├── stores          # Pinia stores
│   ├── stories         # Storybook doc pages and assets
│   ├── tests           # Unit testing
│   │   ├── utils       # Utility functions for testing
│   └── App.vue         # Root Vue component
│   └── main.ts         # Entry point
└── ...                 # Config files
```

---

🤝 **Let's connect!** If you have any feedback, feel free to reach out or contribute! 😃

- [LinkedIn](https://www.linkedin.com/in/kakol-dariusz)
