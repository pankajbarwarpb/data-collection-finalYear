'use client'
import { useUser } from "@/hooks/get-user-data";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Home() {
  const {userData, loading} = useUser();
  
  const router  = useRouter();
  router.push("/login")
  if(loading){
    
  }
  return (
    <>
    
    </>
  );
}
