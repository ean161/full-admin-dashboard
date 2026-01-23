import { Plus } from "lucide-react";
import { Button } from "../ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Field, FieldGroup, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";
import { useState, useTransition } from "react";
import { api } from "@/lib/api";

type FormField = {
    id: string,
    title: string,
    type: string
}

type AddFormProps = {
    topic: string,
    refresh: () => void,
    handleUrl: string,
    fields: FormField[]
}

export default function AddForm({ topic, refresh, handleUrl, fields }: AddFormProps) {
    const [open, setOpen] = useState<boolean>(false);
    const [isPending, startTransaction] = useTransition();

    const handle = async (form: FormData) => {
        startTransaction(async () => {
            const req = await api({
                url: handleUrl,
                method: "POST",
                body: JSON.stringify(Object.fromEntries(form.entries()))
            });

            if (req?.status == "success") {
                refresh();
                setOpen(false);
            }
        })
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button>
                    <Plus />
                    <span>Create</span>
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
                <DialogHeader className="text-left">
                    <DialogTitle>Add a {topic}</DialogTitle>
                    <DialogDescription>Add a {topic} to system</DialogDescription>
                </DialogHeader>
                <form action={(e) => {
                    handle(e);
                }}>
                    <FieldGroup>
                        {fields.map((f, fIdx) => {
                            return (
                                <Field key={fIdx}>
                                    <FieldLabel>{f.title}</FieldLabel>
                                    <Input name={f.id} type={f.type} />
                                </Field>
                            );
                        })}
                        <Field>
                            <div className="flex justify-end">
                                <Button className="w-fit" disabled={isPending}>Submit</Button>
                            </div>
                        </Field>
                    </FieldGroup>
                </form>
            </DialogContent>
        </Dialog>
    );
}