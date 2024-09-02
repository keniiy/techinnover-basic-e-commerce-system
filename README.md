<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

<p align="center">A comprehensive API built using the <a href="http://nodejs.org" target="_blank">Nest.js</a> framework, offering user management and admin features.</p>
<p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>

## Description

This project is a robust API built using the [Nest.js](https://github.com/nestjs/nest) framework, focusing on user and product management with a role-based access control system. The API provides user registration, authentication, profile management, and admin functionalities such as banning/unbanning users and managing products. It is designed to be scalable, efficient, and easy to extend.

## Features

- **User Management**: Users can register, log in, and manage their profiles.
- **Product Management**: Users can create, update, delete, and view their own products. Admins can approve or disapprove products.
- **Admin Management**: Admins can ban or unban users and manage product approvals.
- **Authentication**: JWT-based authentication with role-based access control.
- **Role-Based Access Control**: Different access levels for users, admins, and super admins.
- **Pagination and Filtering**: Support for paginated and filtered queries for large datasets.

## Project Setup

### Prerequisites

- Node.js (v14.x or higher)
- npm or yarn
- MongoDB (local or cloud-based)

### Installation

1. Clone the repository:

```bash
   git clone https://github.com/yourusername/your-repo.git
   cd your-repo
```

2.	Install dependencies:

```bash
    pnpm install
```

3.	Set up environment variables:

Copy the .env.example file to .env and configure the variables according to your environment.

```bash
    cp .env.example .env
```


### Compile and Run the Project
```bash
  # development
  $ pnpm run start

  # watch mode
  $ pnpm run start:dev

  # production mode
  $ pnpm run start:prod
```

### Run Tests
```bash
# unit tests
$ pnpm run test

# e2e tests
$ pnpm run test:e2e

# test coverage
$ pnpm run test:cov
```


### API Endpoints
Authentication

	•	POST /auth/v1/login
	•	Log in a user and obtain an access token.
	•	Request Body: LoginDto
	•	Response: AuthResponseDto
	•	PATCH /auth/v1/change-password
	•	Change the password of the authenticated user.
	•	Request Body: ChangePasswordDto
	•	Response: UserSuccessResponseDto<void>
	•	Protected Route: Requires JWT token.

User Management

	•	GET /user/v1/profile
	•	Get the profile of the authenticated user.
	•	Response: UserSuccessResponseDto<UserResponseDto>
	•	Protected Route: Requires JWT token.

Admin Management

	•	PATCH /admin/v1/update-status
	•	Update the status of a user (ban/unban).
	•	Request Body: UpdateUserStatusDto
	•	Response: UserSuccessResponseDto<UserResponseDto>
	•	Protected Route: Requires JWT token and admin role.

 Product Management

	•	POST /products/v1
	•	Create a new product.
	•	Request Body: CreateProductDto
	•	Response: ProductSuccessResponseDto<ProductResponseDto>
	•	Protected Route: Requires JWT token.
	•	GET /products/v1
	•	Retrieve a list of products (only approved products for unauthenticated users).
	•	Response: ProductPaginatedResponseDto<ProductResponseDto>
	•	GET /products/v1/:id
	•	Retrieve details of a single product by ID.
	•	Response: ProductSuccessResponseDto<ProductResponseDto>
	•	PATCH /products/v1/:id
	•	Update a product by ID.
	•	Request Body: UpdateProductDto
	•	Response: ProductSuccessResponseDto<ProductResponseDto>
	•	Protected Route: Requires JWT token.
	•	DELETE /products/v1/:id
	•	Delete a product by ID.
	•	Response: ProductDeleteSuccessResponseDto
	•	Protected Route: Requires JWT token.

### Guards and Strategies

	•	JwtAuthGuard: Protects routes by ensuring the request includes a valid JWT.
	•	RolesGuard: Ensures that the user has the correct role to access a route.
	•	JwtPassportStrategy: Validates the JWT and checks the user’s status (e.g., whether the user is banned).

### DTOs and Validation

	•	LoginDto: Used for user login requests.
	•	ChangePasswordDto: Used for changing user passwords.
	•	UpdateUserStatusDto: Used by admins to ban/un-ban users.
	•	CreateProductDto: Used for creating new products.
	•	UpdateProductDto: Used for updating existing products.
	•	FindProductsDto: Used for querying products with pagination and filters.

All DTOs are validated using class-validator decorators to ensure the integrity of incoming requests.

### Running the Application

	1.	Ensure MongoDB is running locally or update your .env file with the correct MongoDB URI.
	2.	Start the application using the appropriate pnpm command as described in the Compile and Run the Project section.
	3.	The API will be available at http://localhost:3000.

### Troubleshooting

	•	Cannot connect to MongoDB: Ensure that MongoDB is running and the MONGO_URI in your .env file is correct.
	•	Invalid JWT Token: Ensure that you are using the correct token and that it has not expired. Check the JWT_SECRET in your .env file.
	•	Unauthorized Access: Ensure you have the correct role and permissions to access certain routes.

For additional support, consult the NestJS Documentation or visit the Discord channel for community help.

### License
.
This project is MIT licensed.

Happy coding ;) 🥂