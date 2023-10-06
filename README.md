# Birthday App

Birthday App is a Nest.js application that helps you manage and send birthday messages to users.

## Installation

### Prerequisites

- Node.js
- Yarn (for package management)
- Global installation of `npx`
- MySQL database

Install the required Node.js modules using Yarn:
yarn install

Ensure you have npx installed globally. You can install it using npm:
npm install -g npx


Update the .env file with your MySQL database configuration. The file should look like this:
DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=root
DB_PASSWORD=root
DB_DATABASE=birthday_app

Run TypeORM migration to create database tables:
yarn typeorm migration:run


# Usage
To start the application, run the following command:
npx nest start --watch


#curl example
Create User with Birthday Today
To create a user with a birthday today, you can use the following curl command:
curl -X POST -H "Content-Type: application/json" -d '{
  "firstName": "John",
  "lastName": "Doe",
  "birthday": "2023-10-04",
  "location": "New York"
}' http://localhost:3000/users

To delete a user, you can use the following curl command:
curl -X DELETE http://localhost:3000/users/1
Replace 1 with the actual user ID you want to delete.

