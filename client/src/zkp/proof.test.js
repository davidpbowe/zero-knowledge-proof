import {
    primeNumbersArray,
    pickPrimeNumber,
    pickPrimeOrder,
    calculateCyclicGroupGenerators,
    calculateDiscreteLogarithms,
    pickPrivateK,
    calculateCommitmentValues,
    calculateS,
} from './utils';

describe('Functional test of ZKP Protocol', () => {

    test('Authentication is successful when secret is known', () => {
        const p = pickPrimeNumber(primeNumbersArray);
        // console.log('Chosen prime: ', p);
        const q = pickPrimeOrder(p);
        const generators = calculateCyclicGroupGenerators(p, q)
        // console.log('p, q, [g, h]: ', p, q, generators);

        const x  = 5;
        const [y1, y2] = calculateDiscreteLogarithms(p, generators, x);
        // console.log('x, y1, y2: ', x, y1, y2);

        const k = pickPrivateK(p);
        const [r1, r2] = calculateCommitmentValues(p, generators, k);
        // console.log('k, r1, r2: ', k, r1, r2);

        const c = pickPrivateK(p);
        const s = calculateS(k, c, x, q);
        // console.log('c, s: ', c, s);

        const [g, h] = generators;

        const R1 = (g**s)*(y1**c) % p;
        const R2 = (h**s)*(y2**c) % p;

        // console.log(r1, R1);
        // console.log(r2, R2);

        expect(R1).toEqual(r1);
        expect(R2).toEqual(r2);
    })

    test('Authentication fails when secret is known', () => {
        const p = 31;
        const q = pickPrimeOrder(p);
        const generators = calculateCyclicGroupGenerators(p, q)

        const x  = 5;
        const [y1, y2] = calculateDiscreteLogarithms(p, generators, x);

        const k = pickPrivateK(p);
        const [r1, r2] = calculateCommitmentValues(p, generators, k);

        const c = pickPrivateK(p);
        const different_x = 6;
        const s = calculateS(k, c, different_x, q);

        const [g, h] = generators;

        const R1 = (g**s)*(y1**c) % p;
        const R2 = (h**s)*(y2**c) % p;

        expect(R1).not.toEqual(r1);
        expect(R2).not.toEqual(r2);
    })
})