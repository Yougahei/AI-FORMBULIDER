"use client";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Edit, Trash } from "lucide-react";
import React from "react";

export default function FieldEdit({
  defaultValue,
  onUpdate,
  deleteField,
}: {
  defaultValue: any;
  onUpdate: any;
  deleteField: any;
}) {
  const [label, setLabel] = React.useState(defaultValue.fieldLabel);
  const [placeholder, setPlaceholder] = React.useState(
    defaultValue.placeholder
  );

  return (
    <div className="flex gap-2">
      <Popover>
        <PopoverTrigger>
          <Edit className="h-5 w-5 text-gray-500" />
        </PopoverTrigger>
        <PopoverContent>
          <h2>Edit fields</h2>
          <div>
            <label className="text-xs">Lable Name</label>
            <Input
              type="text"
              defaultValue={defaultValue.fieldLabel}
              onChange={(e) => setLabel(e.target.value)}
            />
          </div>

          <div>
            <label className="text-xs">PlaceHolder Name</label>
            <Input
              type="text"
              defaultValue={defaultValue.placeholder}
              onChange={(e) => setPlaceholder(e.target.value)}
            />
          </div>
          <Button
            size="sm"
            className="mt-3"
            onClick={() =>
              onUpdate({
                label: label,
                placeholder: placeholder,
              })
            }
          >
            Update
          </Button>
        </PopoverContent>
      </Popover>

      <AlertDialog>
        <AlertDialogTrigger>
          <Trash className="h-5 w-5 text-red-500" />
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                deleteField();
              }}
            ></AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
