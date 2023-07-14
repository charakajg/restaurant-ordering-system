# Restaurant Ordering System

## Setting up

Install docker and ensure docker demon is running
Clone the repo and go the project root
Run `nvm use`
Run `npm install`

Open an terminal and run `docker-compose up`
Note that it won't be necessary to run seperate migration scripts as docker will run init.sql to create the relevant tables after running an mysql instance.

Open another terminal and run `npm run seed` to seed initial data which will add 150 users, 12 categories of dish, 150 dishes and 10000 orders. Note that seed dishes won't have images.

Run `npm run start:dev` to start the api

## Using API
You can open `http://localhost:8080/api-docs/` and call the relevant end-points

## Unit Tests
Currently they don't work due to an esm configuration issue with jest. Once corrected and test are properly updated, you can run tests with `npm run test`.

## Limitations

Note that only when you create new dishes, orders or delete them, that you'll have to use the auth token

All the GET requests (including reports) are accessible without logging in

Validations have only been used when placing an order and with reports
