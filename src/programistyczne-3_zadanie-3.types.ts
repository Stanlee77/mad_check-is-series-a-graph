export type IsGraph = boolean
export type Matrix = number[][]
export type Sequence = number[]
export type N = number


export interface Test {
    input: CheckIsGraphParams;
    expectedResult: CheckIsGraphResult;
}

export interface CheckIsGraphParams {
    n: N;
    sequence: Sequence;
}

export interface CheckIsGraphResult {
    isGraph: IsGraph;
    graph?: Matrix
}
