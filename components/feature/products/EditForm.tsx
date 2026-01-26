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
    title: string;
    price: number;
    quantity: number;
};

export default function EditForm({
    refresh,
    id,
    title,
    price,
    quantity,
}: EditFormProps) {
    const [open, setOpen] = useState<boolean>(false);
    const [isPending, startTransaction] = useTransition();

    const handle = async (form: FormData) => {
        startTransaction(async () => {
            const req = await api({
                url: `/api/products/${form.get("id")}`,
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
                    <DialogTitle>Edit {title}</DialogTitle>
                    <DialogDescription>Product ID: {id}</DialogDescription>
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
                            <FieldLabel>Title</FieldLabel>
                            <Input
                                defaultValue={title}
                                name="title"
                                type="text"
                            />
                        </Field>
                        <Field>
                            <FieldLabel>Price</FieldLabel>
                            <Input
                                defaultValue={price ?? 0}
                                name="price"
                                type="number"
                            />
                        </Field>
                        <Field>
                            <FieldLabel>Quantity</FieldLabel>
                            <Input
                                defaultValue={quantity ?? 0}
                                name="quantity"
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
