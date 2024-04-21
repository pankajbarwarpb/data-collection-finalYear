import { useEffect, useState } from "react";
import { useUser } from "./get-user-data";
import axios from "axios";

export const useEvent = () => {
  const [event, setEvent] = useState([]);
  const { userData, loading } = useUser();
  useEffect(() => {
    axios.get("/api/get-all-event").then((data: any) => {
      // console.log(data);
      let eventList = data?.data?.data;
      eventList = eventList.filter((e: any) => {
        return e.userData.email === userData?.email;
      });
      setEvent(eventList);
    });
  }, [userData]);

  return {event}
};
