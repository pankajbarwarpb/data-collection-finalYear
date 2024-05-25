import { db } from "@/firebase/config";
import { collection, getDocs } from "firebase/firestore";
import { NextResponse } from "next/server";

export async function  GET() {
    const data = await getDocs(collection(db, `monthly`));
    let arr :any =[];
    data.forEach((doc:any)=>{
        arr.push({id:doc.id, ...doc.data()});
    })
    return NextResponse.json({data:arr});
}