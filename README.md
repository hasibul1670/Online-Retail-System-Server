# Ecom Server Application

A simple Task Management application to help you efficiently manage your important tasks.

## APi Documentation

- [API Documentation](https://documenter.getpostman.com/view/27380820/2sA35MxJRB)

## Table of Contents

- [Technologies Used](#technologies-used)
- [Backend Endpoints](#backend-endpoints)
- [Live Demo](#live-demo)
- [Contact](#contact)

## Technologies Used

### Back-End

- Node.js
- TypeScript
- Express.js
- JWT for authentication

### Database

- Non-SQL [MongoDB]

## Backend Endpoints

### User

- Base URL: `https://ecom-server-gamma.vercel.app/api/v1/api/v1`

- `GET /users`: Get all tasks.
- `GET /users/:id`: Get a specific user by ID.
- `POST /users/create-user`: Create a new Product.
- `PATCH /users/:id`: Update an user info by ID.
- `PATCH /users/ban-user/:id`: Banned an user by ID.
- `PATCH /users/unban-user/:id`: UnBanned an user by ID.

  ### Product

- Base URL: `https://ecom-server-gamma.vercel.app/api/v1/api/v1`

- `GET /Product`: Get all tasks.
- `GET /Product/:id`: Get a specific Product by ID.
- `POST /Product/create`: Create a new Product.
- `PATCH /Product/:id`: Update a Product by ID.
- `DELETE /Product/:id`: Delete a Product by ID.

  ### Order

- Base URL: `https://ecom-server-gamma.vercel.app/api/v1/api/v1`

- `GET /order`: Get all tasks.
- `GET /order/:id`: Get a specific order by ID.
- `GET /order/userAll-order/:id`: Get a specific user Orders .
- `POST /order/create-order`: Create a new order.
- `PATCH /order/:id`: Update a order by ID.
- `DELETE /order/:id`: Delete a order by ID.

  ### Auth

- Base URL: `https://ecom-server-gamma.vercel.app/api/v1/api/v1`

- `POST /auth/login`: To log In .
- `POST  /auth/logout`: To Log Out.
- `POST  /auth/refresh-token`: To Refresh Token .

Please refer to the backend code for more detailed information about these endpoints.

## Live Demo
- [API Documentation](https://documenter.getpostman.com/view/27380820/2sA35MxJRB)
- Visit the [Live Website](https://ecom-server-gamma.vercel.app/api/v1)

## Contact

For any inquiries, please feel free to reach out:

- Email: [hasibul.dcc@gmail.com](mailto:hasibul.dcc@gmail.com)
- Portfolio: [https://hasibul-islam365.netlify.app](https://hasibul-islam365.netlify.app)

# Online-Retail-System-Server
