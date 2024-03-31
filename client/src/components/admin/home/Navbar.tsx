"use client";

import Image from "next/image";
import hiyoLogo from "../../../../public/hiyo_logo.svg";
import { UserOptions } from "./UserOptions";

export const Navbar = () => {
  return (
    <div className="w-full flex justify-between shadow-md">
      <Image priority src={hiyoLogo} alt="Hiyo Logo" width={150} />
      <UserOptions />
    </div>
  );
};
