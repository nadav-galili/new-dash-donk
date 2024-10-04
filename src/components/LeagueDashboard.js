import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { apiRequest } from "../api/apiService";
import LeagueCard from "./LeagueCard";
const LeagueDashboard = () => {
    const { leagueId } = useParams();
    const [league, setLeague] = useState(null);
    const [message, setMessage] = useState("");
    useEffect(() => {
        const fetchLeagueDetails = async () => {
            try {
                const data = await apiRequest({
                    url: `/api/admin/getLeagueDetails/${leagueId}`,
                    method: "get",
                });
                setLeague(data.league);
                setMessage(`Details for league ${data.league.league_name}`);
            }
            catch (error) {
                console.error("Failed to fetch league details:", error);
                setMessage("Failed to fetch league details.");
            }
        };
        fetchLeagueDetails();
    }, [leagueId]);
    return (_jsxs("div", { className: "p-4", children: [_jsx("h1", { className: "text-2xl font-semibold mb-4 text-center", children: "League Dashboardff" }), _jsx("p", { className: "font-medium text-center", children: message }), league && _jsx(LeagueCard, { league: league })] }));
};
export default LeagueDashboard;
