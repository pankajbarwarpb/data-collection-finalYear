"use client";
import axios from "axios";
import { getDoc } from "firebase/firestore";
import { FileText } from "lucide-react";
import Link from "next/link";
import { report } from "process";
import React, { useEffect, useState } from "react";

function Page({ params }: { params: { id: string } }) {
  const [reports, setReport] = useState<any>();
  const [uploadDate, setUploadDate] = useState("");
  useEffect(() => {
    // console.log(params.id);
    axios.get("/api/get-monthly-report").then(({ data: { data } }) => {
      data = data.filter((doc: any) => {
        return doc.id === params.id;
      })?.[0];
      console.log(data);
      // console.log(data);
      let date = new Date(Number(data.timeStamp.split(",").join("")));
      setUploadDate(date.toLocaleDateString());
      setReport(data);
    });
  }, [params]);
  return (
    <div className="max-w-3xl my-20 px-4 mx-auto">
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold">{reports?.userData?.name}</h1>
        <span>{uploadDate}</span>
      </div>
      <div className="my-10">
        <ul className="space-y-5" style={{ listStyle: "bullet" }}>
          <li className="space-y-2">
            <span className="font-bold">
              Kindly provide number of events as well as the event details.
            </span>
            <p>{reports?.data?.number_of_events}</p>
          </li>
          <li className="space-y-2">
            <span className="font-bold">
              No. of FDP/STC organised(Funding Agency/Self Sponsored) (Kidnly
              provide details of the same)
            </span>
            <p>{reports?.data?.no_of_FDP_STC}</p>
          </li>
          <li className="space-y-2">
            <span className="font-bold">
              No. of workshops organised (Funding Agency/ Self Sponsored)
              (Kindly provide details of the same)
            </span>
            <p>{reports?.data?.no_of_workshops_organised}</p>
          </li>
          {/* <li className="space-y-2">
            <span className="font-bold">
            Expert Talks organised from Academia/Industries (Kidnly provide details of the same)
            </span>
            <p>
              {reports?.data?.}
            </p>
          </li> */}
          <li className="space-y-2">
            <span className="font-bold">
              No. of Research Projects Sanctioned: (name of P.I/Title of the
              Project/Funding Agency/Amount) (Kindly provide details of the
              same):
            </span>
            <p>{reports?.data?.no_of_research_project_sactioned}</p>
          </li>
          <li className="space-y-2">
            <span className="font-bold">
              No. of Research Projects submitted: (name of P.I/Title of the
              project/Funding Agency/Amount) (Kindly provide details of the
              same)
            </span>
            <p>{reports?.data?.no_of_project_submitted}</p>
          </li>
          <li className="space-y-2">
            <span className="font-bold">
              No. of GIAN courses organised: (Name of Faculty Coordinator)
              (Kindly provide details of the same)
            </span>
            <p>{reports?.data?.no_of_gian_courses_organised}</p>
          </li>
          <li className="space-y-2">
            <span className="font-bold">
              No. of GIAN proposals submitted: (Name of Faculty Coordinators)
              (Kindly provide details of the same):
            </span>
            <p>{reports?.data?.no_of_gian_courses_submitted}</p>
          </li>

          <li className="space-y-2">
            <span className="font-bold">
              No. of National Conferences organised: (name of Faculty
              coordinators and Funding Agency) (Kindly provide details of the
              same)
            </span>
            <p>{reports?.data?.no_of_national_conferences_organised}</p>
          </li>
          <li className="space-y-2">
            <span className="font-bold">
              No. of International Conferences organised: (Kindly provide
              details of the same):
            </span>
            <p>{reports?.data?.no_of_international_conferences_oraganised}</p>
          </li>
          <li className="space-y-2">
            <span className="font-bold">
              No. of patents filed (Kindle provide details of the same)
            </span>
            <p>{reports?.data?.no_of_patents_filed}</p>
          </li>
          <li className="space-y-2">
            <span className="font-bold">
              No. of patents published/Granted (Kindly privide details of the
              same)
            </span>
            <p>{reports?.data?.no_of_patents_published}</p>
          </li>
          <li className="space-y-2">
            <span className="font-bold">
              No. of Papers published/accepted in Journals: (Kindly add
              references of the papers)
            </span>
            <p>{reports?.data?.no_of_papers_published}</p>
          </li>
          {/* <li className="space-y-2">
            <span className="font-bold">
            No. of papers published/accpted in conferences: (Kidnly add references of the papers)
            </span>
            <p>
              {reports?.data?.}
            </p>
          </li> */}
          <li className="space-y-2">
            <span className="font-bold">
              Activities by student clubs of department/placement assistance
              activities. (Kindly provide details of the same)
            </span>
            <p>
              {reports?.data?.no_of_activites_by_the_student_clubsof_department}
            </p>
          </li>
          <li className="space-y-2">
            <span className="font-bold">
              Initiatives for improvement in physical infrastructure/Laboratory
              equipmnet.(Kindly provide details of the same)
            </span>
            <p>
              {
                reports?.data
                  ?.initiatives_for_improvements_in_physical_infrastructure
              }
            </p>
          </li>
          <li className="space-y-2">
            <span className="font-bold">
              Any ther initiatives not covered above. (Kindly provide details of
              the same)
            </span>
            <p>{reports?.data?.any_other_initiatives_not_covered}</p>
          </li>

          <li className="space-y-2">
            <span className="font-bold">Document files</span>
            <div className="flex flex-wrap gap-2">
              {reports?.files?.map((file: any) => {
                return (
                  <>
                    <Link href={file}>
                      <FileText />
                    </Link>
                  </>
                );
              })}
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Page;
