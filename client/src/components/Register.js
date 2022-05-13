import { React, useState } from 'react';
import {
    primeNumbersArray,
    pickPrimeNumber,
    pickPrimeOrder,
    calculateCyclicGroupGenerators,
    calculateDiscreteLogarithms,
    pickPrivateK,
    calculateCommitmentValues,
} from '../zkp/utils';

function Register({ users, setUsers }) {
    const [name, setName] = useState('');
    const [secret, setSecret] = useState('');
    const [message, setMessage] = useState('');

    const displaySuccess = () => {
        setName('');
        setSecret('');
        setMessage('User registered successfully!');
    };

    const handleResponse = async (response, k) => {
        const user = await response.json();
        const completeUserRecord = { ...user, k };
        setUsers([...users, completeUserRecord]);
        displaySuccess();
    };

    const registerUser = async (k, payload) => {
        let response = await fetch(`http://localhost:8000/register`, {
            method: 'POST',
            body: JSON.stringify(payload),
        });
        if (response.status === 200) {
            handleResponse(response, k);
        } else {
            throw new Error(`The API returned a ${response.status} error`);
        }
    };

    const createRegisterCommits = (secretInt) => {
        const p = pickPrimeNumber(primeNumbersArray);
        const q = pickPrimeOrder(p);
        const [g, h] = calculateCyclicGroupGenerators(p, q);
        const [y1, y2] = calculateDiscreteLogarithms(p, [g, h], secretInt);
        const k = pickPrivateK(p);
        const [r1, r2] = calculateCommitmentValues(p, [g, h], k);
        return {
            k,
            payload: { name, p, q, g, h, y1, y2, r1, r2 }           
        };
    };

    const parseSecret = (secretInput) => {
        const secretInt = parseInt(secretInput, 10);
        if (secretInt) {
            setMessage(`Your secret is ${secretInt}. Registering your commit...`);
            return secretInt;
        } else {
            throw new TypeError('ERROR: THE SECRET MUST BE AN INTEGER.');
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const secretInt = parseSecret(secret);
            const { k, payload } = createRegisterCommits(secretInt);
            await registerUser(k, payload);
        } catch (error) {
            // Catches errors from incorrect input and API
            setMessage(error.message);
            console.error(error);
        }
    };

    return (
        <div>
            <h2>Register</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor='name' style={{ display: 'block', margin: '5px' }}>
                    Username
                    <input
                        id='name'
                        name='name'
                        type='text'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </label>
                <label htmlFor='secret' style={{ display: 'block', margin: '5px' }}>
                    Secret Number
                    <input
                        id='secret'
                        name='secret'
                        type='password'
                        value={secret}
                        onChange={(e) => setSecret(e.target.value)}
                    />
                </label>
                <button type='submit' style={{ display: 'block', margin: '5px' }}>
                    Register
                </button>
                <div className='message'>{message ? <p>{message}</p> : null}</div>
            </form>
        </div>
    );
}

Register.displayName = 'Register';

export default Register;