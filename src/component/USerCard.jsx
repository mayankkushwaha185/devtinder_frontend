import React from "react";

const USerCard = ({ user }) => {
  if (!user) return null;

  const { firstName, lastName, photoUrl, age, gender, about } = user;

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
          <button className="btn btn-primary">Ignore</button>
          <button className="btn btn-secondary">Interested</button>
        </div>
      </div>
    </div>
  );
};

export default USerCard;
