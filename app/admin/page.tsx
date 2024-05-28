"use client";
import axios from "axios";
import { getDoc } from "firebase/firestore";
import { FileText } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";

function Page() {
  const [reports, setReport] = useState([]);
  useEffect(() => {
    axios.get("/api/get-monthly-report").then(({ data: { data } }) => {
      // console.log(data)
      setReport(data);
    });
  }, []);
  return (
    <div className="max-w-3xl my-20 px-4 mx-auto">
      <h1 className="text-2xl font-bold">Monthly Reports</h1>
      {reports?.map(({ data, files, userData, timeStamp, id }: any) => {
        let date = new Date(Number(timeStamp.split(",").join("")));
        return (
          <>
            <Link href={`/admin/${id}`}>
              <div className="my-10 px-2 space-y-4 py-2 rounded-md border">
                <div className="flex justify-between">
                  <span>Faculty Name: {userData.name}</span>
                  <span>{date.toLocaleDateString()}</span>
                </div>

                <div>
                  <div className="flex flex-wrap gap-2">
                    {files.map((file: any) => {
                      return (
                        <>
                          <Link href={file}>
                            <FileText />
                          </Link>
                        </>
                      );
                    })}
                  </div>
                </div>
              </div>
            </Link>
          </>
        );
      })}
    </div>
  );
}

export default Page;
