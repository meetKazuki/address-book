# Address Book API

This repository houses code for [Address Book](https://address-staging.herokuapp.com/api/v1/docs)'s backend.

## Table of Contents

- [Address Book](#address-book)
  - [Table of Contents](#table-of-contents)
  - [About the Project](#about-the-project)
    - [Folder Structure](#folder-structure)
    - [HTTP Response Codes](#http-response-codes)
    - [Sample HTTP Response](#sample-http-response)
  - [Project Status](#project-status)
  - [Project Payload](#project-payload)
  - [Getting Started](#getting-started)
    - [Dependencies](#dependencies)
    - [Getting the Source](#getting-the-source)
    - [Installation & Usage](#installation-usage)
    - [Running Tests](#running-tests)
  - [How to Get Help](#how-to-get-help)
  - [Contributing](#contributing)
  - [License](#license)
  - [Authors](#authors)

## About the Project

This is a simple RESTful API for an address book. Part of an online assessment for [STRV](https://www.strv.com/). It allows a user to:

- Register a new account.
- Log in to the created.
- Add a contact to Firebase

### Folder Structure

```bash
.
├── .github                     # Compiled files
├── database                    # Database migration scripts and seeders
├── docs                        # Documentation files
├── src                         # Source files
├── test                        # Automated tests
├── .env.example
├── LICENSE
├── package.json
└── README.md
```

### HTTP Response Codes

Each response will be returned with one of the following HTTP status codes:

- `200` `OK` The request was successful
- `400` `Bad Request` There was a problem with the request (security, malformed)
- `401` `Unauthorized` The supplied API credentials are invalid
- `403` `Forbidden` The credentials provided do not have permissions to access the requested resource
- `404` `Not Found` An attempt was made to access a resource that does not exist in the API
- `500` `Server Error` An error on the server occurred

### Sample HTTP Response

The API response, to the best of my ability, is structure after JSEnd specifications.

- For a `success` response, the server will return a response of this format:

```
{
  "status": "success",
  "message": "success message from the API server"
  "data": { ... }
}
```

- For an `error` response, the server will return a response of this format. The `trace` key in the `error` object is returned if `NODE_ENV === development`.

```
{
  "status": "error",
  "error": {
    "message": "error message from the API server",
    "trace": {
      "statusCode": <status-code>
    }
  }
}
```

## Project Status

[![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/354a513337c5a0a5d299?action=collection%2Fimport#?env%5BAddress%20Development%20Environment%5D=W3sia2V5IjoiQVBJX1VSTCIsInZhbHVlIjoibG9jYWxob3N0OjcwMDkvYXBpL3YxIiwiZW5hYmxlZCI6dHJ1ZX0seyJrZXkiOiJBVVRIT1JJWkFUSU9OX1RPS0VOIiwidmFsdWUiOiIiLCJlbmFibGVkIjp0cnVlfSx7ImtleSI6IlNUQUdJTkdfVVJMIiwidmFsdWUiOiJodHRwczovL2FkZHJlc3Mtc3RhZ2luZy5oZXJva3VhcHAuY29tL2FwaS92MSIsImVuYWJsZWQiOnRydWV9XQ==)
[![Deploy to Heroku Staging](https://github.com/meetKazuki/address-book/actions/workflows/heroku-deployment-staging.yml/badge.svg)](https://github.com/meetKazuki/address-book/actions/workflows/heroku-deployment-staging.yml)

## Project Payload

- [Project Specifications](https://docs.google.com/document/d/1BnMjK5p4VK7lZcukUyHo0nICqb94bJKhHkwiSEoylOE/edit#heading=h.tdkswnxuwklt)
- [Project Entities Model](https://dbdiagram.io/d/6075157eb6aeb3052d8fcd46)
- [API on Staging Environment](https://address-staging.herokuapp.com/api/v1)
- [API Documentation](https://address-staging.herokuapp.com/api/v1/docs)
- [Postman Collection](https://documenter.getpostman.com/view/7505181/TzRNEV3x)

## Getting Started

### Dependencies

This project uses [Express.js](https://expressjs.com/) v4.17. It has the following dependencies:

- [Node.js >= 12.18.3](https://nodejs.org/en/download)
- [PostgreSQL Database](https://www.postgresql.org/download/)

### Getting the Source

This project is hosted on [Github](https://github.com/meetKazuki/address-book). You can clone this project directly using this command:

```sh
git clone https://github.com/meetKazuki/address-book.git
```

### Installation & Usage

- Create a PostgreSQL database by running the `cmd` below:

```sh
createdb -h localhost -p 5432 -U postgres <database_name>
```

- After cloning the repository, create a `.env` file from `.env.example` and set your local `.env.` variable(s).

```sh
cp .env.example .env
```
- Install the dependencies

```sh
npm install
```
- Run migration

```sh
npm run db:migrate
```
- You can run the server using

```sh
npm run dev
```
- Other `npm` scripts are also available for handling database migration and database seeding:
  - `npm run db:migrate` runs script that is responsible for creating tables and their columns in the database,
  - `db:migrate:undo`: undoes the effect of `npm run db:migrate`,
  - `db:reset`: undoes all the migrations, then runs migration on the database,
  - `db:seed`: responsible for seeding records in the database,

### Running Tests

To run tests, run

```sh
npm test
```

To run tests with coverage reporting, run

```sh
npm run test:coverage
```

## How to Get Help

Notice a bug? Please open an issue. Need more clarification on any part of the code base? Contact [Desmond](https://github.com/meetKazuki).

## Contributing

To contribute to this project, start by raising an issue. There are issue templates for bug and feature request. Once this issue has been agreed upon, you can create a feature or hotfix branch off develop or master (for hotfix) and raise PR. There is also a PR template.

## License

This project is licensed under the [MIT License]('https://opensource.org/licenses/MIT')

## Authors

- **[Desmond Edem](https://github.com/meetKazuki)** - _Initial work_
