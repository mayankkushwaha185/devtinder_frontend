import React from "react";
import { BASE_URL } from "../utils/constant";
import { useDispatch } from "react-redux";
import axios from "axios";
import { removedUserFromFeed } from "../utils/feedSlice";

const USerCard = ({ user }) => {
  const dispatch = useDispatch();
  if (!user) return null;

  const { _id, firstName, lastName, photoUrl, age, gender, about } = user;
  const handleSendRequest = async (status, userID) => {
    try {
      const res = await axios.post(
        BASE_URL + "/request/send" + "/" + status + "/" + userID,
        {},
        { withCredentials: true }
      );
      dispatch(removedUserFromFeed(userID));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="card bg-base-300 w-96 shadow-md">
      <figure className="h-64 overflow-hidden">
        <img
          src={photoUrl || "/default-user.png"}
          alt={`${firstName || "User"}'s photo`}
          className="w-full h-full object-cover"
        />
      </figure>
      <div className="card-body">
        {firstName && lastName && (
          <h2 className="card-title">{firstName + " " + lastName}</h2>
        )}
        {age && gender && (
          <p className="text-sm text-gray-500">
            {age}, {gender}
          </p>
        )}
        {about && <p className="text-base mt-2">{about}</p>}
        <div className="card-actions justify-center my-4">
          <button
            className="btn btn-primary"
            onClick={() => handleSendRequest("ignored", _id)}
          >
            Ignore
          </button>
          <button
            className="btn btn-secondary "
            onClick={() => handleSendRequest("interested", _id)}
          >
            Interested
          </button>
        </div>
      </div>
    </div>
  );
};

export default USerCard;
