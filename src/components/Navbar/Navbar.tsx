import React from "react";
import UserButton from "./UserButton";
import { MenuOptions } from "./MenuOptions";
import Image from "next/image";
import Logo from "@/assets/logo.png";
import Link from "next/link";
import { DropdownMenuOptions } from "./DropdownMenuOptions";

export default function Navbar() {
  return (
    <div className="fixed flex h-[8vh] min-h-[50px] w-full bg-slate-50">
      <div className="mx-auto flex max-w-7xl flex-grow items-center px-3">
      <DropdownMenuOptions />
        <Link href={"/"} className="h-fit w-1/3">
          <Image
            alt="BodyFit Logo"
            height={400}
            width={800}
            className="max-w-32 transition-all duration-300 hover:brightness-150"
            src={Logo}
          ></Image>
        </Link>
        <MenuOptions />
        <UserButton />
      </div>
    </div>
  );
}
