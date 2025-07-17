"use client";

import { SettingLevel } from "@/data/jugglerMachines";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

type Props = {
  posterior: Record<SettingLevel, number>;
  expectedPayout: number;
  hourlyProfit: number;
};

export default function SimulationResult({ posterior, expectedPayout, hourlyProfit }: Props) {
  const chartData = Object.entries(posterior).map(([k, v]) => ({
    setting: k,
    probability: Number((v * 100).toFixed(2)),
  }));

  return (
    <div className="mt-6">
      <h2 className="font-bold text-lg mb-2">📊 設定ごとの事後確率</h2>
      <div className="grid grid-cols-2 gap-4">
        <ul className="text-sm">
          {Object.entries(posterior).map(([setting, prob]) => (
            <li key={setting}>
              設定{setting}: {(prob * 100).toFixed(2)}%
            </li>
          ))}
        </ul>
        <div className="w-full h-60 bg-white border rounded p-2">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <XAxis dataKey="setting" />
              <YAxis unit="%" />
              <Tooltip />
              <Bar dataKey="probability" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="mt-4 font-semibold">
        🎰 期待機械割: {expectedPayout.toFixed(2)}%
      </div>
      <div className="mt-2 font-semibold">
        1時間あたりの期待損益: {hourlyProfit.toFixed(0)} 枚
      </div>
    </div>
  );
}