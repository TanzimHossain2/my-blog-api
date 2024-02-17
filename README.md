# FSArmy - My Blog API

## Overview

FSArmy is a robust and scalable blog API application built on the principles of modern web development. It empowers users to create, manage, and publish articles with ease. The application is designed using cutting-edge technologies and adheres to best practices in software development.

## Features

- **User Authentication**: Secure user registration and login functionality.
- **Article Management**: Create, retrieve, update, and delete articles.
- **Comment System**: Enable users to leave comments on articles.
- **User Management**: Admin-only endpoints for managing users.

## Technologies Used

- **Node.js**: A powerful JavaScript runtime for building server-side applications.
- **Express**: A minimalist and flexible web application framework for Node.js.
- **MongoDB**: A NoSQL database for scalable and high-performance data storage.
- **Swagger**: An API documentation tool for designing, building, and documenting APIs.
- **Docker**: A containerization platform for packaging, deploying, and running applications.

## Swagger File

To access the live API documentation using Swagger, please click on the following link:
[FSArmy - My Blog API - Swagger Documentation](https://app.swaggerhub.com/apis/CodeBitLabs/fs-army-my-blog-api/)

You can also run the Swagger documentation on your localhost by clicking on the link below:

The Swagger Run localhost link is: [http://localhost:4000/docs](http://localhost:4000/docs)

**Please note that you will need to have the application running on your local machine to access the localhost link.**

## Docker

To run the application using Docker, follow these steps:

1. Ensure you have Docker installed on your machine.
2. Clone this repository.
3. Navigate to the root directory of the project.
4. Run the following command:

```bash
docker-compose up
```

This will start the MongoDB and Mongo Express services. You can access Mongo Express by visiting `http://localhost:8081` in your browser.

## Installation

To install the dependencies and run the application, follow these steps:

1. Clone this repository.
2. Navigate to the root directory of the project.
3. Run the following command to install dependencies:

```bash
npm install
```

4. Start the application by running:

```bash
npm start
```

This will start the server on `http://localhost:4000`.

## Usage

Once the server is running, you can use the following endpoints:

### Authentication

- `POST /auth/register`: Create a new account.
- `POST /auth/login`: Login to your account.

### Articles

- `GET /articles`: Retrieve all published articles.
- `POST /articles`: Create a new article.
- `GET /articles/{id}`: Fetch a single article by ID.
- `PUT /articles/{id}`: Create or update an entire article.
- `PATCH /articles/{id}`: Partially update an article.
- `DELETE /articles/{id}`: Delete an article by ID.

### Comments ( Upcoming )

- `GET /articles/{id}/comments`: Retrieve all comments for a specific article.
- `POST /articles/{id}/comments`: Create a new comment for a specific article.
- `GET /articles/{id}/comments/{commentId}`: Fetch a single comment by ID.
- `PUT /articles/{id}/comments/{commentId}`: Update a comment by ID.
- `PATCH /articles/{id}/comments/{commentId}`: Partially update a comment by ID.
- `DELETE /articles/{id}/comments/{commentId}`: Delete a comment by ID.

### Users ( Upcoming )

- `GET /users`: Retrieve all users (admin only).
- `GET /users/{id}`: Fetch a single user by ID (admin only).
- `PUT /users/{id}`: Update a user by ID (admin only).
- `PATCH /users/{id}`: Partially update a user by ID (admin only).
- `DELETE /users/{id}`: Delete a user by ID (admin only).

## Technologies Used in this Project

- Node.js
- Express
- MongoDB
- Docker
- Swagger

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Author

- Tanzim Hossain (tanzimhossain2@gmail.com)

Feel free to customize this template to fit your project's specific needs. Happy coding!
