// lib/calculateBayesianPayout.ts
import { JugglerMachine, SettingLevel } from "@/data/jugglerMachines";

export function calculateBayesianPayout(
  machine: JugglerMachine,
  games: number,
  bb: number,
  rb: number
): {
  posterior: Record<SettingLevel, number>;
  expectedPayout: number;
} {
  const posterior: Record<SettingLevel, number> = {} as any;
  let total = 0;

  for (const k of [1, 2, 3, 4, 5, 6] as SettingLevel[]) {
    const p_bb = machine.p_BB[k];
    const p_rb = machine.p_RB[k];
    const p_other = 1 - p_bb - p_rb;

    const logLikelihood =
      bb * Math.log(p_bb) +
      rb * Math.log(p_rb) +
      (games - bb - rb) * Math.log(p_other);

    const logPosterior = Math.log(machine.prior[k]) + logLikelihood;
    posterior[k] = Math.exp(logPosterior);
    total += posterior[k];
  }

  for (const k of [1, 2, 3, 4, 5, 6] as SettingLevel[]) {
    posterior[k] /= total;
  }

  const expectedPayout = (Object.keys(posterior) as SettingLevel[]).reduce(
    (acc, k) => acc + posterior[k] * machine.payout[k],
    0
  );

  return { posterior, expectedPayout };
}

