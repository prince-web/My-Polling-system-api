# Polling System API

This is a backend api for creating questions and adding options to a specific question. Options can be voted. Questions, options can be deleted and questions can be viewed with all of their options.

### Hosted link: [Polling System API](https://my-polling-system-api.onrender.com)

## Folder Structure

- Config: It has the DB configuration file.
- Controllers: It contains all the required controller for the API.
- Models: It contains the schema for the options and questions.
- Routes: This folder holds the route which are used in the API.

## Polling system Features

- Create questions
- Add options to question
- Delete a question
- Delete an option
- Add vote to an option
- View a question with all of its options

## Installation Guide

- Clone this repository.
- Run npm install to install all the dependencies.
- Create an .env file in your project root folder and add your variables.
- Run npm start or node index.js to run the API in your local machine
- Connect to the API using Postman on port 3000. You can also change this port number in the .env file.

## API Endpoints

| HTTP Verbs | Endpoints                     | Action                                |
| ---------- | ----------------------------- | ------------------------------------- |
| POST       | /questions/create             | To create a question                  |
| POST       | /questions/:id/options/create | To add options to a specific question |
| DELETE     | /questions/:id/delete         | To delete a question                  |
| DELETE     | /options/:id/delete           | To delete an option                   |
| PUT        | /options/:id/add_vote         | To increase the count of votes        |
| GET        | /questions/:id                | To view a question and its options    |

## Tech stack

- NodeJS
- ExpressJS
- MongoDB
- Mongoose ODM
