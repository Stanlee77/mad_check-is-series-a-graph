import { CheckIsGraphParams, CheckIsGraphResult, IsGraph, Matrix, N, Sequence, Test } from "./programistyczne-3_zadanie-3.types";

export const FIRST_LETTER = 'a'
export const ALPHABET = [...Array(26)].map((_, i) => String.fromCharCode(97 + i)).join('');

export const getAsciiDiff = (letter: string): number => letter.charCodeAt(0) - FIRST_LETTER.charCodeAt(0);

export const logResults = ({ isGraph, graph }: CheckIsGraphResult): void => {
    if (!isGraph) console.log('NIE');
    else if (!graph || !graph.length) throw new Error('Missing example graph representation');
    else {
        console.log('TAK');
        console.log('Macierz przyleglosci grafu o podanym ciagu stopni:');
        printMatrix(graph);
    }
}

export const printMatrix = (array: Matrix, isAdvanced?: boolean) => {
    if (isAdvanced) {
        array.forEach(row => console.log(` | ${row.join(' ')} |`));
    }
    else array.forEach(row => console.log(`${row.join(' ')}`));
}

export const checkIsGraph = ({ n, sequence }: CheckIsGraphParams): CheckIsGraphResult => {
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


const getIsGraph = (sequence: Sequence): Sequence | IsGraph => {
    const hasPluralSumOfDegrees = sequence.reduce((acc, curr) => acc + curr, 0) % 2 !== 0;
    if (hasPluralSumOfDegrees) return false;

    const sortedSequence = sequence.sort((a, b) => b - a);
    const maxDegree = sortedSequence.shift();
    if (maxDegree === 0) return true;
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

    matrix.forEach((_, rowIdx) => {
        for (let exampleNumIdx = rowIdx; exampleNumIdx < sequence.length; exampleNumIdx++) {
            for (let comparedNumIdx = exampleNumIdx; comparedNumIdx < sequence.length; comparedNumIdx++) {
                const originalIdx = comparedNumIdx
                const targetIdx = exampleNumIdx

                if (sequence[comparedNumIdx] > sequence[exampleNumIdx]) {
                    [sequence[originalIdx], sequence[targetIdx]] = [sequence[targetIdx], sequence[originalIdx]];
                    [vertexesHeaders[originalIdx], vertexesHeaders[targetIdx]] = [vertexesHeaders[targetIdx], vertexesHeaders[originalIdx]];
                }
            }
        }

        let currDegree = sequence[rowIdx];
        sequence[rowIdx] = 0;

        for (let startCellIdx = rowIdx + 1; startCellIdx < sequence.length; startCellIdx++) {
            if (currDegree <= 0) continue;
            sequence[startCellIdx] -= 1;

            const startRowIdx = getAsciiDiff(vertexesHeaders[rowIdx]);
            const nextCellIdx = getAsciiDiff(vertexesHeaders[startCellIdx]);

            matrix[startRowIdx][nextCellIdx] = 1;
            matrix[nextCellIdx][startRowIdx] = 1;
            currDegree -= 1;
        }
    });

    return matrix;
}