"use client";
import { db } from "@/firebase/config";
import { useUser } from "@/hooks/get-user-data";
import { useRoute } from "@/hooks/route";
import { useAllEvent } from "@/hooks/useAllEvent";
import { useEvent } from "@/hooks/useEvent";
import { Button } from "@nextui-org/react";
import axios from "axios";
import { collection, getDocs } from "firebase/firestore";
import { Loader } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

function Page() {
  const { userData, loading } = useUser();
  const router = useRouter();
//   const [event, setEvents] = useState([]);
useRoute();
  const {event} = useEvent();
  if (loading) {
    return (
      <>
        <div className="flex h-screen justify-center items-center">
          <Loader className="animate-spin" />
        </div>
      </>
    );
  }
  if (userData?.role === "student") {
    router.push("/student");
    return;
  }
  return (
    <>
      <div className="max-w-3xl px-4 mx-auto mt-10">
        <div className="my-5">
          <span className="border-2 rounded p-2 border-black">User : {userData.name}</span>
        </div>
        <div className="flex mb-10 justify-between">
          <span className="text-2xl font-bold">Upload monthly report</span>
          <Link href="/faculty/monthly-report">
           <Button color="primary">
            Monthly Report
           </Button>
          </Link>
        </div>
        <div className="flex justify-between">
          <span className="text-2xl font-bold">All Events</span>
          <Link href="/faculty/new-event">
            <Button color="primary">Add New Event</Button>
          </Link>
        </div>
        <div className="mt-6 space-y-3">
          {event.map((e: any) => {
            return (
              <Link key={e.id} href={`/faculty/event/${e.id}`}>
                <div className="px-4 my-2 rounded-lg py-2 bg-gray-100">{e.event_name}</div>
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default Page;
