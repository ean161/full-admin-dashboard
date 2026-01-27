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
import Header from "@/components/layout/users/Header";

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
            <Header hasFullFeats={false} />
            <div className="xl:w-1/3 mx-auto">
                <Card className="border-dashed shadow-none">
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
                                            className="w-fit"
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
