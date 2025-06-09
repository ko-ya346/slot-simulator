"use client";

import { useState } from "react";
import { jugglerMachines } from "@/data/jugglerMachines";
import { calculateBayesianPayout } from "@/lib/calculateBayesianPayout";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";


export default function MachineSelector() {
  const machineNames = Object.keys(jugglerMachines);
  const [selected, setSelected] = useState(machineNames[0]);
  const machine = jugglerMachines[selected];
  const [games, setGames] = useState(2000);
  const [bb, setBB] = useState(5);
  const [rb, setRB] = useState(4);
  const { posterior, expectedPayout } = calculateBayesianPayout(machine, games, bb, rb);
  const gamesPerHour = 800;
  const coinsPerGame = 3;
  const hourlyProfit = ((expectedPayout / 100) - 1) * gamesPerHour * coinsPerGame;
  const chartData = (Object.keys(posterior) as SettingLevel[]).map((k) => ({
    setting: String(k),
    probability: Number((posterior[k] * 100).toFixed(2)),
  }));
  console.log("posterior", posterior);
  console.log("chartData", chartData);


  return (
    <div className="p-4 border rounded bg-white shadow">
      <label className="block mb-2 font-semibold">機種を選択:</label>
      <select
        className="border p-2 rounded w-full mb-4"  
        value={selected}
        onChange={(e) => setSelected(e.target.value)}
      >
      {machineNames.map((name) => (
        <option key={name} value={name}>
          {name}
        </option>
      ))}
      </select> 

      <h2 className="font-bold text-lg mb-2"> 機械割({machine.name}) </h2>
      <table className="w-full border text-sm">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2 border">設定</th>
            <th className="p-2 border">機械割(%)</th>
          </tr>
        </thead>
        <tbody>
          {(Object.keys(machine.payout) as SettingLevel[]).map((setting) => (
            <tr key={setting}>
              <td className="p-2 border text-center">{setting}</td>
              <td className="p-2 border text-center">
                {machine.payout[setting].toFixed(1)}%
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-6">
        <h2 className="font-bold text-lg mb-2">📥 入力データ</h2>
        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="block text-sm mb-1">総ゲーム数</label>
            <input
              type="number"
              value={games}
              onChange={(e) => setGames(Number(e.target.value))}
              className="border p-2 rounded w-full"
            />
          </div>
          <div>
            <label className="block text-sm mb-1">BB回数</label>
            <input
              type="number"
              value={bb}
              onChange={(e) => setBB(Number(e.target.value))}
              className="border p-2 rounded w-full"
            />
          </div>
          <div>
            <label className="block text-sm mb-1">RB回数</label>
            <input
              type="number"
              value={rb}
              onChange={(e) => setRB(Number(e.target.value))}
              className="border p-2 rounded w-full"
            />
          </div>
        </div>
      </div> 
      <div className="mt-6">
        <h2 className="font-bold text-lg mb-2">📊 設定ごとの事後確率</h2>
        <ul className="text-sm">
          {(Object.keys(posterior) as SettingLevel[]).map((k) => (
            <li key={k}>
              設定{k}: {(posterior[k] * 100).toFixed(2)}%
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-4 font-semibold">
        🎰 期待機械割: {expectedPayout.toFixed(2)}%
      </div>
      <div className="mt-2 font-semibold">
        1時間あたりの期待損益: {hourlyProfit.toFixed(0)} 枚
      </div>
      <div className="mt-6">
        <h2 className="font-bold text-lg mb-2">📊 設定ごとの確率（棒グラフ）</h2>
        <div className="w-full h-60 bg-white border rounded p-2">
          <ResponsiveContainer width={300} height={240}>
            <BarChart data={chartData}>
              <XAxis dataKey="setting" />
              <YAxis unit="%" />
              <Tooltip />
              <Bar dataKey="probability" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

    </div> 
  );
} 
