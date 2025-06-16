import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../utils/constant";
import { addRequest, remvoeRequest } from "../utils/requestSlice";

const Request = () => {
  const dispatch = useDispatch();
  const requests = useSelector((store) => store.requests);

  const reviewRequest = async (status, _id) => {
    try {
      const res = axios.post(
        BASE_URL + "/request/review" + status + "/" + _id,
        {},
        { withCredentials: true }
      );
      dispatch(remvoeRequest(_id));
    } catch (error) {
      console.log(error);
    }
  };

  const fetchRequests = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/requests/received", {
        withCredentials: true,
      });
      console.log(res);
      dispatch(addRequest(res?.data?.data));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  if (!requests) return <h1>Kuch data nh i</h1>;

  if (requests.length === 0)
    return (
      <div className="flex justify-center my-10">
        <h1 className="text-3xl font-bold">No Request</h1>
      </div>
    );

  return (
    <div className="flex flex-col items-center my-10">
      <h1 className="text-3xl font-bold mb-6">Requests</h1>

      {requests.map((request) => {
        const { _id, firstName, lastName, photoUrl, age, gender, about } =
          request.fromUserId;
        return (
          <div
            key={_id}
            className="flex justify-between items-center m-4 rounded-lg bg-base-300 w-3/2 p-4 shadow-md"
          >
            <img
              alt="profile"
              className="w-20 h-20 rounded-full object-cover"
              src={photoUrl || "/default-avatar.png"}
            />
            <div className="text-left mx-4">
              <h2 className="font-bold text-xl">
                {firstName} {lastName}
              </h2>
              {age && gender && (
                <p>
                  {age}, {gender}
                </p>
              )}
              <p>{about || "No bio provided"}</p>
            </div>
            <div>
              <button
                className="btn btn-primary mx-2"
                onClick={() => reviewRequest("rejected", request._id)}
              >
                Reject
              </button>
              <button
                className="btn btn-primary mx-2"
                onClick={() => reviewRequest("accepted", request._id)}
              >
                Accept
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Request;
