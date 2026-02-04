# 🎭 Playwright E-commerce Automation
> **Robust Web Testing Suite with TypeScript & Page Object Model (POM)**

[![Playwright Tests](https://github.com/seu-usuario/seu-repo/actions/workflows/playwright.yml/badge.svg)](https://github.com/seu-usuario/seu-repo/actions)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![Playwright](https://img.shields.io/badge/playwright-%232EAD33.svg?style=for-the-badge&logo=playwright&logoColor=white)
![Node.js](https://img.shields.io/badge/node.js-v18+-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)

---

## 📖 Table of Contents
* [Overview](#-overview)
* [Project Architecture](#-project-architecture-pom)
* [Key Features](#-key-features)
* [Installation](#-installation--setup)
* [Running Tests](#-running-tests)
* [CI/CD Pipeline](#-cicd-pipeline-github-actions)
* [Best Practices](#-best-practices)

---

## 🎯 Overview
This repository contains a professional automated testing suite for the [LambdaTest eCommerce Playground](https://ecommerce-playground.lambdatest.io/). 

Coming from a background in **Cypress** and **Robot Framework**, this project demonstrates a transition to **Playwright**, leveraging its superior speed, native parallel execution, and strong **TypeScript** integration.

---

## 🏗️ Project Architecture (POM)
We use the **Page Object Model (POM)** design pattern to ensure the code is clean, modular, and easy to maintain.

* **`pages/`**: The "Single Source of Truth". Contains all selectors (`readonly`) and business logic.
* **`tests/`**: The "Execution Layer". Contains clean, readable test cases focusing on assertions.
* **`playwright.config.ts`**: Global configuration for timeouts, retries, and browsers.

---

## ✨ Key Features
* 🚀 **High Performance:** Tests run in parallel across multiple browsers.
* 🛡️ **Type Safety:** Full TypeScript support for reliable refactoring.
* 📸 **Rich Artifacts:** Screenshots, videos, and traces generated on failure.
* 🔍 **Smart Locators:** Use of user-centric locators (`getByRole`, `getByText`).
* 📊 **HTML Reports:** Comprehensive visual feedback for every test run.

---

## 🛠️ Installation & Setup

### 1️⃣ Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed (v18 or higher).

### 2️⃣ Get Started
```bash
# Clone the repository
git clone [https://github.com/your-username/playwright-ecommerce-ts.git](https://github.com/your-username/playwright-ecommerce-ts.git)

# Enter the directory
cd playwright-ecommerce-ts

# Install project dependencies
npm install

# Install Playwright browser binaries
npx playwright install