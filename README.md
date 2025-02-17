# Ghost Vite Starter

![Ghost Vite Starter](https://github.com/user-attachments/assets/77b19e7b-b874-401f-a60c-05749dd88e10)

## Description

**Ghost Vite Starter** is a modern development environment for creating Ghost themes using Vite. This project integrates technologies like TypeScript, PostCSS, Tailwind CSS, and ESLint, providing a fast, optimized development experience with hot reloading. Additionally, running the build command generates an optimized version of the theme in the `dist` folder and creates a `.zip` file in the `zip` folder for easy distribution and deployment. 🚀

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [Project Scripts](#project-scripts)
- [Validation and Linting](#validation-and-linting)
- [File Structure Details](#file-structure-details)
- [SEO and Performance Optimization](#seo-and-performance-optimization)
- [License and Authors](#license-and-authors)

## Introduction

Welcome to **Ghost Vite Starter** 🎉, the perfect starting point for developing Ghost themes with a modern and efficient workflow. This starter takes full advantage of Vite’s capabilities, offering hot reloading, lightning-fast builds, and a clean project structure tailored to modern web development needs.

## Features

- **⚡ Superfast Development:** Vite provides hot module replacement and fast builds.
- **🛠 Modern Technologies:** Includes TypeScript, PostCSS, and Tailwind CSS for robust and scalable development.
- **📦 Automatic Packaging:** The `build` command generates an optimized version in `dist` and creates a `.zip` file in the `zip` folder.
- **🔧 Flexible Configuration:** Customize Vite, Tailwind, ESLint, Stylelint, and other tools as needed.
- **📝 Handlebars Templates:** Uses `.hbs` files (e.g., `index.hbs`, `post.hbs`, `page.hbs`, etc.) to define theme structure.
- **🔌 Ghost Integration:** Easily inject necessary scripts into Ghost for development in `localhost:2368`.

## Installation

### Prerequisites

- [Node.js](https://nodejs.org) (>= 16)
- [pnpm](https://pnpm.io/) (>= 8)

### Installation Steps

1. **Clone the repository:**

   ```sh
   git clone https://github.com/godofredoninja/ghost-vite-starter.git
   cd ghost-vite-starter
   ```

2. **Install dependencies:**

   ```sh
   pnpm install
   ```

3. **Start the development server:**

   ```sh
   pnpm dev
   ```

## Configuration

To make Vite work correctly in a Ghost environment running on `localhost:2368`, inject the following scripts into **Settings → Code Injection** in Ghost:

```html
<script
  type="module"
  src="http://YOUR_LOCAL_IP:3000/assets/@vite/client"
></script>
<script
  type="module"
  src="http://YOUR_LOCAL_IP:3000/assets/js/main.ts"
></script>
```

> **Note:** Replace `YOUR_LOCAL_IP` with your actual local IP address (e.g., `192.168.1.3`). This ensures Ghost connects properly to the Vite server.

## Usage

### Development

- Run `pnpm dev` to start the development server. Vite enables hot reloading, allowing you to see changes in real time as you modify templates and styles.
- Modify `.hbs` files, CSS, and scripts, and observe automatic updates in the browser.

### Build and Packaging

- **Build:** Run `pnpm build` to generate an optimized version of the theme. This process includes:

  - CSS and JavaScript compilation and minification.
  - Generating the `dist` folder with the optimized theme.
  - Creating a `.zip` file in the `zip` folder, ready for production.

  ```sh
  pnpm build
  ```

### Code Formatting

- Run `pnpm format` to format the code with Prettier and ensure consistent styling.

  ```sh
  pnpm format
  ```

## Project Scripts

These scripts are defined in the `package.json` file:

- **dev:** Starts the development server with Vite.
- **build:** Compiles and packages the theme, generating the `dist` folder and creating a `.zip` file in the `zip` folder.
- **format:** Runs Prettier to format the code.
- **lint:css:** Runs Stylelint to analyze and validate CSS code.
- **lint:js:** Runs ESLint to review and validate JavaScript code.
- **gscan:** Runs the following command:

  - `gscan ./dist`: Runs the gscan tool on the `dist` folder to scan and optimize the final build.

## 💖 Support This Project

If this project has been helpful to you, consider making a donation:

[![Donate](https://user-images.githubusercontent.com/10253167/103444000-877b1b80-4c32-11eb-8377-7bedd46dbdf8.gif)](https://www.paypal.me/godofredoninja)

## Copyright & License

Copyright (c) 2025 GodoFredo - Released under the [MIT license](LICENSE)
