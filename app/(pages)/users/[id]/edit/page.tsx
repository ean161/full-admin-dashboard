"use client";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Field,
    FieldContent,
    FieldDescription,
    FieldGroup,
    FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import useEditUser from "@/hooks/users/useEditUser";
import { useParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { EditUserSchema } from "@/modules/users/user.types";
import Header from "@/components/layout/users/Header";
import FormSkeleton from "./FormSkeleton";
import { Spinner } from "@/components/ui/spinner";
import { toast } from "sonner";

export default function EditUser() {
    const params = useParams();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(EditUserSchema),
    });

    const { isPending, isDeleting, user, setForm, handleDelete } = useEditUser({
        id: String(params.id),
    });

    const deleteConfirmation = (id: string, username: string) => {
        toast(`Do you want to delete "${username}"?`, {
            action: {
                label: "Yes",
                onClick: () => handleDelete(id),
            },
            style: {
                "--normal-bg":
                    "light-dark(var(--color-amber-600), var(--color-amber-400))",
                "--normal-text": "var(--color-white)",
                "--normal-border":
                    "light-dark(var(--color-amber-600), var(--color-amber-400))",
            } as React.CSSProperties,
        });
    };

    return (
        <>
            <Header hasFullFeats={false} />
            <div className="xl:w-1/3 mx-auto">
                <Card className="border-dashed shadow-none">
                    <CardHeader>
                        <CardTitle>Edit user</CardTitle>
                        <CardDescription>ID: #{params.id}</CardDescription>
                    </CardHeader>
                    <CardContent>
                        {user === undefined && <FormSkeleton />}
                        {user !== undefined && (
                            <form
                                onSubmit={handleSubmit((data) =>
                                    setForm(JSON.stringify(data)),
                                )}
                            >
                                <FieldGroup>
                                    <Field>
                                        <FieldLabel>ID</FieldLabel>
                                        <FieldContent>
                                            <Input
                                                {...register("id")}
                                                defaultValue={user?.id ?? ""}
                                                readOnly
                                            />
                                        </FieldContent>
                                    </Field>
                                    <Field>
                                        <FieldLabel>Username</FieldLabel>
                                        <FieldContent>
                                            <Input
                                                {...register("username")}
                                                placeholder="Enter username"
                                                defaultValue={
                                                    user?.username ?? ""
                                                }
                                            />
                                        </FieldContent>
                                        {errors.username && (
                                            <FieldDescription className="text-red-500">
                                                {errors.username.message}
                                            </FieldDescription>
                                        )}
                                    </Field>
                                    <Field>
                                        <FieldLabel>Balance</FieldLabel>
                                        <FieldContent>
                                            <Input
                                                {...register("balance")}
                                                placeholder="Enter balance"
                                                defaultValue={
                                                    user?.balance ?? 0
                                                }
                                            />
                                        </FieldContent>
                                        {errors.balance && (
                                            <FieldDescription className="text-red-500">
                                                {errors.balance.message}
                                            </FieldDescription>
                                        )}
                                    </Field>
                                    <Field>
                                        <div className="flex space-x-2">
                                            <Button
                                                type="submit"
                                                variant={"default"}
                                                disabled={
                                                    isPending || isDeleting
                                                }
                                                className="w-fit cursor-pointer"
                                            >
                                                {isPending && <Spinner />}
                                                Save changes
                                            </Button>
                                            <Button
                                                onClick={() =>
                                                    deleteConfirmation(
                                                        user?.id,
                                                        user?.username ??
                                                            "UNKNOWN",
                                                    )
                                                }
                                                type="button"
                                                variant={"destructive"}
                                                disabled={
                                                    isPending || isDeleting
                                                }
                                                className="w-fit cursor-pointer"
                                            >
                                                {isDeleting && <Spinner />}
                                                Delete
                                            </Button>
                                        </div>
                                    </Field>
                                </FieldGroup>
                            </form>
                        )}
                    </CardContent>
                </Card>
            </div>
        </>
    );
}
