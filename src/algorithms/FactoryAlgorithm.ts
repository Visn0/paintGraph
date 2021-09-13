import { Backtracking } from "./Backtracking";
import { BranchAndBound } from "./BranchAndBound";
import { AlgorithmType, IAlgorithm } from "./IAlgorithm";

export function FactoryAlgorithm(algorithmType: AlgorithmType): IAlgorithm {
  let res: IAlgorithm

  switch (algorithmType) {
    case AlgorithmType.BACKTRACKING:
      res = new Backtracking()
      break

    case AlgorithmType.BRANCH_AND_BOUND:
      res = new BranchAndBound()
      break

    default:
      throw new Error(`Invalid algorithm type: ${algorithmType}.\nValid types are Algorithms.BACKTRACKING, Algorithms.BRANCH_AND_BOUND.`);
  }

  return res
}