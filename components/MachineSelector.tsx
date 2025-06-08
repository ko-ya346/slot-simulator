"use client";

import { useState } from "react";
import { jugglerMachines } from "@/data/jugglerMachines";

export default function MachineSelector() {
  const machineNames = Object.keys(jugglerMachines);
  const [selected, setSelected] = useState(machineNames[0]);

  return (
    <div className="p-4 border rounded bg-wrhite shadow">
      <label className="block mb-2 font-semibold">機種を選択:</label>
      <select
        className="border p-2 rounded w-full mb-4"  
        value={selected}
        onChange={(e) => setSelected(e.target.value)}
    >
      {mashineNames.map((name) => (
        <option key={name} value={name}>
          {name}
        </option>
      ))}
    </select> 
    
    <div>
      <p>現在選択中の機種:</p>
      <p className="font-bold text-lg">{selected}</p>
    </div>
  </div>
  );
}
