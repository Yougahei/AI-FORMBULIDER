"use client";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";
import React, { useEffect } from "react";

export default function Header() {
  const path = usePathname();
  useEffect(() => {}, []);
  return (
    !path.includes("aiform") && (
      <div className="p-5 border-b shadow-sm">
        <div className="flex items-center justify-between">
          <Button>Get Started</Button>
        </div>
      </div>
    )
  );
}
