/*
 * Finding prime numbers is computationally expensive. Instead, prime numbers 
 * have been hard coded in a list so that can then be chosen at random.
 * Subsequent implementations could implement the Segmented Sieve if necessary.
 */
export const primeNumbersArray = [
    7, 11, 13, 17, 19, 23,
];

/**
 * Pick a random prime number (p) from a given list of prime numbers
 * @param  {Array} primeNumbersArray - A list of prime number
 * @return {Number} - Randomly chosen prime number
 */
export function pickPrimeNumber(primeNumbersArray) {
    if (primeNumbersArray && primeNumbersArray.length > 0) {
        const range = primeNumbersArray.length - 1;
        const randomChoice = Math.floor(Math.random() * range);
        return primeNumbersArray[randomChoice];
    } else {
        throw new RangeError('Please proivde a list of prime numbers.')
    }
    
}

/**
 * Calculate all the prime factors of a given number
 * @param  {Number} number - A given number
 * @return {Array} - A list of the numbers prime factors
 */
export function calculatePrimeFactors(number) {
    number = Math.abs(number);

    if (number === 0 || number === 1) {
        throw new RangeError(`${number} does not have prime factors`);
    }

    const primeFactors = [];

    // Calculate the number of 2s that divide number
    while (number % 2 === 0) {
        primeFactors.push(2);
        number = Math.floor(number / 2);
    }
 
    // At this point, number must be odd. So we can skip one element
    // (Note i = i + 2)
    for (let i = 3; i <= Math.floor(Math.sqrt(number)); i = i + 2) {
         
        // While i divides number, save i and divide number
        while (number % i === 0) {
            primeFactors.push(i);
            number = Math.floor(number / i);
        }
    }
 
    // This condition is to handle the case when number is a prime
    // greater than 2
    if (number > 2) primeFactors.push(number);

    return primeFactors;
}

/**
 * Pick a prime order (q) according to the given prime number (p)
 * @param  {Number} primeNumber - The given prime number
 * @return {Number} - The chosen prime order
 */
export function pickPrimeOrder(primeNumber) {
    // Picking a smaller prime order reduces the variability of a solution
    // Because of this, we choose the largest prime factor available.
    const primeFactors = calculatePrimeFactors(primeNumber - 1);
    const primeOrder = Math.max(...primeFactors);

    if (primeOrder) {
        return primeOrder;
    } else {
        throw new Error('No suitable prime order could be found. Choose larger prime number.');
    }
}

/**
 * Calculate 2 generators which produce cyclic groups of the same prime order (g, h).
 * Cyclic groups are calculated according to the formula below.
 * u^(p-1/q) mod p = 1 or generator value
 * @param  {Number} primeNumber - A chosen prime
 * @param  {Number} primeOrder - A prime order of the prime number
 * @return {Array} - The 2 calculated generator values
 */
export function calculateCyclicGroupGenerators(primeNumber, primeOrder) {
    const exponent = (primeNumber - 1) / primeOrder;
    let u = 2;
    const generators = [];
    while (generators.length < 2) {
        const generator = (u**exponent) % primeNumber;
        if (generator !== 1 && !generators.includes(generator)) {
            generators.push(generator);
        }
        u++;
    }
    return generators;
}

/**
 * Calculate discrete logarithms (y1, y2) to share with the verifier
 * @param  {Number} primeNumber - The chosen prime number
 * @param  {Array} generators - The 2 generator values with prime order
 * @param  {Number} secret - The secret number (x)
 * @return {Array} - The 2 discrete logarithms (y1, y2)
 */
 export function calculateDiscreteLogarithms(primeNumber, generators, secret) {
    const y1 = (generators[0]**secret) % primeNumber;
    const y2 = (generators[1]**secret) % primeNumber;
    return [y1, y2];
}

/**
 * Pick a random private number (k)
 * @param  {Number} primeNumber - The prime number chosen for the protocol
 * @return {Number} k - The randomly chosen number
 */
export function pickPrivateK(primeNumber) {
    let k = 0;
    while (k % primeNumber === 0) {
        k = Math.floor(Math.random() * (primeNumber - 1));
    }
    return k;
}

/**
 * Calculate the commitment values (r1, r2) to share with the verifier
 * @param  {Number} primeNumber - The chosen prime number
 * @param  {Array} generators - The 2 generator values with prime order
 * @param  {Number} k - The random private number k
 * @return {Array} - The 2 commitment values (r1, r2)
 */
export function calculateCommitmentValues(primeNumber, generators, k) {
    // Although this code is very similar to the calculateDiscreteLogarithms
    // function, I prefer not to merge into a single implementation so
    // the the logic of the protocol can be followed more easily.
    const r1 = (generators[0]**k) % primeNumber;
    const r2 = (generators[1]**k) % primeNumber;
    return [r1, r2];
}

export function mod(n, m) {
/**
 * Calculates the correct modulo result for negetive numbers.
 * Javascript does not compute the modulo correctly for negetive numbers
 * and so a customer implementation has been created for calculating s.
 * @param  {Number} m - divisor
 * @param  {Number} n - dividend
 * @return {Number} - Calculated modulo
 */
    return ((n % m) + m) % m;
};

/**
 * Calculated response (s) according to the received challenge (c)
 * @param  {Number} k - Privately commited value (k)
 * @param  {Number} c - Verifier challenge (c)
 * @param  {Number} secret - Secret number
 * @param  {Number} primeOrder - Chosen prime order
 * @return {Number} - Calculated response (s)
 */
export function calculateS(k, c, secret, primeOrder) {
    const dividend = k - (c * secret);
    return mod(dividend, primeOrder);
}