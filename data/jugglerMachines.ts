export type SettingLevel = 1 | 2 | 3 | 4 | 5 | 6;
export type JugglerMachine = {
  name: string;
  p_BB: Record<SettingLevel, number>;
  p_RB: Record<SettingLevel, number>;
  payout: Record<SettingLevel, number>;
  prior: Record<SettingLevel, number>;
};

export const jugglerMachines: Record<string, JugglerMachine> = {
  "アイムジャグラーEX": {
    name: "アイムジャグラーEX",
      p_BB: {
        1: 1 / 273.1,
        2: 1 / 271.9,
        3: 1 / 273.1,
        4: 1 / 264.3,
        5: 1 / 259.0,
        6: 1 / 255.0,
      },
      p_RB: {
        1: 1 / 439.8,
        2: 1 / 399.6,
        3: 1 / 331.0,
        4: 1 / 290.0,
        5: 1 / 277.7,
        6: 1 / 255.0,
      },
      payout: {
        1: 95.9,
        2: 96.7,
        3: 98.7,
        4: 101.6,
        5: 103.8,
        6: 106.5,
      },
      prior: {
        1: 1 / 6,
        2: 1 / 6,
        3: 1 / 6,
        4: 1 / 6,
        5: 1 / 6,
        6: 1 / 6,
      },
    },

    "マイジャグラーV": {
      name: "マイジャグラーV",
      p_BB: {
        1: 1 / 273.1,
        2: 1 / 270.8,
        3: 1 / 266.4,
        4: 1 / 260.1,
        5: 1 / 255.0,
        6: 1 / 237.4,
      },
      p_RB: {
        1: 1 / 409.6,
        2: 1 / 385.5,
        3: 1 / 336.1,
        4: 1 / 290.0,
        5: 1 / 270.8,
        6: 1 / 237.4,
      },
      payout: {
        1: 97.0,
        2: 98.0,
        3: 99.9,
        4: 102.8,
        5: 105.3,
        6: 109.4,
      },
      prior: {
        1: 1 / 6,
        2: 1 / 6,
        3: 1 / 6,
        4: 1 / 6,
        5: 1 / 6,
        6: 1 / 6,
      },
    },
};

