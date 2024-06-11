"use client";
import { db } from "@/configs";
import { jsonForms } from "@/configs/schema";
import { eq } from "drizzle-orm";
import React, { useEffect } from "react";

export default function LiveAiForm({ params }: { params: any }) {
  useEffect(() => {
    params && GetFormData;
  }, [params]);

  const GetFormData = async () => {
    const result = await db
      .select()
      .from(jsonForms)
      .where(eq(jsonForms.id, Number(params?.formid)));

    console.log(result);
  };

  return <div>LiveAiForm</div>;
}
