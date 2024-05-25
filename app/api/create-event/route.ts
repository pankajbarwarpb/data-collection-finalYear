import { db } from "@/firebase/config";
import { addDoc, collection } from "firebase/firestore";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    let reqBody = await request.json();
    await addDoc(collection(db, `event`), reqBody)
    return NextResponse.json({res: "Event created successfully!"})
}