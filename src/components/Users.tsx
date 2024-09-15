import React, { useEffect, useState } from "react";
import { apiRequest } from "../api/apiService";
import dayjs from "dayjs";

interface User {
  id: number;
  nickName: string;
  image: string;
  created_at: string;
  updated_at: string;
  expoPushToken: string;
  is_active: boolean;
  last_login: string;
}

type Users = User[];

const Users: React.FC = () => {
  const [users, setUsers] = useState<Users>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await apiRequest({
          url: "/api/admin/getUsers",
          method: "get",
        });

        console.log("ssdsd", data);
        setUsers(data as Users);
      } catch (error) {
        console.error("Failed to fetch users:", error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl text-center underline text-sky-600  font-semibold mb-4">
        Users
      </h1>
      <h4 className="text-1xl text-center font-semibold text-sky-500">
        Users Count:{users.length}
      </h4>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {users.map((user) => (
          <div key={user.id} className="bg-white shadow-md rounded-md p-4">
            <img
              src={
                user.image.startsWith("https")
                  ? user.image
                  : `https://backend-donk-images.s3.il-central-1.amazonaws.com/${user.image}`
              }
              alt={user.nickName}
              className="w-20 h-20 rounded-full mx-auto"
            />
            <h2 className="text-center text-xl font-semibold mt-2">
              {user.nickName}
            </h2>
            <p
              className={`text-center text-sm mt-1 ${
                user.is_active ? "text-gray-500" : "text-red-500"
              }`}>
              {user.is_active ? "Active" : "Inactive"}
            </p>
            <p className="text-center text-sm text-gray-500">
              Registered: {dayjs(user.created_at).format("DD/MM/YYYY")}
            </p>
            <p className="text-center text-sm text-gray-500">
              Last Login:{dayjs(user.last_login).format("DD/MM/YYYY HH:mm")}
            </p>
            <p className="text-center text-sm text-gray-500">
              {user.expoPushToken
                ? "Has Expo Push Token"
                : "No Expo Push Token"}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Users;
