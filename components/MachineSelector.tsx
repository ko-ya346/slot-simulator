"use client";

import { useState } from "react";
import { jugglerMachines } from "@/data/jugglerMachines";
import { calculateBayesianPayout } from "@/lib/calculateBayesianPayout";
import MachineSpecTable from "./MachineSpecTable";
import SimulationInput from "./SimulationInput";
import SimulationResult from "./SimulationResult";

export default function MachineSelector() {
  const machineNames = Object.keys(jugglerMachines);
  const [selected, setSelected] = useState(machineNames[0]);
  const machine = jugglerMachines[selected];
  const [games, setGames] = useState(2000);
  const [bb, setBB] = useState(5);
  const [rb, setRB] = useState(4);

  const { posterior, expectedPayout } = calculateBayesianPayout(
    machine,
    games,
    bb,
    rb
  );
  const gamesPerHour = 800;
  const coinsPerGame = 3;
  const hourlyProfit =
    (expectedPayout / 100 - 1) * gamesPerHour * coinsPerGame;

  return (
    <div className="container mx-auto p-4">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-2xl font-bold text-center mb-6">ジャグラー設定判別ツール</h1>
        
        <div>
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
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <MachineSpecTable machine={machine} />
            <SimulationInput
              games={games}
              setGames={setGames}
              bb={bb}
              setBB={setBB}
              rb={rb}
              setRB={setRB}
            />
          </div>
          <div>
            <SimulationResult
              posterior={posterior}
              expectedPayout={expectedPayout}
              hourlyProfit={hourlyProfit}
            />
          </div>
        </div>
      </div>
    </div>
  );
} 
