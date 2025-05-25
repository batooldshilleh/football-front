import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSearchParams, useNavigate } from "react-router-dom";
import LeagueSelector from "../components/LeagueSelector";

function LeagueMatches() {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const league = searchParams.get("league") || "";

  useEffect(() => {
    if (!league) return;
    setLoading(true);
    axios
      .get(`http://localhost:7000/league-matches?league=${league}`)
      .then((res) => setMatches(res.data.response || []))
      .catch(() => setMatches([]))
      .finally(() => setLoading(false));
  }, [league]);

  function handleLeagueChange(newLeague) {
    navigate(`/league-matches?league=${newLeague}`);
  }

  if (loading) return <p>جارٍ التحميل...</p>;
  if (matches.length === 0) return <p>لا توجد مباريات حالياً</p>;

  return (
    <div>
      <h2>مباريات الدوري</h2>
      <LeagueSelector league={league} onChange={handleLeagueChange} />
      <div className="card-grid">
        {matches.map((match) => (
          <div key={match.fixture.id} className="card">
            <div className="time">
              {new Date(match.fixture.date).toLocaleString("ar-EG", {
                hour: "2-digit",
                minute: "2-digit",
                day: "2-digit",
                month: "short",
                year: "numeric",
              })}
            </div>
            <div className="teams">
              <span>{match.teams.home.name}</span>
              <span style={{ color: "#6b7280" }}>vs</span>
              <span>{match.teams.away.name}</span>
            </div>
            <div className="venue">
              ملعب: {match.fixture.venue?.name || "غير متوفر"}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default LeagueMatches;
