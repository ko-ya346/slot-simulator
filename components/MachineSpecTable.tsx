"use client";

import { JugglerMachine, SettingLevel } from "@/data/jugglerMachines";

type Props = {
  machine: JugglerMachine;
};

export default function MachineSpecTable({ machine }: Props) {
  return (
    <div>
      <h2 className="font-bold text-lg mb-2">機械割 ({machine.name})</h2>
      <table className="w-full border text-sm">
        <thead className="bg-gray-200">
          <tr>
            <th className="p-2 border">設定</th>
            <th className="p-2 border">機械割(%)</th>
            <th className="p-2 border">BB確率</th>
            <th className="p-2 border">RB確率</th>
          </tr>
        </thead>
        <tbody>
          {(Object.keys(machine.payout) as unknown as SettingLevel[]).map((setting) => (
            <tr key={setting}>
              <td className="p-2 border text-center">{setting}</td>
              <td className="p-2 border text-center">
                {machine.payout[setting].toFixed(1)}%
              </td>
              <td className="p-2 border text-center">
                1/{Math.round(1 / machine.p_BB[setting])}
              </td>
              <td className="p-2 border text-center">
                1/{Math.round(1 / machine.p_RB[setting])}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}