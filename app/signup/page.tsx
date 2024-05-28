"use client";

import AuthRoute from "@/components/auth-route";
// import { db } from "@/config";
import { auth, db } from "@/firebase/config";

import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Input,
  RadioGroup,
} from "@nextui-org/react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { addDoc, collection } from "firebase/firestore";
import { useRouter } from "next/navigation";

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
function Page() {
  //   const [user, loading, error] = useAuthState(auth);
  // const { userData, loading } = useUser();
  // console.log(userData, loading);
  const { register, handleSubmit } = useForm();
  const [role, setRole] = useState("student");
  const router = useRouter();
  const onSubmit = (data: any) => {
    try {
      let body = { ...data, role: role };

      let newPromise = new Promise(async (resolve, reject) => {
        try {
          createUserWithEmailAndPassword(auth, body.email, body.password)
            .then(async (res) => {
              await addDoc(collection(db, `${body.email}`), body);
              //   router.push("/login");
              resolve("");
              router.push("/faculty")
            })
            .catch((error: any) => {
              reject("");
            });
        } catch (error) {
          reject("");
        }
      });
      toast.promise(newPromise, {
        loading: "Creating account...",
        error: "Email already used or some error ",
        success: "Account created successfully",
      });

      // console.log(body);
    } catch (error: any) {
      toast.error(error.message);
    }
  };
  // return <h1>Hello</h1>
  return (
    <div className="max-w-3xl my-6 py-20 px-4  mx-auto">
      
     <AuthRoute/>
      <div className="mt-6">
        <div className="flex flex-col w-full flex-wrap  mb-6 md:mb-0 gap-4">
          <Input
          autoFocus
            {...register("name")}
            name="name"
            type="text"
            label="Name"
            placeholder="Full Name"
            labelPlacement="inside"
          />
          {role === "student" && (
            <Input
              {...register("roll_number")}
              name="roll_number"
              type="number"
              label="Roll Number"
              placeholder="20202020"
              labelPlacement="inside"
            />
          )}

          <Input
            {...register("department")}
            name="department"
            label="Department"
            type="text"
            placeholder="BTech"
            labelPlacement="inside"
          />
          {role === "student" && (
            <Input
              {...register("batch")}
              name="batch"
              label="Batch"
              type="text"
              placeholder="2024"
              labelPlacement="inside"
            />
          )}
          <Input
            {...register("branch")}
            name="branch"
            label="Branch"
            type="text"
            placeholder="Computer Science and Engineering"
            labelPlacement="inside"
          />
          <Input
            {...register("email")}
            name="email"
            label="email"
            type="email"
            placeholder="example@gmail.com"
            labelPlacement="inside"
          />
          <Input
            {...register("password")}
            name="password"
            label="password"
            type="password"
            placeholder="********"
            labelPlacement="inside"
          />
          <Input
            {...register("confirm_password")}
            name="confirm_password"
            label="Confirm Password"
            type="password"
            placeholder="********"
            labelPlacement="inside"
          />
          <select
            className="bg-gray-100 px-3 text-sm rounded-lg py-3"
            name=""
            id=""
            onChange={(e: any) => {
              setRole(e.target.value);
            }}
          >
            <option value="student">Student</option>
            <option value="faculty">Faculty</option>
          </select>
          <Button onClick={handleSubmit(onSubmit)} color="primary">
            Submit
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Page;
