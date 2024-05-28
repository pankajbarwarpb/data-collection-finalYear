"use client";
import { useUser } from "@/hooks/get-user-data";
import { Button, DatePicker, Input, Textarea } from "@nextui-org/react";
import axios from "axios";
import { Loader } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

function Page() {
  const { userData, loading } = useUser();
  // console.log({userData});
  
  const router = useRouter();
  const { register, handleSubmit } = useForm();
  const [date, setDate] = useState("");
  const onSubmit = async (data: any) => {
    let newPromise = new Promise(async (resolve, reject) => {
      let body = { ...data, date, userData };
      let response = await axios.post("/api/create-event", body);
      router.push("/faculty");
      resolve("");
    });
    toast.promise(newPromise, {
      loading: "Event creating...",
      error: "Please try again",
      success: "Event created!!",
    });
  };
  if (loading) {
    return (
      <div className="h-screen flex justify-center items-center">
        <Loader className="animate-spin" />
      </div>
    );
  }
  if (userData?.role === "student") {
    router.push("/student");
  }
  // if (!userData) {
  //   alert('going to login')
  //   router.push("/login");
  // }
  return (
    <div className="max-w-3xl px-4 mt-10 mx-auto">
      <h1 className="underline text-2xl font-bold mb-6">Add New Event</h1>
      <div className="space-y-3 flex flex-col">
        <Input
          label="Event Name"
          placeholder="Cricket Tournament"
          {...register("event_name")}
        />
        <Input {...register("place")} label="Place" placeholder="Main ground" />
        <Input
          type="date"
          label="Date"
          onChange={(e: any) => {
            setDate(e.target.value);
          }}
        />
        <Textarea {...register("desc")} label="Description" minRows={20} />
        <Button onClick={handleSubmit(onSubmit)} color="primary">
          Submit
        </Button>
      </div>
    </div>
  );
}

export default Page;
