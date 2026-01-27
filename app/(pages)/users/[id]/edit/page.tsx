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
import { Spinner } from "@/components/ui/spinner";
import useEditUser from "@/hooks/users/useEditUser";
import { useParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { EditUserSchema } from "@/modules/users/user.types";
import Header from "@/components/layout/users/Header";

export default function UserDetails() {
    const params = useParams();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(EditUserSchema),
    });

    const { isPending, user, setForm } = useEditUser({
        id: String(params.id),
    });

    return (
        <>
            <Header hasFullFeats={false} />
            <div className="w-full md:w-1/3 mx-auto">
                <Card>
                    <CardHeader>
                        <CardTitle>Edit user</CardTitle>
                        <CardDescription>ID: #{params.id}</CardDescription>
                    </CardHeader>
                    <CardContent>
                        {user === undefined && (
                            <div className="flex justify-center">
                                <Spinner />
                            </div>
                        )}
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
                                                type="number"
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
                                        <FieldContent>
                                            <Button
                                                type="submit"
                                                variant={"default"}
                                                disabled={isPending}
                                                className="w-fit"
                                            >
                                                Submit
                                            </Button>
                                        </FieldContent>
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
