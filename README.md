# Restaurant Ordering System

## Setting up

Install docker and ensure docker demon is running
Clone the repo and go the project root
Run `nvm use`
Run `npm install`

Open an terminal and run `docker-compose up`
Note that it won't be necessary to run seperate migration scripts as docker will run init.sql to create the relevant tables after running an mysql instance.

Open another terminal and run `npm run seed` to seed initial data which will add 150 users, 12 categories of dish, 150 dishes and 10000 orders. Note that seed dishes won't have images.

Run `mkdir uploads` in case the folder is not already there
Run `npm run start:dev` to start the api

## Using API
You can open `http://localhost:8080/api-docs/` and call the relevant end-points

## Unit Tests
Currently they don't work due to an esm configuration issue with jest. Once corrected and test are properly updated, you can run tests with `npm run test`.

## Limitations

Note that only when you create new dishes, orders or delete them, that you'll have to use the auth token

All the GET requests (including reports) are accessible without logging in

Validations have only been used when placing an order and with reports

## Usage (screenshots)

### Register
<img width="750" alt="image" src="https://github.com/charakajg/restaurant-ordering-system/assets/11312827/449fc019-4354-438a-abfd-f8c5e105f294">

### Login
<img width="750" alt="image" src="https://github.com/charakajg/restaurant-ordering-system/assets/11312827/5a683af9-7bbd-4524-9b2a-488cd70d89db">
<img width="562" alt="image" src="https://github.com/charakajg/restaurant-ordering-system/assets/11312827/7a426537-3ea9-434c-8ddb-f5f625cf27b0">

### Add New Category
<img width="720" alt="image" src="https://github.com/charakajg/restaurant-ordering-system/assets/11312827/d0be92b7-e599-4bd9-87cc-ea15a144748a">

Note that the images goes to `/uploads` folder

### Add Dishes
<img width="712" alt="image" src="https://github.com/charakajg/restaurant-ordering-system/assets/11312827/3b488bf2-1949-4ee2-ae15-7b4ce6a5ac13">

Some validations for dishes
<img width="712" alt="image" src="https://github.com/charakajg/restaurant-ordering-system/assets/11312827/a7883016-2df0-40ad-8687-f64b664f579c">
<img width="664" alt="image" src="https://github.com/charakajg/restaurant-ordering-system/assets/11312827/00acb235-45e9-4f0b-bffd-6940163a72b7">

### Place order
<img width="718" alt="image" src="https://github.com/charakajg/restaurant-ordering-system/assets/11312827/7478f76c-d8bc-423b-8dfb-c90ae8b073b8">

Some validations for order
<img width="676" alt="image" src="https://github.com/charakajg/restaurant-ordering-system/assets/11312827/ef8d3abf-3f8a-4d63-8387-8163abfe410d">

### Reports
<img width="789" alt="image" src="https://github.com/charakajg/restaurant-ordering-system/assets/11312827/1c8479c5-421e-4cdb-928e-83f806bfa896">
