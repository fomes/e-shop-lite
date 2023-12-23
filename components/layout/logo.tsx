import { Store } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function Logo() {
  return (
    <Link
      href={"/"}
      className="flex items-center justify-center gap-2 text-xl font-extrabold text-sky-500"
    >
      <Store className="h-10 w-10 text-sky-600" />
      <span className="hidden sm:inline-block">E-shop</span>
    </Link>
  );
}
