import Link from "next/link";
import React from "react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
const Footer = () => {
  return (
    <div className="flex justify-between p-2 backdrop-blur-sm">
      <Link href={"https://heysaquib.vercel.app/"} className="">
        @saquib
      </Link>
      <div className="flex gap-2">
        <Link
          href={"https://www.linkedin.com/in/saquibali1973/"}
          className="text-xl"
        >
          <FaLinkedin />
        </Link>
        <Link href={"https://github.com/Saquib1973"} className="text-xl">
          <FaGithub />
        </Link>
      </div>
    </div>
  );
};

export default Footer;
