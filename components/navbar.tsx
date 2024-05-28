/* eslint-disable @next/next/no-img-element */
"use client";
import { auth } from "@/firebase/config";
import { useRoute } from "@/hooks/route";
import { Button } from "@nextui-org/react";

import { signOut } from "firebase/auth";
import { useRouter } from "next/navigation";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";

function Navbar() {
  // useRoute();
  const router = useRouter();
  const [user]: any = useAuthState(auth);
  // console.log(user + "asdf");
  return (
    <div className="max-w-3xl gap-6 flex py-2 justify-between mx-auto px-4 ">
      <div className="flex items-center gap-3">
        <img
          className="w-14"
          src="https://upload.wikimedia.org/wikipedia/en/9/96/Logo_of_NIT_Jalandhar.png"
          alt=""
        />
        <span className="text-2xl font-bold">Data Collection</span>
      </div>
      <div>
        {user ? (
          <>
            <Button
              color="danger"
              onClick={() => {
                signOut(auth);
                router.push("/login");
              }}
            >
              Sign Out
            </Button>
          </>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}

export default Navbar;
