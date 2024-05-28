"use client";
import { auth } from "@/firebase/config";
import { useEvent } from "@/hooks/useEvent";
import axios from "axios";
import { signOut } from "firebase/auth";
import Link from "next/link";
import React, { useEffect, useState } from "react";

function Page({ params }: { params: { id: string } }) {
  // console.log(params.id);
  const { event }: any = useEvent();
  const [currEvent, setCurrEvent] = useState<any>();
  const [certificates, setCertificates] = useState([]);
  useEffect(() => {
    axios
      .post("/api/get-certificates", {
        id: params.id,
      })
      .then((data: any) => {
        // console.log(data.data.data);
        setCertificates(data.data.data);
      });
  }, [params.id]);
  useEffect(() => {
    let arr = event.filter((e: any) => e.id === params.id);
    setCurrEvent(arr[0]);
  }, [event, params.id]);
  return (
    <>
      <div className="max-w-3xl px-4 mt-6 mx-auto roulg">
        <h1 className="text-2xl font-bold">
          Event Name: {currEvent?.event_name}
        </h1>
        <div className="bg-gray-100 rounded-lg mt-6 px-2 py-4">
          <h1>Name: {currEvent?.event_name}</h1>
          <h1>Place: {currEvent?.place}</h1>
          <h1>Date: {currEvent?.date}</h1>
          <h1>Coordinator: {currEvent?.userData?.name}</h1>
        </div>
        <h1 className="text-2xl font-bold my-6">Certificated submissions</h1>
        <div className="mt-6  space-y-3">
          {certificates?.map((doc:any)=>{
                return <Link key={doc.id} href={`/faculty/event/student-certificate/${params.id}-${doc.id}`}>
                <div className="px-2 my-2 rounded-lg py-2 bg-gray-100">{doc.userData.name}</div>
                </Link>
             })}
        </div>
      </div>
    </>
  );
}

export default Page;
