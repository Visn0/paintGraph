import { Backtracking } from "./Backtracking";
import { BacktrackingRaw } from "./BacktrackingRaw";
import { BranchAndBound } from "./BranchAndBound";
import { AlgorithmType, IAlgorithm } from "./IAlgorithm";

const algorithms: Map<AlgorithmType, IAlgorithm> = new Map<AlgorithmType, IAlgorithm>([
  [AlgorithmType.BACKTRACKING, new Backtracking()],
  [AlgorithmType.BACKTRACKING_RAW, new BacktrackingRaw()],
  [AlgorithmType.BRANCH_AND_BOUND, new BranchAndBound()],
])

export function FactoryAlgorithm(algorithmType: AlgorithmType): IAlgorithm {
  // let res: IAlgorithm
  console.log(algorithmType)
  console.log(algorithms.get(algorithmType))
  return algorithms.get(algorithmType)

  // switch (algorithmType)
  // {
  //   case AlgorithmType.BACKTRACKING:
  //     res = new Backtracking()
  //     break

  //   case AlgorithmType.BRANCH_AND_BOUND:
  //     res = new BranchAndBound()
  //     break

  //   default:
  //     throw new Error(`Invalid algorithm type: ${algorithmType}.\nValid types are Algorithms.BACKTRACKING, Algorithms.BRANCH_AND_BOUND.`);
  // }

  // return res
}