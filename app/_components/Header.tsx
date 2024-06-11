"use client";
import { Button } from "@/components/ui/button";
import { usePathname, useRouter } from "next/navigation";
import { Router } from "next/router";
import React, { useEffect } from "react";

export default function Header() {
  const router = useRouter();
  const path = usePathname();
  useEffect(() => {}, []);
  return (
    !path.includes("aiform") && (
      <div className="p-5 border-b shadow-sm">
        <div className="flex items-center justify-between">
          <Button onClick={() => router.push("/dashboard")}>Get Started</Button>
        </div>
      </div>
    )
  );
}
