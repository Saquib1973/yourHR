"use client";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Button from "./components/Button";
import FadeInWrapper from "./components/FadeInWrapper";
import Loading from "./components/Loading";
import Link from "next/link";

interface Job {
  id: number;
  title: string;
  description: string;
  requiredSkills: string;
}

export default function Home() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [selection, setSelection] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchJobs = async () => {
      fetch("/api/jobs")
        .then((res) => res.json())
        .then((data) => setJobs(data.jobs))
        .catch((err) => {
          setError("Failed to fetch jobs");
          console.error("Failed to fetch jobs:", err);
        });
    };

    fetchJobs();
  }, []);

  if (jobs?.length == 0) return <Loading />;
  if (error) return <div>{error}</div>;

  return (
    <FadeInWrapper>
      <h1 className="h1 font-bold mb-4">Available Job Roles</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-3 px-2">
        {!jobs && (
          <div className="flex flex-col gap-2">
            No Jobs Available{" "}
            <Link className="text-lg font-extrabold underline" href={"/signin"}>
              Login Now
            </Link>
          </div>
        )}
        {jobs?.map((job, i) => (
          <Job
            selection={selection}
            setSelection={setSelection}
            i={i}
            key={job.id}
            title={job.title}
            desc={job.description}
            tech={job.requiredSkills}
          />
        ))}
      </div>
    </FadeInWrapper>
  );
}

const Job = ({
  title,
  desc,
  tech,
  i,
  selection,
  setSelection,
}: {
  title: string;
  desc: string;
  tech: string;
  i: number;
  selection: number | null;
  setSelection: Function;
}) => {
  return (
    <Button col={i}>
      <div
        className="relative flex flex-col p-4 gap-2 cursor-pointer justify-around h-full w-full"
        onClick={() => (selection === i ? setSelection(null) : setSelection(i))}
      >
        <p className="h1">{title}</p>
        <p className="text-sm text-gray-500 -mt-2.5">{desc}</p>
        <div className="flex flex-wrap gap-1">
          {tech.split(",").map((t) => (
            <p
              className="bg-gray-200 text-black p-0.5 px-1 rounded-sm text-[0.6rem]"
              key={i + "key"}
            >
              {t}
            </p>
          ))}
        </div>
        {selection === i && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col mt-auto gap-2 p-4 right-1/2 top-1/2 h-full bg-red-50 w-full -translate-y-1/2 translate-x-1/2 bg-white/80 absolute"
          >
            <button className="button">Apply</button>
            <button className="button">View Details</button>
          </motion.div>
        )}
      </div>
    </Button>
  );
};
