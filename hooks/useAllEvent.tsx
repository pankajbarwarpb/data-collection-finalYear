import { useEffect, useState } from "react";
import axios from "axios";

export const useAllEvent = () => {
  const [event, setEvent] = useState([]);
  useEffect(() => {
    axios.get("/api/get-all-event").then((data: any) => {
      let eventList = data?.data?.data;
      // console.log(eventList);
      setEvent(eventList);
    });
  }, []);
  return {event}
};
