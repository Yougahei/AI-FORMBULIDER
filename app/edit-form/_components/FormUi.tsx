import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import React from "react";
import FieldEdit from "./FieldEdit";
import { Checkbox } from "@/components/ui/checkbox";

export default function FormUi({
  jsonForm,
  onFieldUpdate,
  deleteField,
  selectedTheme,
}: {
  jsonForm: any;
  onFieldUpdate: any;
  deleteField: any;
  selectedTheme: any;
}) {
  return (
    <div className="border p-5 md:w-[600px] rounded-lg " data-theme={selectedTheme}>
      <h2 className="font-bold text-center text-2xl">{jsonForm?.formTitle}</h2>
      <h2 className="text-sm text-gray-400 text-center">
        {jsonForm?.formHeading}
      </h2>

      {jsonForm?.fields?.map((field: any, index: any) => {
        return (
          <div key={index} className="flex items-center gap-2">
            {field.fieldType === "select" ? (
              <div className="my-3 w-full">
                <label className="text-sm text-gray-500">
                  {field.fieldLabel}
                </label>
                <Select>
                  <SelectTrigger className="w-[180px] bg-transparent">
                    <SelectValue placeholder={field.placeholder} />
                  </SelectTrigger>
                  <SelectContent>
                    {field.options?.map((item: any, index: any) => {
                      <SelectItem value={item.value}>{item.value}</SelectItem>;
                    })}
                  </SelectContent>
                </Select>
              </div>
            ) : field.fieldType === "checkbox" ? (
              <div className="my-3 w-full">
                <label className="text-sm text-gray-500">
                  {field?.fieldLabel}
                </label>
                {field?.options ? (
                  field?.options.map((item: any, index: any) => {
                    <div className="flex gap-2">
                      <Checkbox />
                    </div>;
                  })
                ) : (
                  <div className="flex gap-2">
                    <Checkbox />
                    <h2>{field?.fieldLabel}</h2>
                  </div>
                )}
              </div>
            ) : (
              <div className="my-3 w-full">
                <label className="text-sm text-gray-500">
                  {field.fieldLabel}
                </label>
                <Input
                  type={field.fieldType}
                  placeholder={field.placeholder}
                  name={field.fieldName}
                />
              </div>
            )}
            <div>
              <FieldEdit
                defaultValue={field}
                onUpdate={(value: any) => {
                  onFieldUpdate(value, index);
                }}
                deleteField={() => {
                  deleteField(index);
                }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
