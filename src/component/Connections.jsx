import axios from "axios";
import React, { useEffect, useState } from "react";
import { BASE_URL } from "../utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/connectionsSlice";

const Connections = () => {
  const dispatch = useDispatch();
  const connections = useSelector((store) => store.connections);
  const [loading, setLoading] = useState(true);

  const fetchConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });
      dispatch(addConnections(res?.data?.data));
    } catch (error) {
      console.error("Error fetching connections:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  if (loading)
    return (
      <div className="flex justify-center my-10">
        <h1 className="text-2xl">Loading connections...</h1>
      </div>
    );

  if (!connections || connections.length === 0)
    return (
      <div className="flex justify-center my-10">
        <h1 className="text-3xl font-bold">No Connections</h1>
      </div>
    );

  return (
    <div className="my-10">
      <h1 className="text-3xl font-bold text-center mb-6">Connections</h1>
      <div className="flex flex-col items-center gap-4">
        {connections.map((connection) => {
          const { _id, firstName, lastName, photoUrl, age, gender, about } =
            connection;

          return (
            <div
              key={_id}
              className="flex items-center gap-4 p-4 rounded-lg bg-base-300 w-1/2"
            >
              <img
                alt="profile"
                className="w-20 h-20 rounded-full object-cover"
                src={photoUrl}
              />
              <div className="text-left">
                <h2 className="font-bold text-xl">
                  {firstName} {lastName}
                </h2>
                {age && gender && (
                  <p className="text-sm text-gray-600">
                    {age}, {gender}
                  </p>
                )}
                <p className="text-sm">{about}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Connections;
