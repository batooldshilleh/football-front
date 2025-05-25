import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSearchParams, useNavigate } from "react-router-dom";
import LeagueSelector from "../components/LeagueSelector";

function LeagueInfo() {
  const [leagueInfo, setLeagueInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const league = searchParams.get("league") || "";

  useEffect(() => {
    if (!league) return;
    setLoading(true);
    axios
      .get(`http://localhost:7000/league-info?league=${league}`)
      .then((res) => {
        setLeagueInfo(res.data.response[0] || null);
      })
      .catch(() => setLeagueInfo(null))
      .finally(() => setLoading(false));
  }, [league]);

  function handleLeagueChange(newLeague) {
    navigate(`/league-info?league=${newLeague}`);
  }

  if (loading) return <p>جارٍ التحميل...</p>;
  if (!leagueInfo) return <p>لا توجد بيانات عن الدوري</p>;

  return (
    <div style={{ maxWidth: "700px" }}>
      <LeagueSelector league={league} onChange={handleLeagueChange} />
      <img
        src={leagueInfo.logo}
        alt={leagueInfo.name}
        style={{ width: 120, height: 120, marginBottom: "1rem", objectFit: "contain" }}
      />
      <h2 style={{ color: "#4f46e5", marginBottom: "0.5rem" }}>{leagueInfo.name}</h2>
      <p>الدولة: {leagueInfo.country.name}</p>
      <p>الموسم الحالي: {leagueInfo.season}</p>
      <p>نوع الدوري: {leagueInfo.type}</p>
      <p>مرحلة الدوري: {leagueInfo.round}</p>
    </div>
  );
}

export default LeagueInfo;
