"use client";
import { useState, useEffect } from "react";
import PdfViewer from "../components/PdfViewer";
import FadeInWrapper from "../components/FadeInWrapper";
import Loading from "../components/Loading";

interface User {
  id: number;
  name: string;
  email: string;
  resume: string;
  techStack: string;
}

export default function UserDetails() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    fetchUserDetails();
  }, []);
  const [myPdf, setMyPdf] = useState(false);

  const fetchUserDetails = async () => {
    try {
      const res = await fetch("/api/user", {
        method: "GET",
      });
      const response = await res.json();
      console.log(response);
      setUser(response.user);
    } catch (error) {
      console.error("Failed to fetch user details:", error);
    }
  };
  if (!user) {
    return <Loading />;
  }

  return (
    <FadeInWrapper>
      <h1 className="h1 mb-4">User Details</h1>
      <div className="flex justify-between items-start">
        <div className="flex flex-col gap-2 w-full">
          <p className="text-xl">
            Hey 🙋‍♂️ <span className="text-red-400">{user.name}</span> , your
            registered email is{" "}
            <span className="underline underline-offset-4 text-gray-500">
              {user.email}
            </span>
          </p>
          <div className="w-full flex items-center text-sm flex-wrap gap-1">
            Your Tech Stack includes{" "}
            {user.techStack.split(",").map((tech, i) => {
              let bgColorClass = "";

              if (i % 5 === 0) bgColorClass = "!bg-cyan-400";
              else if (i % 5 === 1 || i % 5 === 3)
                bgColorClass = "md:col-span-2 !bg-green-400";
              else if (i % 5 === 2)
                bgColorClass = "md:row-span-2 !bg-yellow-400";
              else bgColorClass = "md:row-span-1 md:col-span-1 !bg-purple-400";

              return (
                <p
                  key={i + 1}
                  className={`p-0.5 text-xs px-1 rounded-sm text-white ${bgColorClass}`}
                >
                  {tech}{" "}
                </p>
              );
            })}
          </div>
        </div>
      </div>
      <button className="button my-2" onClick={() => setMyPdf((curr) => !curr)}>
        {!myPdf ? "Show Resume" : "Close Resume"}
      </button>
      <div>
        {myPdf && user.resume && (
          <PdfViewer pdfFile={`/uploads/${user.resume}`} />
        )}
      </div>
    </FadeInWrapper>
  );
}
