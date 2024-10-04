import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { apiRequest } from "../api/apiService";
import LeagueCard from "./LeagueCard";
import Spinner from "./Spinner";
const Dashboard = () => {
    const [loading, setLoading] = useState(true);
    const [leagues, setLeagues] = useState([]);
    const [message, setMessage] = useState("");
    const [gamesCount, setGamesCount] = useState(0);
    const [playersCount, setPlayersCount] = useState(0);
    const [leagueCount, setLeagueCount] = useState(0);
    useEffect(() => {
        const fetchLeagues = async () => {
            try {
                const data = await apiRequest({
                    url: "/api/admin/getLeagues",
                    method: "get",
                });
                setLeagues(data.leagues);
                setGamesCount(data.gamesCount);
                setPlayersCount(data.userCount);
                setLeagueCount(data.leagueCount);
                setMessage("Leagues fetched successfully");
            }
            catch (error) {
                console.error("Failed to fetch leagues:", error);
                setMessage("Failed to fetch leagues.");
            }
            setLoading(false);
        };
        fetchLeagues();
    }, []);
    return (_jsxs(_Fragment, { children: [loading && _jsx(Spinner, {}), _jsxs("div", { className: "p-6", children: [_jsx("h1", { className: "text-3xl font-bold text-center mb-3", children: "Admin Dashboard" }), _jsx("p", { className: "text-center text-1xl text-lime-600", children: message }), _jsxs("p", { className: "text-center text-cyan-600 text-xl font-bold", children: ["Games Played: ", gamesCount] }), _jsx("a", { href: "/users", className: "flex justify-center", children: _jsxs("p", { className: "text-center underline text-cyan-600 text-xl font-bold", children: ["Players Registered: ", playersCount] }) }), _jsxs("p", { className: "text-center text-cyan-600 text-xl font-bold", children: ["Leagues Created: ", leagueCount] }), _jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6", children: leagues.map((league) => (_jsx(LeagueCard, { league: league }, league.id))) })] })] }));
};
export default Dashboard;
