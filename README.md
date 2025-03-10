# URL Shortener

A simple URL shortener built with Next.js 14, TypeScript, Tailwind CSS, and Sequelize with PostgreSQL. This project allows users to shorten URLs, track visit counts, view statistics, and includes rate limiting for extra security.

## Why I Picked Next.js

When I first considered building the URL Shortener, I weighed the option of creating two separate projects—one for the frontend and another for the backend. However, that approach would have meant managing two separate codebases, coordinating build steps, and integrating them within a Docker environment.

By choosing Next.js, I get a unified full-stack framework with a pre-defined structure that allows me to focus on building the application rather than managing the complexities of connecting separate projects. Next.js brings together server-side rendering, API routes, and a modern React-based frontend in one neat package. This means a single Dockerfile is all I need to build and deploy a cohesive application, simplifying both development and deployment.

In short, Next.js enables a more streamlined development experience and faster iteration, letting me focus on delivering a robust full-stack solution.

### Why I Used Sequelize with Migrations

Using Sequelize with migrations helps maintain and evolve the database schema in a controlled and versioned manner. Migrations enable me to track changes over time, roll back if needed, and ensure that everyone on the team and all deployment environments have a consistent database structure. This approach makes it easier to manage schema updates and guarantees that the production database remains in sync with the application’s evolving requirements.

## Features

- **Shorten URLs:** Create short URLs via a user-friendly form.
- **Redirect:** Automatically redirect to the original URL when the short URL is accessed.
- **Visit Tracking:** Record and display the number of visits per shortened URL.
- **Stats Page:** View URL stats (original URL, visit count, timestamps) at `/{slug}/stats`.
- **Copy Functionality:** Easily copy the short URL and stats URL to the clipboard.
- **Rate Limiting:** Protect endpoints using `rate-limiter-flexible` with global middleware.
- **Dockerized:** Run the app and PostgreSQL using Docker Compose with external database access.
- **Testing:** Unit and integration tests written with Jest.


### What Was Left Out

While the core functionality of the URL Shortener is complete, a few additional features were intentionally left out for future enhancements to keep the development time short over the weekend:

- **Allow Users to Modify the Slug:**  
  Users cannot customize the slug of their URL at this time. This feature is deferred to keep the initial implementation focused and streamlined.

- **API Specification Compliance:**  
  The API does not yet adhere to a specific standard such as JSON:API. Future iterations may update the API to follow a known spec for better consistency and interoperability.

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v20 or later)
- [npm](https://www.npmjs.com/)
- [Docker](https://www.docker.com/) & [Docker Compose](https://docs.docker.com/compose/)

### Installation

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd url-shortener
   ```

2. Install dependencies:
    ```bash
    npm install
    ```
3. Create a .env file in the project root with the following content (adjust values as needed):
    ```bash
    DB_HOST=db
    DB_PORT=5432
    DB_USER=postgres
    DB_PASSWORD=password
    DB_NAME=url_shortener
    BASE_URL=http://localhost:3000
    ```

4. Run Docker Compose to start the app and database:
    ```bash
    docker-compose up --build
    ```
   
   if already built, you can run:
    ```bash
    docker-compose up
    ```   

    clean up:
    ```bash
   docker-compose down --rmi all --volumes --remove-orphans
   ```

5. Access the App:
   Open your browser at http://localhost:3000