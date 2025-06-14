import axios from "axios";
import React, { useEffect, useCallback } from "react";
import { BASE_URL } from "../utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice";
import USerCard from "./USerCard";

const Feed = () => {
  const feed = useSelector((store) => store.feed);
  const dispatch = useDispatch();

  const getFeed = useCallback(async () => {
    if (feed && feed.length > 0) return;
    try {
      const res = await axios.get(BASE_URL + "/feed", {
        withCredentials: true,
      });
      dispatch(addFeed(res?.data?.data));
    } catch (error) {
      console.error(
        "Error fetching feed:",
        error?.response?.data || error.message
      );
    }
  }, [dispatch, feed]);

  useEffect(() => {
    getFeed();
  }, [getFeed]);

  return (
    <div className="flex justify-center my-10">
      {feed.length > 0 ? <USerCard user={feed[0]} /> : <p>Loading feed...</p>}
    </div>
  );
};

export default Feed;
