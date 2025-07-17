// lib/calculateBayesianPayout.ts
import {
  JugglerMachine,
  SettingLevel,
  SETTING_LEVELS,
} from "@/data/jugglerMachines";

export function calculateBayesianPayout(
  machine: JugglerMachine,
  totalGames: number,
  bigBonusCount: number,
  regularBonusCount: number
): {
  posterior: Record<SettingLevel, number>;
  expectedPayout: number;
} {
  const posterior: Record<SettingLevel, number> = {
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
    6: 0,
  };
  let posteriorSum = 0;

  for (const level of SETTING_LEVELS) {
    const p_bb = machine.p_BB[level];
    const p_rb = machine.p_RB[level];
    const p_other = 1 - p_bb - p_rb;

    // 対数尤度の計算
    const logLikelihood =
      bigBonusCount * Math.log(p_bb) +
      regularBonusCount * Math.log(p_rb) +
      (totalGames - bigBonusCount - regularBonusCount) * Math.log(p_other);

    // 対数事後確率の計算
    const logPosterior = Math.log(machine.prior[level]) + logLikelihood;
    const unnormalizedPosterior = Math.exp(logPosterior);

    posterior[level] = unnormalizedPosterior;
    posteriorSum += unnormalizedPosterior;
  }

  // 事後確率を正規化
  for (const level of SETTING_LEVELS) {
    posterior[level] /= posteriorSum;
  }

  // 期待ペイアウトの計算
  const expectedPayout = SETTING_LEVELS.reduce((acc, level) => {
    return acc + posterior[level] * machine.payout[level];
  }, 0);

  return { posterior, expectedPayout };
}

