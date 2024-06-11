"use client";
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { AiChatSession } from "@/configs/AiModal";
import { jsonForms } from "@/configs/schema";
import { db } from "@/configs";
import moment from "moment";
import { useRouter } from "next/navigation";

export default function CreateForm() {
  const [openDialog, setOpenDialog] = React.useState(false);
  const [userInput, setUserInput] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const router = useRouter();

  const PROMPT =
    "on the basis of the description please give form in json format with formTitle, formHeading alone with fieldName, fieldTitle, placeholder ,lable. fieldType,field required fields in Json format ";

  const onCreateForm = async () => {
    setLoading(true);
    const result = await AiChatSession.sendMessage(
      "Description: " + userInput + " " + PROMPT
    );
    if (result.response.text()) {
      const resp = await db
        .insert(jsonForms)
        .values({
          jsonform: result.response.text(),
          createdBy: "admin",
          createDate: moment().format("YYYY-MM-DD"),
        })
        .returning({ id: jsonForms.id });
      console.log("id", resp[0].id);
      if (resp[0].id) {
        router.push(`/edit-form/${resp[0].id}`);
      }
      setLoading(false);
      console.log(result.response.text());
    }
    setLoading(false);
  };

  return (
    <div>
      <Button
        onClick={() => {
          setOpenDialog(true);
        }}
      >
        + Create Form
      </Button>
      <Dialog open={openDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Form</DialogTitle>
            <DialogDescription>
              <Textarea
                className="my-2"
                placeholder="write description of your form"
                onChange={(e) => setUserInput(e.target.value)}
              />
              <div className="flex gap-2 my-3 justify-end">
                <Button
                  variant="destructive"
                  onClick={() => setOpenDialog(false)}
                >
                  Cancel
                </Button>
                <Button disabled={loading} onClick={() => onCreateForm()}>
                  Create
                </Button>
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}
