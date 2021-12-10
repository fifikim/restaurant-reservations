# Capstone: Restaurant Reservation System

> _Periodic Tables_ is a reservation system for fine dining restaurants.
> The software is designed to be used by restaurant personnel when a customer calls to request a reservation.
> At this point, customers will not access the system online.

> A deployed version of this app can be found at: https://resto-res-client.herokuapp.com/

## Product Features

### 01 - Create and list reservations

Create a new reservation when a customer calls.<br/>
View an accurate, up-to-date list of how many customers will arrive at the restaurant on a given day.

### 02 - Create reservation on a future, working date

Validations ensure that reservations are only created on days the restaurant is open. <br/>
Users are prevented from accidentally taking reservations on days when the business is closed.<br/>

### 03 - Create reservation within eligible timeframe

The system checks that reservations are created during business hours, up to 60 minutes before closing.<br/>
Users are prevented from accidentally creating a reservation for a time that cannot be accommodated.

### 04 - Seat reservation

When a customer with a reservation arrives at the restaurant, assign their reservation to a specific table.<br/>
The system then loads an up-to-date list of tables showing which are occupied and free.

### 05 - Finish an occupied table

Free up an occupied table when the guests leave so that new guests may be seated at that table.<br/>

### 06 - Reservation Status

Assign reservations a status of either booked, seated, finished, or cancelled.<br/>
Users can quickly view which reservation parties are seated or due to arrive.<br/>
Finished and cancelled reservations are hidden from the dashboard.

### 07 - Search for a reservation by phone number

Search for a reservation by phone number (partial or complete) to quickly access a customer's details when they call.

### 08 - Change an existing reservation

Modify a reservation if a customer calls to change or cancel their reservation. <br/>Reservations are always accurate and current.

## API Documentation

Reservation Routes:

| Method | Path | Description |
|-----------------------------|
|GET  | /reservations | List all reservations by given date or current date |
|POST | /reservations | Create a new reservation |
|GET  | /reservations/:reservation_id | Fetch a single reservation |
|PUT  | /reservations/:reservation_id | Update the details of a reservation |
|PUT  | /reservations/:reservation_id/status | Update the status of a reservation |

Table Routes:

| Method | Path | Description |
|-----------------------------|
|GET  | /tables | List all tables |
|POST | /tables | Create a new table |
|GET  | /tables/:table_id | Fetch a single table |
|PUT  | /tables/:table_id/seat | Seat a 


## Installation

1. Fork and clone this repository.
1. Run `cp ./back-end/.env.sample ./back-end/.env`.
1. Update the `./back-end/.env` file with the connection URL's to your ElephantSQL database instance.
1. Run `cp ./front-end/.env.sample ./front-end/.env`.
1. You should not need to make changes to the `./front-end/.env` file unless you want to connect to a backend at a location other than `http://localhost:5000`.
1. Run `npm install` to install project dependencies.
1. Run `npm run start:dev` to start your server in development mode.

## File Structure

This repository is set up as a _monorepo_.
The table below describes the folders in this repository:

| Folder/file path | Description                                                      |
| ---------------- | ---------------------------------------------------------------- |
| `./back-end`     | The backend project, which runs on `localhost:5000` by default.  |
| `./front-end`    | The frontend project, which runs on `localhost:3000` by default. |

### Backend Files

The `./back-end` folder contains all the code for the backend project.

The table below describes the files in the `./back-end` folder:

| Folder/file path                                         | Description                                           |
| -------------------------------------------------------- | ----------------------------------------------------- |
| `./back-end/knexfile.js`                                 | The Knex configuration file.                          |
| `./back-end/src/app.js`                                  | Defines the Express application and connects routers. |
| `./back-end/src/db/connection.js`                        | The Knex connection file.                             |
| `./back-end/src/db/migrations`                           | The Knex migrations folder.                           |
| `./back-end/src/db/seeds/`                               | The Knex seeds folder.                                |
| `./back-end/src/errors/errorHandler.js`                  | Defines an Express API error handler.                 |
| `./back-end/src/errors/notFound.js`                      | Defines an Express API "not found" handler.           |
| `./back-end/src/reservations/reservations.controller.js` | A controller for the reservations resource.           |
| `./back-end/src/reservations/reservations.router.js`     | A router for the reservations resource.               |
| `./back-end/src/server.js`                               | Defines the node server.                              |
| `./back-end/test`                                        | A folder that contains all of the integration tests.  |
| `./back-end/vercel.json`                                 | A vercel deployment configuration file.               |

### Frontend Files

The `./front-end` folder contains all the code for the frontend project.

The table below describes the files in the `./front-end` folder:

| Folder/file path                                   | Description                                                                                |
| -------------------------------------------------- | ------------------------------------------------------------------------------------------ |
| `./front-end/e2e`                                  | Contains all of the end-to-end tests.                                                      |
| `./front-end/jest-puppeteer.config.js`             | A configuration file used by the end-to-end tests.                                         |
| `./front-end/src/App.js`                           | Defines the root application component.                                                    |
| `./front-end/src/App.test.js`                      | Contains the tests for the root application component.                                     |
| `./front-end/src/dashboard/Dashboard.js`           | Defines the Dashboard page.                                                                |
| `./front-end/src/index.js`                         | The main entry point for the React application.                                            |
| `./front-end/src/layout/ErrorAlert.js`             | Defines an error alert component when an error is specified.                               |
| `./front-end/src/layout/Layout.css`                | The css for the Layout component.                                                          |
| `./front-end/src/layout/Layout.js`                 | Defines the main layout of the application.                                                |
| `./front-end/src/layout/Menu.js`                   | Defines the menu for the application.                                                      |
| `./front-end/src/layout/NotFound.js`               | Defines the "Not found" component when no route matches.                                   |
| `./front-end/src/layout/Routes.js`                 | Defines all the routes for the application.                                                |
| `./front-end/src/utils/api.js`                     | Defines the functions used to access the backend API                                       |
| `./front-end/src/utils/date-time.js`               | Defines functions to format date and time strings.                                         |
| `./front-end/src/utils/format-reservation-date.js` | Defines a function to format the date on a single reservation or an array of reservations. |
| `./front-end/src/utils/format-reservation-time.js` | Defines a function to format the time on a single reservation or an array of reservations. |
| `./front-end/src/utils/useQuery.js`                | Defines a custom hook to parse the query parameters from the URL.                          |
