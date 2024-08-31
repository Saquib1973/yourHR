"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useAuth } from "../context/authContext";
import FadeInWrapper from "./../components/FadeInWrapper";
import Loading from "./../components/Loading";

export default function Signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setIsAuthenticated } = useAuth();
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    setLoading(true);

    const res = await fetch("/api/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (res.ok) {
      setIsAuthenticated(true);
      router.push("/");
    } else {
      alert("Sign-in failed");
    }
    setLoading(false);
  };

  return (
    <FadeInWrapper>
      <div className="page-height flex flex-col items-center justify-start pt-[5%] max-md:mx-4 mx-auto md:w-[50%]">
        <h1 className="text-3xl font-bold mb-6">Sign In</h1>
        <form
          className="space-y-4 flex flex-col w-[80%]"
          onSubmit={handleSubmit}
        >
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input !w-full"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input !w-full"
          />
          {loading && <Loading hide={true} />}
          <button
            className="ml-auto bg-neutral-300 p-1 px-2 text-neutral-800"
            onClick={() => {
              setEmail("a@a.a");
              setPassword("a");
            }}
            disabled={loading}
          >
            {/* <Button>Login</Button> */}
            Test Credentials
          </button>
          <button type="submit" className="button" disabled={loading}>
            {/* <Button>Login</Button> */}
            Login
          </button>
        </form>
        <div className="flex ml-auto justify-end pt-4 gap-1 w-full text-sm">
          <h3>Don't have an account?</h3>
          <Link href={"/signup"} className="underline underline-offset-2">
            Register
          </Link>
        </div>
      </div>
    </FadeInWrapper>
  );
}
