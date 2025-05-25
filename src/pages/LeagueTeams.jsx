import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSearchParams, useNavigate } from "react-router-dom";
import LeagueSelector from "../components/LeagueSelector";

function LeagueTeams() {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const league = searchParams.get("league") || "";

  useEffect(() => {
    if (!league) return;
    setLoading(true);
    axios
      .get(`http://localhost:7000/league-teams?league=${league}`)
      .then(res => setTeams(res.data.response || []))
      .catch(() => setTeams([]))
      .finally(() => setLoading(false));
  }, [league]);
//any
  function handleLeagueChange(newLeague) {
    navigate(`/league-teams?league=${newLeague}`);
  }

  return (
    <div>
      <h2>فرق الدوري</h2>
      <LeagueSelector league={league} onChange={handleLeagueChange} />
      {loading && <p>جارٍ التحميل...</p>}
      {!loading && teams.length === 0 && <p>لا توجد فرق حالياً</p>}
      <div className="card-grid">
        {teams.map(team => (
          <div key={team.team.id} className="card">
            <img src={team.team.logo} alt={team.team.name} style={{ width: 60, height: 60 }} />
            <h3 style={{ color: "#4f46e5" }}>{team.team.name}</h3>
            <p>البلد: {team.team.country}</p>
            <p>تأسس: {team.team.founded || "غير متوفر"}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default LeagueTeams;
