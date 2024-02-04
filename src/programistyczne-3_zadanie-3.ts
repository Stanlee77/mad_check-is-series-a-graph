import { CheckIsGraphParams, CheckIsGraphResult, IsGraph, Matrix, N, Sequence, Test } from "./programistyczne-3_zadanie-3.types";

const TESTS: Test[] = [
    {
        input: {
            n: 3,
            sequence: [2, 2, 2],
        },
        expectedResult: { isGraph: true, graph: [[0, 1, 1], [1, 0, 1], [1, 1, 0]] },
    },
    {
        input: {
            n: 2, // n < sequence.length
            sequence: [2, 2, 2],
        },
        expectedResult: { isGraph: false },
    },
    {
        input: {
            n: 4,
            sequence: [2, 2, 2],
        },
        expectedResult: { isGraph: true, graph: [[0, 0, 0, 0], [0, 0, 1, 1], [0, 1, 0, 1], [0, 1, 1, 0]] }, // one vertex without edges
    },
    {
        input: {
            n: 4,
            sequence: [3, 2, 2, 1],
        },
        expectedResult: { isGraph: true, graph: [[0, 1, 1, 1], [1, 0, 1, 0], [1, 1, 0, 0], [1, 0, 0, 0]] },
    },
    {
        input: {
            n: 6,
            sequence: [5, 2, 3, 2, 1, 1],
        },
        expectedResult: {
            isGraph: true,
            graph: [
                [0, 1, 1, 1, 1, 1],
                [1, 0, 1, 1, 0, 0],
                [1, 1, 0, 0, 0, 0],
                [1, 1, 0, 0, 0, 0],
                [1, 0, 0, 0, 0, 0],
                [1, 0, 0, 0, 0, 0]
            ]
        },
    },
    {
        input: {
            n: 9,
            sequence: [5, 5, 4, 4, 3, 3, 3, 3, 1], // a)
        },
        expectedResult: { isGraph: false }, // too many 2n + 1 level degrees
    },
    {
        input: {
            n: 10,
            sequence: [6, 6, 6, 5, 5, 4, 4, 3, 2, 1], // b)
        },
        expectedResult: {
            isGraph: true, graph: [
                [
                    0, 1, 1, 1, 1,
                    1, 1, 0, 0, 0
                ],
                [
                    1, 0, 1, 1, 1,
                    1, 1, 0, 0, 0
                ],
                [
                    1, 1, 0, 1, 1,
                    1, 1, 0, 0, 0
                ],
                [
                    1, 1, 1, 0, 1,
                    1, 0, 0, 0, 0
                ],
                [
                    1, 1, 1, 1, 0,
                    1, 1, 0, 0, 0
                ],
                [
                    1, 1, 1, 1, 1,
                    0, 1, 0, 0, 0
                ],
                [
                    1, 1, 1, 0, 1,
                    1, 0, 1, 0, 0
                ],
                [
                    0, 0, 0, 0, 0,
                    0, 1, 0, 0, 0
                ],
                [
                    0, 0, 0, 0, 0,
                    0, 0, 0, 0, 0
                ],
                [
                    0, 0, 0, 0, 0,
                    0, 0, 0, 0, 0
                ]
            ]
        }, // todo
    },
    {
        input: {
            n: 9,
            sequence: [6, 6, 6, 6, 6, 2, 2, 1, 1], // c)
        },
        expectedResult: { isGraph: false }, // by algorithm
    },
    {
        input: {
            n: 9,
            sequence: [7, 7, 5, 5, 5, 5, 2, 2, 2], // d)
        },
        expectedResult: {
            isGraph: true, graph: [
                [
                    0, 1, 1, 1, 1,
                    1, 1, 1, 0
                ],
                [
                    1, 0, 1, 1, 1,
                    1, 1, 1, 0
                ],
                [
                    1, 1, 0, 1, 1,
                    1, 0, 0, 0
                ],
                [
                    1, 1, 1, 0, 1,
                    1, 0, 0, 0
                ],
                [
                    1, 1, 1, 1, 0,
                    1, 0, 0, 0
                ],
                [
                    1, 1, 1, 1, 1,
                    0, 1, 0, 0
                ],
                [
                    1, 1, 0, 0, 0,
                    1, 0, 0, 0
                ],
                [
                    1, 1, 0, 0, 0,
                    0, 0, 0, 0
                ],
                [
                    0, 0, 0, 0, 0,
                    0, 0, 0, 0
                ]
            ]
        }, // todo
    },
    {
        input: {
            n: 9,
            sequence: [3, 3, 3, 3, 3, 3, 3, 3, 3], // e)
        },
        expectedResult: { isGraph: false }, // too many 2n + 1 level degrees
    },
    {
        input: {
            n: 3,
            sequence: [8, 8, 7, 7, 7, 7, 7, 1, 1, 1, 1], // f)
        },
        expectedResult: { isGraph: false }, // too many 2n + 1 level degrees
    },
];

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
    let matrix: number[][] = Array(vertexes).fill(null).map(() => Array(vertexes).fill(0));

    sequence.sort((a, b) => b - a);

    while (sequence.length > 0) {
        let maxDegree = sequence.shift();

        if (maxDegree === undefined || maxDegree > sequence.length) {
            throw new Error('Unexpected error in generateAdjecencyMatrix.');
        }

        for (let i = 0; i < maxDegree; i++) {
            matrix[vertexes - sequence.length - 1][vertexes - sequence.length + i] = 1;
            matrix[vertexes - sequence.length + i][vertexes - sequence.length - 1] = 1;
            sequence[i]--;
        }

        sequence.sort((a, b) => b - a);
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
// runTests([TESTS[4]]);