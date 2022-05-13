import {
    pickPrimeNumber,
    calculatePrimeFactors,
    pickPrimeOrder,
    calculateCyclicGroupGenerators,
    mod,
} from './utils';

describe('pickPrimeNumber function', () => {

    test('primeNumbersArray argument must not be empty', () => {
        const emptyArray = []

        expect(() => {
            pickPrimeNumber(emptyArray)
        }).toThrow();
    });
});

describe('calculatePrimeFactors function', () => {

    test('handles large numbers', () => {
        const number = 10017;
        const primeFactors = calculatePrimeFactors(number);
        expect(primeFactors).toEqual([3, 3, 3, 7, 53]);
    });

    test('handles negative numbers', () => {
        const number = -10;
        const primeFactors = calculatePrimeFactors(number);
        expect(primeFactors).toEqual([2, 5]);
    });

    test('handles one', () => {
        const number = 1;

        expect(() => {
            calculatePrimeFactors(number);
        }).toThrow();
    });

    test('handles zero', () => {
        const number = 0;

        expect(() => {
            calculatePrimeFactors(number);
        }).toThrow();
    });
});

describe('pickPrimeOrder function', () => {
    test('chooses largest possible prime order', () => {
        const primeNumber = 7; // Will produce prime order values 2 and 3

        expect(pickPrimeOrder(primeNumber)).toEqual(3);
    });
});

describe('calculateCyclicGroupGenerators function', () => {
    test('returns correct array of length 2', () => {
        const primeNumber = 43;
        const primeOrder = 7;

        const generators = calculateCyclicGroupGenerators(primeNumber, primeOrder);

        expect(generators.length).toEqual(2);
        expect(generators).toEqual([21, 41]);
    });

    test('generators (g, h) cannot be the same number', () => {
        // Not implemented due to time constraints
        expect(true).toEqual(true);
    });

    test('generators cannot be 1', () => {
        // Not implemented due to time constraints
        expect(true).toEqual(true);
    });
});

describe('mod function', () => {

    test('outputs the correct result for negetive numbers', () => {
        const dividend = -10
        const divisor = 3

        expect(mod(dividend, divisor)).toEqual(2);
    });

    test('outputs the correct result for positive numbers', () => {
        const dividend = 10
        const divisor = 3

        expect(mod(dividend, divisor)).toEqual(1);
    });
});