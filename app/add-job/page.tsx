"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import FadeInWrapper from "../components/FadeInWrapper";

export default function AddJob() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [requiredSkills, setRequiredSkills] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !description || !requiredSkills) {
      return alert("Please fill in all fields");
    }
    try {
      const res = await fetch("/api/jobs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, description, requiredSkills }),
      });

      if (res.ok) {
        alert("Job added successfully!");
        router.push("/");
      } else {
        alert("Failed to add job");
      }
    } catch (error) {
      console.error("Error adding job:", error);
      alert("Failed to add job");
    }
  };

  return (
    <FadeInWrapper>
      <div className="page-height flex flex-col items-center justify-start pt-[5%] max-md:mx-4 mx-auto md:w-[50%]">
        <h1 className="text-3xl font-bold mb-6">Add Job</h1>
        <form
          className="space-y-4 flex flex-col w-full"
          onSubmit={handleSubmit}
        >
          <input
            type="text"
            placeholder="Job Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="input"
          />
          <textarea
            placeholder="Job Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="input resize-none min-h-[150px]"
          />
          <div className="grid grid-cols-3 gap-2">
            <input
              type="text"
              placeholder="Required Skills (comma-separated)"
              value={requiredSkills}
              onChange={(e) => setRequiredSkills(e.target.value)}
              className="input col-span-2"
            />
            <button type="submit" className="button">
              Submit
            </button>
          </div>
        </form>
      </div>
    </FadeInWrapper>
  );
}
