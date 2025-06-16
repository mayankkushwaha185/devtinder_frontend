import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../utils/constant";
import { addFeed } from "../utils/feedSlice";
import USerCard from "./USerCard";

const Feed = () => {
  const dispatch = useDispatch();
  const feed = useSelector((store) => store.feed);

  useEffect(() => {
    // Fetch only if feed is empty
    if (feed.length > 0) return;

    const fetchFeed = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/feed`, {
          withCredentials: true,
        });

        dispatch(addFeed(res?.data?.data || []));
      } catch (err) {
        console.error(
          "Error fetching feed:",
          err?.response?.data || err.message
        );
      }
    };

    fetchFeed();
  }, [feed.length, dispatch]); // depend on feed.length

  return (
    <div className="flex justify-center my-10">
      {feed.length > 0 ? (
        <USerCard user={feed[0]} />
      ) : (
        <p className="text-lg font-medium">No New User Found!!!</p>
      )}
    </div>
  );
};

export default Feed;
