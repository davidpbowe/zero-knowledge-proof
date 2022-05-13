# Chaum-Petersen ZKP Prover
Client prover application written in React with the [Create React App](https://github.com/facebook/create-react-app) project. Allows the prover to register and sign in against a server verifier.

## Prerequisites
- Node Version: ~14.18.2

## Installation
To install all packages run the following command.
```console
npm install
```

## Usage
Run the app in development mode and open [http://localhost:3000](http://localhost:3000) to view it in your browser.
```console
npm start
```

## Testing
Run all app tests and ZKP proofs. These tests are located in the `utils.test.js` file within the `src/zkp` directory.
```console
npm test
```

## Project Structure
The project has been structured according to the boilerplate code that was produced from Create React App.

The relevent files for this challange are:
- src/zkp/utils.js
- src/components/Register.js
- src/components/Login.js

Tests can also be found within:
- src/zkp/utils.test.js

## Further Work
- The current implementation saves user details within the state of the app but this would not suffice in a real world scenario. Intead, one possibility could be to save details of the commit on local storage after successfully registering it with the server. They would then be available next time the site was visited. Although, this solution would raise problems also.
- Tests and documentation should be written for functions within the `Login` and `Register` components. These were not completed due the time constraints of the task.
- This implementation of the code uses small numbers and performance suffers significantly when they become bigger. More time needs to be spent understanding where performance improvements can be made.
- CI/CD implementations should be put in place to make simple, confident deployments to production. But due to time contraints, this was not implemented.
