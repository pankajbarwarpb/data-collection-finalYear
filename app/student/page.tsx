"use client";
import Loading from "@/components/loading";
import { auth } from "@/firebase/config";
import { useUser } from "@/hooks/get-user-data";
import { useAllEvent } from "@/hooks/useAllEvent";
import { useEvent } from "@/hooks/useEvent";
import { Button } from "@nextui-org/react";
import { signOut } from "firebase/auth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

function Page() {
  const { userData, loading } = useUser();
  const { event } = useAllEvent();
  const router = useRouter();
  if (loading) {
    return <Loading />;
  }
  if(!userData){
    router.push("/login");
    return ;
  }
  
  return (
    <>
      <div className="max-w-3xl px-4 mt-6 mx-auto ">
        <div className="flex justify-between">
          <h1 className="text-xl font-bold">
            Certificate submitted for events
          </h1>
          <Link href="/student/submit-certificate">
            <Button>Submit Certificate</Button>
          </Link>
        </div>
        <div className="mt-6 space-y-3">
          {event.map((e: any) => {
            return <div key={e.id} className="bg-gray-100 px-4 py-2">{e.event_name}</div>;
          })}
        </div>
      </div>
    </>
  );
}

export default Page;
