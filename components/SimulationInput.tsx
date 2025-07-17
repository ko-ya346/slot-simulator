"use client";

import { Dispatch, SetStateAction } from "react";

type Props = {
  games: number;
  setGames: Dispatch<SetStateAction<number>>;
  bb: number;
  setBB: Dispatch<SetStateAction<number>>;
  rb: number;
  setRB: Dispatch<SetStateAction<number>>;
};

export default function SimulationInput({ games, setGames, bb, setBB, rb, setRB }: Props) {
  return (
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
  );
}