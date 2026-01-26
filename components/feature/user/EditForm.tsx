import { useState, useTransition } from "react";
import { api } from "@/lib/api";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

type EditFormProps = {
    refresh: () => void;
    id: string;
    username: string;
    balance: number;
};

export default function EditForm({
    refresh,
    id,
    username,
    balance,
}: EditFormProps) {
    const [open, setOpen] = useState<boolean>(false);
    const [isPending, startTransaction] = useTransition();

    const handle = async (form: FormData) => {
        startTransaction(async () => {
            console.log(form.values());
            const req = await api({
                url: "/api/users",
                method: "PATCH",
                body: JSON.stringify(Object.fromEntries(form.entries())),
            });

            if (req?.status == "success") {
                refresh();
                setOpen(false);
            }
        });
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant={"default"}>Edit</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
                <DialogHeader className="text-left">
                    <DialogTitle>Edit {username}</DialogTitle>
                    <DialogDescription>User ID: {id}</DialogDescription>
                </DialogHeader>
                <form
                    action={(e) => {
                        handle(e);
                    }}
                >
                    <FieldGroup>
                        <Field>
                            <FieldLabel>ID</FieldLabel>
                            <Input
                                defaultValue={id}
                                name="id"
                                type="text"
                                readOnly={true}
                            />
                        </Field>
                        <Field>
                            <FieldLabel>Username</FieldLabel>
                            <Input
                                defaultValue={username}
                                name="username"
                                type="text"
                            />
                        </Field>
                        <Field>
                            <FieldLabel>Balance</FieldLabel>
                            <Input
                                defaultValue={balance ?? 0}
                                name="balance"
                                type="number"
                            />
                        </Field>
                        <Field>
                            <div className="flex justify-end">
                                <Button className="w-fit" disabled={isPending}>
                                    Submit
                                </Button>
                            </div>
                        </Field>
                    </FieldGroup>
                </form>
            </DialogContent>
        </Dialog>
    );
}
