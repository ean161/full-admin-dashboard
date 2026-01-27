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
import { useParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreateUserSchema } from "@/modules/users/user.types";
import useCreateUser from "@/hooks/users/useCreateUser";

export default function UserDetails() {
    const params = useParams();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(CreateUserSchema),
    });

    const { isPending, setForm } = useCreateUser();

    return (
        <>
            <div className="flex items-center justify-between mb-4">
                <div className="flex flex-col gap-1">
                    <h2 className="text-2xl font-semibold tracking-tight">
                        User management
                    </h2>
                    <p className="text-muted-foreground">
                        Create, update, delete users
                    </p>
                </div>
            </div>
            <div className="w-full md:w-1/3 mx-auto">
                <Card>
                    <CardHeader>
                        <CardTitle>Create user</CardTitle>
                        <CardDescription>Create new user</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form
                            onSubmit={handleSubmit((data) =>
                                setForm(JSON.stringify(data)),
                            )}
                        >
                            <FieldGroup>
                                <Field>
                                    <FieldLabel>Username</FieldLabel>
                                    <FieldContent>
                                        <Input {...register("username")} />
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
                                            defaultValue={0}
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
                                        >
                                            Submit
                                        </Button>
                                    </FieldContent>
                                </Field>
                            </FieldGroup>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </>
    );
}
