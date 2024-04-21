import { db } from "@/firebase/config";
import { collection, getDocs } from "firebase/firestore";
import { NextResponse } from "next/server";

export async function GET() {
  let snapShot = await getDocs(collection(db, "event"));
  let arr: any = [];
  snapShot.forEach((doc: any) => {
    arr.push({ id: doc.id, ...doc.data() });
  });
  return NextResponse.json({ data: arr });
}
