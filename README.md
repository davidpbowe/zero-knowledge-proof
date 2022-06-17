# Zero Knowledge Proof
This is an implementation of the Chaum-Peterson ZKP protocol to trial it as an authentication mechanism. Proof tests can be found within the client application under the file `src/zkp/proof.test.js`. Run these tests as part of the suite of tests within the client application.

Following on from the proof, a client/server (prover/verifier) application has been created to demonstrate the workflow in practice. More details of these applications and their implementation tests can be found in the respective `README.md` files of each application.

The full system can be setup and run by using `Docker Compose` and users can interact with the provided web UI at [http://localhost:3000](http://localhost:3000). Use the following command from the project root directory to build and run the application containers.
```console
docker-compose up --build
``` 

## Technologies used
### Prover
- React
- Create React App

### Verifier
- Python
- FastApi

## How to start
- Clone the Repo using: `git clone git@bitbucket.org:davidbowe/zero-knowledge-proof.git`
- Change Directory: `cd zero-knowledge-proof`
- Start Docker on your machine
- Use command: `docker-compose up --build`

## How to use
Visit [http://localhost:3000](http://localhost:3000) and follow the browser interface.

