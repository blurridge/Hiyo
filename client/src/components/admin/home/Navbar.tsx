"use client";

import Image from "next/image";
import hiyoLogo from "../../../../public/hiyo_logo.svg";
import { UserOptions } from "./UserOptions";
import Link from "next/link";

export const Navbar = () => {
  return (
    <div className="w-full flex justify-between shadow-md items-center">
      <Image priority src={hiyoLogo} alt="Hiyo Logo" width={150} />
      <div className="flex items-center gap-10">
        <Link className="font-semibold hover:text-gray-600" href="/admin/home">Home</Link>
        <Link className="font-semibold hover:text-gray-600" href="/admin/requests">Admin Requests</Link>
      </div>
      <UserOptions />
    </div>
  );
};
