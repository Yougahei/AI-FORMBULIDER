"use client";
import { db } from "@/configs";
import { jsonForms } from "@/configs/schema";
import { and, eq } from "drizzle-orm";
import {
  ArrowBigLeft,
  Router,
  ShareIcon,
  SquareArrowDownRightIcon,
} from "lucide-react";
import router from "next/router";
import React, { useEffect } from "react";
import FormUi from "../_components/FormUi";
import { toast } from "@/components/ui/use-toast";
import Controller from "../_components/Controller";
import { Button } from "@/components/ui/button";
import { Share } from "next/font/google";
import Link from "next/link";

export default function EditForm({ params }: { params: any }) {
  const [jsonForm, setJsonForm] = React.useState<any>();
  const [updateTrigger, setUpdateTrigger] = React.useState<number>();
  const [record, setRecord] = React.useState<any>([]);
  const [selectedTheme, setSelectedTheme] = React.useState<any>("light");

  useEffect(() => {
    GetFormData();
  }, []);

  const GetFormData = async () => {
    const result = await db
      .select()
      .from(jsonForms)
      .where(
        and(eq(jsonForms.id, params?.formId), eq(jsonForms.createdBy, "admin"))
      );

    setRecord(result[0]);
    setJsonForm(JSON.parse(result[0].jsonform));
  };

  useEffect(() => {
    if (updateTrigger) {
      setJsonForm(jsonForm);
      updateJsonFormInDb();
    }
  }, [updateTrigger]);

  const onFieldUpdate = (value: any, index: any) => {
    jsonForm.fields[index].fieldLabel = value.label;
    jsonForm.fields[index].placeholder = value.placeholder;
    setUpdateTrigger(Date.now());
  };

  const updateJsonFormInDb = async () => {
    const result = await db
      .update(jsonForms)
      .set({
        jsonform: jsonForm,
      })
      .where(
        and(eq(jsonForms.id, record.id), eq(jsonForms.createdBy, "admin"))
      );

    toast({
      description: "Form has been updated successfully",
    });
  };

  const deleteField = (indexToRemove: any) => {
    const result = jsonForm.fields.filter(
      (item: any, index: any) => index !== indexToRemove
    );
    console.log(result);
    jsonForm.fields = result;
    setUpdateTrigger(Date.now());
  };

  return (
    <div className="p-10">
      <div className="flex justify-between items-center ">
        <h2
          className="flex gap-2 items-center my-5 cursor-pointer hover:font-bold"
          onClick={() => router.back()}
        >
          <ArrowBigLeft />
          Back
        </h2>
        <div className="flex gap-2">
          <Link href={"/aiform/" + record?.id} target="_blank">
            <Button className="flex gap-2">
              <SquareArrowDownRightIcon className="h-5 w-5" />
              Live Preview
            </Button>
          </Link>

          <Button className="flex gap-2 bg-green-600 hover:bg-green-700">
            <ShareIcon />
            Share
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="p-5 border rounded-lg shadow-md">
          <Controller />
        </div>
        <div className="md:col-span-2 border rounded-lg p-4 flex items-center justify-center">
          <FormUi
            jsonForm={jsonForm}
            selectedTheme={selectedTheme}
            onFieldUpdate={onFieldUpdate}
            deleteField={(index: any) => deleteField(index)}
          />
        </div>
      </div>
    </div>
  );
}
