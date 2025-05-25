import React from "react";

const leagues = [
  { id: 39, name: "الدوري الإنجليزي الممتاز" },
  { id: 140, name: "الدوري الإسباني" },
  { id: 78, name: "الدوري الإيطالي" },
  { id: 61, name: "الدوري الألماني" },
  { id: 135, name: "الدوري الفرنسي" },
  { id: 180, name: "دوري روشين" },
];

function LeagueSelector({ league, onChange }) {
  return (
    <select value={league} onChange={e => onChange(e.target.value)}>
      <option value="">-- اختر الدوري --</option>
      {leagues.map(l => (
        <option key={l.id} value={l.id}>
          {l.name}
        </option>
      ))}
    </select>
  );
}

export default LeagueSelector;
