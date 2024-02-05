import { checkIsGraph, logResults } from "./utils";
import readline from 'readline';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('Enter n (e.g. 6): ', (n) => {
        rl.question('Enter sequence (e.g. 4,3,3,2,1,1): ', (sequence) => {
        const userInput = { n: Number(n), sequence: sequence.split(',').map((vertex: string) => Number(vertex)) };
        if (typeof userInput.n !== 'number' || userInput.sequence.some((num: Number) => Number.isNaN(num))) throw new Error('Invalid input. The sequence should be a numbers separated by commas.');

        const result = checkIsGraph(userInput);
        logResults(result);
        rl.close();
    });
});
