import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { apiRequest } from "../api/apiService";
import LeagueCard from "./LeagueCard";
const Dashboard = () => {
    const [leagues, setLeagues] = useState([]);
    const [message, setMessage] = useState("");
    useEffect(() => {
        const fetchLeagues = async () => {
            try {
                const data = (await apiRequest({
                    url: "/api/admin/getLeagues",
                    method: "get",
                }));
                setLeagues(data);
                setMessage("Leagues fetched successfully");
            }
            catch (error) {
                console.error("Failed to fetch leagues:", error);
                console.log("error");
                setMessage("Failed to fetch leagues.");
            }
        };
        fetchLeagues();
    }, []);
    return (_jsxs("div", { className: "p-4", children: [_jsx("h1", { className: "text-2xl text-center font-semibold mb-4", children: "Admin Dashboard" }), _jsx("p", { className: "text-center text-1xl text-lime-600", children: message }), _jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6", children: leagues.map((league) => (_jsx(LeagueCard, { league: league }, league.id))) })] }));
};
export default Dashboard;
