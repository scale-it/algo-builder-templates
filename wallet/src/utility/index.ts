const MICRO_ALGO: number = 1e6;

export const convertMicroAlgoToAlgo = (microAlgo: number): number => {
    return microAlgo / MICRO_ALGO;
}
