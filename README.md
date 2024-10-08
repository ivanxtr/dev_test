# Installation

if uses NVM
```bash
nvm use 
```

## Make 

or use Node v18.20.4 or greater

```bash
make install 
```

Run the App
```bash
make run 
```

__goes to localhost:8080__

## NPM scripts

```bash
cd client
npm install 
npm run build
```

```bash
cd api
npm install 
npm start
```

__goes to localhost:8080__

# Simple Developer Exercise 

The savvy cats over at SMART Pump would like to be able to allow users to login to their account, check their balance and update their personal details. Write a simple web application (API and UI) using node.js and lowdb that lets users accomplish those tasks. 

Feel free to use any other libraries or tool chains as long as the core code is javascript and node.js. npm (https://www.npmjs.org) is your friend - no need to recreate the wheel. 

You will find the base data file in `/data`

Wireframes: `assets/wireframes.png`

## Time limits

This exercise is meant showcase your creativity and talent in problem solving against a real world scenario. To that end it should not consume your every waking moment. We recommend at max spending 3 evenings of time on the exercise. 

## Requirements

* Login to the app via email and password x
* Restrict access to valid a User x
* Once logged in show the details of the user on the page x
* Authorized users can check their account balance x
* Allow the user to change their details x
* lowdb (DB) -> https://github.com/typicode/lowdb
* node.js -> http://nodejs.org/ 

## Bonus Points

* Fully responsive UI x
* Unit Tests of the API x
* Functional Tests of the UI x