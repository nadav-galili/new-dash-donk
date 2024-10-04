import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { apiRequest } from "../api/apiService";
import dayjs from "dayjs";
const Users = () => {
    const [users, setUsers] = useState([]);
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const data = await apiRequest({
                    url: "/api/admin/getUsers",
                    method: "get",
                });
                console.log("ssdsd", data);
                setUsers(data);
            }
            catch (error) {
                console.error("Failed to fetch users:", error);
            }
        };
        fetchUsers();
    }, []);
    return (_jsxs("div", { className: "p-4", children: [_jsx("h1", { className: "text-2xl text-center underline text-sky-600  font-semibold mb-4", children: "Users" }), _jsxs("h4", { className: "text-1xl text-center font-semibold text-sky-500", children: ["Users Count:", users.length] }), _jsx("div", { className: "grid grid-cols-1 md:grid-cols-3 lg:grid-cols-10 gap-4 flex-1 h-full", children: users.map((user) => (_jsxs("div", { className: "bg-white shadow-md rounded-md p-4", children: [_jsx("img", { src: user.image.startsWith("http")
                                ? user.image
                                : `https://backend-donk-images.s3.il-central-1.amazonaws.com/${user.image}`, alt: user.nickName, className: "w-20 h-20 rounded-full mx-auto" }), _jsx("h2", { className: "text-center text-xl font-semibold mt-2", children: user.nickName }), _jsx("p", { className: `text-center text-sm mt-1 ${user.is_active ? "text-gray-500" : "text-red-500"}`, children: user.is_active ? "Active" : "Inactive" }), _jsxs("p", { className: "text-center text-xs text-gray-500", children: ["Registered: ", dayjs(user.created_at).format("DD/MM/YYYY")] }), _jsxs("p", { className: "text-center text-xs text-gray-500", children: ["Last Login:", dayjs(user.last_login).format("DD/MM/YYYY HH:mm")] }), _jsx("p", { className: "text-center text-sm text-gray-500", children: user.expoPushToken
                                ? "Has Expo Push Token"
                                : "No Expo Push Token" })] }, user.id))) })] }));
};
export default Users;
