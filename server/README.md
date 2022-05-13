# Chaum-Petersen ZKP Verifier
Server verifier application written in Python using FastApi. Allows the prover to register a commit with the verifier and subsequently prove their knowledge of a secret number.

## Prerequisites
- Python Version: ~3.9.7

## Installation
To install all packages run the following command.
```console
pip install -r requirements.txt
```

## Usage
To run the app in development mode, excute the follow command and open [http://localhost:8000](http://localhost:8000) to check it is running.
```console
uvicorn main:app --host 0.0.0.0 --port 8000
```

## Testing
The command below will run all application tests which are located within the `utils_test.py` file. Unfortunately, these could not be completed due the time constraints of the submission.
```console
pytest
```

## Project Structure
The project has been written within two core files. These are:
- main.py
- utils.py

Tests can also be found within:
- utils_test.py

## Further Work
- Tests and documentation should be written for functions within the `main.py` and `utils.py` files. These were not completed due the time constraints of the task.
- This implementation of the code uses a temporary data storage implementation which does not provide any data verification or consistency. This would be needed to harden the system.
- CORS has been left open for testing and development purposes. This would need to addressed before pushing to production.
- CI/CD implementations should be put in place to make simple, confident deployments to production. But due to time contraints, this was not implemented.