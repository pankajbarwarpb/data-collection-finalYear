"use client";
import Loading from "@/components/loading";
import { db, storage } from "@/firebase/config";
import { useUser } from "@/hooks/get-user-data";
import { useAllEvent } from "@/hooks/useAllEvent";
import { Button } from "@nextui-org/react";
import { addDoc, collection } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { X } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

function Page() {
  const { userData, loading } = useUser();
  const { event }: any = useAllEvent();
  const router = useRouter();
  const [selectedEvent, setSelectedEvent] = useState(event?.[0]?.id);
  useEffect(() => {
    setSelectedEvent(event[0]?.id);
  }, [event]);
  const [selectedFile, setSelectedFile] = useState<any>([]);

  async function uploadFile(imageFile: any) {
    const storageRef = ref(storage, "event/" + imageFile.name);
    await uploadBytes(storageRef, imageFile);
    const downloadUrl = await getDownloadURL(storageRef);
    return downloadUrl;
  }
  async function uploadFiles(selectedFile: any) {
    let urls: any = [];
    for (const file of selectedFile) {
      const downloadURL = await uploadFile(file);
      urls.push(downloadURL);
    }
    return urls;
  }
  const onSubmit = () => {
    // console.log(selectedEvent);
    // console.log(`event/${selectedEvent}/certificates`);
    // return ;
    try {
      let newPromise = new Promise(async (resolve, reject) => {
        try {
          uploadFiles(selectedFile).then(async (urls: any) => {
            // console.log(`event/${selectedEvent}/certificates`);
            // console.log(urls);
            await addDoc(
              collection(db, `event/${selectedEvent}/certificates`),
              {
                userData,
                urls,
              }
            );
            router.push("/student")
            resolve("");
          });
        } catch (error) {
          reject("");
        }
      });
      toast.promise(newPromise, {
        loading: "Uploading certificates...",
        success: "Certificate uploaded!!",
        error: "Please try again",
      });
    } catch (error) {}
  };
  if (loading) {
    return <Loading />;
  }
  return (
    <div className="max-w-3xl mx-auto px-4 mt-10">
      <h1 className="text-2xl text-center font-bold underline">
        Submit Certificate
      </h1>
      <div className="mt-10 space-y-3 flex flex-col">
        <select
          onChange={(e: any) => {
            setSelectedEvent(e.target.value);
          }}
          className="bg-gray-100 px-3 py-3"
          name=""
          id=""
        >
          {event.map((e: any) => {
            return <option key={e} value={e.id}>{e.event_name}</option>;
          })}
        </select>
        {selectedFile?.map((file: any, index: number) => {
          return (
            <div key={index} className="px-2 py-1 bg-gray-100 flex justify-between">
              {file.name}
              <button
                onClick={() => {
                  setSelectedFile((prev: any) => {
                    return prev.filter((e: any, idx: number) => {
                      return idx != index;
                    });
                  });
                }}
              >
                <X />
              </button>
            </div>
          );
        })}
        <input
          multiple
          onChange={(e: any) => {
            let arr: any = [];
            console.log(e.target.files);
            Object.keys(e.target.files).forEach((key) => {
              arr.push(e.target.files[key]);
            });
            setSelectedFile((prev: any) => {
              return [...prev, ...arr];
            });
            return;
            e.target.files.forEach((file: any) => {
              arr.push(file);
            });
          }}
          type="file"
          accept="application/pdf"
        />
        <Button onClick={onSubmit} color="primary">
          Submit
        </Button>
      </div>
    </div>
  );
}

export default Page;
