"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAuth } from "../context/authContext";
import Button from "./Button";
import { motion } from "framer-motion";

export default function Navbar() {
  const { isAuthenticated, setIsAuthenticated } = useAuth();
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      const res = await fetch("/api/checkAuth");
      setIsAuthenticated(res.ok);
      setLoading(false);
    };
    checkAuth();
  }, [setIsAuthenticated]);

  const handleSignOut = async () => {
    await fetch("/api/signout", { method: "POST" });
    setIsAuthenticated(false);
    router.push("/signin");
  };

  return (
    <nav className="pt-2 sticky top-0 left-0 z-50 bg-white shadow-sm">
      <div className="container mx-auto flex p-2 justify-between items-center">
        <Link href="/" className="text-lg pl-2 text-red-500 font-semibold">
          yourHR
        </Link>
        <div>
          {loading ? (
            <div>
              <div className="flex gap-3">
                <div className="bg-gray-300 h-10 w-20" />
                <div className="bg-gray-300 h-10 w-20" />
              </div>
            </div>
          ) : (
            <>
              {isAuthenticated ? (
                <div className="flex gap-3">
                  <Link href={"/user"}>
                    <Button>User</Button>
                  </Link>
                  <Link href={"/add-job"}>
                    <Button>Add Job</Button>
                  </Link>
                  <button
                    onClick={handleSignOut}
                    className=" text-red-600 underline underline-offset-4"
                  >
                    <Button red={true}>Sign Out</Button>
                  </button>
                </div>
              ) : (
                <>
                  <Link href="/signin" className="mx-2">
                    <Button>Login</Button>
                  </Link>
                  <Link href="/signup" className="mx-2">
                    <Button>Register</Button>
                  </Link>
                </>
              )}
            </>
          )}
        </div>
      </div>
      <motion.div
        initial={{ width: "40%" }}
        animate={{ width: "20%" }}
        style={{ marginRight: "100%" }}
        transition={{
          duration: 4,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut",
        }}
        className="h-[2px] bg-red-500 "
      />
    </nav>
  );
}
