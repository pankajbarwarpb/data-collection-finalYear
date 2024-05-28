'use client'
import axios from 'axios';
import { FileText } from 'lucide-react';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'

function Page({ params }: { params: { id: string } }) {
    // console.log(params.id);
    let [id, subid] = params.id.split("-");
    const [certificates, setCertificates] = useState<any>([]);
  useEffect(() => {
    axios
      .post("/api/get-certificates", {
        id: id,
      })
      .then((data: any) => {
        // console.log(data.data.data);
        let arr= data.data.data.filter((e:any)=>e.id===subid);
        // console.log(arr[0].urls);
        setCertificates(arr[0]);
      });
  }, [id, subid]);
  return (
    <>
     <div className='max-w-3xl px-4 mt-6 mx-auto'>
      <h1 className='underline text-2xl'>Student Details</h1>
      <div className='mt-6 space-y-2 mb-6 px-4 py-2 rounded-lg bg-gray-100'>
         <h1>Name: {certificates?.userData?.name}</h1>
         <h1>Roll Number: {certificates?.userData?.roll_number}</h1>
         <h1>Department: {certificates?.userData?.department}</h1>
         <h1>Batch: {certificates?.userData?.batch}</h1>
      </div>
      <h1>Certificaes Submitted</h1>
       <div className='my-6 flex flex-wrap gap-3'>
        {certificates?.urls?.map((e:any)=>{
          return <Link key={e} target='_blank' href={e}>
           <FileText className='h-12 w-12'/>
          </Link>
        })}
       </div>
     </div>
    </>
  )
}

export default Page