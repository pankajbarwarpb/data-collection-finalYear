"use client";
import AuthRoute from "@/components/auth-route";
import Loading from "@/components/loading";
import { auth } from "@/firebase/config";
import { useUser } from "@/hooks/get-user-data";
import { Button, Input } from "@nextui-org/react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";

function Page() {
  const { userData, loading } = useUser();
  const router = useRouter();

  const { register, handleSubmit } = useForm();

  const onSubmit = (data: any) => {
    try {
      signInWithEmailAndPassword(auth, data.email, data.password)
        .then((res) => {
          if (data.email === "admin@gmail.com") {
            router.push("/admin");
          }
        })
        .catch(() => {
          alert("Please use correct credentials");
        });
    } catch (error: any) {
      // console.log(error.message);
      alert("Please use correct credentials");
    }
  };
  // console.log(userData);
  if (loading) {
    return <Loading />;
  }
  if (userData) {
    // console.log("userData");
    if (userData?.role === "student") {
      router.push("/student");
    } else if (userData?.role === "faculty") {
      router.push("/faculty");
    } else {
      router.push("/admin");
    }
    return <></>;
  }

  return (
    <>
      <div className="max-w-3xl my-6 py-20 px-4  mx-auto">
        <AuthRoute />
        <div className="mt-6 flex flex-col space-y-3">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit(onSubmit);
            }}
            className="mt-6 flex flex-col space-y-3"
          >
            <Input autoFocus  {...register("email")} label="email" />
            <Input type="password" {...register("password")} label="password" />
            <Button type="submit" color="primary" onClick={handleSubmit(onSubmit)}>
              Login
            </Button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Page;
