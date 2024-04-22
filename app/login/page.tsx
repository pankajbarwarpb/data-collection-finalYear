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
      .catch(()=>{
        alert("Please use correct credentials")
      });
    } catch (error) {
      alert("Please use correct credentials");
    }
  };
  if (loading) {
    return <Loading />;
  }
  if (userData) {
    if (userData.role === "student") {
      router.push("/student");
    } else {
      router.push("/faculty");
    }
    return <></>;
  }

  return (
    <>
      <div className="max-w-3xl my-6 py-20 px-4  mx-auto">
        <AuthRoute />

        <div className="mt-6 flex flex-col space-y-3">
          <Input {...register("email")} label="email" />
          <Input {...register("password")} label="password" />
          <Button color="primary" onClick={handleSubmit(onSubmit)}>
            Login
          </Button>
        </div>
      </div>
    </>
  );
}

export default Page;
