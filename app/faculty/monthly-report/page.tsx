"use client";
import Navbar from "@/components/navbar";
import { db, storage } from "@/firebase/config";
import { useUser } from "@/hooks/get-user-data";
import { Button, Input, Textarea } from "@nextui-org/react";
import { timeStamp } from "console";
import { addDoc, collection } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

function Page() {
  const { userData, loading } = useUser();

  const { register, handleSubmit } = useForm();
  //    if(loading){

  //    }
  const router = useRouter();
  async function uploadFile(imageFile: any) {
    const storageRef = ref(
      storage,
      "monthly_report/" + imageFile.name + Date.now().toLocaleString()
    );
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
  const submit = (data: any) => {
    // console.log("clicked");
    // console.log(data);
    // let uploaddata = data;
    // return ;
    let newPromise = new Promise(async (resolve, reject) => {
      try {
        const selectedFile = data.files;
        uploadFiles(selectedFile).then(async (urls: any) => {
          // console.log(urls);
          // console.log(`monthly_report`);
          data["files"] = "uploaded";
          await addDoc(collection(db, `monthly`), {
            userData,
            files: urls,
            data,
            timeStamp: Date.now().toLocaleString()
          });
          router.push("/faculty");
          resolve("");
        });
      } catch (error) {
        reject("");
      }
    });
    toast.promise(newPromise, {
      loading: "Uploading data...",
      success: "Data uploaded successfully",
      error: "Please try again",
    });
  };
  return (
    <>
      <div className="px-4 my-10 max-w-3xl mx-auto space-y-5">
        <div className="space-y-4">
          <label htmlFor="">
            Kindly provide the number of events as well as the event details.
          </label>
          <Textarea {...register("number_of_events")} multiple />
        </div>
        <div className="space-y-4">
          <label htmlFor="">
            No. of FDP/STC organised(Funding Agency/Self Sponsored) (Kindly
            provide details of the same):
          </label>
          <Textarea {...register("no_of_FDP_STC")} multiple />
        </div>
        <div className="space-y-4">
          <label htmlFor="">
            No. of workshops organised(Funding Agency/Self Sponsore) (Kindle
            provide details of the same).
          </label>
          <Textarea {...register("no_of_workshops_organised")} multiple />
        </div>
        <div className="space-y-4">
          <label htmlFor="">
            Expert Talks organised from Acadamia/Industries (Kindly provide
            details of the same).
          </label>
          <Textarea {...register("no_of_workshops_submitted")} multiple />
        </div>
        <div className="space-y-4">
          <label htmlFor="">
            No. of Research Project Sanctioned: (name of P.I/Title of the
            Project/Funding Agency/Amount) (Kindle provide details of the same):
          </label>
          <Textarea
            {...register("no_of_research_project_sactioned")}
            multiple
          />
        </div>
        <div className="space-y-4">
          <label htmlFor="">
            No. of Research Project Submitted: (name of P.I/Title of the
            Project/Funding Agency/Amount) (Kindle provide details of the same):
          </label>
          <Textarea {...register("no_of_project_submitted")} multiple />
        </div>
        <div className="space-y-4">
          <label htmlFor="">
            No. of GIAN courses organised: (Name of Faculty Coordinator&lsquo;s)
            (Kindly provide details of the same):
          </label>
          <Textarea
            {...register("no_of_gian_courses_organised")}
            multiple
          />
        </div>
        <div className="space-y-4">
          <label htmlFor="">
            No. of GIAN proposals submitted: (Name of Faculty Coordinator&lsquo;s)
            (Kindly provide details of the same):
          </label>
          <Textarea
            {...register("no_of_gian_courses_submitted")}
            multiple
          />
        </div>
        <div className="space-y-4">
          <label htmlFor="">
            No. of National Conferences organised: (Name of Faculty Coordinators
            and Funding agency) (Kindly provide details of the same):
          </label>
          <Textarea
            {...register("no_of_national_conferences_organised")}
            multiple
          />
        </div>
        <div className="space-y-4">
          <label htmlFor="">
            No. of International Conferences organised: (Kindly provide details
            of the same):
          </label>
          <Textarea
            {...register("no_of_international_conferences_oraganised")}
            multiple
          />
        </div>

        <div className="space-y-4">
          <label htmlFor="">
            Patents/Publications by the Faculty in journals/conferences during
            the reporting period
          </label>
          <Textarea
            {...register("patents_publication_by_the_faculty")}
            multiple
          />
        </div>

        <div className="space-y-4">
          <label htmlFor="">
            No. of Patents Filed (Kindly provide details of the same)
          </label>
          <Textarea {...register("no_of_patents_filed")} multiple />
        </div>

        <div className="space-y-4">
          <label htmlFor="">
            No. of Patents Published/Granted (Kindly provide details of the
            same)
          </label>
          <Textarea {...register("no_of_patents_published")} multiple />
        </div>

        <div className="space-y-4">
          <label htmlFor="">
            No. of Papers published/accepted in Journals: (Kindly add references
            of the papers)
          </label>
          <Textarea {...register("no_of_papers_published")} multiple />
        </div>

        <div className="space-y-4">
          <label htmlFor="">
            Activities by the student clubs of department/placement assistance
            activities. (Kindly provide details of the same)
          </label>
          <Textarea
            {...register("activites_by_the_student_clubsof_department")}
            multiple
          />
        </div>

        <div className="space-y-4">
          <label htmlFor="">
            Initiatives for improvements in physical infrastructure/laboratory
            equipment. (Kindly provide details of the same)
          </label>
          <Textarea
            {...register(
              "initiatives_for_improvements_in_physical_infrastructure"
            )} 
            multiple 
          />
        </div>

        <div className="space-y-4">
          <label htmlFor="">
            Any other initiatives not covered above. (Kindly provide details of
            the same)
          </label>
          <Textarea
            {...register("any_other_initiatives_not_covered")}
            multiple
          />
        </div>

        <div className="space-y-4">
          <label htmlFor="">
            No. of Papers published/accepted in Journals: (Kindly add references
            of the papers)
          </label>
          <Input multiple {...register("files")} type="file"
           />
        </div>
        <div className="">
          <Button onClick={handleSubmit(submit)} color="primary">
            Submit
          </Button>
        </div>
      </div>
    </>
  );
}

export default Page;
