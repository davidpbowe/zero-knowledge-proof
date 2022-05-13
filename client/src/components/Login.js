import { React, useState } from "react";
import { useNavigate } from "react-router-dom";
import { calculateS } from '../zkp/utils';

function Login({ users }) {
    const [name, setName] = useState("");
    const [secret, setSecret] = useState("");
    const [message, setMessage] = useState("");

    const navigate = useNavigate();

    const displayFailure = () => {
        setMessage('User was not authenticated');
    };

    const handleResponse = async (response, k) => {
        const authenticated = await response.json();
        if (authenticated) {
            navigate("/authenticated");
        } else {
            displayFailure();
        }
    };

    const authenticateUser = async (name, s) => {
        const searchParams = new URLSearchParams({ s })
        let response = await fetch(`http://localhost:8000/auth/${name}?${searchParams}`, {
            method: 'GET',
        });
        if (response.status === 200) {
            handleResponse(response);
        } else {
            throw new Error(`The API returned a ${response.status} error`);
        }
    };

    const getUser = (name, users) => {
        const user = users.find(element => element.name === name);
        if (user) {
            return user;
        } else {
            throw new Error('ERROR: USER DOES NOT EXIST.');
        }
    };

    const parseSecret = (secretInput) => {
        const secretInt = parseInt(secretInput, 10);
        if (secretInt) {
            setMessage(`Your secret is ${secretInt}. Authenticating your credentials...`);
            return secretInt;
        } else {
            throw new TypeError('ERROR: THE SECRET MUST BE AN INTEGER.');
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const secretInt = parseSecret(secret);
            const { k, c, q } = getUser(name, users);
            const s = calculateS(k, c, secretInt, q);
            await authenticateUser(name, s);
        } catch (error) {
            // Catches errors from incorrect input and API
            setMessage(error.message);
            console.error(error);
        }
    };

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
            <label htmlFor="name" style={{ display: "block", margin: '5px' }}>
                    Username
                    <input
                        id="name"
                        name="name"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </label>
                <label htmlFor="secret" style={{ display: "block", margin: '5px' }}>
                    Secret Number
                    <input
                        id="secret"
                        name="secret"
                        type="password"
                        value={secret}
                        onChange={(e) => setSecret(e.target.value)}
                    />
                </label>
                <button type="submit" style={{ display: "block", margin: '5px' }}>
                    Login
                </button>
                <div className="message">{message ? <p>{message}</p> : null}</div>
            </form>
        </div>
    );
}

Login.displayName = 'Login';

export default Login;