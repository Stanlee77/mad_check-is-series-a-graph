import { CheckIsGraphParams, CheckIsGraphResult, IsGraph, Matrix, N, Sequence, Test } from "./programistyczne-3_zadanie-3.types";
import { TESTS } from "./tests";
import { FIRST_LETTER, ALPHABET } from "./utils";
import readline from 'readline';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// recursively removes the highest degree from the sequence and sorts the sequence
const getIsGraph = (sequence: Sequence): Sequence | IsGraph => {
    const hasPluralSumOfDegrees = sequence.reduce((acc, curr) => acc + curr, 0) % 2 !== 0;
    if (hasPluralSumOfDegrees) return false;

    const sortedSequence = sequence.sort((a, b) => b - a);
    const maxDegree = sortedSequence.shift();
    if (maxDegree === undefined) throw new Error('Unexpected error in getIsGraph.');
    else if (maxDegree === 0) return true;
    for (let i = 0; i < maxDegree; i++) {
        if (sortedSequence[i] === undefined) return false;
        sortedSequence[i]--;
    }
    if (maxDegree > sortedSequence.length) return false
    return getIsGraph(sortedSequence);
}

const generateAdjecencyMatrix = (sequence: Sequence, vertexes: N): Matrix => {
    let matrix: number[][] = Array(vertexes).fill(0).map(() => Array(vertexes).fill(0));
    const vertexesHeaders = ALPHABET.slice(0, vertexes).split('')

    for (let rowIdx = 0; rowIdx < vertexes; rowIdx++) {
        for (let testedSequenceIdx = rowIdx; testedSequenceIdx < sequence.length; testedSequenceIdx++) {
            for (let everyIdx = testedSequenceIdx; everyIdx < sequence.length; everyIdx++) {
                if (testedSequenceIdx === everyIdx) {
                    continue;
                }
                if (sequence[everyIdx] > sequence[testedSequenceIdx]) {
                    const vertexOriginalIdx: number = vertexesHeaders.indexOf(vertexesHeaders[everyIdx]);
                    const vertexTargetIdx: number = vertexesHeaders.indexOf(vertexesHeaders[testedSequenceIdx]);

                    [sequence[vertexOriginalIdx], sequence[vertexTargetIdx]] = [sequence[vertexTargetIdx], sequence[vertexOriginalIdx]];
                    [vertexesHeaders[vertexOriginalIdx], vertexesHeaders[vertexTargetIdx]] = [vertexesHeaders[vertexTargetIdx], vertexesHeaders[vertexOriginalIdx]];
                }
            }
        }
        let currDegree = sequence[rowIdx];
        // @ts-ignore
        sequence[rowIdx] = null;

        for (let startCellIdx = rowIdx + 1; startCellIdx < sequence.length; startCellIdx++) {
            if (currDegree > 0) {
                sequence[startCellIdx] -= 1;

                let startRowIdx = vertexesHeaders[rowIdx].charCodeAt(0) - FIRST_LETTER.charCodeAt(0);
                let nextCellIdx = vertexesHeaders[startCellIdx].charCodeAt(0) - FIRST_LETTER.charCodeAt(0);

                matrix[startRowIdx][nextCellIdx] = 1;
                matrix[nextCellIdx][startRowIdx] = 1;
                currDegree -= 1;
            }
        }
    }

    const sumOfDegrees = sequence.reduce((acc, curr) => acc + curr, 0);
    if (sumOfDegrees / 2 === vertexes) throw new Error('Invalid matrix');
    return matrix;
}

const checkIsGraph = ({ n, sequence }: CheckIsGraphParams): CheckIsGraphResult => {
    // if (n !== sequence.length) { throw new Error('The number of vertexes (n) is different then amount of vertex degrees (sequence).') }
    if (n < sequence.length) return { isGraph: false }
    const isGraph = getIsGraph([...sequence]);
    if (!isGraph) return { isGraph: false };

    const graph = generateAdjecencyMatrix([...sequence], n);
    if (typeof isGraph !== 'boolean' || isGraph === true && !graph?.length) {
        throw new Error('Function getIsGraph returned unexpected value or function generateAdjecencyMatrix did not return a matrix.');
    }
    return { isGraph: isGraph, graph: graph };
}

const logResults = ({ isGraph, graph }: CheckIsGraphResult): void => {
    if (!isGraph) console.log('NIE');
    else if (!graph || !graph.length) throw new Error('Missing example graph representation');
    else {
        console.log('TAK');
        console.log('Macierz przyleglosci grafu o podanym ciagu stopni:');
        printMatrix(graph);
    }
}

const printMatrix = (array: Matrix, isAdvanced?: boolean) => {
    if (isAdvanced) {
        array.forEach(row => console.log(` | ${row.join(' ')} |`));
    }
    else array.forEach(row => console.log(`${row.join(' ')}`));
}

const runTests = (tests: Test[]) => {
    const testResults = tests.map((test: Test, idx: number) => {
        const result = checkIsGraph(test.input);
        const hasPassed = JSON.stringify(result) === JSON.stringify(test.expectedResult);
        if (hasPassed) {
            console.log(`✅ Test ${idx + 1} has passed`);
            return true;
        }

        const { isGraph: resultIsGraph, graph: resultGraph } = result;
        const { isGraph: expectedIsGraph, graph: expectedGraph } = test.expectedResult;

        console.log(`❌ Test ${idx + 1} has NOT passed:`);
        console.log(`Input:\n n = ${test.input.n}\n sequence = ${test.input.sequence}`);

        console.log(`Expected:\n isGraph: ${expectedIsGraph}\n graph:`);
        if (expectedGraph) { console.log('graph: '); printMatrix(expectedGraph, true); }

        console.log(`Got:\n isGraph: ${resultIsGraph}`);
        if (resultGraph) { console.log('graph: '); printMatrix(resultGraph, true); }
        console.log('resultGraph:', resultGraph);
        return false;
    })
    console.log(' ');
    const passedTests = testResults.reduce((acc, curr) => curr ? acc + 1 : acc, 0);
    if (passedTests === tests.length) console.log('💚 All tests have passed.');
    else if (passedTests) console.log(`⚠️  ${passedTests}/${tests.length} tests have passed.`);
    else console.log('💀 All tests have failed.');
}

runTests(TESTS);

rl.question('Enter n (e.g. 6): ', (n) => {
    rl.question('Enter sequence (e.g. 4,3,3,2,1,1): ', (sequence) => {
        const userInput = { n: Number(n), sequence: sequence.split(',').map((vertex: string) => Number(vertex)) };
        console.log('userInput:', userInput);
        if (typeof userInput.n !== 'number' || userInput.sequence.some((num: Number) => Number.isNaN(num))) throw new Error('Invalid input. The sequence should be a numbers separated by commas.');
        const result = checkIsGraph(userInput);
        logResults(result);
        rl.close();
    });
});
