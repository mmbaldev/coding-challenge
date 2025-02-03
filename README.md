# Application Setup Guide

This application is built using Next.js for the front-end and Express (Node.js) for the back-end.

## Prerequisites

Before you begin, ensure you have `npm` installed on your system.

## Backend Setup

1. **Install Dependencies**:
    ```bash
    npm install
    ```
2. **Run Development Server**:
    ```bash
    npm run dev
    ```

3. **Environment Variables**:
    - Create a `.env` file in the root directory.
    - Copy the contents from `.env.example` to `.env`.

## Frontend Setup

1. **Install Dependencies**:
    ```bash
    npm install
    ```

2. **Run Development Server**:
    ```bash
    npm run dev
    ```

## Integration with OpenAI API

- The LLM search functionality is currently integrated with the OpenAI API.

## TODOs

Due to time constraints, the following enhancements are planned:

- Add embeddings for new movies during their creation.
- Fix bugs in the mobile view.
- Implement an authentication system using JWT and next-auth.
- Containerize the project using Docker.
- Address issues in the test suite.
