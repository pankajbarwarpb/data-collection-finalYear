import { db } from "@/firebase/config";
import { collection, getDocs } from "firebase/firestore";
import { NextRequest, NextResponse } from "next/server";

export  async function POST(req: NextRequest) {
    let { id } = await req.json();
    let data = await getDocs(collection(db, `event/${id}/certificates`));
    let arr: any = [];
    data.forEach((doc: any) => {
      arr.push({ id: doc.id, ...doc.data() });
    });
  return NextResponse.json({ data: arr });
}
