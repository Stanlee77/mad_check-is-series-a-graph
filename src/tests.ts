import { Test } from "./programistyczne-3_zadanie-3.types";

export const TESTS: Test[] = [
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
        expectedResult: { isGraph: true, graph: [[0, 1, 1, 0], [1, 0, 1, 0], [1, 1, 0, 0], [0, 0, 0, 0]] }, // one vertex without edges
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
                [1, 0, 1, 0, 0, 0],
                [1, 1, 0, 1, 0, 0],
                [1, 0, 1, 0, 0, 0],
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
            isGraph: true,
            graph: [
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
                    0, 1, 1, 0, 0
                ],
                [
                    1, 1, 1, 0, 1,
                    0, 0, 1, 0, 0
                ],
                [
                    1, 1, 1, 1, 0,
                    1, 0, 0, 0, 0
                ],
                [
                    1, 1, 0, 0, 1,
                    0, 0, 0, 1, 0
                ],
                [
                    1, 1, 1, 0, 0,
                    0, 0, 0, 0, 1
                ],
                [
                    0, 0, 1, 1, 0,
                    0, 0, 0, 1, 0
                ],
                [
                    0, 0, 0, 0, 0,
                    1, 0, 1, 0, 0
                ],
                [
                    0, 0, 0, 0, 0,
                    0, 1, 0, 0, 0
                ]
            ]
        },
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
            isGraph: true,
            graph: [
                [
                    0, 1, 1, 1, 1,
                    1, 1, 1, 0
                ],
                [
                    1, 0, 1, 1, 1,
                    1, 0, 1, 1
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
                    0, 0, 0, 0
                ],
                [
                    1, 0, 0, 0, 0,
                    0, 0, 0, 1
                ],
                [
                    1, 1, 0, 0, 0,
                    0, 0, 0, 0
                ],
                [
                    0, 1, 0, 0, 0,
                    0, 1, 0, 0
                ]
            ]
        },
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