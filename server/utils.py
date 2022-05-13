from random import randrange

user_db = []

def create_authentication_challenge(commit: dict) -> int:
    """
    Parameters
    ----------
    commit : dict
        All public and commited values calculated by the prover

    Return
    ----------
    : int
        The random challenge (c) to continue the protocol
    """
    prime_number = commit['p']
    return randrange(2, prime_number)

def verify_authentication(user: dict, s: int) -> bool:
    """
    Parameters
    ----------
    user : dict
        All public and commited values calculated by the prover
    s : int
        The prover challenge response (s)

    Return
    ----------
    : bool
        Has the prover shown their knowledge of the secret.
    """
    # Write test to handle if user attribute is missing
    r1 = ((user['g']**s) * (user['y1']**user['c'])) % user['p']
    r2 = ((user['g']**s) * (user['y2']**user['c'])) % user['p']
    if (r1 == user['r1'] and r2 == user['r2']):
        return True
    else:
        return False

def save_user(user: dict) -> None:
    """
    Parameters
    ----------
    user : dict
        All public and commited values calculated by the prover
    """
    user_db.append(user)

def get_user(username: str) -> dict:
    """
    Parameters
    ----------
    username : str
        The name of a registered user

    Return
    ----------
    user : dict
        All public and commited values calculated by the prover
    """
    # Write test to ensure only one user is returned
    # Write test to for when no user found
    users = filter(lambda user: user['name'] == username, user_db)
    return next(users, None)