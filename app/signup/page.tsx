"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useAuth } from "../context/authContext";
import FadeInWrapper from "./../components/FadeInWrapper";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [techStack, setTechStack] = useState<string[]>([]);
  const [file, setFile] = useState<File | null>(null);
  const router = useRouter();
  const { setIsAuthenticated } = useAuth();

  const handleTechStackChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTechStack(e.target.value.split(","));
  };

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (!file) return;

    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("file", file);
    techStack.forEach((tech) => formData.append("techStack", tech));

    try {
      const res = await fetch("/api/signup", {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        setIsAuthenticated(true);
        alert("Signup successful!");
        router.push("/");
      } else {
        alert("Signup failed!");
      }
    } catch (error) {
      console.error("Error during signup:", error);
      alert("Signup failed!");
    }
  };

  return (
    <FadeInWrapper>
      <div className="page-height flex flex-col items-center justify-start pt-[5%] max-md:mx-4 mx-auto md:w-[50%]">
        <h1 className="text-3xl font-bold mb-6">Sign Up</h1>
        <form className="space-y-4 flex flex-col" onSubmit={handleSubmit}>
          <div className="grid grid-cols-3 gap-2">
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="input"
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input col-span-2"
            />
          </div>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input"
          />
          <input
            type="text"
            placeholder="Tech Stack (comma-separated)"
            onChange={handleTechStackChange}
            className="input"
          />
          <div className="grid grid-cols-3 gap-2">
            <input
              type="file"
              accept="application/pdf"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
              className="input col-span-2  file:hidden text-white bg-red-600"
            />
            <button type="submit" className="button">
              Submit
            </button>
          </div>
        </form>
        <div className="flex ml-auto justify-end pt-4 gap-1 w-full text-sm">
          <h3>Already have an account?</h3>
          <Link href={"/signin"} className="underline underline-offset-2">
            Login
          </Link>
        </div>
      </div>
    </FadeInWrapper>
  );
}
